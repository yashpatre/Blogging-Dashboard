import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBlog } from "../api/authApi"; // ensure centralized api

const DeleteBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteBlog(id);
      alert("Blog deleted!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Delete Blog</h1>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Confirm Delete
      </button>
    </div>
  );
};

export default DeleteBlog;
