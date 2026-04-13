import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "./Navbar";
import "../styles/WritePost.css";
import { useAuth } from "../context/AuthContext";

interface PostForm {
  title: string;
  content: string;
  category: string;
  status: "draft" | "published";
}

const WritePost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<PostForm>({
    title: "",
    content: "",
    category: "Tech",
    status: "draft"
  });
  const { user } = useAuth();
 
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      //const res = await API.get("/blog/allc");
      setCategories(/* res.data.formatted || */ ["Tech", "Health", "Business","Sport","News"]);
    } catch (err) {
      setCategories(["Tech", "Health", "Business","Sport","News"]);
    }
  };

  const fetchPost = async () => {
    try {
      const res = await API.get(`/blog/post/${id}`);
      const post = res.data.post;
      setForm({
        title: post.title,
        content: post.content,
        category: post.category,
        status: post.status
      });
    } catch (err) {
      setMessage("Error loading post");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      if (!form.title || !form.content || !form.category) {
        setMessage("All fields are required");
        return;
      }

      if (id) {
        await API.put(`/blog/${id}`, {
          title: form.title,
          content: form.content,
          author_id: Number(user?.id),
          category: form.category,
          status: form.status,
        });
        setMessage("Post updated successfully");
      } else {
        //console.log(typeof(user?.id),"hhh")
        await API.post("/blog/create", {
          title: form.title,
          content: form.content,
          author_id: Number(user?.id),
          category: form.category,
          status: form.status,
        });
        setMessage("Post created successfully");
      }

      setTimeout(() => navigate("/admin"), 1500);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error saving post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="write-post-page">
      <Navbar />
      <div className="write-container">
        <div className="write-header">
          <h1>{id ? "✏️ Edit Post" : "✍️ Write New Post"}</h1>
        </div>

        <form onSubmit={handleSubmit} className="write-form">
          <div className="form-group">
            <label>Post Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Post Content *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your post content here..."
              rows={15}
              required
            />
          </div>

          {message && <div className={`message ${message.includes("successfully") ? "success" : "error"}`}>
            {message}
          </div>}

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : (id ? "Update Post" : "Create Post")}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritePost;
