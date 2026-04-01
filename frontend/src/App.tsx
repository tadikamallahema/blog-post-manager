import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PublicBlog from "./components/PublicBlog";
import Signup from "./components/Signup";
import SuperAdminPanel from "./components/SuperAdminPanel";
import WritePost from "./components/WritePost";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./context/ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<PublicBlog />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/admin"
            element={
            <ProtectedRoutes allowedRoles={["admin"]}>
            <AdminPanel />
            </ProtectedRoutes>
          }
          />
          <Route
            path="/write"
            element={<WritePost />}
          />
          <Route
            path="/edit/:id"
            element={<WritePost />}
          />
          <Route
            path="/superadmin"
            element={<SuperAdminPanel />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
