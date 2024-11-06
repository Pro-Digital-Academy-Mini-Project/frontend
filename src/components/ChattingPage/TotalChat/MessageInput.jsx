import React from 'react';
import { useState } from 'react';
import { socket } from '../ChattingPage';

export default function MessageInput({ currentRoom }) {
  const [message, setMessage] = useState('');

  //메시지 보내기
  const sendMessage = async (e) => {
    const currentDate = new Date();
    e.preventDefault();
    if (message && currentRoom) {
      const newComment = {
        username: username,
        room_id: currentRoom,
        content: message,
        created_at: currentDate,
      };

      try {
        // DB에 저장
        await axios.post('http://localhost:3000/Comment', newComment);
        // 소켓으로 전송
        socket.emit('sendTotalMessage', {
          username: username,
          roomId: newComment.room_id,
          content: newComment.content,
          created_at: currentDate,
        });
        setMessage('');
      } catch (error) {
        console.error('댓글 저장 실패:', error);
      }
    }
  };

  return (
    <>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
