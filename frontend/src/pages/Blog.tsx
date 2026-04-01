import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Blogs.css";

type Blog = {
  id: number;
  title: string;
  content: string;
  author_id: number;
  category: string;
  status: "draft" | "published";
  image: string | null;
  created_at: string;
  updated_at: string;
};

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blog/published");

        if (res.data.success) {
          setBlogs(res.data.posts);
        } else {
          setError("Failed to load blogs");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="loading">Loading blogs...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="blog-container">
      <h2>All Blogs</h2>

      {blogs.length === 0 && <p>No blogs found.</p>}

      <ul className="blog-list">
        {blogs.map((blog) => (
          <li key={blog.id} className="blog-item">
            <h3>{blog.title}</h3>

            <p className="blog-content">{blog.content}</p>

            <p className="blog-meta">
              <strong>Category:</strong> {blog.category} |{" "}
              <strong>Status:</strong> {blog.status}
            </p>

            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="blog-image"
              />
            )}

            <p className="blog-date">
              Created at: {new Date(blog.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;