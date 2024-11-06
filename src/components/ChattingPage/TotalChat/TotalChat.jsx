import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import MessageInput from './MessageInput';
import { socket } from '../ChattingPage';

export default function TotalChat({ roomId }) {
  console.log('지원', roomId);
  const [messages, setMessages] = useState([]);

  //초기 전체 댓글 로드
  useEffect(() => {
    const fetchTotalComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Comment/${roomId}`);
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
  }, [roomId]);

  return (
    <div>
      <div
        style={{
          border: '1px solid #ccc',
          height: '300px',
          overflowY: 'scroll',
        }}
      >
        {messages !== null
          ? messages.map((msg, index) => (
              <div key={index}>
                Username: {msg.username}
                <br />
                Content: {msg.content}
                <br />
                Created At: {msg.created_at}
              </div>
            ))
          : null}
      </div>
      <MessageInput roomId={roomId} />
    </div>
  );
}
