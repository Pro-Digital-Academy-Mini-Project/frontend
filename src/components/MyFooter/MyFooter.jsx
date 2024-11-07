import React from 'react';
import { Container } from 'react-bootstrap';
import { Facebook, Instagram } from 'react-bootstrap-icons';

export default function MyFooter({ brandTitle }) {
  return (
    <Container fluid className="py-4 bg-black border-top text-white">
      <Container className="d-flex justify-content-between align-items-center" as="footer">
        <div className="d-flex align-items-center">
          <a href="/" className="mb-3 me-3 mb-md-0 text-white text-decoration-none lh-1">
            {brandTitle}
          </a>
          <span className="mb-3 mb-md-0 ">© 2024 , Inc</span>
        </div>
        <ul className="nav justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a href="#" aria-label="Instagram">
              <Instagram size={24} />
            </a>
          </li>
          <li className="ms-3">
            <a href="#" aria-label="Facebook">
              <Facebook size={24} />
            </a>
          </li>
        </ul>
      </Container>
    </Container>
  );
}
