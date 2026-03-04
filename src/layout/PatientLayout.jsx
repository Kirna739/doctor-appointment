// layouts/PatientLayout.jsx
import { Outlet, Link, NavLink } from 'react-router-dom';
import Nav from '../components/common/navbar/Nav';

const PatientLayout = () => {
  return (
    <div className="patient-layout">
      <nav className="patient-navbar">
        <h2>Patient Panel</h2>
        <div className="nav-links">
          <Nav/>
          <NavLink to="/patient" end>Dashboard</NavLink>
          <NavLink to="/patient/appointments">Appointments</NavLink>
          <NavLink to="/patient/profile">Profile</NavLink>
        </div>
      </nav>
      
      <main className="patient-content">
        <Outlet /> {/* Patient pages yahan render honge */}
      </main>
    </div>
  );
};

export default PatientLayout;