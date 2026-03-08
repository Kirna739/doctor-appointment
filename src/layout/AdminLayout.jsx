// // layouts/AdminLayout.jsx
// import { Outlet, NavLink } from 'react-router-dom';
// import Nav from '../components/common/navbar/Nav';
// import Footer from '../components/common/foooter/Footer';

// const AdminLayout = () => {
//   return (
    
//     <div className="admin-layout">
//       <nav className="admin-navbar">
//         <Nav/>
//         <h2>Admin Panel</h2>
//         <div className="nav-links">
//           <NavLink to="/admin" end>Dashboard</NavLink>
//           <NavLink to="/admin/users">Users</NavLink>
//           <NavLink to="/admin/settings">Settings</NavLink>
//         </div>
//       </nav>
      
//       <main className="admin-content">
//         <Outlet />
//       </main>
//       <Footer/>
//     </div>
//   );
// };

// export default AdminLayout;

// layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import Nav from '../components/common/navbar/Nav';
import Footer from '../components/common/foooter/Footer';

const AdminLayout = () => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Admin", role: "admin" };

  return (
    <div className="admin-layout">
      <Nav role="admin" userName={user.name} />
      <main className="admin-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;