import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './TimelineChat.css';
import { socket } from '../ChattingPage';

// const socket = io('http://localhost:3000', {
//   transports: ['websocket', 'polling'],
// });

// export default function TimelineChat({ roomId = '6729cc69aac836f825227770', currentTime = 0 }) {
export default function TimelineChat({ roomId = '6729cc69aac836f825227770' }) {
  const [message, setMessage] = useState('');
  const [timelineComments, setTimelineComments] = useState([]); // [{time: number, message: string, userId: string}]
  const [currentTime, setCurrentTime] = useState(0); // 비디오 현재 시간
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태를 관리하는 state 추가
  const [visibleComments, setVisibleComments] = useState([]);
  const [username, setUsername] = useState('testuser');
  const messageContainerRef = useRef(null);

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
        const response = await axios.get(`http://localhost:3000/api/timelinecomment/${roomId}`);
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
    // socket.off('receiveTimeLineMessage');

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
      // if (currentRoomId) {
      //   socket.emit('leaveTimeLineRoom', currentRoomId);
      // }
      socket.off('receiveTimeLineMessage');
    };
  }, [roomId, currentRoomId]);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      // 사용자 정보를 가져오는 API 호출
      axios
        .get('http://localhost:3000/api/user/me', {
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
        await axios.post('http://localhost:3000/api/timelinecomment', newTimelineComment);

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

  // 스크롤 자동 이동 함수
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  // visibleComments가 변경될 때마다 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [visibleComments]);

  // 상단에 함수 추가
  const generateColor = (username) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 40%)`; // 채도와 명도는 고정하고 색상만 변경
  };

  const getInitials = (username) => {
    if (!username) return '';
    // 한글인 경우 첫 글자만, 영어인 경우 첫 두 글자 사용
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(username)) {
      return username.slice(0, 1);
    }
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <div className="timeline-container">
      <div ref={messageContainerRef} className="message-container">
        {visibleComments.map((comment, index) => (
          <div key={index} className="message-item">
            <div className="user-avatar" style={{ backgroundColor: generateColor(comment.username) }}>
              {getInitials(comment.username)}
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="username">{comment.username}</span>
                <span className="timestamp">{comment.timestamp}초전</span>
              </div>
              <div>{comment.content}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sub-container">
        <div className="controls-container">
          <button className="control-button" onClick={skipBackward}>
            -2초
          </button>
          <button className="control-button" onClick={togglePlay}>
            {isPlaying ? '일시정지' : '재생'}
          </button>
          <button className="control-button" onClick={resetTimer}>
            초기화
          </button>
          <span style={{ color: '#666' }}>현재 시간: {currentTime}초</span>
        </div>

        <div className="input-container">
          <form onSubmit={sendMessage} className="message-form">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지 보내기"
              className="message-input"
            />
            <button type="submit" className="send-button">
              ↑
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
