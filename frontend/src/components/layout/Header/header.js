import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className="app-header">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="position-relative">
          <Navbar.Brand as={NavLink} to="/">Nasa Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto header-list">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/mars-rover">
                Mars Rover
              </Nav.Link>
              <Nav.Link as={NavLink} to="/earth-polychromatic">
                Earth Polychromatic
              </Nav.Link>
              <Nav.Link as={NavLink} to="/earth-objects">
                Near Earth Objects
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
