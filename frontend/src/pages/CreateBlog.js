import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../features/blogSlice";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const [image, setImage] = useState(""); // ✅ use `image` not `imageUrl`
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const url = await uploadToCloudinary(file);
        setImage(url); // ✅ save to `image`
      } catch (err) {
        setError(err.message || "Failed to upload image. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!user || !user._id) {
        throw new Error("You must be logged in with a valid user ID to create a blog.");
      }

      const newBlog = {
        title,
        content,
        image: image || undefined, // ✅ consistent with schema
        author: user._id,
      };

      await dispatch(createBlog(newBlog)).unwrap();
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Failed to create blog. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-white">Create Blog</h2>

        {error && <p className="text-red-500">{error}</p>}

        {/* Title */}
        <div>
          <label className="block text-gray-300 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded"
            required
          />
        </div>

        {/* Content (Rich Text) */}
        <div>
          <label className="block text-gray-300 mb-1">Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="bg-white rounded text-black"
            placeholder="Write your blog content here..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-300 mb-1">Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
          {image && <p className="text-gray-400 mt-2">Image uploaded: {image}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
