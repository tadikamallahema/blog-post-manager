import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "./Navbar";
import "../styles/BlogPage.css";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author_id: number;
  category: string;
  created_at: string;
}

const Blogpage: React.FC = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSinglePost();
  }, [id]);

  const fetchSinglePost = async () => {
    try {
      const res = await API.get(`/blog/post/${id}`);
      setPost(res.data.post);
    } catch (err) {
      console.error("Error fetching post:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading post...</div>;

  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <Navbar />

      <div className="blogpage-container">
        <h1 className="blogpage-title">{post.title}</h1>

        <div className="blogpage-meta">
          <span>{post.category}</span> |{" "}
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>

        <div className="blogpage-content">
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default Blogpage;