import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AppNavbar = ({ onCartClick }) => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">The Generics</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/store">Store</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          {!token && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
          {token && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
        </Nav>
        <button className="btn btn-outline-light" onClick={onCartClick}>Cart</button>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;