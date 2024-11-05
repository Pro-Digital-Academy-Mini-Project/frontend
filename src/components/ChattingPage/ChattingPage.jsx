import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import MessageInput from './MessageInput';
import TimelineChat from './TimelineChat.jsx/TimelineChat';
import TotalChat from './TotalChat.jsx/TotalChat';

// 소켓 연결은 컴포넌트 외부에서 한 번만 생성
export const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
});

const ChatMode = {
  TIMELINE: 'timeline',
  TOTAL: 'total',
};

export default function ChattingPage() {
  const params = useParams();
  const roomId = params.roomId || 'room1';
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  /* 현재 접속자 수 */
  const [roomUserCount, setRoomUserCount] = useState(0);
  /* 타임라인 채팅방인지 전체 채팅방인지 선택*/
  const [chatMode, setChatMode] = useState(ChatMode.TIMELINE);

  useEffect(() => {
    // props로 전달받은 roomId 사용
    socket.emit('joinRoom', roomId);
    setCurrentRoom(roomId);

    // 메시지 수신 리스너
    socket.on('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    socket.on('roomUserCount', (msg) => {
      setRoomUserCount(msg);
      console.log('접속자수:', msg);
    });

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (currentRoom) {
        socket.emit('leaveRoom', currentRoom);
      }
      socket.off('receiveMessage');
    };
  }, [roomId, currentRoom]); // roomId를 의존성 배열에 추가

  return (
    <div>
      <div>
        <h1>로고</h1>
        <p>**websocket 서버를 켰는지 확인하세요</p>
      </div>
      <hr />
      <div>
        <p>{currentRoom}</p>
        <p>
          <img src="../../../public/img/user-icon.png" width="15" />
          &nbsp;{roomUserCount}
        </p>
      </div>
      <hr />
      <Nav
        variant="underline"
        defaultActiveKey={ChatMode.TIMELINE}
        onSelect={(selectedKey) => setChatMode(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey={ChatMode.TIMELINE}>타임라인</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={ChatMode.TOTAL}>전체</Nav.Link>
        </Nav.Item>
      </Nav>
      {chatMode === ChatMode.TIMELINE ? <TimelineChat messages={messages} /> : <TotalChat messages={messages} />}
      <MessageInput currentRoom={currentRoom} chatMode={chatMode} />
    </div>
  );
}
