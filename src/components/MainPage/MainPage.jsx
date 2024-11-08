import React, { useState, useEffect } from 'react';
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
  }, [page]);

  const moveToRoom = (id) => {
    //room id 전달
    navigate(`/room/${id}`);
  };

  const searchRooms = async () => {
    const data = await getRooms(page, search);
    setRoomArr(data);
  };
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 isLoaded를 true로 변경하여 애니메이션 시작
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div
        className={`flex-grow lg:mx-20 lg:my-20 mx-10 my-10 transform transition-all duration-1000 ease-in-out ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="flex-grow lg:mx-36 lg:my-20 sm:mx-10 sm:my-10">
          {/* Header */}
          <div className="flex flex-col items-center sm:mt-10 mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4 text-center">
              {/* 기본 텍스트 */}
              <span className="hidden sm:inline">
                {username ? `${username}의 함께 볼 때 더 즐거운 순간들` : '익명의 함께 볼 때 더 즐거운 순간들'}
              </span>
              {/* sm 이하에서 보일 텍스트 */}
              <span className="sm:hidden">
                함께 볼 때<br />더 즐거운 순간들
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
              {/* 방 검색하기 */}
              <div className="flex px-2 py-2 justify-center rounded-full w-64 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12">
                <input
                  type="text"
                  className="focus:outline-none h-full w-full px-2"
                  placeholder="방 검색하기"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="flex items-center justify-center h-full" onClick={() => searchRooms()}>
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

              {/* 방 만들기 */}
              <button
                onClick={handleShow}
                className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto h-12 sm:ml-2"
              >
                방 만들기
              </button>
            </div>
          </div>

          {/* Room List */}
          <div className="my-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {roomArr.map((el, id) => {
              return (
                <div
                  key={id}
                  className="w-full h-72 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-200 hover:scale-105"
                  onClick={() => moveToRoom(el._id)}
                >
                  {/* 이미지 부분 */}
                  <img
                    className="w-full h-4/6 object-cover"
                    src={`https://img.youtube.com/vi/${el.video_id.video_url_id}/0.jpg`}
                    alt="Room Thumbnail"
                  />

                  {/* 텍스트 및 정보 부분 */}
                  <div className="bg-neutral-900 h-2/6 p-3 flex flex-col">
                    <h3 className="text-lg font-semibold text-white">{el.room_name}</h3>
                    <div className="flex items-center justify-between mt-0">
                      <p className="text-blue-600">{el.owner.username}</p>

                      {el.is_private ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 text-blue-600 hover:text-blue-900"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 11V7a4 4 0 00-8 0v4M5 11h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z"
                          />
                        </svg>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center my-6 w-full mx-auto">
            {page > 1 ? (
              <button
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                이전
              </button>
            ) : (
              <div></div> // 빈 div로 자리 차지, 필요시 생략 가능
            )}
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white ml-auto"
            >
              다음
            </button>
          </div>

          {/* Make Room Modal */}
          <MakeRoomModal show={show} handleClose={handleClose} username={username} />
        </div>
      </div>
    </div>
  );
}
