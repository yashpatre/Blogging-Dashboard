import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../features/authSlice";
import BlogList from "./BlogList"; // Import BlogList component

const Home = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const displayName = user?.username || user?.name || user?.email || "User";

  useEffect(() => {
    console.log("Home - User:", user, "User ID:", user ? user.id : "undefined");
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 opacity-90" />
        <div className="relative z-10 text-center py-16 md:py-24 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400 drop-shadow-lg">
            {isAuthenticated
              ? `Welcome, ${displayName}!`
              : "Welcome to Blogbook"}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            {isAuthenticated
              ? "✨ Share your thoughts, inspire others, and join the conversation."
              : "📖 Explore amazing blogs or sign in to start your journey."}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            {isAuthenticated && (
              <Link
                to="/create"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                ✍️ Create a Blog
              </Link>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                >
                  🔑 Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white font-semibold shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                >
                  📝 Register
                </Link>
              </>
            )}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl text-white font-semibold shadow-lg hover:from-red-600 hover:to-rose-700 transition-all duration-200"
              >
                🚪 Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
          Explore Blogs
        </h2>

        {/* Blog Grid (BlogList component handles blog rendering) */}
        <BlogList />
      </div>
    </div>
  );
};

export default Home;
