import React, { useState } from 'react';
import './style.css';

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'patient',
    subject: '',
    message: '',
    department: 'general'
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [faqOpen, setFaqOpen] = useState(null);

  const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'appointment', label: 'Appointment Issues' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'emergency', label: 'Emergency Contact' }
  ];

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment through your dashboard by clicking on 'Book Appointment' or by visiting the 'Find Doctors' section. Select your preferred doctor and available time slot."
    },
    {
      question: "What are your emergency contact hours?",
      answer: "Our emergency services are available 24/7. For medical emergencies, please call our emergency hotline at +1 (800) 123-4567 or visit the nearest emergency room."
    },
    {
      question: "How can I access my medical reports?",
      answer: "Medical reports can be accessed through your patient dashboard under the 'Medical Reports' section. Reports are typically available within 24-48 hours after your visit."
    },
    {
      question: "What insurance plans do you accept?",
      answer: "We accept most major insurance plans including Blue Cross, Aetna, Cigna, UnitedHealthcare, and Medicare. Please contact our billing department for specific coverage questions."
    },
    {
      question: "How do I cancel or reschedule an appointment?",
      answer: "You can cancel or reschedule appointments through your dashboard up to 24 hours before the scheduled time. For last-minute changes, please call our office directly."
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: true, success: false, message: 'Sending...' });

    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for contacting us! We will respond within 24 hours.'
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        role: 'patient',
        subject: '',
        message: '',
        department: 'general'
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: '' });
      }, 5000);
    }, 1500);
  };

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>We're here to help you with any questions or concerns</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support Available</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">30min</span>
              <span className="stat-label">Avg Response Time</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="contact-info-cards">
        <div className="info-card">
          <div className="info-icon">📍</div>
          <h3>Visit Us</h3>
          <p>123 Healthcare Avenue<br />Medical District<br />New York, NY 10001</p>
          <button className="map-btn">Get Directions →</button>
        </div>

        <div className="info-card">
          <div className="info-icon">📞</div>
          <h3>Call Us</h3>
          <p>Emergency: +1 (800) 123-4567<br />Appointments: +1 (800) 765-4321<br />Billing: +1 (800) 987-6543</p>
          <button className="call-btn">Call Now</button>
        </div>

        <div className="info-card">
          <div className="info-icon">✉️</div>
          <h3>Email Us</h3>
          <p>General: info@medicare.com<br />Support: support@medicare.com<br />Billing: billing@medicare.com</p>
          <button className="email-btn">Send Email</button>
        </div>

        <div className="info-card">
          <div className="info-icon">💬</div>
          <h3>Live Chat</h3>
          <p>Chat with our support team<br />Available 24/7<br />Instant responses</p>
          <button className="chat-btn">Start Chat</button>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="contact-main">
        <div className="contact-container">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h2>Send us a Message</h2>
            <p className="form-subtitle">We'll get back to you within 24 hours</p>

            {formStatus.submitted && formStatus.success && (
              <div className="success-message">
                <span className="success-icon">✓</span>
                <p>{formStatus.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">I am a *</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="department">Department *</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <div className="form-group checkbox-group">
                <input type="checkbox" id="consent" required />
                <label htmlFor="consent">
                  I agree to the processing of my personal data in accordance with the Privacy Policy.
                </label>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={formStatus.submitted && !formStatus.success}
              >
                {formStatus.submitted && !formStatus.success ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Quick Contact Options */}
          <div className="quick-contact">
            <div className="emergency-box">
              <h3>🚨 Emergency?</h3>
              <p>For medical emergencies, please call our emergency hotline immediately.</p>
              <a href="tel:+18001234567" className="emergency-number">
                <span className="phone-icon">📞</span>
                +1 (800) 123-4567
              </a>
              <p className="emergency-note">Available 24/7 for emergencies</p>
            </div>

            <div className="business-hours">
              <h3>Business Hours</h3>
              <ul className="hours-list">
                <li>
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 8:00 PM</span>
                </li>
                <li>
                  <span>Saturday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </li>
                <li>
                  <span>Sunday</span>
                  <span>10:00 AM - 2:00 PM</span>
                </li>
                <li className="holiday">
                  <span>Emergency</span>
                  <span>24/7 Available</span>
                </li>
              </ul>
            </div>

            <div className="social-connect">
              <h3>Connect With Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon" aria-label="Facebook">📘</a>
                <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
                <a href="#" className="social-icon" aria-label="Instagram">📷</a>
                <a href="#" className="social-icon" aria-label="LinkedIn">💼</a>
                <a href="#" className="social-icon" aria-label="YouTube">▶️</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>
          <p className="faq-subtitle">Quick answers to common questions</p>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${faqOpen === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <span className="faq-icon">{faqOpen === index ? '−' : '+'}</span>
                </button>
                {faqOpen === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <div className="map-container">
          <div className="map-placeholder">
            {/* In production, replace with actual Google Maps iframe */}
            <div className="map-overlay">
              <h3>Find Us Here</h3>
              <p>123 Healthcare Avenue, Medical District, New York, NY 10001</p>
              <button className="directions-btn">Get Directions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;