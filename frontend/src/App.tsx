import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PublicBlog from "./components/PublicBlog";
import Signup from "./components/Signup";
import SuperAdminPanel from "./components/SuperAdminPanel";
import WritePost from "./components/WritePost";
import { AuthProvider } from "./context/AuthContext";

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
            element={<Dashboard />}
          />

          <Route
            path="/admin"
            element={<AdminPanel />}
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
