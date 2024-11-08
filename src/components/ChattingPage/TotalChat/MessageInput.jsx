import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../lib/api/api';

import { socket } from '../ChattingPage';

export default function MessageInput({ roomId }) {
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
        await axios.post(`${BASE_URL}/api/Comment`, newComment);
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
    //  메시지 입력란 (화면 하단 고정)
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
      </form>
    </div>
  );
}
