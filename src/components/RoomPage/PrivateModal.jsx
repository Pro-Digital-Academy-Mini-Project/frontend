import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function PrivateModal(props) {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        show={props.show}
        onHide={() => navigate('/')}
        centered
        style={{ border: 'none' }}
        backdropClassName="bg-black" // 모달 뒤 배경 설정
      >
        <Modal.Header closeButton className="bg-white text-black border-none m-2">
          <div>
            <h2 className="text-xl font-bold">방 비밀번호</h2>
          </div>
        </Modal.Header>
        <Modal.Body className="bg-white border-none mx-2">
          <Form>
            <Form.Group className="mb-4" controlId="form.ControlUrl">
              <Form.Label className="font-semibold">Room Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="방 비밀번호를 입력해주세요"
                autoFocus
                className="border border-gray-500 rounded focus:ring-2 focus:ring-blue-600 text-black"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => props.handlePasswordSubmit(password)}
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            방 들어가기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
