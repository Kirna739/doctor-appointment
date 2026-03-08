// src/routes/index.jsx
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routePaths';

// Public Pages
import Login from '../pages/login/Login';
import Unauthorized from '../pages/unauthorized/Unauthorized';
import NotFound from '../components/common/notFound/NotFound';

// Protected Route Component
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';

// Layouts
import PatientLayout from '../layout/PatientLayout';
import DoctorLayout from '../layout/DoctorLayout';
import AdminLayout from '../layout/AdminLayout';

// Patient Pages
import PatientDashboard from '../pages/patient/patientDashboard/PatientDashboard';
import PatientAppointments from '../pages/patient/patientAppointments/PatientAppointments';
import PatientProfile from '../pages/patient/patientProfile/PatientProfile';
import PatientSignup from '../pages/auth/patientsignup/PatientSignup';

// Doctor Pages
import DoctorDashboard from '../pages/docter/doctorDashboard/DoctorDashboard';
import DoctorPatients from '../pages/docter/doctorPatients/DoctorPatients';
import DoctorSchedule from '../pages/docter/doctorSchedule/DoctorSchedule';
import DoctorSignup from '../pages/auth/doctor/DoctorSignup';

// Admin Pages
import AdminDashboard from '../pages/admin/adminDashboard/AdminDashboard';
import AdminUsers from '../pages/admin/adminUsers/AdminUsers';
import AdminSettings from '../pages/admin/adminSettings/AdminSettings';
import AdminSignup from '../pages/auth/admin/AdminSignup';
import Adminlogin from '../pages/auth/admin/Adminlogin';

// Contact Page (Reusable)
import Contactus from '../components/contactus/Contactus';
import DoctorProfile from '../pages/docter/doctorprofile/DoctorProfile';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.PATIENT_SIGNUP} element={<PatientSignup />} />
      <Route path={ROUTES.DOCTOR_SIGNUP} element={<DoctorSignup />} />
      <Route path={ROUTES.ADMIN_SIGNUP} element={<AdminSignup />} />
      <Route path={ROUTES.ADMIN_LOGIN} element={<Adminlogin />} />
      <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />

      {/* Default Redirect */}
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.PATIENT} replace />} />

      {/* Patient Panel Routes */}
      <Route
        path={ROUTES.PATIENT}
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PatientDashboard />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="profile" element={<PatientProfile />} />
        <Route path="contactus" element={<Contactus />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Doctor Panel Routes */}
      <Route
        path={ROUTES.DOCTOR}
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DoctorDashboard />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="schedule" element={<DoctorSchedule />} />
        <Route path="profile" element={<DoctorProfile />} />
        <Route path="contactus" element={<Contactus />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Panel Routes */}
      <Route
        path={ROUTES.ADMIN}
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Global 404 */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;