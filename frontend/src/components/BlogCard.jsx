import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogCard = ({ blog, user }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const isAuthor =
    isAuthenticated &&
    user &&
    blog.author &&
    user._id?.toString() === blog.author?._id?.toString();

  // Use uploaded image OR fallback
  const imageSrc =
    blog.image ||
    "https://via.placeholder.com/600x300.png?text=Blog+Image"; // fallback placeholder

  return (
    <div className="bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform max-w-lg mx-auto">
      <Link to={`/blogs/${blog._id}`}>
        {/* Blog Image */}
        <img
          src={imageSrc}
          alt={blog.title}
          className="w-full h-56 object-cover"
        />

        {/* Blog Info */}
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-2 hover:text-blue-400">
            {blog.title}
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            By {blog.author?.username || "Anonymous"} •{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>

          {/* Blog content preview */}
          <div
            className="text-gray-200 line-clamp-3 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        </div>
      </Link>

      {/* Author Controls */}
      {isAuthenticated && isAuthor && (
        <div className="p-4 flex gap-3 border-t border-gray-700">
          <Link
            to={`/blogs/edit/${blog._id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Edit
          </Link>
          <Link
            to={`/blogs/${blog._id}?delete=true`}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
