import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SiteLoader from "../../../assets/images/Spinner-1s-304px.gif";
import "./loader.css";

const Loader = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="loader-wrapper">
      <div className="loader-container" data-aos="fade-in">
        <img src={SiteLoader} alt="Loading..." className="loader-image" />
      </div>
    </div>
  );
};

export default Loader;
