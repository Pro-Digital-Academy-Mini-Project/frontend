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
    <Navbar
      expand={EXPAND_BREAKPOINT}
      className="mb-3"
      sticky="top"
      bg="dark"
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand href="#">{brandTitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls={`Navbar-expand-${EXPAND_BREAKPOINT}`} />
        <Navbar.Offcanvas
          id={`Navbar-expand-${EXPAND_BREAKPOINT}`}
          aria-labelledby={`NavbarLabel-expand-${EXPAND_BREAKPOINT}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`NavbarLabel-expand-${EXPAND_BREAKPOINT}`}>
              {offCanvasTitle || brandTitle}
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className="flex-row-reverse">
            <Nav className={`justify-content-around flex-row pb-4 pb-${EXPAND_BREAKPOINT}-0`}>
              {/* 로그인 상태일 때만 로그아웃 버튼 표시 */}
              {isLoggedIn && (
                <Nav.Link
                  as="div"
                  className="flex-grow-1 text-center border border-dark border-end-0"
                  onClick={() => {
                    logout();
                  }}
                >
                  로그아웃
                </Nav.Link>
              )}

              {/* 로그인/회원가입 버튼은 로그인 상태에 따라 다르게 표시 */}
              {!isLoggedIn && (
                <>
                  <Nav.Link
                    as="div"
                    className="flex-grow-1 text-center border border-dark border-end-0"
                  >
                    <Link to="/login" state={{ redirect: 'redirectUri' }}>
                      로그인
                    </Link>
                  </Nav.Link>
                  <Nav.Link
                    as="div"
                    className="flex-grow-1 text-center border border-dark"
                  >
                    <Link to="/signup" state={{ redirect: 'redirectUri' }}>
                      회원가입
                    </Link>
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav className="justify-content-start flex-grow-1 pe-3">
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">게시판</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;