import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBlogDetails,
  likeBlog,
  updateBlog,
  deleteBlog,
  addComment,
  deleteComment,
} from "../features/blogSlice";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogDetails: blog, loading, error } = useSelector((state) => state.blogs);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (blog) {
      setEditedContent(blog.content);
    }
  }, [blog]);

  const handleLike = () => {
    if (isAuthenticated) {
      dispatch(likeBlog(blog._id));
    } else {
      setShowAlert(true);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const blogData = { content: editedContent };
    dispatch(updateBlog({ id: blog._id, blogData }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const executeDelete = () => {
    setShowConfirm(false);
    dispatch(deleteBlog(blog._id));
    navigate("/");
  };

  const handleCommentSubmit = (commentContent) => {
    if (!isAuthenticated || !commentContent.trim()) {
      setShowAlert(true);
      return;
    }
    // Update to use 'text' if that's what the backend expects
    dispatch(addComment({ id: blog._id, commentData: { text: commentContent } }));
  };

  const handleDeleteComment = (commentId) => {
    if (isAuthenticated) {
      dispatch(deleteComment({ blogId: blog._id, commentId }));
    } else {
      setShowAlert(true);
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Loading blog...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error?.message || error.toString() || "An error occurred"}</div>;
  if (!blog) return <div className="text-white text-center mt-10">Blog not found.</div>;

  const isAuthor = user && blog.author && user._id === blog.author._id;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        {blog.image && (
          <img src={blog.image} alt={blog.title} className="w-full h-80 object-cover rounded-md mb-6" />
        )}
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-400 mb-6">
          By {blog.author?.username || "Anonymous"} | {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        {isEditing ? (
          <form onSubmit={handleUpdate} className="mb-6">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows="10"
              className="w-full p-4 bg-gray-700 rounded-lg text-white"
            />
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-wrap">{blog.content}</p>
        )}
        
        <div className="flex items-center gap-4 mt-6">
          <button onClick={handleLike} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
            ❤️ {blog.likes?.length || 0}
          </button>
          {isAuthor && !isEditing && (
            <>
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
              >
                Delete
              </button>
            </>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Comments ({blog.comments?.length || 0})</h2>
          {isAuthenticated && (
            <CommentForm onSubmit={handleCommentSubmit} />
          )}
          <CommentList comments={blog.comments || []} handleDeleteComment={handleDeleteComment} currentUser={user} />
        </div>
      </div>
      
      {showAlert && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Action Required</h3>
            <p className="text-gray-300 mb-6">You must be logged in to perform this action.</p>
            <button
              onClick={() => setShowAlert(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this blog post?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;