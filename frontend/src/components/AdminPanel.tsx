import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "./Navbar";
import "../styles/AdminPanel.css";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  status: string;
  created_at: string;
}

const AdminPanel: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/blog/getall");
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/blog/post/${id}`);
      setMessage("Post deleted successfully");
      fetchPosts();
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage("Error deleting post");
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      await API.put(`/blog/post/${id}/toggle`);
      setMessage("Post status updated");
      fetchPosts();
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage("Error updating post status");
    }
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-container">
        <div className="admin-header">
          <h1>📋 Manage Posts</h1>
          <Link to="/write" className="btn btn-primary">
            ➕ New Post
          </Link>
        </div>

        {message && <div className="message success">{message}</div>}

        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet. <Link to="/write">Create your first post!</Link></p>
          </div>
        ) : (
          <div className="posts-table-container">
            <table className="posts-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Author</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="post-title-cell">{post.title}</td>
                    <td>{post.category}</td>
                    <td>
                      <span className={`status-badge status-${post.status.toLowerCase()}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>{post.author}</td>
                    <td>{new Date(post.created_at).toLocaleDateString()}</td>
                    <td className="actions-cell">
                      <Link to={`/edit/${post.id}`} className="btn btn-sm btn-edit">
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => handleToggleStatus(post.id)}
                        className="btn btn-sm btn-toggle"
                        title={`Toggle to ${post.status === "published" ? "Draft" : "Published"}`}
                      >
                        {post.status === "published" ? "📄 Draft" : "✅ Publish"}
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="btn btn-sm btn-delete"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
