import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/AdminDashboard.css";

type Blog = {
  id: number;
  title: string;
  content: string;
  category: string;
  status: "draft" | "published";
};

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blog");
      setBlogs(res.data.posts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/blog/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await API.put(`/blog/${id}/toggle`);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <h2 className="heading">Admin Dashboard</h2>

      <button
        className="create-btn"
        onClick={() => navigate("/create-blog")}
      >
        CREATE BLOG
      </button>

      {blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <p>Category: {blog.category}</p>
          <p>Status: {blog.status}</p>

          <div className="btn-group">
            <button
              className="delete-btn"
              onClick={() => handleDelete(blog.id)}
            >
              Delete
            </button>

            <button
              className="toggle-btn"
              onClick={() => handleToggle(blog.id)}
            >
              Toggle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;