import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPage from './VideoPage/VideoPage';
import { getRoomById } from '../../lib/api/room';
import PrivateModal from './PrivateModal';
import axios from 'axios';
import ChattingPage from '../ChattingPage/ChattingPage';

export default function RoomPage() {
  const { roomId } = useParams();
  const [roomInfo, setRoomInfo] = useState({});
  const [videoId, setVideoId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [show, setShow] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const handleAuth = () => setIsAuthenticated((prev) => !prev);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  useEffect(() => {
    const bringRoom = async () => {
      const data = await getRoomById(roomId);
      if (data.room_name) {
        setRoomInfo(data);
      } else {
        alert('방 정보를 불러오는데 실패했습니다');
        navigate('/');
      }
    };
    bringRoom();
  }, []);

  useEffect(() => {
    if (roomInfo.room_video_id) {
      setVideoId(String(roomInfo.room_video_id || ''));
    }
  }, [roomInfo]);

  // 비밀번호 확인
  const handlePasswordSubmit = async (password) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/rooms/verify-password`, {
        roomId: roomInfo.roomId,
        password: password,
      });
      if (response.data.isValid) {
        handleAuth();
        handleClose();
      } else {
        alert('비밀번호가 틀렸습니다.');
        navigate('/');
      }
    } catch (error) {
      console.error('비밀번호 확인 오류:', error.response?.data || error.message);
      alert('비밀번호 확인에 실패했습니다.');
    }
  };

  const updateCurrentTime = (time) => {
    setCurrentTime(time);
  };

  return (
    <div>
      <h1>{roomInfo.room_name}</h1>
      {roomInfo.is_private && !isAuthenticated ? (
        <div>
          {/** private인 경우 비밀번호 확인 **/}
          <PrivateModal show={show} handleAuth={handleAuth} handlePasswordSubmit={handlePasswordSubmit} />
        </div>
      ) : (
        <div>
          {/** public or 비밀번호 확인 후 기존 페이지 **/}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <VideoPage video_id={videoId} updateCurrentTime={updateCurrentTime} />
            <ChattingPage roomId={roomId} currentTime={currentTime} setCurrentTime={setCurrentTime} />
          </div>
        </div>
      )}
    </div>
  );
}
