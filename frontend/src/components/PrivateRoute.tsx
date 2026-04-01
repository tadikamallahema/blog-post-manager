import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "super_admin" | "user";
}

const getStoredUser = () => {
  const storedUserRaw = localStorage.getItem("user");

  if (!storedUserRaw) {
    return null;
  }

  try {
    return JSON.parse(storedUserRaw);
  } catch (err) {
    console.error("Error reading stored user:", err);
    localStorage.removeItem("user");
    return null;
  }
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { token, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "18px", color: "#6b7280" }}>Loading...</p>
        </div>
      </div>
    );
  }

  const storedToken = token || localStorage.getItem("token");
  const storedUser = user || getStoredUser();

  if (!storedToken || !storedUser) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (
    requiredRole &&
    storedUser.role !== requiredRole &&
    storedUser.role !== "super_admin"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
