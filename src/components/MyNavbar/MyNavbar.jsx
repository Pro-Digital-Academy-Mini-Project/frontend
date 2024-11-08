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
    <Navbar expand={EXPAND_BREAKPOINT} sticky="top">
      <Container fluid>
        <Navbar.Brand href="#">{brandTitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls={`Navbar-expand-${EXPAND_BREAKPOINT}`} />
        <Navbar.Offcanvas
          id={`Navbar-expand-${EXPAND_BREAKPOINT}`}
          aria-labelledby={`NavbarLabel-expand-${EXPAND_BREAKPOINT}`}
          placement="end"
        >
          {/** 로고 */}
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`NavbarLabel-expand-${EXPAND_BREAKPOINT}`}>
              {offCanvasTitle || brandTitle}
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className="d-flex justify-content-end">
            <Nav className={`flex-row pb-4 pb-${EXPAND_BREAKPOINT}-0`}>
              {isLoggedIn ? (
                <Nav.Link as="div" className="text-center text-white px-3 mx-2 rounded" onClick={logout}>
                  로그아웃
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link as="div" className="text-center px-3 mx-2">
                    <Link to="/login" state={{ redirect: 'redirectUri' }} className="text-decoration-none text-white">
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
