import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// 소켓 연결은 컴포넌트 외부에서 한 번만 생성
const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
});

export default function ChattingPage({ roomId = "room1" }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    // props로 전달받은 roomId 사용
    socket.emit("joinRoom", roomId);
    setCurrentRoom(roomId);

    // 메시지 수신 리스너
    socket.on("receiveMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (currentRoom) {
        socket.emit("leaveRoom", currentRoom);
      }
      socket.off("receiveMessage");
    };
  }, [roomId, currentRoom]); // roomId를 의존성 배열에 추가

  const sendMessage = (e) => {
    e.preventDefault();
    if (message && currentRoom) {
      socket.emit("sendMessage", socket.id + " : " + message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat Room: {currentRoom}</h1>
      <h3>**websocket 서버를 켰는지 확인하세요</h3>
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
  );
}
