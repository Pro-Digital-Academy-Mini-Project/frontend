import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import './ChattingPage.css';

import MessageInput from './MessageInput';
import TimelineChat from './TimelineChat/TimelineChat';
import TotalChat from './TotalChat/TotalChat';

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
  const [roomUserCount, setRoomUserCount] = useState(0);
  const [chatMode, setChatMode] = useState(ChatMode.TIMELINE);

  useEffect(() => {
    socket.emit('joinRoom', roomId);
    setCurrentRoom(roomId);

    socket.on('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    socket.on('roomUserCount', (msg) => {
      setRoomUserCount(msg);
      console.log('접속자수:', msg);
    });

    return () => {
      if (currentRoom) {
        socket.emit('leaveRoom', currentRoom);
      }
      socket.off('receiveMessage');
    };
  }, [roomId, currentRoom]);

  return (
    <div className="chatting-container">
      <div className="nav-container">
        <span className="user-count">
          <p>{currentRoom}</p>
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
        <TimelineChat messages={messages} />
      ) : (
        <div>
          <TotalChat messages={messages}/>
          <MessageInput currentRoom={currentRoom} />
        </div>
      )}
    </div>
  );
}
