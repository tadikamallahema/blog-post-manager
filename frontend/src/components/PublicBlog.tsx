import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/PublicBlog.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author_id: number;
  category: string;
  status: string;
  created_at: string;
}

const PublicBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [selectedCategory]);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      let url = "/blog/published";
      if (selectedCategory) {
        url = `/blog/postbycat?category=${selectedCategory}`;
      }
      const res = await API.get(url);
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/blog/allc");
      setCategories(res.data.formatted || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="public-blog-page">
      <header className="blog-header">
        <div className="blog-header-content">
          <h1>📝Blogs</h1>
          <p>Explore ideas, stories, and knowledge🚀</p>
        </div>
      </header>

      <div className="blog-container">
        <aside className="blog-sidebar">
          <div className="filter-card">
            <h3>Categories</h3>
            <button
              className={`category-btn ${!selectedCategory ? "active" : ""}`}
              onClick={() => setSelectedCategory("")}
            >
              All Posts
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        <main className="blog-main">
          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="no-posts">
              <p>No published posts yet</p>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <article key={post.id} className="post-card" onClick={() => navigate(`/post/${post.id}`)}
  style={{ cursor: "pointer" }}>
                  <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span className="post-date">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-excerpt">
                    {post.content.substring(0, 150)}...
                  </p>
                  <div className="post-footer">
                    <span className="post-author">By {post.author_id}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
    </div>
  );
};

export default PublicBlog;
