import React, { useState, useEffect } from "react";
import "./style.css";
import heroImage from "../../../assets/images/homepage.jpg";

const PatientDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingVisits: 0,
    medicalReports: 3,
    doctorsAvailable: 8,
    completedVisits: 12,
    prescriptions: 5
  });

  const [featuredDoctors, setFeaturedDoctors] = useState([
    { id: 1, name: "Dr. Sharma", specialty: "Cardiology", experience: "15 years", rating: 4.8, available: true, image: "https://ui-avatars.com/api/?name=Dr+Sharma&background=4a6cf7&color=fff" },
    { id: 2, name: "Dr. Priya Patel", specialty: "Neurology", experience: "12 years", rating: 4.9, available: true, image: "https://ui-avatars.com/api/?name=Dr+Priya&background=6c5ce7&color=fff" },
    { id: 3, name: "Dr. Rahman", specialty: "Orthopedics", experience: "20 years", rating: 4.7, available: false, image: "https://ui-avatars.com/api/?name=Dr+Rahman&background=00b894&color=fff" },
    { id: 4, name: "Dr. Gupta", specialty: "Pediatrics", experience: "8 years", rating: 4.9, available: true, image: "https://ui-avatars.com/api/?name=Dr+Gupta&background=e84342&color=fff" }
  ]);

  const [recentAppointments, setRecentAppointments] = useState([
    { id: 1, doctorName: "Dr. Sharma", specialty: "Cardiology", date: "25 Mar 2026", time: "10:00 AM", status: "confirmed" },
    { id: 2, doctorName: "Dr. Priya Patel", specialty: "Neurology", date: "28 Mar 2026", time: "02:30 PM", status: "pending" },
    { id: 3, doctorName: "Dr. Rahman", specialty: "Orthopedics", date: "30 Mar 2026", time: "11:15 AM", status: "confirmed" }
  ]);

  const [healthTips, setHealthTips] = useState([
    "Stay hydrated - drink at least 8 glasses of water daily",
    "Regular exercise helps maintain heart health",
    "Get 7-8 hours of quality sleep each night",
    "Take medications on time for better results"
  ]);

  useEffect(() => {
    // Simulate API call
    const fetchUserData = async () => {
      try {
        // In production, replace with actual API call
        const userData = JSON.parse(localStorage.getItem("user")) || {
          name: "John Doe",
          email: "john@example.com",
          memberSince: "2024",
          profileComplete: 85
        };
        
        // Simulate fetching stats from API
        setTimeout(() => {
          setUser(userData);
          setStats(prev => ({
            ...prev,
            totalAppointments: 15,
            upcomingVisits: 3,
            completedVisits: 12
          }));
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: { class: "status-confirmed", text: "Confirmed" },
      pending: { class: "status-pending", text: "Pending" },
      cancelled: { class: "status-cancelled", text: "Cancelled" },
      completed: { class: "status-completed", text: "Completed" }
    };
    const badge = badges[status] || badges.pending;
    return <span className={`status-badge ${badge.class}`}>{badge.text}</span>;
  };

  const renderStars = (rating) => {
    return (
      <div className="rating-stars">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}>
            ★
          </span>
        ))}
        <span className="rating-number">{rating}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="patient-dashboard">
      {/* Hero Section */}
      <div className="hero-section">
        <img src={heroImage} alt="Healthcare" className="hero-image" />
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="welcome-badge">
              <span className="welcome-text">Welcome back,</span>
              <h1 className="patient-name">{user?.name || "Patient"}</h1>
            </div>
            <p className="hero-quote">"Your health is our priority. Book appointments with top doctors instantly."</p>
            
            <div className="hero-stats-mini">
              <div className="hero-stat-item">
                <span className="hero-stat-value">24/7</span>
                <span className="hero-stat-label">Support</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-value">50+</span>
                <span className="hero-stat-label">Specialists</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-value">15min</span>
                <span className="hero-stat-label">Response</span>
              </div>
            </div>

            <div className="hero-actions">
              <button className="btn-primary">Book Emergency Appointment</button>
              <button className="btn-secondary">Find Doctors</button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3 className="stat-value">{stats.totalAppointments}</h3>
              <p className="stat-label">Total Appointments</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-info">
              <h3 className="stat-value">{stats.upcomingVisits}</h3>
              <p className="stat-label">Upcoming Visits</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3 className="stat-value">{stats.completedVisits}</h3>
              <p className="stat-label">Completed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-info">
              <h3 className="stat-value">{stats.doctorsAvailable}</h3>
              <p className="stat-label">Available Doctors</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3 className="stat-value">{stats.medicalReports}</h3>
              <p className="stat-label">Reports</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💊</div>
            <div className="stat-info">
              <h3 className="stat-value">{stats.prescriptions}</h3>
              <p className="stat-label">Prescriptions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="grid-column">
          {/* Quick Actions */}
          <section className="dashboard-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
              <span className="card-badge">4 options</span>
            </div>
            <div className="quick-actions-grid">
              <button className="action-card">
                <span className="action-icon">📅</span>
                <span className="action-title">Book Appointment</span>
                <span className="action-desc">Schedule with specialist</span>
              </button>

              <button className="action-card">
                <span className="action-icon">👨‍⚕️</span>
                <span className="action-title">Find Doctors</span>
                <span className="action-desc">Search by specialty</span>
              </button>

              <button className="action-card">
                <span className="action-icon">📊</span>
                <span className="action-title">Medical Reports</span>
                <span className="action-desc">View test results</span>
              </button>

              <button className="action-card">
                <span className="action-icon">⚙️</span>
                <span className="action-title">Update Profile</span>
                <span className="action-desc">Manage preferences</span>
              </button>

              <button className="action-card">
                <span className="action-icon">💊</span>
                <span className="action-title">Medications</span>
                <span className="action-desc">Track prescriptions</span>
              </button>

              <button className="action-card">
                <span className="action-icon">📞</span>
                <span className="action-title">Video Consult</span>
                <span className="action-desc">Start virtual visit</span>
              </button>
            </div>
          </section>

          {/* Health Tips */}
          <section className="dashboard-card">
            <div className="card-header">
              <h3>Health Tips</h3>
              <span className="card-badge">Daily wellness</span>
            </div>
            <div className="health-tips-list">
              {healthTips.map((tip, index) => (
                <div key={index} className="health-tip-item">
                  <span className="tip-icon">💡</span>
                  <p className="tip-text">{tip}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="grid-column">
          {/* Upcoming Appointments */}
          <section className="dashboard-card">
            <div className="card-header">
              <h3>Upcoming Appointments</h3>
              <button className="view-all-btn">View All →</button>
            </div>
            <div className="appointments-list">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-info">
                    <h4 className="doctor-name">{appointment.doctorName}</h4>
                    <p className="appointment-specialty">{appointment.specialty}</p>
                    <div className="appointment-datetime">
                      <span className="appointment-date">📅 {appointment.date}</span>
                      <span className="appointment-time">⏰ {appointment.time}</span>
                    </div>
                  </div>
                  <div className="appointment-actions">
                    {getStatusBadge(appointment.status)}
                    <button className="action-menu">⋯</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Doctors */}
          <section className="dashboard-card">
            <div className="card-header">
              <h3>Featured Doctors</h3>
              <button className="view-all-btn">View All →</button>
            </div>
            <div className="doctors-grid">
              {featuredDoctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-image-container">
                    <img src={doctor.image} alt={doctor.name} className="doctor-image" />
                    {doctor.available && <span className="available-badge">Available</span>}
                  </div>
                  <div className="doctor-info">
                    <h4 className="doctor-card-name">{doctor.name}</h4>
                    <p className="doctor-specialty">{doctor.specialty}</p>
                    <p className="doctor-experience">{doctor.experience}</p>
                    {renderStars(doctor.rating)}
                  </div>
                  <button className="book-btn">Book Now</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;