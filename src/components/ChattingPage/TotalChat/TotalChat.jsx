import React from 'react';
import { useState } from 'react';
import MessageInput from './MessageInput';

export default function TotalChat({ currentRoom }) {
  const [messages, setMessages] = useState([]);
  return (
    <div
      style={{
        border: '1px solid #ccc',
        height: '300px',
        overflowY: 'scroll',
      }}
    >
      {messages !== null ? messages.map((msg, index) => <div key={index}>{msg}</div>) : null}
      <MessageInput currentRoom={currentRoom} />
    </div>
  );
}
