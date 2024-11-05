import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';;
import { getRooms } from '../../lib/api/room';
import MakeRoomModal from './MakeRoomModal';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const [roomArr, setRoomArr] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    const bringRooms = async() => {
      const data = await getRooms();
      setRoomArr(data)
    }
    bringRooms()
  },[])

  const moveToRoom = (id) => { //room id 전달
    navigate(`/room/${id}`)
  }
  return (
    <>
      {/** Title & Search*/}
      <div>
        <h2>user_nickname의 함께 볼 때 더 즐거운 순간들</h2>
        <div>
          <input type='text' placeholder='방 검색하기'/>
          <button onClick={()=>{handleShow()}}>방 만들기</button>
        </div>
      </div>

      {/** Room List */}
      <div>
        {roomArr.map((el, id)=>{
          return(
            <Card key={id} style={{ width: '18rem' }} onClick={()=>{moveToRoom(el._id)}}>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>{el.room_name}</Card.Title>
                <Card.Text>
                  {el.video_id.title}
                </Card.Text>
                {el.is_private ? ('private') : ''} {/** private은 자물쇠 아이콘 가져오기 */}
              </Card.Body>
            </Card> 
          )
        })}
      </div>

      {/** Make Room Modal */}
      <div>
        <MakeRoomModal show={show} handleClose={handleClose}/>
      </div>
    </>
  )
}
