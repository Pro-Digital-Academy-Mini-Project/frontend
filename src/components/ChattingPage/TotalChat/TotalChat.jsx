import React from 'react';
import './TotalChat.css';

export default function TotalChat({ messages }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        height: '300px',
        overflowY: 'scroll',
      }}
    >
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
}
