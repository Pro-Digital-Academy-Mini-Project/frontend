import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './TimelineChat.css';
import { socket } from '../ChattingPage';
import { BASE_URL } from '../../../lib/api/api';

export default function TimelineChat({ roomId, currentTime }) {
  const [message, setMessage] = useState('');
  const [timelineComments, setTimelineComments] = useState([]); // [{time: number, message: string, userId: string}]
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [visibleComments, setVisibleComments] = useState([]);
  const [username] = useState(localStorage.getItem('username'));
  const messageContainerRef = useRef(null);

  // 초기 타임라인 댓글 로드
  useEffect(() => {
    const fetchTimelineComments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/timelinecomment/${roomId}`);
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
        // 정렬된 댓글 목록 반환
        return newComments.sort((a, b) => a.timestamp - b.timestamp);
      });
    });

    return () => {
      socket.off('receiveTimeLineMessage');
    };
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message && currentRoomId) {
      const newTimelineComment = {
        username: username,
        room_id: currentRoomId,
        timestamp: currentTime,
        content: message,
      };

      console.log(newTimelineComment);
      try {
        // DB에 저장
        await axios.post(`${BASE_URL}/timelinecomment`, newTimelineComment);
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

  // 스크롤 자동 이동 함수
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  // scrollHeight가 변경될 때 스크롤 이동
  useEffect(() => {
    scrollToBottom();
  }, [messageContainerRef.current?.scrollHeight]);

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

  const formatTimestamp = (timestamp) => {
    const totalSeconds = Math.floor(timestamp);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}시간 ${minutes}분 ${seconds}초`;
    } else if (minutes > 0) {
      return `${minutes}분 ${seconds}초`;
    }
    return `${seconds}초`;
  };

  const handleTimestampClick = (timestamp) => {
    // seekToTime(timestamp);
  };

  return (
    // <div>
    //   <div ref={messageContainerRef}>
    //     {visibleComments.map((comment, index) => (
    //       <div key={index} className={`message-item ${comment.username === username ? 'right' : ''}`}>
    //         <div className="user-avatar" style={{ backgroundColor: generateColor(comment.username) }}>
    //           {getInitials(comment.username)}
    //         </div>
    //         <div className="message-content">
    //           <div className="message-header">
    //             <span className="username">{comment.username}</span>
    //             <span className="timestamp" onClick={() => handleTimestampClick(comment.timestamp)}>
    //               {formatTimestamp(comment.timestamp)}
    //             </span>
    //           </div>
    //           <div>{comment.content}</div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // {/* <div className="sub-container">
    //   <div className="input-container">
    //     <form onSubmit={sendMessage} className="message-form">
    //       <input
    //         type="text"
    //         value={message}
    //         onChange={(e) => setMessage(e.target.value)}
    //         placeholder="메시지 보내기"
    //         className="message-input"
    //       />
    //       <button type="submit" className="send-button">
    //         ↑
    //       </button>
    //     </form>
    //   </div>
    // </div> */}

    <div className="flex flex-col h-screen text-white">
      {/* 채팅 메시지 목록 (내부 스크롤 적용) */}
      <div ref={messageContainerRef} className="flex-grow overflow-y-auto p-3 space-y-4 h-96 scrollbar-hide">
        {visibleComments.map((comment, index) => (
          <div key={index} className={`flex ${comment.username === username ? 'justify-end' : ''}`}>
            <div
              className={`flex items-start space-x-2 ${comment.username === username ? 'flex-row-reverse text-right' : ''}`}
            >
              {/* 아바타 */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white"
                style={{ backgroundColor: generateColor(comment.username) }}
              >
                {getInitials(comment.username)}
              </div>

              {/* 메시지 내용 */}
              <div className="bg-gray-800 p-2 rounded-lg ">
                <div className="text-sm font-semibold">{comment.username}</div>
                <div
                  className="text-xs text-gray-400 cursor-pointer"
                  onClick={() => handleTimestampClick(comment.timestamp)}
                >
                  {formatTimestamp(comment.timestamp)}
                </div>
                <div className="mt-1">{comment.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력란 (화면 하단 고정) */}
      <div className="flex mx-3 mb-3 px-2 py-2 rounded-full bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <form onSubmit={sendMessage} className="flex justify-between w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="focus:outline-none w-10/12"
          />
          <button type="submit" className="flex items-center justify-center mx-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-6 text-blue-600 hover:text-blue-900"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
            </svg>
          </button>

          {/* <button className="flex items-center justify-center" onClick={() => searchRooms()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 text-blue-600 hover:text-blue-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 4a7 7 0 110 14 7 7 0 010-14zM21 21l-4.35-4.35"
              />
            </svg>
          </button> */}
        </form>
      </div>
    </div>
  );
}
