import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  const { token, user } = useAuth();
  const isAuthenticated = Boolean(user && token);

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome to BlogManager 📚</h1>
          {isAuthenticated && user?.name && (
            <h2 style={{ marginTop: '8px', color: '#2563eb' }}>
              Hi, {user.name}! 👋
            </h2>
          )}
          <p>Manage your blog posts efficiently</p>
        </div>

        <div className="dashboard-content">
          {!isAuthenticated ? (
            <div className="public-dashboard-welcome">
              <h2>Welcome, Guest!</h2>
              <p>
                You can browse the public blog and sign in to access full
                dashboard controls.
              </p>
              <div className="public-actions">
                <Link to="/" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-secondary">
                  Signup
                </Link>
                <Link to="/blog" className="btn btn-tertiary">
                  Public Blog
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="user-profile-card">
                <h2>Your Profile</h2>
                <div className="profile-info">
                  <div className="info-row">
                    <label>Name:</label>
                    <span>{user?.name}</span>
                  </div>
                  <div className="info-row">
                    <label>Email:</label>
                    <span>{user?.email}</span>
                  </div>
                  <div className="info-row">
                    <label>Role:</label>
                    <span className={`role-badge role-${user?.role}`}>
                      {user?.role === "super_admin"
                        ? "SuperAdmin"
                        : user?.role === "admin"
                        ? "Admin"
                        : "User"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                {(user?.role === "admin" || user?.role === "super_admin") && (
                  <>
                    <Link to="/admin" className="action-card">
                      <div className="card-icon">📋</div>
                      <h3>Manage Posts</h3>
                      <p>View, edit, and delete your blog posts</p>
                    </Link>
                    <Link to="/write" className="action-card">
                      <div className="card-icon">✍️</div>
                      <h3>Write Post</h3>
                      <p>Create a new blog post</p>
                    </Link>
                  </>
                )}

                {user?.role === "super_admin" && (
                  <Link to="/superadmin" className="action-card">
                    <div className="card-icon">👥</div>
                    <h3>Manage Admins</h3>
                    <p>Create and manage admin accounts</p>
                  </Link>
                )}

                <Link to="/blog" className="action-card">
                  <div className="card-icon">🌐</div>
                  <h3>Public Blog</h3>
                  <p>View published blog posts</p>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
