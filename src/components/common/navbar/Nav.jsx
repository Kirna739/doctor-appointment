// components/Nav.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Nav = ({ role = "patient", userName = "User" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  const renderMenu = () => {
    switch (role) {
      case "doctor":
        return (
          <>
            <Link to="/doctor">Home</Link>

            <div className="dropdown">
              <button onClick={() => toggleDropdown("patients")}>
                Patients ▾
              </button>
              {dropdown === "patients" && (
                <div className="dropdown-content">
                  <Link to="/doctor/patient-list">Patient List</Link>
                  <Link to="/doctor/history">Patient History</Link>
                </div>
              )}
            </div>

            <div className="dropdown">
              <button onClick={() => toggleDropdown("calendar")}>
                Calendar ▾
              </button>
              {dropdown === "calendar" && (
                <div className="dropdown-content">
                  <Link to="/doctor/calendar">View Calendar</Link>
                  <Link to="/doctor/schedule">Manage Schedule</Link>
                </div>
              )}
            </div>

            <Link to="/contact">Contact Us</Link>
          </>
        );

      case "admin":
        return (
          <>
            <Link to="/admin">Home</Link>

            <div className="dropdown">
              <button onClick={() => toggleDropdown("patients")}>
                Patients ▾
              </button>
              {dropdown === "patients" && (
                <div className="dropdown-content">
                  <Link to="/admin/patients">All Patients</Link>
                </div>
              )}
            </div>

            <div className="dropdown">
              <button onClick={() => toggleDropdown("doctors")}>
                Doctors ▾
              </button>
              {dropdown === "doctors" && (
                <div className="dropdown-content">
                  <Link to="/admin/doctors">All Doctors</Link>
                  <Link to="/admin/add-doctor">Add Doctor</Link>
                </div>
              )}
            </div>

            <div className="dropdown">
              <button onClick={() => toggleDropdown("department")}>
                Department ▾
              </button>
              {dropdown === "department" && (
                <div className="dropdown-content">
                  <Link to="/admin/departments">View Departments</Link>
                </div>
              )}
            </div>

            <div className="dropdown">
              <button onClick={() => toggleDropdown("maintains")}>
                Maintains ▾
              </button>
              {dropdown === "maintains" && (
                <div className="dropdown-content">
                  <Link to="/admin/maintenance">Maintenance</Link>
                </div>
              )}
            </div>

            <div className="dropdown">
              <button onClick={() => toggleDropdown("labs")}>
                Labs ▾
              </button>
              {dropdown === "labs" && (
                <div className="dropdown-content">
                  <Link to="/admin/labs">Lab Reports</Link>
                </div>
              )}
            </div>
          </>
        );

      default: // patient
        return (
          <>
            <Link to="/patient">Home</Link>
            <Link to="/about">About</Link>

            <div className="dropdown">
              <button onClick={() => toggleDropdown("department")}>
                Department ▾
              </button>
              {dropdown === "department" && (
                <div className="dropdown-content">
                  <Link to="/departments/cardiology">Cardiology</Link>
                  <Link to="/departments/neurology">Neurology</Link>
                </div>
              )}
            </div>

            <div className="dropdown">
              <button onClick={() => toggleDropdown("appointment")}>
                Appointment ▾
              </button>
              {dropdown === "appointment" && (
                <div className="dropdown-content">
                  <Link to="/patient/book">Book Appointment</Link>
                  <Link to="/patient/history">Appointment History</Link>
                </div>
              )}
            </div>

            <Link to="/contact">Contact Us</Link>
          </>
        );
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">MediCare</div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        {renderMenu()}

        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
        />

        <div className="profile">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
          />
          <span>{userName}</span>
        </div>
      </div>

      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>
    </nav>
  );
};

export default Nav;