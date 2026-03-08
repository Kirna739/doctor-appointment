// pages/admin/AdminLogin.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    adminCode: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.adminCode !== "ADMIN123") {
      alert("Invalid Admin Code");
      return;
    }

    const adminUser = {
      email: formData.email,
      role: "admin",
    };

    localStorage.setItem("user", JSON.stringify(adminUser));

    navigate("/admin");
  };

  return (
    <div className="admin-signup-wrapper">
      <div className="admin-signup-card">

        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit} className="signup-form">

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Admin Code"
            required
            onChange={(e) =>
              setFormData({ ...formData, adminCode: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button className="signup-btn">
            Login as Admin
          </button>

        </form>

        <p>
          Don't have account? <Link to="/adminsignup">Signup</Link>
        </p>

      </div>
    </div>
  );
};

export default AdminLogin;