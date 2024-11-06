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
      <Modal show={props.show} onHide={() => navigate('/')}>
        <Modal.Header closeButton>
          <div>
            <h2>방 비밀번호</h2>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="form.ControlUrl">
              <Form.Label>Room Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="방 비밀번호를 입력해주세요"
                autoFocus
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => props.handlePasswordSubmit(password)}>
            방 들어가기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
