import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { postRooms } from '../../lib/api/room';
import { useNavigate } from 'react-router-dom';

export default function MakeRoomModal(props) {
  const [roomInfo, setRoomInfo] = useState({
    name: '',
    password: '',
    is_private: false,
    video_url_id: '',
    owner_name: '',
  });
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  const makeRoom = async () => {
    const updatedRoomInfo = {
      ...roomInfo,
      video_url_id: extractVideoId(videoUrl), // videoUrl에서 추출
      owner_name: localStorage.getItem('username'), // 로컬 스토리지에서 가져오기
    };
    setRoomInfo(updatedRoomInfo);

    const response = await postRooms(updatedRoomInfo);

    if (response) {
      //response로 room_id만 받음
      console.log(response);
      alert('성공적으로 방이 생성되었습니다');
      navigate(`/room/${response}`);
    } else {
      alert('방 생성에 실패했습니다...');
      navigate('/');
    }
  };

  function extractVideoId(url) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)?|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
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
              onChange={(e) => {
                setVideoUrl(() => e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.ControlTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="방 제목을 입력해주세요"
              onChange={(e) => {
                roomInfo.name = e.target.value;
                setRoomInfo({ ...roomInfo });
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="switch"
              id="private-switch"
              label="공개/비공개"
              onChange={() => {
                roomInfo.is_private = !roomInfo.is_private;
                setRoomInfo({ ...roomInfo });
              }}
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력해주세요"
              disabled={!roomInfo.is_private}
              onChange={(e) => {
                roomInfo.password = e.target.value;
                setRoomInfo({ ...roomInfo });
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
  );
}
