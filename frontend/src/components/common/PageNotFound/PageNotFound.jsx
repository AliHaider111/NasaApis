import { Link } from "react-router-dom";
import "./pageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-description">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="notfound-button">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
