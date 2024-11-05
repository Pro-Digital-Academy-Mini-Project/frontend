import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { postRooms } from '../../lib/api/room';
import { useNavigate } from 'react-router-dom';

export default function MakeRoomModal(props) {
  const [roomInfo, setRoomInfo] = useState({name:'', password:'', is_private:false});
  const [video, setVideo] = useState({});
  const navigate = useNavigate();

  const makeRoom = async() => {
    //video post => video id
    //room post => video id와 user id와 room 정보를 등록
    //해당 room page로 이동
    


    const response = await postRooms(roomInfo)
    if (response._id){
        navigate(`/room/${response._id}`)
    } else {
        alert('방 만들기에 실패했습니다... 나중에 다시 시도해주세요')
    }
    
  }

  return (
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
        <div>
            <h2>방 만들기</h2>
            <p>당신의 WeTube를 만들어 보세요</p>  
        </div>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="form.ControlUrl">
            <Form.Label>Youtube URL</Form.Label>
            <Form.Control
                type="text"
                placeholder="youtube url을 입력해주세요"
                autoFocus
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.ControlTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
                type="text"
                placeholder="방 제목을 입력해주세요"
                onChange={(e)=>{
                    roomInfo.name = e.target.value;
                    setRoomInfo({ ...roomInfo })
                }}
            />
            </Form.Group>
            <Form.Group>
            <Form.Check
                type="switch"
                id="private-switch"
                label="공개/비공개"
                onChange={()=>{
                    roomInfo.is_private= !roomInfo.is_private;
                    setRoomInfo({ ...roomInfo })
                }}
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="비밀번호를 입력해주세요"
                disabled={!roomInfo.is_private}
                onChange={(e)=>{
                    roomInfo.password = e.target.value;
                    setRoomInfo({ ...roomInfo })
                }}
            />
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={makeRoom}>
            방 만들기
        </Button>
        </Modal.Footer>
    </Modal>
  )
}
