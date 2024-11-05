import React from 'react'

export default function TimelineChat({messages}) {
  return (
    // <div>TimelineChat</div>
    <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
    </div>
  )
}
