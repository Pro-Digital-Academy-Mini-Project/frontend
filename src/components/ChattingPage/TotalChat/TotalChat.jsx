import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import MessageInput from './MessageInput';
import { socket } from '../ChattingPage';
import { BASE_URL } from '../../../lib/api/api';

export default function TotalChat({ roomId }) {
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);
  const [username] = useState(localStorage.getItem('username'));

  //초기 전체 댓글 로드
  useEffect(() => {
    const fetchTotalComments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/Comment/${roomId}`);
        console.log(response.data);
        setMessages(response.data);
      } catch (error) {
        console.error('전체 댓글 로드 실패:', error);
      }
    };
    fetchTotalComments();
  }, [roomId]);

  //다른 사용자가 보낸 메시지 받기
  useEffect(() => {
    socket.on('receiveTotalMessage', (data) => {
      console.log('user received total message');
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          {
            username: data.username,
            room_id: data.roomId,
            content: data.content,
            created_at: data.created_at,
          },
        ];
      });
    });

    return () => {
      // socket.emit('leaveTimeLineRoom', currentRoomId);
      socket.off('receiveTotalMessage');
    };
  }, [roomId]);

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

  //아바타 색상
  const generateColor = (username) => {
    let hash = 0;
    if (username == null) {
      return 'blue';
    }
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 40%)`; // 채도와 명도는 고정하고 색상만 변경
  };

  //아바타 이름
  const getInitials = (username) => {
    if (!username) return '';
    // 한글인 경우 첫 글자만, 영어인 경우 첫 두 글자 사용
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(username)) {
      return username.slice(0, 1);
    }
    return username.slice(0, 2).toUpperCase();
  };

  //시간 format 수정
  function formatDate(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diff = (now - past) / 1000; // 초 단위 차이

    if (diff < 60) {
      return `${Math.floor(diff)}초 전`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)}분 전`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)}시간 전`;
    } else {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return past.toLocaleDateString('ko-KR', options);
    }
  }

  return (
    <div className="flex flex-col h-screen text-white">
      {/* 채팅 메시지 목록 (내부 스크롤 적용) */}
      <div ref={messageContainerRef} className="flex-grow overflow-y-auto p-3 space-y-4 h-96 scrollbar-hide">
        {messages.map((comment, index) => (
          <div key={index} className={`flex ${comment.username === username ? 'justify-end' : ''}`}>
            <div
              className={`flex items-start space-x-2 ${comment.username === username ? 'flex-row-reverse text-right space-x-reverse' : ''}`}
            >
              {/* 아바타 */}
              <div className="flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white"
                  style={{ backgroundColor: generateColor(comment.username) }}
                >
                  {getInitials(comment.username)}
                </div>
              </div>

              {/* 메시지 내용 */}
              <div className="bg-zinc-800 p-3 rounded-lg flex-grow">
                <div
                  className={`flex items-center space-x-2 ${comment.username === username ? 'flex-row-reverse text-right space-x-reverse' : ''}`}
                >
                  <div className="flex items-center text-sm font-semibold">{comment.username}</div>
                  <div className="flex  items-center text-xs text-gray-400 cursor-pointer">
                    {formatDate(comment.created_at)}
                  </div>
                </div>
                <div className="mt-1">{comment.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 사용자 입력받는 컴포넌트 */}
      <MessageInput roomId={roomId} />
    </div>
  );
}
