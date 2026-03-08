import React, { useState, useEffect } from 'react';
import './style.css';

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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
      employeeId: '',
      designation: '',
      department: '',
      joinDate: '',
      employeeType: '',
      reportingTo: '',
      shift: ''
    },
    contactInfo: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      }
    },
    permissions: {
      userManagement: true,
      doctorManagement: true,
      patientManagement: true,
      appointmentManagement: true,
      billingManagement: true,
      reportGeneration: true,
      systemSettings: false,
      backupManagement: false
    },
    bankInfo: {
      accountHolder: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      panNumber: ''
    }
  });

  // Sample activity data
  const recentActivities = [
    { id: 1, action: 'New doctor registered', user: 'Dr. Sarah Johnson', time: '5 minutes ago', type: 'doctor' },
    { id: 2, action: 'Patient appointment cancelled', user: 'John Smith', time: '15 minutes ago', type: 'appointment' },
    { id: 3, action: 'System backup completed', user: 'System', time: '1 hour ago', type: 'system' },
    { id: 4, action: 'New department added', user: 'Admin', time: '2 hours ago', type: 'department' },
    { id: 5, action: 'Billing report generated', user: 'Admin', time: '3 hours ago', type: 'report' },
    { id: 6, action: 'User permissions updated', user: 'Admin', time: '5 hours ago', type: 'security' }
  ];

  // Sample system stats
  const systemStats = {
    totalUsers: 1250,
    activeToday: 342,
    pendingApprovals: 8,
    systemHealth: 98,
    storageUsed: '156 GB',
    lastBackup: '2026-03-07 02:00 AM'
  };

  // Sample pending approvals
  const pendingApprovals = [
    { id: 1, type: 'Doctor Registration', name: 'Dr. Emily Brown', requestDate: '2026-03-06', status: 'pending' },
    { id: 2, type: 'Clinic Verification', name: 'City Heart Clinic', requestDate: '2026-03-06', status: 'pending' },
    { id: 3, type: 'Insurance Claim', name: 'Michael Johnson', requestDate: '2026-03-05', status: 'pending' },
    { id: 4, type: 'Department Head Request', name: 'Dr. Robert Wilson', requestDate: '2026-03-05', status: 'pending' }
  ];

  useEffect(() => {
    // Simulate API call to fetch admin data
    const fetchAdminData = async () => {
      try {
        // Get basic user from localStorage
        const userData = JSON.parse(localStorage.getItem("user")) || {
          name: "Admin User",
          email: "admin@medicare.com",
          role: "admin"
        };

        // Mock detailed profile data
        const mockProfileData = {
          personalInfo: {
            firstName: 'Admin',
            lastName: 'User',
            email: userData.email,
            phone: '+1 (555) 111-2222',
            dateOfBirth: '1985-03-15',
            gender: 'female',
            bloodGroup: 'B+',
            maritalStatus: 'married'
          },
          professionalInfo: {
            employeeId: 'ADM-2024-001',
            designation: 'Senior System Administrator',
            department: 'Information Technology',
            joinDate: '2024-01-15',
            employeeType: 'Full-time',
            reportingTo: 'CTO',
            shift: 'Day (9 AM - 6 PM)'
          },
          contactInfo: {
            address: '789 Admin Tower',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
            emergencyContact: {
              name: 'John Admin',
              relationship: 'Spouse',
              phone: '+1 (555) 333-4444'
            }
          },
          permissions: {
            userManagement: true,
            doctorManagement: true,
            patientManagement: true,
            appointmentManagement: true,
            billingManagement: true,
            reportGeneration: true,
            systemSettings: false,
            backupManagement: false
          },
          bankInfo: {
            accountHolder: 'Admin User',
            bankName: 'Global Bank',
            accountNumber: '**** **** **** 1234',
            ifscCode: 'GLB0001234',
            panNumber: 'ABCDE1234F'
          }
        };

        setTimeout(() => {
          setAdmin(userData);
          setFormData(mockProfileData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching admin profile:', error);
        setLoading(false);
      }
    };

    fetchAdminData();
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
      contactInfo: {
        ...prev.contactInfo,
        emergencyContact: {
          ...prev.contactInfo.emergencyContact,
          [field]: value
        }
      }
    }));
  };

  const handlePermissionChange = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission]
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
    // Reload original data (would need to store original state)
    setEditMode(false);
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'doctor': return '👨‍⚕️';
      case 'appointment': return '📅';
      case 'system': return '⚙️';
      case 'department': return '🏢';
      case 'report': return '📊';
      case 'security': return '🔒';
      default: return '📌';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved': return <span className="badge approved">Approved</span>;
      case 'rejected': return <span className="badge rejected">Rejected</span>;
      default: return <span className="badge pending">Pending</span>;
    }
  };

  if (loading) {
    return (
      <div className="profile-loading-container">
        <div className="profile-loading-spinner"></div>
        <p>Loading admin profile...</p>
      </div>
    );
  }

  return (
    <div className="admin-profile">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar-large">
            <img 
              src={`https://ui-avatars.com/api/?name=${admin?.name}&size=150&background=4a6cf7&color=fff&bold=true`}
              alt={admin?.name}
            />
          </div>
          <div className="profile-header-info">
            <h1>{admin?.name}</h1>
            <p className="admin-designation">{formData.professionalInfo.designation}</p>
            <div className="admin-meta">
              <span className="admin-badge">
                <span className="badge-icon">🆔</span>
                {formData.professionalInfo.employeeId}
              </span>
              <span className="admin-badge">
                <span className="badge-icon">🏢</span>
                {formData.professionalInfo.department}
              </span>
              <span className="admin-badge">
                <span className="badge-icon">📅</span>
                Joined {new Date(formData.professionalInfo.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
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

      {/* System Stats Cards */}
      <div className="system-stats">
        <div className="stat-card system">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{systemStats.totalUsers}</h3>
            <p>Total Users</p>
            <span className="stat-trend">{systemStats.activeToday} active today</span>
          </div>
        </div>
        <div className="stat-card system">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{systemStats.pendingApprovals}</h3>
            <p>Pending Approvals</p>
            <span className="stat-trend warning">Requires attention</span>
          </div>
        </div>
        <div className="stat-card system">
          <div className="stat-icon">💾</div>
          <div className="stat-info">
            <h3>{systemStats.storageUsed}</h3>
            <p>Storage Used</p>
            <span className="stat-trend">Last backup: {systemStats.lastBackup}</span>
          </div>
        </div>
        <div className="stat-card system">
          <div className="stat-icon">⚕️</div>
          <div className="stat-info">
            <h3>{systemStats.systemHealth}%</h3>
            <p>System Health</p>
            <div className="health-bar">
              <div className="health-progress" style={{ width: `${systemStats.systemHealth}%` }}></div>
            </div>
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
          className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </button>
        <button 
          className={`tab-btn ${activeTab === 'professional' ? 'active' : ''}`}
          onClick={() => setActiveTab('professional')}
        >
          Professional
        </button>
        <button 
          className={`tab-btn ${activeTab === 'permissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('permissions')}
        >
          Permissions
        </button>
        <button 
          className={`tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
          onClick={() => setActiveTab('activities')}
        >
          Activities
        </button>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content overview">
            {/* Welcome Section */}
            <div className="welcome-section">
              <h2>Welcome back, {admin?.name}!</h2>
              <p className="date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-grid">
                <button className="action-card">
                  <span className="action-icon">➕</span>
                  <span className="action-title">Add Doctor</span>
                </button>
                <button className="action-card">
                  <span className="action-icon">📋</span>
                  <span className="action-title">Create Report</span>
                </button>
                <button className="action-card">
                  <span className="action-icon">⚙️</span>
                  <span className="action-title">System Settings</span>
                </button>
                <button className="action-card">
                  <span className="action-icon">💾</span>
                  <span className="action-title">Backup Now</span>
                </button>
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="pending-approvals">
              <div className="section-header">
                <h3>Pending Approvals</h3>
                <span className="badge-count">{systemStats.pendingApprovals}</span>
              </div>
              <div className="approvals-list">
                {pendingApprovals.map(item => (
                  <div key={item.id} className="approval-item">
                    <div className="approval-info">
                      <h4>{item.name}</h4>
                      <p>{item.type}</p>
                      <span className="request-date">Requested: {item.requestDate}</span>
                    </div>
                    {getStatusBadge(item.status)}
                    <div className="approval-actions">
                      <button className="approve-btn">✓</button>
                      <button className="reject-btn">✗</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Overview */}
            <div className="system-overview">
              <h3>System Overview</h3>
              <div className="overview-grid">
                <div className="overview-item">
                  <span className="overview-label">Database Size</span>
                  <span className="overview-value">256 MB</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">API Status</span>
                  <span className="overview-value success">Operational</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Server Load</span>
                  <span className="overview-value">42%</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Active Sessions</span>
                  <span className="overview-value">128</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Error Rate</span>
                  <span className="overview-value success">0.2%</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Response Time</span>
                  <span className="overview-value">245ms</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Personal Info Tab */}
        {activeTab === 'personal' && (
          <div className="tab-content personal">
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
                      value={formData.contactInfo.address}
                      onChange={(e) => handleInputChange('contactInfo', 'address', e.target.value)}
                    />
                  ) : (
                    <p>{formData.contactInfo.address}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>City</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.contactInfo.city}
                      onChange={(e) => handleInputChange('contactInfo', 'city', e.target.value)}
                    />
                  ) : (
                    <p>{formData.contactInfo.city}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>State</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.contactInfo.state}
                      onChange={(e) => handleInputChange('contactInfo', 'state', e.target.value)}
                    />
                  ) : (
                    <p>{formData.contactInfo.state}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>ZIP Code</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.contactInfo.zipCode}
                      onChange={(e) => handleInputChange('contactInfo', 'zipCode', e.target.value)}
                    />
                  ) : (
                    <p>{formData.contactInfo.zipCode}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Country</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.contactInfo.country}
                      onChange={(e) => handleInputChange('contactInfo', 'country', e.target.value)}
                    />
                  ) : (
                    <p>{formData.contactInfo.country}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Emergency Contact</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.contactInfo.emergencyContact.name}
                      onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                    />
                  ) : (
                    <p>{formData.contactInfo.emergencyContact.name}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Relationship</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.contactInfo.emergencyContact.relationship}
                      onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                    />
                  ) : (
                    <p>{formData.contactInfo.emergencyContact.relationship}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Phone</label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={formData.contactInfo.emergencyContact.phone}
                      onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                    />
                  ) : (
                    <p>{formData.contactInfo.emergencyContact.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Professional Info Tab */}
        {activeTab === 'professional' && (
          <div className="tab-content professional">
            <div className="info-section">
              <h3>Employment Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Employee ID</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.professionalInfo.employeeId}
                      onChange={(e) => handleInputChange('professionalInfo', 'employeeId', e.target.value)}
                    />
                  ) : (
                    <p>{formData.professionalInfo.employeeId}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Designation</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.professionalInfo.designation}
                      onChange={(e) => handleInputChange('professionalInfo', 'designation', e.target.value)}
                    />
                  ) : (
                    <p>{formData.professionalInfo.designation}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Department</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.professionalInfo.department}
                      onChange={(e) => handleInputChange('professionalInfo', 'department', e.target.value)}
                    />
                  ) : (
                    <p>{formData.professionalInfo.department}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Join Date</label>
                  {editMode ? (
                    <input
                      type="date"
                      value={formData.professionalInfo.joinDate}
                      onChange={(e) => handleInputChange('professionalInfo', 'joinDate', e.target.value)}
                    />
                  ) : (
                    <p>{new Date(formData.professionalInfo.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Employee Type</label>
                  {editMode ? (
                    <select
                      value={formData.professionalInfo.employeeType}
                      onChange={(e) => handleInputChange('professionalInfo', 'employeeType', e.target.value)}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Intern">Intern</option>
                    </select>
                  ) : (
                    <p>{formData.professionalInfo.employeeType}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Reporting To</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.professionalInfo.reportingTo}
                      onChange={(e) => handleInputChange('professionalInfo', 'reportingTo', e.target.value)}
                    />
                  ) : (
                    <p>{formData.professionalInfo.reportingTo}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Shift</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.professionalInfo.shift}
                      onChange={(e) => handleInputChange('professionalInfo', 'shift', e.target.value)}
                    />
                  ) : (
                    <p>{formData.professionalInfo.shift}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Bank Information</h3>
              <div className="info-grid">
                <div className="info-item full-width">
                  <label>Account Holder Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.bankInfo.accountHolder}
                      onChange={(e) => handleInputChange('bankInfo', 'accountHolder', e.target.value)}
                    />
                  ) : (
                    <p>{formData.bankInfo.accountHolder}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Bank Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.bankInfo.bankName}
                      onChange={(e) => handleInputChange('bankInfo', 'bankName', e.target.value)}
                    />
                  ) : (
                    <p>{formData.bankInfo.bankName}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Account Number</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.bankInfo.accountNumber}
                      onChange={(e) => handleInputChange('bankInfo', 'accountNumber', e.target.value)}
                    />
                  ) : (
                    <p>{formData.bankInfo.accountNumber}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>IFSC Code</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.bankInfo.ifscCode}
                      onChange={(e) => handleInputChange('bankInfo', 'ifscCode', e.target.value)}
                    />
                  ) : (
                    <p>{formData.bankInfo.ifscCode}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>PAN Number</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.bankInfo.panNumber}
                      onChange={(e) => handleInputChange('bankInfo', 'panNumber', e.target.value)}
                    />
                  ) : (
                    <p>{formData.bankInfo.panNumber}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="tab-content permissions">
            <div className="info-section">
              <h3>Access Permissions</h3>
              <p className="permissions-note">Configure your system access and permissions</p>
              
              <div className="permissions-grid">
                <div className="permission-card">
                  <div className="permission-header">
                    <span className="permission-icon">👥</span>
                    <h4>User Management</h4>
                  </div>
                  <p>Create, edit, and delete user accounts</p>
                  {editMode ? (
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={formData.permissions.userManagement}
                        onChange={() => handlePermissionChange('userManagement')}
                      />
                      <span className="slider"></span>
                    </label>
                  ) : (
                    <span className={`permission-status ${formData.permissions.userManagement ? 'active' : 'inactive'}`}>
                      {formData.permissions.userManagement ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </div>

                <div className="permission-card">
                  <div className="permission-header">
                    <span className="permission-icon">👨‍⚕️</span>
                    <h4>Doctor Management</h4>
                  </div>
                  <p>Manage doctor profiles and verifications</p>
                  {editMode ? (
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={formData.permissions.doctorManagement}
                        onChange={() => handlePermissionChange('doctorManagement')}
                      />
                      <span className="slider"></span>
                    </label>
                  ) : (
                    <span className={`permission-status ${formData.permissions.doctorManagement ? 'active' : 'inactive'}`}>
                      {formData.permissions.doctorManagement ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </div>

                <div className="permission-card">
                  <div className="permission-header">
                    <span className="permission-icon">🧑</span>
                    <h4>Patient Management</h4>
                  </div>
                  <p>Manage patient records and history</p>
                  {editMode ? (
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={formData.permissions.patientManagement}
                        onChange={() => handlePermissionChange('patientManagement')}
                      />
                      <span className="slider"></span>
                    </label>
                  ) : (
                    <span className={`permission-status ${formData.permissions.patientManagement ? 'active' : 'inactive'}`}>
                      {formData.permissions.patientManagement ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </div>

                <div className="permission-card">
                  <div className="permission-header">
                    <span className="permission-icon">📅</span>
                    <h4>Appointment Management</h4>
                  </div>
                  <p>Manage appointments and schedules</p>
                  {editMode ? (
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={formData.permissions.appointmentManagement}
                        onChange={() => handlePermissionChange('appointmentManagement')}
                      />
                      <span className="slider"></span>
                    </label>
                  ) : (
                    <span className={`permission-status ${formData.permissions.appointmentManagement ? 'active' : 'inactive'}`}>
                      {formData.permissions.appointmentManagement ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </div>

                <div className="permission-card">
                  <div className="permission-header">
                    <span className="permission-icon">💰</span>
                    <h4>Billing Management</h4>
                  </div>
                  <p>Handle payments and invoices</p>
                  {editMode ? (
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={formData.permissions.billingManagement}
                        onChange={() => handlePermissionChange('billingManagement')}
                      />
                      <span className="slider"></span>
                    </label>
                  ) : (
                    <span className={`permission-status ${formData.permissions.billingManagement ? 'active' : 'inactive'}`}>
                      {formData.permissions.billingManagement ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </div>

                <div className="permission-card">
                  <div className="permission-header">
                    <span className="permission-icon">📊</span>
                    <h4>Report Generation</h4>
                  </div>
                  <p>Generate and export reports</p>
                  {editMode ? (
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={formData.permissions.reportGeneration}
                        onChange={() => handlePermissionChange('reportGeneration')}
                      />
                      <span className="slider"></span>
                    </label>
                  ) : (
                    <span className={`permission-status ${formData.permissions.reportGeneration ? 'active' : 'inactive'}`}>
                      {formData.permissions.reportGeneration ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </div>

                <div className="permission-card">
                  <div className="permission-header">
                    <span className="permission-icon">⚙️</span>
                    <h4>System Settings</h4>
                  </div>
                  <p>Configure system parameters</p>
                  {editMode ? (
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={formData.permissions.systemSettings}
                        onChange={() => handlePermissionChange('systemSettings')}
                      />
                      <span className="slider"></span>
                    </label>
                  ) : (
                    <span className={`permission-status ${formData.permissions.systemSettings ? 'active' : 'inactive'}`}>
                      {formData.permissions.systemSettings ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </div>

                <div className="permission-card">
                  <div className="permission-header">
                    <span className="permission-icon">💾</span>
                    <h4>Backup Management</h4>
                  </div>
                  <p>Manage system backups</p>
                  {editMode ? (
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={formData.permissions.backupManagement}
                        onChange={() => handlePermissionChange('backupManagement')}
                      />
                      <span className="slider"></span>
                    </label>
                  ) : (
                    <span className={`permission-status ${formData.permissions.backupManagement ? 'active' : 'inactive'}`}>
                      {formData.permissions.backupManagement ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="tab-content activities">
            <div className="activities-header">
              <h3>Recent Activities</h3>
              <button className="refresh-btn">↻ Refresh</button>
            </div>
            
            <div className="activities-timeline">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                  <div className="activity-content">
                    <div className="activity-header">
                      <h4>{activity.action}</h4>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                    <p className="activity-user">by {activity.user}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="activity-filters">
              <h4>Filter Activities</h4>
              <div className="filter-buttons">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">User Management</button>
                <button className="filter-btn">System</button>
                <button className="filter-btn">Security</button>
                <button className="filter-btn">Reports</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;