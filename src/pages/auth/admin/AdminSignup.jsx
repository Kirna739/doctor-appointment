// pages/admin/AdminSignup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    adminCode: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.adminCode !== "ADMIN123") {
      alert("Invalid Admin Code!");
      return;
    }

    // Save admin temporarily
    localStorage.setItem("admin", JSON.stringify(formData));

    alert("Admin Registered Successfully!");
    navigate("/admin");
  };

  return (
    <div className="admin-signup-wrapper">
      <div className="admin-signup-card">
        <h2 className="signup-title">Admin Registration</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="adminCode"
            placeholder="Enter Admin Code"
            required
            value={formData.adminCode}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit" className="signup-btn">
            Register as Admin
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;