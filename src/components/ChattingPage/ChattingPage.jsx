import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket = io(`http://localhost:3000/room1`,
    {transports: ['websocket', 'polling']}
  );

export default function ChattingPage() {
    const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    console.log(socket);

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };
// // 방 전환 함수
// function switchRoom(newRoom) {
//   if (socket) {
//     socket.disconnect(); // 기존 소켓 연결 해제
//   }
//   currentRoom = newRoom;
//   socket = io(`http://localhost:3000/${currentRoom}`); // 새 방에 연결

//   // 메시지 수신 설정
//   socket.on('receiveMessage', (msg) => {
//     console.log(`[${currentRoom}] 받은 메시지:`, msg);
//   });
// }

// // 메시지 전송 함수
// function sendMessage(message) {
//   socket.emit('sendMessage', message);
// }

// // 기본 방에서 메시지 수신
// socket.on('receiveMessage', (msg) => {
//   console.log(`[${currentRoom}] 받은 메시지:`, msg);
// });

  return (
    <div>
      <h1>Chat Room</h1>
      <h3>**websocket 서버를 켰는지 확인하세요</h3>
      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
