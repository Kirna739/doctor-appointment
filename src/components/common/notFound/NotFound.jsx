// src/pages/common/NotFound.jsx
import { Link, useNavigate } from 'react-router-dom';
import './Style.css'; // optional CSS file

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="action-buttons">
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-secondary"
          >
            ← Go Back
          </button>
          
          <Link to="/" className="btn btn-primary">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;