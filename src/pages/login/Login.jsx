// pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState("patient");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email: credentials.email,
      role: role,
    };

    // save user
    localStorage.setItem("user", JSON.stringify(user));

    // redirect based on role
    if (role === "doctor") {
      navigate("/doctor");
    } else {
      navigate("/patient");
    }
  };

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
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />

          {/* Password */}
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
            Login as {role}
          </button>
        </form>

        <p className="signup-link">
          Don’t have an account?{" "}
          <Link to={role === "doctor" ? "/doctorsignup" : "/signup"}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;