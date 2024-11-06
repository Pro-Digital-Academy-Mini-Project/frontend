import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
});

export default function TimeLine() {
  const { roomId = '60d21b4667d0d8992e610c86' } = useParams();
  const [message, setMessage] = useState('');
  const [timelineComments, setTimelineComments] = useState([]); // [{time: number, message: string, userId: string}]
  const [currentTime, setCurrentTime] = useState(0); // 비디오 현재 시간
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태를 관리하는 state 추가
  const [visibleComments, setVisibleComments] = useState([]);
  const [username, setUsername] = useState('testuser');

  // 타이머 함수 추가
  useEffect(() => {
    let timer;

    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // 컴포넌트 언마운트 또는 isPlaying이 false가 될 때 타이머 정리
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isPlaying]);

  // 재생/일시정지 토글 함수
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // 시간 초기화 함수
  const resetTimer = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  // 초기 타임라인 댓글 로드
  useEffect(() => {
    const fetchTimelineComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/timelinecomment/${roomId}`);
        console.log(response.data);
        // 시간 순으로 정렬
        const sortedComments = response.data.sort((a, b) => a.timestamp - b.timestamp);
        setTimelineComments(sortedComments);
      } catch (error) {
        console.error('타임라인 댓글 로드 실패:', error);
      }
    };

    fetchTimelineComments();
  }, [roomId]);

  useEffect(() => {
    socket.off('receiveTimeLineMessage');

    socket.emit('joinTimeLineRoom', roomId);
    setCurrentRoomId(roomId);

    // 새로운 타임라인 댓글 수신
    socket.on('receiveTimeLineMessage', (data) => {
      setTimelineComments((prevComments) => {
        const newComments = [
          ...prevComments,
          {
            username: data.username,
            room_id: data.roomId,
            timestamp: data.timestamp,
            content: data.message,
          },
        ];
        return newComments.sort((a, b) => a.timestamp - b.timestamp);
      });
    });

    return () => {
      if (currentRoomId) {
        socket.emit('leaveTimeLineRoom', currentRoomId);
      }
      socket.off('receiveTimeLineMessage');
    };
  }, [roomId, currentRoomId]);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      // 사용자 정보를 가져오는 API 호출
      axios
        .get('http://localhost:3000/user/me', {
          headers: { Authorization: token },
        })
        .then((response) => setUsername(response.data.username))
        .catch((error) => {
          console.error('사용자 정보 로드 실패:', error);
          console.log(username);
        });
    }
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message && currentRoomId) {
      const newTimelineComment = {
        username: username,
        room_id: currentRoomId,
        timestamp: currentTime,
        content: message,
      };

      try {
        // DB에 저장
        await axios.post('http://localhost:3000/timelinecomment', newTimelineComment);

        // 소켓으로 전송
        socket.emit('sendTimeLineMessage', {
          username: username,
          roomId: newTimelineComment.room_id,
          message: newTimelineComment.content,
          timestamp: currentTime,
        });
        setMessage('');
      } catch (error) {
        console.error('댓글 저장 실패:', error);
      }
    }
  };
  useEffect(() => {
    // 비디오 시간에 따른 댓글 필터링
    setVisibleComments(timelineComments.filter((comment) => comment.timestamp <= currentTime));
  }, [currentTime, timelineComments]);

  // 2초 앞으로 이동하는 함수 추가
  const skipBackward = () => {
    setCurrentTime((prevTime) => prevTime - 2);
  };

  return (
    <div>
      <h1>Timeline Comments</h1>
      <div>
        <p>현재 시간: {currentTime}초</p>
        <button onClick={togglePlay}>{isPlaying ? '일시정지' : '재생'}</button>
        <button onClick={resetTimer}>초기화</button>
        <button onClick={skipBackward}>-2초</button>
      </div>
      <div
        style={{
          border: '1px solid #ccc',
          height: '300px',
          overflowY: 'scroll',
        }}
      >
        {visibleComments.map((comment, index) => (
          <div key={index}>
            <span>[{comment.timestamp}초] </span>
            <span>
              {comment.username}: {comment.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="타임라인 댓글 입력"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
