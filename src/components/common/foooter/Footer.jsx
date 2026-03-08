// components/Footer.jsx
import React from "react";
import "./style.css";
import { FaInstagram, FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo + About */}
        <div className="footer-section">
          <h2 className="footer-logo">MediCare</h2>
          <p>
            MediCare provides modern healthcare services including online
            appointments, lab reports, and doctor consultations.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact Us</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>

        {/* Departments */}
        <div className="footer-section">
          <h3>Departments</h3>
          <a href="#">Cardiology</a>
          <a href="#">Neurology</a>
          <a href="#">Orthopedics</a>
          <a href="#">Pediatrics</a>
          <a href="#">General Medicine</a>
        </div>

        {/* Labs + Address */}
        <div className="footer-section">
          <h3>Labs & Address</h3>
          <a href="#">Blood Test</a>
          <a href="#">MRI Scan</a>
          <a href="#">X-Ray</a>
          <p className="footer-address">
            📍 City Hospital Road, Punjab, India
          </p>
        </div>

      </div>

      {/* Social Media */}
      <div className="footer-social">
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaFacebook /></a>
        <a href="#"><FaGithub /></a>
        <a href="#"><FaTwitter /></a>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2026 MediCare. All Rights Reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;