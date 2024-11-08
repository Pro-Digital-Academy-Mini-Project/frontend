import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import VideoPage from './VideoPage/VideoPage';
import { getRoomById } from '../../lib/api/room';
import PrivateModal from './PrivateModal';
import axios from 'axios';
import ChattingPage from '../ChattingPage/ChattingPage';
import { BASE_URL } from '../../lib/api/api.js';
import { toast } from 'react-toastify';

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
        toast('방 정보를 불러오는데 실패했습니다');
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
      const response = await axios.post(`${BASE_URL}/api/rooms/verify-password`, {
        roomId: roomInfo.roomId,
        password: password,
      });
      if (response.data.isValid) {
        handleAuth();
        handleClose();
      } else {
        toast('비밀번호가 틀렸습니다.');
        navigate('/');
      }
    } catch (error) {
      console.error('비밀번호 확인 오류:', error.response?.data || error.message);
      toast('비밀번호 확인에 실패했습니다.');
    }
  };

  const updateCurrentTime = (time) => {
    setCurrentTime(time);
  };

  return (
    <div>
      {roomInfo.is_private && !isAuthenticated ? (
        <div>
          {/** private인 경우 비밀번호 확인 **/}
          <PrivateModal show={show} handleAuth={handleAuth} handlePasswordSubmit={handlePasswordSubmit} />
        </div>
      ) : (
        // public or 비밀번호 확인 후 기존 페이지
        <div className="flex h-screen bg-black">
          {/* Video section - takes up 70% of the width */}
          <div className="w-[75%] h-full">
            <VideoPage video_id={videoId} updateCurrentTime={updateCurrentTime} />
          </div>

          {/* Chat section - takes up 30% of the width */}
          <div className="w-[25%] h-full border-l border-gray-800">
            <ChattingPage roomId={roomId} currentTime={currentTime} setCurrentTime={setCurrentTime} />
          </div>
        </div>
      )}
    </div>
  );
}
