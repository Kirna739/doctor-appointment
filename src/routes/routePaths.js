// src/routes/routePaths.js
export const ROUTES = {
  // Auth Routes
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  PATIENT_SIGNUP: '/signup',
  DOCTOR_SIGNUP: '/doctorsignup',
  ADMIN_SIGNUP: '/adminsignup',
  ADMIN_LOGIN: '/adminlogin',
  
  // Patient Routes
  PATIENT: '/patient',
  PATIENT_APPOINTMENTS: '/patient/appointments',
  PATIENT_PROFILE: '/patient/profile',
  PATIENT_CONTACT: '/patient/contactus',
  
  
  // Doctor Routes
  DOCTOR: '/doctor',
  DOCTOR_PATIENTS: '/doctor/patients',
  DOCTOR_SCHEDULE: '/doctor/schedule',
  DOCTOR_CONTACT: '/doctor/contactus',
  DOCTOR_PROFILE: '/doctor/profile',
  
  // Admin Routes
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_SETTINGS: '/admin/settings',
  
  // General
  HOME: '/',
  NOT_FOUND: '*',
};