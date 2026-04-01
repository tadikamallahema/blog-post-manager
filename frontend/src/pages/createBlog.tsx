import { useState } from "react";
import API from "../services/api";
import "../styles/CreateBlog.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("draft");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      await API.post("/blog/create", {
        title,
        content,
        category,
        status,
        author_id: user.id || 1,
        image: null,
      });

      alert("Blog created!");
      setTitle("");
      setContent("");
      setCategory("");
    } catch (err: any) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <h2>Create Blog</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="input"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <select
          className="input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <button className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;