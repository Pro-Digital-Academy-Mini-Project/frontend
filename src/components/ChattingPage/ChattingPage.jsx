import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Nav } from 'react-bootstrap';

import './ChattingPage.css';
import TimelineChat from './TimelineChat/TimelineChat';
import TotalChat from './TotalChat/TotalChat';

export const socket = io(import.meta.env.VITE_BACK_URL || 'http://localhost:3000/', {
  transports: ['websocket'],
});

const ChatMode = {
  TIMELINE: 'timeline',
  TOTAL: 'total',
};

export default function ChattingPage({ roomId, currentTime, setCurrentTime }) {
  const [roomUserCount, setRoomUserCount] = useState(0);
  const [chatMode, setChatMode] = useState(ChatMode.TIMELINE);

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    socket.on('roomUserCount', (msg) => {
      setRoomUserCount(msg);
      console.log('접속자수:', msg);
    });

    return () => {
      if (roomId) {
        socket.emit('leaveRoom', roomId);
      }
      socket.off('receiveMessage');
    };
  }, [roomId]);

  return (
    <div className="chatting-container">
      <div className="nav-container">
        <span className="user-count">
          <p>{roomId}</p>
          <p>
            <img src="../../../public/img/user-icon2.png" width="20" />
            &nbsp;{roomUserCount}
          </p>
        </span>
        <Nav className="nav-items" activeKey={chatMode} onSelect={(selectedKey) => setChatMode(selectedKey)}>
          <Nav.Item>
            <Nav.Link eventKey={ChatMode.TIMELINE} className={chatMode === ChatMode.TIMELINE ? 'active' : ''}>
              타임라인
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={ChatMode.TOTAL} className={chatMode === ChatMode.TOTAL ? 'active' : ''}>
              전체
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {chatMode === ChatMode.TIMELINE ? (
        <TimelineChat roomId={roomId} currentTime={currentTime} setCurrentTime={setCurrentTime} />
      ) : (
        <TotalChat roomId={roomId} />
      )}
    </div>
  );
}
