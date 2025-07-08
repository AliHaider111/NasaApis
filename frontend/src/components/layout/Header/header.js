import React from "react";
import "./header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <h1 className="logo">MyWebsite</h1>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/mars-rover">Mars Rover</a>
          <a href="/earth-polychromatic">Earth Polychromatic</a>
          <a href="/earth-objects">Near Earth Objects</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
