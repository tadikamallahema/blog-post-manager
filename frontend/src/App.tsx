import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import BlogList from "./pages/Blog";
import CreateBlog from "./pages/createBlog";
import AdminDashboard from "./pages/AdminDashboard";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<BlogList />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/admin"
            element={
              
                <AdminDashboard />
              
            }
          />
          <Route
            path="/create-blog"
            element={
              
                <CreateBlog />
              
            }
          />
          <Route
            path="/edit-blog/:id"
            element={
              
                <EditBlog />
              
            }
          />
          <Route
            path="/dashboard"
            element={
              
                <Dashboard />
              
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;