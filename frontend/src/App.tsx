import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import BlogList from "./pages/Blog";
import CreateBlog from "./pages/createBlog";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-blog" element={<CreateBlog/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;