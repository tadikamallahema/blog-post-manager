import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
//import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PublicBlog from "./components/PublicBlog";
import Signup from "./components/Signup";
import SuperAdminPanel from "./components/SuperAdminPanel";
import WritePost from "./components/WritePost";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./context/ProtectedRoutes";
import Blogpage from "./components/Blogpage";
import SAdminLogin from "./components/SAdminLogin";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PublicBlog />} />
          <Route path="/slogin" element={<SAdminLogin/>}/>
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoutes>
            }
          /> */}

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
            element={
            <ProtectedRoutes allowedRoles={["admin"]}>
               <WritePost />
            </ProtectedRoutes>
          }
          />
          <Route
            path="/edit/:id"
            element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <WritePost />
            </ProtectedRoutes>}
          />
          <Route
            path="/superadmin"
            element={
              <ProtectedRoutes allowedRoles={["super_admin"]}>
            <SuperAdminPanel />
            </ProtectedRoutes>
          }
          />

          <Route
            path="/post/:id"
            element={<Blogpage />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
