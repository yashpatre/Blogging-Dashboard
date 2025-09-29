import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../api/authApi";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        if (res.author?._id !== user?._id) {
          alert("You are not authorized to edit this blog");
          navigate("/home");
          return;
        }
        setForm({ title: res.title, content: res.content });
      } catch (err) {
        console.error(err);
        alert("Failed to load blog");
        navigate("/home");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, user, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleContentChange = (value) => {
    setForm({ ...form, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBlog(id, form);
      alert("Blog updated!");
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update blog");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto py-6 px-4 space-y-4 bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-white">Edit Blog</h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 bg-gray-700 text-white rounded"
        placeholder="Enter blog title"
        required
      />

      {/* Content (React Quill) */}
      <ReactQuill
        theme="snow"
        value={form.content}
        onChange={handleContentChange}
        className="bg-white text-black rounded"
        placeholder="Update your blog content..."
      />

      {/* Submit */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Update
      </button>
    </form>
  );
};

export default EditBlog;
