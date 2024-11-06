import React from 'react';
import { useState } from 'react';
import { socket } from '../ChattingPage';

export default function MessageInput({ currentRoom }) {
  const [message, setMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (message && currentRoom) {
      socket.emit('sendMessage', socket.id + ' : ' + message);
      setMessage('');
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
