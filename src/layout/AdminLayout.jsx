// layouts/AdminLayout.jsx
import { Outlet, NavLink } from 'react-router-dom';

const AdminLayout = () => {
  return (
    
    <div className="admin-layout">
      <nav className="admin-navbar">
        <h2>Admin Panel</h2>
        <div className="nav-links">
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/settings">Settings</NavLink>
        </div>
      </nav>
      
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;