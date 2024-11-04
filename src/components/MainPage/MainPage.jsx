import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function MainPage() {
  const [RoomArr, setRoomArr] = useState({})

  useEffect(()=>{
    //Todo
    //1. Room data 받아오기
    //2. Room data -> Video key를 통해 Video url 받아오기
    //3. RoomArr에 데이터 넣기
  },[])

  const makeRoom = () => {
    console.log('방 만들기 버튼 클릭')
  }
  const moveToRoom = (id) => {
    console.log(`${id} 방으로 이동`)
  }
  return (
    <>
      {/** Title & Search*/}
      <div>
        <h2>user_nickname의 함께 볼 때 더 즐거운 순간들</h2>
        <div>
          <input type='text' placeholder='방 검색하기'/>
          <button onClick={()=>{makeRoom}}>방 만들기</button>
        </div>
      </div>

      {/** Room List */}
      <div>
        <Card style={{ width: '18rem' }} onClick={()=>{moveToRoom(1)}}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>Room Title</Card.Title>
            <Card.Text>
              Youtube Url
            </Card.Text>
            {/* {isPrivate ? ('private') : 'none'} */}
          </Card.Body>
        </Card>
      </div>
    </>
  )
}
