
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home/HomePage';
import Login from './pages/login/Login';
import Unauthorized from './pages/unauthorized/Unauthorized';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import PatientLayout from './layout/PatientLayout';
import PatientDashboard from './pages/patient/patientDashboard/PatientDashboard';
import PatientAppointments from './pages/patient/patientAppointments/PatientAppointments';
import PatientProfile from './pages/patient/patientProfile/PatientProfile';
import DoctorLayout from './layout/DoctorLayout';
import DoctorDashboard from './pages/docter/doctorDashboard/DoctorDashboard';
import DoctorPatients from './pages/docter/doctorPatients/DoctorPatients';
import DoctorSchedule from './pages/docter/doctorSchedule/DoctorSchedule';
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './pages/admin/adminDashboard/AdminDashboard';
import AdminUsers from './pages/admin/adminUsers/AdminUsers';
import AdminSettings from './pages/admin/adminSettings/AdminSettings';
import NotFound from './components/common/notFound/NotFound';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
     <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
