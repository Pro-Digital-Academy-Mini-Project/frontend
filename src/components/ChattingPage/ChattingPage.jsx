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
    <div className="flex flex-col h-full bg-[#1a1a1a] text-white">
      {/* Header with logo and user count */}
      <div className="p-3 flex justify-between items-center border-b border-gray-800">
        <div className="text-[#3b82f6] font-bold text-xl">VIEWMATE</div>
      </div>
      {/* user count & 나가기 */}
      <div className="p-3 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <img src="../../../public/img/user-icon2.png" width="20" alt="User icon" className="w-5 h-5" />
          <span>{roomUserCount}</span>
        </div>
        <button className="px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          나가기
        </button>
      </div>
      {/* Navigation tabs */}
      <div className="px-4 mb-2 flex justify-center">
        <nav className="inline-flex">
          <button
            onClick={() => setChatMode(ChatMode.TIMELINE)}
            className={`px-4 py-2 text-sm font-medium ${
              chatMode === ChatMode.TIMELINE
                ? 'text-[#3b82f6] border-b-2 border-[#3b82f6]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            타임라인
          </button>
          <button
            onClick={() => setChatMode(ChatMode.TOTAL)}
            className={`px-4 py-2 text-sm font-medium ${
              chatMode === ChatMode.TOTAL
                ? 'text-[#3b82f6] border-b-2 border-[#3b82f6]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            전체
          </button>
        </nav>
      </div>
      {/* Chat content */}
      <div className="flex-grow overflow-y-auto">
        {chatMode === ChatMode.TIMELINE ? <TimelineChat roomId={roomId} /> : <TotalChat roomId={roomId} />}
      </div>
      {/* <div>
        <span>
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
      </div> */}

      {chatMode === ChatMode.TIMELINE ? (
        <TimelineChat roomId={roomId} currentTime={currentTime} setCurrentTime={setCurrentTime} />
      ) : (
        <TotalChat roomId={roomId} />
      )}
    </div>
  );
}
