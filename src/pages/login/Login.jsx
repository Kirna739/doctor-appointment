// pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link, Route } from "react-router-dom";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  
  const [role, setRole] = useState("patient"); // default role
   console.log("user info:",credentials,"role:",role)
  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email: credentials.email,
      role: role,
    };

    localStorage.setItem("user", JSON.stringify(user));

    // Redirect based on selected role
    if (role === "doctor") {
      navigate("/doctor");
    } else if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/patient");
    }
  };
   
  // Route for signup{
  const routeing = () => {
    if (role === "patient") {
      navigate("/signup")
      
    } else {
      navigate("/doctorsignup")
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        <form onSubmit={handleLogin} className="login-form">
          
          {/* Role Selection */}
          <div className="role-selection">
            <button
              type="button"
              className={role === "patient" ? "role-btn active" : "role-btn"}
              onClick={() => setRole("patient")}
            >
              Patient
            </button>

            <button
              type="button"
              className={role === "doctor" ? "role-btn active" : "role-btn"}
              onClick={() => setRole("doctor")}
            >
              Doctor
            </button>

            {/* <button
              type="button"
              className={role === "admin" ? "role-btn active" : "role-btn"}
              onClick={() => setRole("admin")}
            >
              Admin
            </button> */}
          </div>

          <input
            type="email"
            placeholder="Enter your email"
            required
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Enter your password"
            required
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />

          <button type="submit" className="login-btn">
            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;