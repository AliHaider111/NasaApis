import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <p className="mb-0" >&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
