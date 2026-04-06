import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

const SAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/sadmin/login", { email, password });
      console.log(res.data);
      if (res.data.success /* && res.data.token */ && res.data.user) {

        setAuth(res.data.token, res.data.data);
        setMessage("");
        setEmail("");
        setPassword("");
        navigate('/superadmin');
      } else {
        navigate('/slogin');
        setMessage(res.data.message || "Login failed");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1>📝 BlogManager</h1>
            <p>Super Admin Login</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {message && <div className={`message ${message.includes("Login") || message.includes("Successful") ? "success" : "error"}`}>
              {message}
            </div>}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default SAdminLogin;
