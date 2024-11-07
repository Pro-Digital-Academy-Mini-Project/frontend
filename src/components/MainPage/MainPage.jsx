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

  const { username} = useAuth();

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
    <>
      {/** Title & Search*/}
      <div>
      <h2 className="text-3xl font-bold text-blue-600">{username ? username : '익명'}의 함께 볼 때 더 즐거운 순간들</h2>
        <div>
          <input
            type="text"
            placeholder="방 검색하기"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            onClick={() => {
              searchRooms();
            }}
          >
            방 검색하기
          </button>
          <button
            onClick={() => {
              handleShow();
            }}
          >
            방 만들기
          </button>
        </div>
      </div>

      {/** Room List */}
      <div>
        {roomArr.map((el, id) => {
          return (
            <Card
              key={id}
              style={{ width: '18rem' }}
              onClick={() => {
                moveToRoom(el._id);
              }}
            >
              <Card.Img variant="top" src={`https://img.youtube.com/vi/${el.video_id.video_url_id}/0.jpg`} />
              <Card.Body>
                <Card.Title>{el.room_name}</Card.Title>
                <Card.Text>{/** user name 넣기 */}</Card.Text>
                {el.is_private ? 'private' : ''} {/** private은 자물쇠 아이콘 가져오기 */}
              </Card.Body>
            </Card>
          );
        })}
      </div>
      {page - 1 > 0 ? (
        <button
          onClick={() => {
            if (page - 1 > 0) {
              setPage(page - 1);
            }
          }}
        >
          previous
        </button>
      ) : (
        ''
      )}

      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        next
      </button>

      {/** Make Room Modal */}
      <div>
        <MakeRoomModal show={show} handleClose={handleClose} username={username} />
      </div>
    </>
  );
}