import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from 'react-router-dom';
import MessageInput from "./MessageInput";
import TimelineChat from "./TimelineChat.jsx/TimelineChat";

// 소켓 연결은 컴포넌트 외부에서 한 번만 생성
export const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
});

export default function ChattingPage() {
  const params = useParams();
  const roomId = params.roomId || "room1";
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [roomUserCount, setRoomUserCount] = useState(0);

  useEffect(() => {
    // props로 전달받은 roomId 사용
    socket.emit("joinRoom", roomId);
    setCurrentRoom(roomId);

    // 메시지 수신 리스너
    socket.on("receiveMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    socket.on("roomUserCount", (msg) => {
      setRoomUserCount(msg);
      console.log("접속자수:",msg);
    })

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (currentRoom) {
        socket.emit("leaveRoom", currentRoom);
      }
      socket.off("receiveMessage");
    };
  }, [roomId, currentRoom]); // roomId를 의존성 배열에 추가

  return (
    <div>
      <h1>Chat Room: {currentRoom}</h1>
      <h3>**websocket 서버를 켰는지 확인하세요</h3>
      <hr/>
      <p>현재 접속자수:{roomUserCount}</p>
      <hr/>
        <TimelineChat messages={messages}/>
        <MessageInput currentRoom={currentRoom}/>
    </div>
  );
}
