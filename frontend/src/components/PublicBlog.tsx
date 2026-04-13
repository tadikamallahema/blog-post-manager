import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/PublicBlog.css";
import { Link, useNavigate } from "react-router-dom";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
  fetchCategories();
}, []);

useEffect(() => {
  fetchPosts();
}, [page, selectedCategory]);

useEffect(() => {
  setPage(1);
}, [selectedCategory]);

  const navigate = useNavigate();

const fetchPosts = async () => {
    setLoading(true); 

    try {
      let res;

      if (selectedCategory) {
       
        res = await API.get(`/blog/postbycat?category=${selectedCategory}`);
        setTotalPages(1); 
      } else {
        
        res = await API.get(`/blog/published?page=${page}&limit=2`);
        setTotalPages(res.data.totalPages || 1);
      }

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
      <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          📝 BlogManager
        </Link>

        <div className="navbar-menu">
          <div className="nav-right">
            
            {/* Guest Mode (normal link) */}
            <Link to="/blog" className="nav-link">
              Continue as Guest
            </Link>

            {/* Admin Login (button) */}
            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary"
            >
              Admin Login
            </button>

          </div>
        </div>
      </div>
    </nav>
      <div>
      
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
          {/* Pagination */}
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              style={{
    padding: "8px 15px",
    backgroundColor: "#667cdb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"}}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              style={{
    padding: "8px 15px",
    backgroundColor: "#667cdb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"}}
            >
              Next
            </button>
          </div>
        </main>
      </div>
      
    </div>
    
    </div>
    </div>
  );
};

export default PublicBlog;

/* 
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // Fetch categories once
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch posts when page or category changes
  useEffect(() => {
    fetchPosts();
  }, [page, selectedCategory]);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const fetchPosts = async () => {
    setLoading(true); // FIXED

    try {
      let res;

      if (selectedCategory) {
        // ❌ NO pagination
        res = await API.get(`/blog/postbycat?category=${selectedCategory}`);
        setTotalPages(1); // force disable pagination
      } else {
        // ✅ pagination only here
        res = await API.get(`/blog/published?page=${page}&limit=1`);
        setTotalPages(res.data.totalPages || 1);
      }

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
      <Navbar />

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
                  className={`category-btn ${
                    selectedCategory === cat ? "active" : ""
                  }`}
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
                  <article
                    key={post.id}
                    className="post-card"
                    onClick={() => navigate(`/post/${post.id}`)}
                    style={{ cursor: "pointer" }}
                  >
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
                      <span className="post-author">
                        By {post.author_id}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ✅ Pagination ONLY for All Posts 
      {!selectedCategory && (
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicBlog; */