import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "./Navbar";
import "../styles/SuperAdminPanel.css";

interface Admin {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  is_active: number;
}

const SuperAdminPanel: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await API.get("/users");
      setAdmins(res.data.data || []);
    } catch (err) {
      console.error("Error fetching admins:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password) {
        setMessage("All fields are required");
        return;
      }

      await API.post("/users", {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      setMessage("Admin created successfully");
      setFormData({ name: "", email: "", phoneNumber: "", password: "" });
      setShowForm(false);
      fetchAdmins();
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error creating admin");
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      await API.patch(`/users/${id}/toggle`);
      setMessage("Admin status toggled");
      fetchAdmins();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error toggling status");
    }
  };

  const handleDeleteAdmin = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await API.delete(`/users/${id}`);
      setMessage("Admin deleted successfully");
      fetchAdmins();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error deleting admin");
    }
  };

  return (
    <div className="superadmin-page">
      <Navbar />
      <div className="superadmin-container">
        <div className="superadmin-header">
          <h1>👥 Manage Admin Accounts</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "➕ Create Admin"}
          </button>
        </div>

        {message && <div className="message success">{message}</div>}

        {showForm && (
          <div className="create-admin-card">
            <h2>Create New Admin</h2>
            <form onSubmit={handleCreateAdmin}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter admin name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create Admin
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading admins...</div>
        ) : admins.length === 0 ? (
          <div className="no-admins">
            <p>No admin accounts yet.</p>
          </div>
        ) : (
          <div className="admins-grid">
            {admins.map((admin) => (
              <div key={admin.id} className="admin-card">
                <div className="admin-header-card">
                  <h3>{admin.name}</h3>
                  <span className={`status-badge ${admin.is_active ? "active" : "inactive"}`}>
                    {admin.is_active ? "🟢 Active" : "🔴 Inactive"}
                  </span>
                </div>
                <div className="admin-details">
                  <p><strong>Email:</strong> {admin.email}</p>
                  <p><strong>Phone:</strong> {admin.phoneNumber}</p>
                  <p><strong>Role:</strong> Admin</p>
                </div>
                <div className="admin-actions">
                  <button
                    className="btn btn-sm btn-toggle"
                    onClick={() => handleToggleStatus(admin.id)}
                  >
                    {admin.is_active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    className="btn btn-sm btn-delete"
                    onClick={() => handleDeleteAdmin(admin.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminPanel;
