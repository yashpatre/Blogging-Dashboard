// A single comment
import React from "react";
import { useSelector } from "react-redux";

export default function Comment({ comment, handleDeleteComment }) {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <p className="text-sm font-semibold text-gray-300">
        {comment.author?.username || "Anonymous"} on {new Date(comment.createdAt).toLocaleDateString()}
      </p>
      <p className="mt-1 text-gray-200">{comment.content}</p>
      {comment.author && user && comment.author._id === user._id && (
        <button
          onClick={() => handleDeleteComment(comment._id)}
          className="mt-2 text-red-400 hover:text-red-500 text-sm"
        >
          Delete
        </button>
      )}
    </div>
  );
}
