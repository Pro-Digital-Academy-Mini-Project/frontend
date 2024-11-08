import React from 'react';
import { MyNavbar } from '../../components/MyNavbar';
import { MyFooter } from '../../components/MyFooter';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

export default function BoardLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navbar */}
      <MyNavbar brandTitle="My-React-Board" />

      {/* Main Content */}
      <main className="flex-grow">
        <Container fluid className="p-0">
          <div>
            <Outlet />
          </div>
        </Container>
      </main>

      {/* Footer */}
      <MyFooter />
    </div>
  );
}
