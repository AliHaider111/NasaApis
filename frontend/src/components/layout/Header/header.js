import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <h1 className="logo">MyWebsite</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/mars-rover">Mars Rover</Link>
          <Link to="/earth-polychromatic">Earth Polychromatic</Link>
          <Link to="/earth-objects">Near Earth Objects</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
