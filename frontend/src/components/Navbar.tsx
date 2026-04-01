import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/admin")}>
        📝 Blog CMS
      </div>

      <div className="navbar-right">
        {user && (
          <>
            <span className="navbar-role-badge">{user.role}</span>
            <span className="navbar-user">ID: {user.id}</span>

            {user.role === "superadmin" && (
              <button
                className="navbar-btn secondary"
                onClick={() => navigate("/superadmin")}
              >
                Manage Admins
              </button>
            )}

            <button
              className="navbar-btn primary"
              onClick={() => navigate("/create-blog")}
            >
              + New Post
            </button>

            <button className="navbar-btn danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;