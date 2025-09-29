import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../features/blogSlice";

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, status, error } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.auth); // Get the logged-in user
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  const filteredBlogs = Array.isArray(blogs)
    ? blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (status === "loading") {
    return (
      <div className="text-center text-white text-xl mt-10">Loading blogs...</div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Failed to load blogs. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">All Blogs</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} user={user} />
            ))
          ) : (
            <div className="text-center col-span-full">No blogs found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
