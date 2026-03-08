import React, { useState, useEffect } from 'react';
import './style.css';

const PatientProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
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
    medicalInfo: {
      height: '',
      weight: '',
      bloodPressure: '',
      allergies: [],
      chronicConditions: [],
      medications: [],
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      }
    },
    addressInfo: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    insuranceInfo: {
      provider: '',
      policyNumber: '',
      groupNumber: '',
      expiryDate: ''
    }
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [newMedication, setNewMedication] = useState('');

  // Sample recent visits data
  const recentVisits = [
    { id: 1, date: '15 Mar 2026', doctor: 'Dr. Sharma', department: 'Cardiology', diagnosis: 'Regular Checkup' },
    { id: 2, date: '28 Feb 2026', doctor: 'Dr. Priya Patel', department: 'Neurology', diagnosis: 'Headache' },
    { id: 3, date: '10 Feb 2026', doctor: 'Dr. Rahman', department: 'Orthopedics', diagnosis: 'Back Pain' }
  ];

  // Sample upcoming appointments
  const upcomingAppointments = [
    { id: 1, date: '25 Mar 2026', time: '10:00 AM', doctor: 'Dr. Sharma', department: 'Cardiology' },
    { id: 2, date: '30 Mar 2026', time: '02:30 PM', doctor: 'Dr. Gupta', department: 'Pediatrics' }
  ];

  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchUserData = async () => {
      try {
        // Get basic user from localStorage
        const userData = JSON.parse(localStorage.getItem("user")) || {
          name: "John Doe",
          email: "john.doe@example.com",
          role: "patient"
        };

        // Mock detailed profile data
        const mockProfileData = {
          personalInfo: {
            firstName: userData.name?.split(' ')[0] || 'John',
            lastName: userData.name?.split(' ')[1] || 'Doe',
            email: userData.email || 'john.doe@example.com',
            phone: '+1 (555) 123-4567',
            dateOfBirth: '1990-05-15',
            gender: 'male',
            bloodGroup: 'O+',
            maritalStatus: 'married'
          },
          medicalInfo: {
            height: '175 cm',
            weight: '70 kg',
            bloodPressure: '120/80',
            allergies: ['Penicillin', 'Peanuts'],
            chronicConditions: ['Mild Asthma'],
            medications: ['Ventolin Inhaler'],
            emergencyContact: {
              name: 'Jane Doe',
              relationship: 'Spouse',
              phone: '+1 (555) 987-6543'
            }
          },
          addressInfo: {
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
          },
          insuranceInfo: {
            provider: 'Blue Cross Blue Shield',
            policyNumber: 'BCB-123456789',
            groupNumber: 'GRP-98765',
            expiryDate: '2026-12-31'
          }
        };

        setTimeout(() => {
          setUser(userData);
          setFormData(mockProfileData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchUserData();
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

  const handleEmergencyContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        emergencyContact: {
          ...prev.medicalInfo.emergencyContact,
          [field]: value
        }
      }
    }));
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setFormData(prev => ({
        ...prev,
        medicalInfo: {
          ...prev.medicalInfo,
          allergies: [...prev.medicalInfo.allergies, newAllergy.trim()]
        }
      }));
      setNewAllergy('');
    }
  };

  const removeAllergy = (index) => {
    setFormData(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        allergies: prev.medicalInfo.allergies.filter((_, i) => i !== index)
      }
    }));
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      setFormData(prev => ({
        ...prev,
        medicalInfo: {
          ...prev.medicalInfo,
          chronicConditions: [...prev.medicalInfo.chronicConditions, newCondition.trim()]
        }
      }));
      setNewCondition('');
    }
  };

  const removeCondition = (index) => {
    setFormData(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        chronicConditions: prev.medicalInfo.chronicConditions.filter((_, i) => i !== index)
      }
    }));
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      setFormData(prev => ({
        ...prev,
        medicalInfo: {
          ...prev.medicalInfo,
          medications: [...prev.medicalInfo.medications, newMedication.trim()]
        }
      }));
      setNewMedication('');
    }
  };

  const removeMedication = (index) => {
    setFormData(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        medications: prev.medicalInfo.medications.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the data
    setEditMode(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reload original data
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="profile-loading-container">
        <div className="profile-loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="patient-profile">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar-large">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name}&size=150&background=4a6cf7&color=fff&bold=true`}
              alt={user?.name}
            />
          </div>
          <div className="profile-header-info">
            <h1>{user?.name}</h1>
            <p className="patient-id">Patient ID: P-{Math.floor(Math.random() * 100000)}</p>
            <p className="member-since">Member since January 2024</p>
          </div>
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

      {/* Profile Tabs */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </button>
        <button 
          className={`tab-btn ${activeTab === 'medical' ? 'active' : ''}`}
          onClick={() => setActiveTab('medical')}
        >
          Medical Info
        </button>
        <button 
          className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button 
          className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <div className="tab-content personal-info">
            <div className="info-section">
              <h3>Basic Information</h3>
              <div className="info-grid">
                <div className="info-item">
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

                <div className="info-item">
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

                <div className="info-item">
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

                <div className="info-item">
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

                <div className="info-item">
                  <label>Date of Birth</label>
                  {editMode ? (
                    <input
                      type="date"
                      value={formData.personalInfo.dateOfBirth}
                      onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                    />
                  ) : (
                    <p>{new Date(formData.personalInfo.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>Gender</label>
                  {editMode ? (
                    <select
                      value={formData.personalInfo.gender}
                      onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="capitalize">{formData.personalInfo.gender}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>Blood Group</label>
                  {editMode ? (
                    <select
                      value={formData.personalInfo.bloodGroup}
                      onChange={(e) => handleInputChange('personalInfo', 'bloodGroup', e.target.value)}
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  ) : (
                    <p>{formData.personalInfo.bloodGroup}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>Marital Status</label>
                  {editMode ? (
                    <select
                      value={formData.personalInfo.maritalStatus}
                      onChange={(e) => handleInputChange('personalInfo', 'maritalStatus', e.target.value)}
                    >
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  ) : (
                    <p className="capitalize">{formData.personalInfo.maritalStatus}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Address Information</h3>
              <div className="info-grid">
                <div className="info-item full-width">
                  <label>Street Address</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.addressInfo.street}
                      onChange={(e) => handleInputChange('addressInfo', 'street', e.target.value)}
                    />
                  ) : (
                    <p>{formData.addressInfo.street}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>City</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.addressInfo.city}
                      onChange={(e) => handleInputChange('addressInfo', 'city', e.target.value)}
                    />
                  ) : (
                    <p>{formData.addressInfo.city}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>State</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.addressInfo.state}
                      onChange={(e) => handleInputChange('addressInfo', 'state', e.target.value)}
                    />
                  ) : (
                    <p>{formData.addressInfo.state}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>ZIP Code</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.addressInfo.zipCode}
                      onChange={(e) => handleInputChange('addressInfo', 'zipCode', e.target.value)}
                    />
                  ) : (
                    <p>{formData.addressInfo.zipCode}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>Country</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.addressInfo.country}
                      onChange={(e) => handleInputChange('addressInfo', 'country', e.target.value)}
                    />
                  ) : (
                    <p>{formData.addressInfo.country}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Insurance Information</h3>
              <div className="info-grid">
                <div className="info-item full-width">
                  <label>Insurance Provider</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.insuranceInfo.provider}
                      onChange={(e) => handleInputChange('insuranceInfo', 'provider', e.target.value)}
                    />
                  ) : (
                    <p>{formData.insuranceInfo.provider}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>Policy Number</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.insuranceInfo.policyNumber}
                      onChange={(e) => handleInputChange('insuranceInfo', 'policyNumber', e.target.value)}
                    />
                  ) : (
                    <p>{formData.insuranceInfo.policyNumber}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>Group Number</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.insuranceInfo.groupNumber}
                      onChange={(e) => handleInputChange('insuranceInfo', 'groupNumber', e.target.value)}
                    />
                  ) : (
                    <p>{formData.insuranceInfo.groupNumber}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>Expiry Date</label>
                  {editMode ? (
                    <input
                      type="date"
                      value={formData.insuranceInfo.expiryDate}
                      onChange={(e) => handleInputChange('insuranceInfo', 'expiryDate', e.target.value)}
                    />
                  ) : (
                    <p>{new Date(formData.insuranceInfo.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medical Information Tab */}
        {activeTab === 'medical' && (
          <div className="tab-content medical-info">
            <div className="info-section">
              <h3>Vital Signs</h3>
              <div className="vitals-grid">
                <div className="vital-card">
                  <span className="vital-label">Height</span>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.medicalInfo.height}
                      onChange={(e) => handleInputChange('medicalInfo', 'height', e.target.value)}
                    />
                  ) : (
                    <span className="vital-value">{formData.medicalInfo.height}</span>
                  )}
                </div>

                <div className="vital-card">
                  <span className="vital-label">Weight</span>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.medicalInfo.weight}
                      onChange={(e) => handleInputChange('medicalInfo', 'weight', e.target.value)}
                    />
                  ) : (
                    <span className="vital-value">{formData.medicalInfo.weight}</span>
                  )}
                </div>

                <div className="vital-card">
                  <span className="vital-label">Blood Pressure</span>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.medicalInfo.bloodPressure}
                      onChange={(e) => handleInputChange('medicalInfo', 'bloodPressure', e.target.value)}
                    />
                  ) : (
                    <span className="vital-value">{formData.medicalInfo.bloodPressure}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Allergies</h3>
              {editMode ? (
                <div className="tags-input">
                  <div className="tags-list">
                    {formData.medicalInfo.allergies.map((allergy, index) => (
                      <span key={index} className="tag">
                        {allergy}
                        <button onClick={() => removeAllergy(index)}>×</button>
                      </span>
                    ))}
                  </div>
                  <div className="add-tag">
                    <input
                      type="text"
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      placeholder="Add allergy"
                      onKeyPress={(e) => e.key === 'Enter' && addAllergy()}
                    />
                    <button onClick={addAllergy}>Add</button>
                  </div>
                </div>
              ) : (
                <div className="tags-list">
                  {formData.medicalInfo.allergies.length > 0 ? (
                    formData.medicalInfo.allergies.map((allergy, index) => (
                      <span key={index} className="tag static">{allergy}</span>
                    ))
                  ) : (
                    <p className="no-data">No allergies recorded</p>
                  )}
                </div>
              )}
            </div>

            <div className="info-section">
              <h3>Chronic Conditions</h3>
              {editMode ? (
                <div className="tags-input">
                  <div className="tags-list">
                    {formData.medicalInfo.chronicConditions.map((condition, index) => (
                      <span key={index} className="tag">
                        {condition}
                        <button onClick={() => removeCondition(index)}>×</button>
                      </span>
                    ))}
                  </div>
                  <div className="add-tag">
                    <input
                      type="text"
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      placeholder="Add condition"
                      onKeyPress={(e) => e.key === 'Enter' && addCondition()}
                    />
                    <button onClick={addCondition}>Add</button>
                  </div>
                </div>
              ) : (
                <div className="tags-list">
                  {formData.medicalInfo.chronicConditions.length > 0 ? (
                    formData.medicalInfo.chronicConditions.map((condition, index) => (
                      <span key={index} className="tag static">{condition}</span>
                    ))
                  ) : (
                    <p className="no-data">No chronic conditions</p>
                  )}
                </div>
              )}
            </div>

            <div className="info-section">
              <h3>Current Medications</h3>
              {editMode ? (
                <div className="tags-input">
                  <div className="tags-list">
                    {formData.medicalInfo.medications.map((medication, index) => (
                      <span key={index} className="tag">
                        {medication}
                        <button onClick={() => removeMedication(index)}>×</button>
                      </span>
                    ))}
                  </div>
                  <div className="add-tag">
                    <input
                      type="text"
                      value={newMedication}
                      onChange={(e) => setNewMedication(e.target.value)}
                      placeholder="Add medication"
                      onKeyPress={(e) => e.key === 'Enter' && addMedication()}
                    />
                    <button onClick={addMedication}>Add</button>
                  </div>
                </div>
              ) : (
                <div className="tags-list">
                  {formData.medicalInfo.medications.length > 0 ? (
                    formData.medicalInfo.medications.map((medication, index) => (
                      <span key={index} className="tag static">{medication}</span>
                    ))
                  ) : (
                    <p className="no-data">No medications</p>
                  )}
                </div>
              )}
            </div>

            <div className="info-section">
              <h3>Emergency Contact</h3>
              <div className="emergency-contact">
                <div className="info-item">
                  <label>Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.medicalInfo.emergencyContact.name}
                      onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                    />
                  ) : (
                    <p>{formData.medicalInfo.emergencyContact.name}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>Relationship</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.medicalInfo.emergencyContact.relationship}
                      onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                    />
                  ) : (
                    <p>{formData.medicalInfo.emergencyContact.relationship}</p>
                  )}
                </div>

                <div className="info-item">
                  <label>Phone</label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={formData.medicalInfo.emergencyContact.phone}
                      onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                    />
                  ) : (
                    <p>{formData.medicalInfo.emergencyContact.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="tab-content appointments-info">
            <div className="appointments-section">
              <h3>Upcoming Appointments</h3>
              {upcomingAppointments.length > 0 ? (
                <div className="appointments-list">
                  {upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className="appointment-card">
                      <div className="appointment-date-badge">
                        <span className="date">{new Date(appointment.date).getDate()}</span>
                        <span className="month">{new Date(appointment.date).toLocaleString('default', { month: 'short' })}</span>
                      </div>
                      <div className="appointment-details">
                        <h4>{appointment.doctor}</h4>
                        <p>{appointment.department}</p>
                        <span className="appointment-time">{appointment.time}</span>
                      </div>
                      <button className="reschedule-btn">Reschedule</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No upcoming appointments</p>
              )}
            </div>

            <div className="appointments-section">
              <h3>Recent Visits</h3>
              {recentVisits.length > 0 ? (
                <div className="visits-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Department</th>
                        <th>Diagnosis</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentVisits.map(visit => (
                        <tr key={visit.id}>
                          <td>{visit.date}</td>
                          <td>{visit.doctor}</td>
                          <td>{visit.department}</td>
                          <td>{visit.diagnosis}</td>
                          <td>
                            <button className="view-details-btn">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-data">No recent visits</p>
              )}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="tab-content documents-info">
            <div className="documents-header">
              <h3>Medical Documents</h3>
              <button className="upload-btn">+ Upload New Document</button>
            </div>
            
            <div className="documents-grid">
              <div className="document-card">
                <div className="document-icon">📄</div>
                <div className="document-details">
                  <h4>Blood Test Report</h4>
                  <p>Uploaded: 15 Mar 2026</p>
                  <span className="document-type">PDF</span>
                </div>
                <button className="download-btn">↓</button>
              </div>

              <div className="document-card">
                <div className="document-icon">📄</div>
                <div className="document-details">
                  <h4>X-Ray Report</h4>
                  <p>Uploaded: 28 Feb 2026</p>
                  <span className="document-type">JPG</span>
                </div>
                <button className="download-btn">↓</button>
              </div>

              <div className="document-card">
                <div className="document-icon">📄</div>
                <div className="document-details">
                  <h4>Prescription</h4>
                  <p>Uploaded: 10 Feb 2026</p>
                  <span className="document-type">PDF</span>
                </div>
                <button className="download-btn">↓</button>
              </div>

              <div className="document-card">
                <div className="document-icon">📄</div>
                <div className="document-details">
                  <h4>Vaccination Record</h4>
                  <p>Uploaded: 05 Jan 2026</p>
                  <span className="document-type">PDF</span>
                </div>
                <button className="download-btn">↓</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;