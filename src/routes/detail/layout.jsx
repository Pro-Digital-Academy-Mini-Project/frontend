import React from 'react';
import { MyNavbar} from '../../components/MyNavbar';
import { MyFooter} from '../../components/MyFooter';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

export default function BoardLayout() {
  return (
    <div>
      <MyNavbar brandTitle="My-React-Board" />
      <Container className="min-vh-100">
        <Outlet />
      </Container>
      <MyFooter brandTitle="My-React-Board" />
    </div>
  );
}
