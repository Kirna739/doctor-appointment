// layouts/DoctorLayout.jsx
import { Outlet } from 'react-router-dom';
import Nav from '../components/common/navbar/Nav';
import Footer from '../components/common/foooter/Footer';

const DoctorLayout = () => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Doctor", role: "doctor" };

  return (
    <div className="doctor-layout">
      <Nav role="doctor" userName={user.name} />
      <main className="doctor-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DoctorLayout;