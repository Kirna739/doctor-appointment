// components/Nav.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const Nav = ({ role = "patient", userName = "User" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  // Get profile path based on role
  const getProfilePath = () => {
    switch(role) {
      case "doctor":
        return "/doctor/profile";
      case "admin":
        return "/admin/profile";
      default:
        return "/patient/profile";
    }
  };

  // Get home path based on role
  const getHomePath = () => {
    switch(role) {
      case "doctor":
        return "/doctor";
      case "admin":
        return "/admin";
      default:
        return "/patient";
    }
  };

  const renderDropdown = (title, items, dropdownKey) => (
    <div className="dropdown-container" key={dropdownKey}>
      <button
        className={`dropdown-trigger ${openDropdown === dropdownKey ? "active" : ""}`}
        onClick={() => toggleDropdown(dropdownKey)}
        aria-expanded={openDropdown === dropdownKey}
      >
        {title}
        <svg
          className={`dropdown-icon ${openDropdown === dropdownKey ? "rotated" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {openDropdown === dropdownKey && (
        <div className="dropdown-menu">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="dropdown-item"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const renderMenuItems = () => {
    switch (role) {
      case "doctor":
        return (
          <>
            <Link to="/doctor" className="nav-link">Dashboard</Link>
            <Link to="/doctor/patients" className="nav-link">My Patients</Link>
            <Link to="/doctor/schedule" className="nav-link">Schedule</Link>
            <Link to="/doctor/contactus" className="nav-link">Contact Us</Link>
          </>
        );

      case "admin":
        return (
          <>
            <Link to="/admin" className="nav-link">Dashboard</Link>
            <Link to="/admin/users" className="nav-link">Users</Link>
            <Link to="/admin/settings" className="nav-link">Settings</Link>
          </>
        );

      default: // patient
        return (
          <>
            <Link to="/patient" className="nav-link">Dashboard</Link>
            <Link to="/patient/appointments" className="nav-link">Appointments</Link>
            <Link to="/patient/contactus" className="nav-link">Contact Us</Link>
          </>
        );
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link to={getHomePath()} className="logo" onClick={closeMenu}>
          <span className="logo-icon">🏥</span>
          <span className="logo-text">MediCare</span>
        </Link>

        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="nav-items">
            {renderMenuItems()}
          </div>

          <div className="nav-actions">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
              <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            <div className="profile-section">
              <div className="profile-avatar">
                <img
                  src={`https://ui-avatars.com/api/?name=${userName}&background=3498db&color=fff&bold=true`}
                  alt={userName}
                />
              </div>
              <Link to={getProfilePath()} className="profile-link">
                <span className="profile-name">{userName}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;