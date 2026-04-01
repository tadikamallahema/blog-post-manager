import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blog/getall");
      if (res.data.success) {
        setBlogs(res.data.posts);
      } else {
        setError("Failed to load blogs");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    try {
      await API.delete(`/blog/post/${id}`);
      fetchBlogs();
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await API.put(`/blog/post/${id}/toggle`);
      fetchBlogs();
    } catch (err: any) {
      alert(err.response?.data?.message || "Toggle failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h2 className="heading">All Blog Posts</h2>
          <button className="create-btn" onClick={() => navigate("/create-blog")}>
            + Create Post
          </button>
        </div>

        {loading && <p>Loading blogs...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && blogs.length === 0 && <p>No posts yet. Create your first one!</p>}

        <div className="blog-grid">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <div className="card-header">
                <span className={`status-badge ${blog.status}`}>{blog.status}</span>
                <span className="category-tag">{blog.category}</span>
              </div>
              <h3>{blog.title}</h3>
              <p className="card-content">{blog.content.substring(0, 120)}...</p>

              <div className="btn-group">
                <button className="edit-btn" onClick={() => navigate(`/edit-blog/${blog.id}`)}>
                  Edit
                </button>
                <button className="toggle-btn" onClick={() => handleToggle(blog.id)}>
                  {blog.status === "draft" ? "Publish" : "Unpublish"}
                </button>
                <button className="delete-btn" onClick={() => handleDelete(blog.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;