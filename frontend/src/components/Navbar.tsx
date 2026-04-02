import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
       logout() //will clear both state and localStorage
      
      navigate("/login");
    }
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          📝 BlogManager
        </Link>

        <div className="navbar-menu">
          <div className="nav-left">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            {(user.role === "admin" || user.role === "super_admin") && (
              <>
                <Link to="/admin" className="nav-link">
                  Posts
                </Link>
                <Link to="/write" className="nav-link">
                  Write Post
                </Link>
              </>
            )}
            {user.role === "super_admin" && (
              <Link to="/superadmin" className="nav-link">
                Manage Admins
              </Link>
            )}
            <Link to="/blog" className="nav-link">
              Public Blog
            </Link>
          </div>

          <div className="nav-right">
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className={`role-badge role-${user.role}`}>
                {user.role === "super_admin" ? "SuperAdmin" : "Admin"}
              </span>
            </div>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
