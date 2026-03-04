// pages/doctor/DoctorSignup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

const DoctorSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
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

    // Save doctor data (temporary localStorage)
    localStorage.setItem("doctor", JSON.stringify(formData));

    alert("Doctor Registered Successfully!");
    navigate("/doctor");
  };

  return (
    <div className="doctor-signup-wrapper">
      <div className="doctor-signup-card">
        <h2 className="signup-title">Doctor Registration</h2>

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
Doctor Registration            required
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization (e.g. Cardiologist)"
            required
            value={formData.specialization}
            onChange={handleChange}
          />

          <input
            type="number"
            name="experience"
            placeholder="Years of Experience"
            required
            value={formData.experience}
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
            Register as Doctor
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default DoctorSignup;