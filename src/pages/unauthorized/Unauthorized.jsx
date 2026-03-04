// pages/unauthorized/Unauthorized.jsx
import { Link, useNavigate } from 'react-router-dom';
import './Style.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <div className="lock-icon">🔒</div>
        <h1 className="error-code">403</h1>
        <h2 className="error-title">Access Denied</h2>
        <p className="error-message">
          You don't have permission to access this panel.
          {localStorage.getItem('user') ? (
            <span> Current role: {JSON.parse(localStorage.getItem('user')).role}</span>
          ) : (
            <span> Please login first.</span>
          )}
        </p>
        
        <div className="action-buttons">
          {localStorage.getItem('user') ? (
            // Agar user login hai but wrong role hai
            <>
              <button 
                onClick={() => {
                  localStorage.removeItem('user'); // Logout
                  navigate('/login');
                }} 
                className="btn btn-primary"
              >
                Login with Different Account
              </button>
              <button 
                onClick={() => navigate(-1)} 
                className="btn btn-secondary"
              >
                ← Go Back
              </button>
            </>
          ) : (
            // Agar user login hi nahi hai
            <>
              <Link to="/login" className="btn btn-primary">
                Go to Login Page
              </Link>
              <Link to="/" className="btn btn-secondary">
                Back to Home
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;