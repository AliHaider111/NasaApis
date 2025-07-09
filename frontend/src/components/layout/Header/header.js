import React from "react";
import {Container,Navbar, Nav } from "react-bootstrap"

import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="app-header">
      {/* <div className="container">
        <h1 className="logo">MyWebsite</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/mars-rover">Mars Rover</Link>
          <Link to="/earth-polychromatic">Earth Polychromatic</Link>
          <Link to="/earth-objects">Near Earth Objects</Link>
        </nav>
      </div> */}
       <Navbar expand="lg" className="bg-body-tertiary">
          <Container className="position-relative">
            <Navbar.Brand href="/">MyWebsite</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto header-list">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/mars-rover">Mars Rover</Nav.Link>
                <Nav.Link href="/earth-polychromatic">Earth Polychromatic</Nav.Link>
                <Nav.Link href="/earth-objects">Near Earth Objects</Nav.Link>
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  );
};

export default Header;
