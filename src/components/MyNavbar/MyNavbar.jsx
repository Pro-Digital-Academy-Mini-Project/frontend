import React, { useEffect } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Cookies from 'js-cookie';

const EXPAND_BREAKPOINT = 'md';

const NavBar = ({ brandTitle, offCanvasTitle }) => {
  const { isLoggedIn, logout, setIsLoggedIn } = useAuth();

  // // 쿠키에서 로그인 상태 초기화 설정
  // useEffect(() => {
  //   const token = Cookies.get('authToken');
  //   if (token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

  return (
    <Navbar expand={EXPAND_BREAKPOINT} sticky="top" className="text-white bg-black">
      <Container fluid>
        {/* 브랜드 및 로고 */}
        <Navbar.Brand href="/">
          <img src="/img/logo.png" alt="Logo" className="h-12 w-auto d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`Navbar-expand-${EXPAND_BREAKPOINT}`}
          style={{ color: 'white', border: 'none' }} // style로 흰색 설정
        />
        <Navbar.Offcanvas
          id={`Navbar-expand-${EXPAND_BREAKPOINT}`}
          aria-labelledby={`NavbarLabel-expand-${EXPAND_BREAKPOINT}`}
          placement="end"
          style={{ backgroundColor: 'black' }} // 회색 배경 설정
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`NavbarLabel-expand-${EXPAND_BREAKPOINT}`}>
              <img src="/img/logo.png" alt="Logo" className="h-8 w-auto" />
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className="d-flex justify-content-end">
            <Nav className={`flex-col pb-4 pb-${EXPAND_BREAKPOINT}-0`}>
              {isLoggedIn ? (
                <Nav.Link as="div" className="text-center text-white px-3 mx-2 rounded cursor-pointer" onClick={logout}>
                  로그아웃
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link as="div" className="text-center px-3 mx-2 sm:">
                    <Link
                      to="/login"
                      state={{ redirect: 'redirectUri' }}
                      className="text-decoration-none text-white hover:text-blue-600"
                    >
                      로그인
                    </Link>
                  </Nav.Link>
                  <Nav.Link as="div" className="text-center px-3 mx-2 rounded">
                    <Link to="/signup" state={{ redirect: 'redirectUri' }} className="text-decoration-none text-white">
                      회원가입
                    </Link>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
