// layouts/PatientLayout.jsx
import { Outlet } from 'react-router-dom';
import Nav from '../components/common/navbar/Nav';
import Footer from '../components/common/foooter/Footer';

const PatientLayout = () => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Patient", role: "patient" };

  return (
    <div className="patient-layout">
      <Nav role="patient" userName={user.name} />
      <main className="patient-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PatientLayout;