import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { getRooms } from '../../lib/api/room';
import MakeRoomModal from './MakeRoomModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function MainPage() {
  const [roomArr, setRoomArr] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  // const [username, setUserName] = useState('');

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { username } = useAuth();

  useEffect(() => {
    searchRooms();
    // setUserName(localStorage.getItem('username'));
  }, []);

  useEffect(() => {
    searchRooms();
  }, [page]);

  const moveToRoom = (id) => {
    //room id 전달
    navigate(`/room/${id}`);
  };

  const searchRooms = async () => {
    const data = await getRooms(page, search);
    setRoomArr(data);
  };
  return (
    <div className="absolute inset-0 h-screen flex flex-col bg-black text-white overflow-hidden space-y-10">
      {/* Header */}
      <div className="flex flex-col items-center mt-40">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
          {username ? `${username}의 함께 볼 때 더 즐거운 순간들` : '익명의 함께 볼 때 더 즐거운 순간들'}
        </h2>
        <div className="flex items-center space-x-2">
          <div className="flex px-2 py-2 justify-center rounded-full w-64 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <input
              type="text"
              className="focus:outline-none"
              placeholder="방 검색하기"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="flex items-center justify-center" onClick={() => searchRooms()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 text-blue-600 hover:text-blue-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 4a7 7 0 110 14 7 7 0 010-14zM21 21l-4.35-4.35"
                />
              </svg>
            </button>
          </div>

          <button onClick={handleShow} className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white ml-4">
            방 만들기
          </button>
        </div>
      </div>

      {/* Room List */}
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {roomArr.map((el, id) => {
          console.log(el);
          return (
            <div
              key={id}
              className="w-1/3 bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-200 hover:scale-105"
              onClick={() => moveToRoom(el._id)}
            >
              <img
                className="w-full h-36 object-cover"
                src={`https://img.youtube.com/vi/${el.video_id.video_url_id}/0.jpg`}
                alt="Room Thumbnail"
              />
              <div className="p-3 px-3">
                <h3 className="text-lg font-semibold text-white">{el.room_name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <p>{el.owner.username}</p>
                  <span className="text-gray-400 text-xs">{el.is_private ? '비공개' : '공개'}</span>
                  {el.is_private && <i className="fas fa-lock text-gray-400"></i>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-6">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            이전
          </button>
        )}
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          다음
        </button>
      </div>

      {/* Make Room Modal */}
      <MakeRoomModal show={show} handleClose={handleClose} username={username} />
    </div>
  );
}
