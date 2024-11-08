import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { postRooms } from '../../lib/api/room';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
      toast('성공적으로 방이 생성되었습니다');
      navigate(`/room/${response}`);
    } else {
      toast('방 생성에 실패했습니다...');
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
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      style={{ border: 'none' }} // 모달 자체의 경계선 제거
    >
      <Modal.Header
        closeButton
        className="bg-white text-black border-none m-2"
        style={{ borderBottom: 'none' }} // 헤더 하단 경계선 제거
      >
        <div>
          <h2 className="text-2xl font-bold mb-1">방 만들기</h2>
          <p className="text-sm text-blue-700 font-semibold">당신의 WeTube를 만들어 보세요</p>
        </div>
      </Modal.Header>
      <Modal.Body className="bg-white border-none">
        <Form className="p-3">
          <Form.Group className="mb-4" controlId="form.ControlUrl">
            <Form.Label className="font-semibold text-black">YouTube URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="YouTube URL을 입력해주세요"
              autoFocus
              className="border border-gray-300 rounded focus:ring-1 focus:ring-blue-600"
              onChange={(e) => {
                setVideoUrl(() => e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="form.ControlTitle">
            <Form.Label className="font-semibold text-black">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="방 제목을 입력해주세요"
              className="border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
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
              className="mb-2 text-black"
              onChange={() => {
                roomInfo.is_private = !roomInfo.is_private;
                setRoomInfo({ ...roomInfo });
              }}
            />
            <Form.Label className="font-semibold text-black">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력해주세요"
              disabled={!roomInfo.is_private}
              className="border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                roomInfo.password = e.target.value;
                setRoomInfo({ ...roomInfo });
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-white border-none" style={{ borderTop: 'none' }}>
        <Button variant="primary" onClick={makeRoom} className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700">
          방 만들기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
