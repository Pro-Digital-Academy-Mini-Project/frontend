import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import { socket } from '../ChattingPage';

export default function MessageInput({ roomId }) {
  console.log('roomId:', roomId);
  const [message, setMessage] = useState('');

  //메시지 보내기
  const sendMessage = async (e) => {
    const currentDate = new Date();

    e.preventDefault();
    if (message && roomId) {
      const newComment = {
        username: 'user1',
        room_id: roomId,
        content: message,
        created_at: currentDate,
      };

      try {
        // DB에 저장
        await axios.post('http://localhost:3000/Comment', newComment);
        // 소켓으로 전송
        socket.emit('sendTotalMessage', {
          username: 'user1',
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
    // {/* Search input */}
    <div className="fixed bottom-0 p-3">
      <div className="relative">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="w-full bg-[#2a2a2a] rounded-full py-2 pl-4 pr-20 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
          />
          {/* <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" type="submit">
            Send
          </button> */}
        </form>
      </div>
    </div>
    // <>
    //   <form onSubmit={sendMessage}>
    //     <input
    //       type="text"
    //       value={message}
    //       onChange={(e) => setMessage(e.target.value)}
    //       placeholder="Type your message"
    //     />
    //     <button type="submit">Send</button>
    //   </form>
    // </>
  );
}
