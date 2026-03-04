// layouts/DoctorLayout.jsx
import { Outlet, NavLink } from 'react-router-dom';

const DoctorLayout = () => {
  return (
    <div className="doctor-layout">
      <nav className="doctor-navbar">
        <h2>Doctor Panel</h2>
        <div className="nav-links">
          <NavLink to="/doctor" end>Dashboard</NavLink>
          <NavLink to="/doctor/patients">My Patients</NavLink>
          <NavLink to="/doctor/schedule">Schedule</NavLink>
        </div>
      </nav>
      
      <main className="doctor-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;