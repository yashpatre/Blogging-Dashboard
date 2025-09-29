import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>
          Please <Link to="/login" className="text-blue-500 underline">login</Link> to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
        <div className="space-y-4">
          <p><span className="font-semibold">Username:</span> {user.username || "N/A"}</p>
          <p><span className="font-semibold">Name:</span> {user.name || "N/A"}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white text-center w-full"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Profile;
