import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPage from './VideoPage/VideoPage';
import { getRoomById } from '../../lib/api/room';
import ChattingPage from '../ChattingPage/ChattingPage';

export default function RoomPage() {
  const { roomId } = useParams();
  const [roomInfo, setRoomInfo] = useState({}); //room data 담음
  const [videoId, setVideoId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const bringRoom = async () => {
      const data = await getRoomById(roomId);
      if (data._id) {
        setRoomInfo(data);
      } else {
        alert('방 정보를 불러오는데 실패했습니다...');
        navigate('/');
      }
    };
    bringRoom();
  }, []);

  useEffect(() => {
    if (roomInfo.video_id) {
      setVideoId(String(roomInfo.video_id.video_id || ''));
    }
  }, [roomInfo]);
  return (
    <div>
      <h1>{roomInfo.room_name}</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <VideoPage video_id={videoId} />
        <ChattingPage roomId={roomId} />
      </div>
    </div>
  );
}
