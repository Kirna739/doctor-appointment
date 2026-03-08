import React, { useState, useEffect } from 'react';
import './style.css';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      maritalStatus: ''
    },
    professionalInfo: {
      specialization: '',
      qualification: '',
      experience: '',
      licenseNumber: '',
      consultationFee: '',
      languages: [],
      availability: {
        monday: { start: '09:00', end: '17:00', available: true },
        tuesday: { start: '09:00', end: '17:00', available: true },
        wednesday: { start: '09:00', end: '17:00', available: true },
        thursday: { start: '09:00', end: '17:00', available: true },
        friday: { start: '09:00', end: '17:00', available: true },
        saturday: { start: '10:00', end: '14:00', available: true },
        sunday: { start: '00:00', end: '00:00', available: false }
      }
    },
    education: [
      { degree: '', institution: '', year: '' }
    ],
    experience: [
      { position: '', hospital: '', period: '', description: '' }
    ],
    achievements: [
      { title: '', year: '', description: '' }
    ],
    clinicInfo: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: ''
    }
  });

  const [newLanguage, setNewLanguage] = useState('');
  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '' });
  const [newExperience, setNewExperience] = useState({ position: '', hospital: '', period: '', description: '' });
  const [newAchievement, setNewAchievement] = useState({ title: '', year: '', description: '' });

  // Sample patients data
  const recentPatients = [
    { id: 1, name: 'John Smith', age: 45, lastVisit: '15 Mar 2026', diagnosis: 'Hypertension' },
    { id: 2, name: 'Emily Johnson', age: 32, lastVisit: '14 Mar 2026', diagnosis: 'Migraine' },
    { id: 3, name: 'Michael Brown', age: 58, lastVisit: '13 Mar 2026', diagnosis: 'Diabetes' },
    { id: 4, name: 'Sarah Wilson', age: 28, lastVisit: '12 Mar 2026', diagnosis: 'Asthma' }
  ];

  // Sample appointments data
  const todayAppointments = [
    { id: 1, time: '09:00 AM', patient: 'Robert Taylor', type: 'Checkup', status: 'completed' },
    { id: 2, time: '10:30 AM', patient: 'Lisa Anderson', type: 'Follow-up', status: 'in-progress' },
    { id: 3, time: '11:45 AM', patient: 'David Lee', type: 'Consultation', status: 'scheduled' },
    { id: 4, time: '02:00 PM', patient: 'Maria Garcia', type: 'Emergency', status: 'scheduled' },
    { id: 5, time: '03:30 PM', patient: 'James Wilson', type: 'Checkup', status: 'scheduled' }
  ];

  // Sample reviews data
  const recentReviews = [
    { id: 1, patient: 'Robert Taylor', rating: 5, comment: 'Excellent doctor, very thorough examination', date: '2 days ago' },
    { id: 2, patient: 'Lisa Anderson', rating: 4, comment: 'Very knowledgeable and patient', date: '5 days ago' },
    { id: 3, patient: 'David Lee', rating: 5, comment: 'Best doctor I have ever visited', date: '1 week ago' }
  ];

  useEffect(() => {
    // Simulate API call to fetch doctor data
    const fetchDoctorData = async () => {
      try {
        // Get basic user from localStorage
        const userData = JSON.parse(localStorage.getItem("user")) || {
          name: "Dr. John Smith",
          email: "dr.john.smith@medicare.com",
          role: "doctor"
        };

        // Mock detailed profile data
        const mockProfileData = {
          personalInfo: {
            firstName: 'John',
            lastName: 'Smith',
            email: userData.email,
            phone: '+1 (555) 234-5678',
            dateOfBirth: '1975-08-20',
            gender: 'male',
            bloodGroup: 'A+',
            maritalStatus: 'married'
          },
          professionalInfo: {
            specialization: 'Cardiology',
            qualification: 'MD, DM Cardiology',
            experience: '15 years',
            licenseNumber: 'LIC-12345-MC',
            consultationFee: '$150',
            languages: ['English', 'Spanish', 'French'],
            availability: {
              monday: { start: '09:00', end: '17:00', available: true },
              tuesday: { start: '09:00', end: '17:00', available: true },
              wednesday: { start: '09:00', end: '17:00', available: true },
              thursday: { start: '09:00', end: '17:00', available: true },
              friday: { start: '09:00', end: '17:00', available: true },
              saturday: { start: '10:00', end: '14:00', available: true },
              sunday: { start: '00:00', end: '00:00', available: false }
            }
          },
          education: [
            { degree: 'MBBS', institution: 'Harvard Medical School', year: '1999' },
            { degree: 'MD in Cardiology', institution: 'Johns Hopkins University', year: '2003' },
            { degree: 'DM Cardiology', institution: 'Mayo Clinic', year: '2006' }
          ],
          experience: [
            { 
              position: 'Senior Cardiologist', 
              hospital: 'City Heart Institute', 
              period: '2015 - Present',
              description: 'Leading cardiology department, performing complex procedures'
            },
            { 
              position: 'Consultant Cardiologist', 
              hospital: 'General Hospital', 
              period: '2008 - 2015',
              description: 'Managed cardiac care unit, trained junior doctors'
            },
            { 
              position: 'Resident Doctor', 
              hospital: 'University Medical Center', 
              period: '2003 - 2008',
              description: 'Completed residency in internal medicine'
            }
          ],
          achievements: [
            { 
              title: 'Best Cardiologist Award', 
              year: '2023',
              description: 'Recognized for outstanding contribution to cardiac care'
            },
            { 
              title: 'Research Excellence Award', 
              year: '2021',
              description: 'Published groundbreaking research in heart disease prevention'
            },
            { 
              title: 'Patient Choice Award', 
              year: '2020',
              description: 'Voted by patients for exceptional care'
            }
          ],
          clinicInfo: {
            name: 'Heart Care Clinic',
            address: '456 Medical Plaza',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            phone: '+1 (555) 345-6789',
            email: 'appointments@heartcare.com'
          }
        };

        setTimeout(() => {
          setDoctor(userData);
          setFormData(mockProfileData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAvailabilityChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo,
        availability: {
          ...prev.professionalInfo.availability,
          [day]: {
            ...prev.professionalInfo.availability[day],
            [field]: value
          }
        }
      }
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setFormData(prev => ({
        ...prev,
        professionalInfo: {
          ...prev.professionalInfo,
          languages: [...prev.professionalInfo.languages, newLanguage.trim()]
        }
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (index) => {
    setFormData(prev => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo,
        languages: prev.professionalInfo.languages.filter((_, i) => i !== index)
      }
    }));
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, newEducation]
      }));
      setNewEducation({ degree: '', institution: '', year: '' });
    }
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    if (newExperience.position && newExperience.hospital) {
      setFormData(prev => ({
        ...prev,
        experience: [...prev.experience, newExperience]
      }));
      setNewExperience({ position: '', hospital: '', period: '', description: '' });
    }
  };

  const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addAchievement = () => {
    if (newAchievement.title) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement]
      }));
      setNewAchievement({ title: '', year: '', description: '' });
    }
  };

  const removeAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the data
    setEditMode(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reload original data (would need to store original state)
    setEditMode(false);
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      default: return 'status-scheduled';
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="rating-stars">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>★</span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="profile-loading-container">
        <div className="profile-loading-spinner"></div>
        <p>Loading doctor profile...</p>
      </div>
    );
  }

  return (
    <div className="doctor-profile">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar-large">
            <img 
              src={`https://ui-avatars.com/api/?name=${doctor?.name}&size=150&background=4a6cf7&color=fff&bold=true`}
              alt={doctor?.name}
            />
          </div>
          <div className="profile-header-info">
            <h1>{doctor?.name}</h1>
            <p className="doctor-specialty">{formData.professionalInfo.specialization}</p>
            <div className="doctor-meta">
              <span className="doctor-qualification">{formData.professionalInfo.qualification}</span>
              <span className="doctor-experience">{formData.professionalInfo.experience} Experience</span>
              <span className="doctor-rating">
                {renderStars(4.8)} <span className="rating-count">(124 reviews)</span>
              </span>
            </div>
          </div>
          <div className="header-actions">
            <button 
              className={`edit-profile-btn ${editMode ? 'saving' : ''}`}
              onClick={() => editMode ? handleSave() : setEditMode(true)}
            >
              {editMode ? 'Save Changes' : 'Edit Profile'}
            </button>
            {editMode && (
              <button className="cancel-edit-btn" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="doctor-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>1,247</h3>
            <p>Total Patients</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>8</h3>
            <p>Today's Appointments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>4.8</h3>
            <p>Average Rating</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>{formData.professionalInfo.consultationFee}</h3>
            <p>Consultation Fee</p>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Schedule
        </button>
        <button 
          className={`tab-btn ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content overview">
            {/* About Section */}
            <div className="info-section">
              <h3>About Me</h3>
              <div className="about-text">
                <p>
                  Dr. John Smith is a highly experienced cardiologist with over 15 years of practice 
                  in interventional cardiology. He specializes in treating complex cardiac conditions 
                  and has performed over 2000 successful procedures. Dr. Smith is known for his 
                  patient-centered approach and commitment to providing the highest quality care.
                </p>
              </div>
            </div>

            {/* Education Section */}
            <div className="info-section">
              <div className="section-header">
                <h3>Education & Training</h3>
                {editMode && (
                  <button className="add-btn" onClick={addEducation}>+ Add</button>
                )}
              </div>
              {editMode && (
                <div className="add-form">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={newEducation.degree}
                    onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={newEducation.institution}
                    onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={newEducation.year}
                    onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
                  />
                </div>
              )}
              <div className="timeline">
                {formData.education.map((edu, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-content">
                      <h4>{edu.degree}</h4>
                      <p className="institution">{edu.institution}</p>
                      <p className="year">{edu.year}</p>
                    </div>
                    {editMode && (
                      <button className="remove-btn" onClick={() => removeEducation(index)}>×</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="info-section">
              <div className="section-header">
                <h3>Professional Experience</h3>
                {editMode && (
                  <button className="add-btn" onClick={addExperience}>+ Add</button>
                )}
              </div>
              {editMode && (
                <div className="add-form">
                  <input
                    type="text"
                    placeholder="Position"
                    value={newExperience.position}
                    onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Hospital"
                    value={newExperience.hospital}
                    onChange={(e) => setNewExperience({...newExperience, hospital: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Period"
                    value={newExperience.period}
                    onChange={(e) => setNewExperience({...newExperience, period: e.target.value})}
                  />
                  <textarea
                    placeholder="Description"
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                  />
                </div>
              )}
              <div className="experience-list">
                {formData.experience.map((exp, index) => (
                  <div key={index} className="experience-card">
                    <div className="experience-header">
                      <h4>{exp.position}</h4>
                      <span className="period">{exp.period}</span>
                    </div>
                    <p className="hospital">{exp.hospital}</p>
                    <p className="description">{exp.description}</p>
                    {editMode && (
                      <button className="remove-btn" onClick={() => removeExperience(index)}>×</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="info-section">
              <div className="section-header">
                <h3>Awards & Achievements</h3>
                {editMode && (
                  <button className="add-btn" onClick={addAchievement}>+ Add</button>
                )}
              </div>
              {editMode && (
                <div className="add-form">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newAchievement.title}
                    onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={newAchievement.year}
                    onChange={(e) => setNewAchievement({...newAchievement, year: e.target.value})}
                  />
                  <textarea
                    placeholder="Description"
                    value={newAchievement.description}
                    onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                  />
                </div>
              )}
              <div className="achievements-grid">
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="achievement-card">
                    <div className="achievement-icon">🏆</div>
                    <div className="achievement-content">
                      <h4>{achievement.title}</h4>
                      <span className="year">{achievement.year}</span>
                      <p>{achievement.description}</p>
                    </div>
                    {editMode && (
                      <button className="remove-btn" onClick={() => removeAchievement(index)}>×</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="tab-content schedule">
            {/* Today's Appointments */}
            <div className="schedule-section">
              <h3>Today's Appointments</h3>
              <div className="appointments-timeline">
                {todayAppointments.map(appointment => (
                  <div key={appointment.id} className="appointment-timeline-item">
                    <span className="appointment-time">{appointment.time}</span>
                    <div className="appointment-card">
                      <div className="appointment-info">
                        <h4>{appointment.patient}</h4>
                        <p>{appointment.type}</p>
                      </div>
                      <span className={`appointment-status ${getStatusClass(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Schedule */}
            <div className="schedule-section">
              <h3>Weekly Schedule</h3>
              <div className="weekly-schedule">
                {Object.entries(formData.professionalInfo.availability).map(([day, schedule]) => (
                  <div key={day} className="schedule-day">
                    <span className="day-name">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                    {editMode ? (
                      <div className="edit-schedule">
                        <input
                          type="checkbox"
                          checked={schedule.available}
                          onChange={(e) => handleAvailabilityChange(day, 'available', e.target.checked)}
                        />
                        {schedule.available && (
                          <>
                            <input
                              type="time"
                              value={schedule.start}
                              onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                              className="time-input"
                            />
                            <span>to</span>
                            <input
                              type="time"
                              value={schedule.end}
                              onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                              className="time-input"
                            />
                          </>
                        )}
                      </div>
                    ) : (
                      <span className="schedule-time">
                        {schedule.available ? `${schedule.start} - ${schedule.end}` : 'Closed'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Week */}
            <div className="schedule-section">
              <h3>Upcoming Week</h3>
              <div className="upcoming-week">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="week-day">
                    <span className="day-label">{day}</span>
                    <span className="day-date">{new Date(Date.now() + index * 86400000).getDate()}</span>
                    <div className="day-appointments">
                      <span className="appointment-count">{Math.floor(Math.random() * 8)}</span>
                      <span className="count-label">appointments</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div className="tab-content patients">
            <div className="patients-header">
              <h3>Recent Patients</h3>
              <input type="text" placeholder="Search patients..." className="search-input" />
            </div>
            <div className="patients-list">
              <table className="patients-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Last Visit</th>
                    <th>Diagnosis</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPatients.map(patient => (
                    <tr key={patient.id}>
                      <td>
                        <div className="patient-cell">
                          <img 
                            src={`https://ui-avatars.com/api/?name=${patient.name}&size=30&background=4a6cf7&color=fff`}
                            alt={patient.name}
                            className="patient-avatar"
                          />
                          {patient.name}
                        </div>
                      </td>
                      <td>{patient.age}</td>
                      <td>{patient.lastVisit}</td>
                      <td>{patient.diagnosis}</td>
                      <td>
                        <button className="view-btn">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="tab-content reviews">
            <div className="reviews-summary">
              <div className="rating-overview">
                <h2>4.8</h2>
                {renderStars(4.8)}
                <p>Based on 124 reviews</p>
              </div>
              <div className="rating-breakdown">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="rating-bar">
                    <span>{rating} stars</span>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 5}%` }}></div>
                    </div>
                    <span>{rating === 5 ? '70%' : rating === 4 ? '20%' : '5%'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reviews-list">
              {recentReviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="reviewer-info">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${review.patient}&size=40&background=4a6cf7&color=fff`}
                      alt={review.patient}
                    />
                    <div>
                      <h4>{review.patient}</h4>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="review-text">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="tab-content settings">
            {/* Personal Information */}
            <div className="settings-section">
              <h3>Personal Information</h3>
              <div className="settings-grid">
                <div className="settings-item">
                  <label>First Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.personalInfo.firstName}
                      onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                    />
                  ) : (
                    <p>{formData.personalInfo.firstName}</p>
                  )}
                </div>
                <div className="settings-item">
                  <label>Last Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.personalInfo.lastName}
                      onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                    />
                  ) : (
                    <p>{formData.personalInfo.lastName}</p>
                  )}
                </div>
                <div className="settings-item">
                  <label>Email</label>
                  {editMode ? (
                    <input
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    />
                  ) : (
                    <p>{formData.personalInfo.email}</p>
                  )}
                </div>
                <div className="settings-item">
                  <label>Phone</label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={formData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    />
                  ) : (
                    <p>{formData.personalInfo.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="settings-section">
              <h3>Professional Information</h3>
              <div className="settings-grid">
                <div className="settings-item">
                  <label>Specialization</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.professionalInfo.specialization}
                      onChange={(e) => handleInputChange('professionalInfo', 'specialization', e.target.value)}
                    />
                  ) : (
                    <p>{formData.professionalInfo.specialization}</p>
                  )}
                </div>
                <div className="settings-item">
                  <label>Qualification</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.professionalInfo.qualification}
                      onChange={(e) => handleInputChange('professionalInfo', 'qualification', e.target.value)}
                    />
                  ) : (
                    <p>{formData.professionalInfo.qualification}</p>
                  )}
                </div>
                <div className="settings-item">
                  <label>License Number</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.professionalInfo.licenseNumber}
                      onChange={(e) => handleInputChange('professionalInfo', 'licenseNumber', e.target.value)}
                    />
                  ) : (
                    <p>{formData.professionalInfo.licenseNumber}</p>
                  )}
                </div>
                <div className="settings-item">
                  <label>Consultation Fee</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.professionalInfo.consultationFee}
                      onChange={(e) => handleInputChange('professionalInfo', 'consultationFee', e.target.value)}
                    />
                  ) : (
                    <p>{formData.professionalInfo.consultationFee}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="settings-section">
              <h3>Languages Spoken</h3>
              {editMode ? (
                <div className="languages-input">
                  <div className="tags-list">
                    {formData.professionalInfo.languages.map((lang, index) => (
                      <span key={index} className="tag">
                        {lang}
                        <button onClick={() => removeLanguage(index)}>×</button>
                      </span>
                    ))}
                  </div>
                  <div className="add-language">
                    <input
                      type="text"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      placeholder="Add language"
                      onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                    />
                    <button onClick={addLanguage}>Add</button>
                  </div>
                </div>
              ) : (
                <div className="tags-list">
                  {formData.professionalInfo.languages.map((lang, index) => (
                    <span key={index} className="tag static">{lang}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Clinic Information */}
            <div className="settings-section">
              <h3>Clinic Information</h3>
              <div className="settings-grid">
                <div className="settings-item full-width">
                  <label>Clinic Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.clinicInfo.name}
                      onChange={(e) => handleInputChange('clinicInfo', 'name', e.target.value)}
                    />
                  ) : (
                    <p>{formData.clinicInfo.name}</p>
                  )}
                </div>
                <div className="settings-item full-width">
                  <label>Address</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.clinicInfo.address}
                      onChange={(e) => handleInputChange('clinicInfo', 'address', e.target.value)}
                    />
                  ) : (
                    <p>{formData.clinicInfo.address}</p>
                  )}
                </div>
                <div className="settings-item">
                  <label>City</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.clinicInfo.city}
                      onChange={(e) => handleInputChange('clinicInfo', 'city', e.target.value)}
                    />
                  ) : (
                    <p>{formData.clinicInfo.city}</p>
                  )}
                </div>
                <div className="settings-item">
                  <label>State</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.clinicInfo.state}
                      onChange={(e) => handleInputChange('clinicInfo', 'state', e.target.value)}
                    />
                  ) : (
                    <p>{formData.clinicInfo.state}</p>
                  )}
                </div>
                <div className="settings-item">
                  <label>ZIP Code</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.clinicInfo.zipCode}
                      onChange={(e) => handleInputChange('clinicInfo', 'zipCode', e.target.value)}
                    />
                  ) : (
                    <p>{formData.clinicInfo.zipCode}</p>
                  )}
                </div>
                <div className="settings-item">
                  <label>Clinic Phone</label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={formData.clinicInfo.phone}
                      onChange={(e) => handleInputChange('clinicInfo', 'phone', e.target.value)}
                    />
                  ) : (
                    <p>{formData.clinicInfo.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;