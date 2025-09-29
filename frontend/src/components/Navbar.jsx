// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import { logout as logoutAction } from "../features/authSlice";
import MobileNav from "./layout/MobileNav";

export default function Navbar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white dark:bg-dark-card shadow-nav fixed top-0 w-full z-50">
        <div className="bb-container py-3 flex items-center gap-3">
          {/* Left: brand + mobile menu button */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden bb-btn-ghost rounded-full px-3 py-2"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <Link to="/" className="text-2xl font-heading text-primary">
              Blogbook <span className="align-middle">📖</span>
            </Link>
          </div>

          {/* Middle: search (desktop only) */}
          <SearchBar value={q} onChange={setQ} />

          {/* Right: links + theme + auth */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/blogs" className="hover:text-primary">My Blogs</Link>
            <Link to="/create" className="hover:text-primary">Create</Link>
          <Link to="/profile" className="px-4 py-2 hover:text-blue-400">
          Profile
          </Link>

            <ThemeToggle />

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatar || "/user.png"}
                  alt="profile"
                  className="w-9 h-9 rounded-full border"
                />
                <button onClick={handleLogout} className="bb-btn border">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="bb-btn-primary">Login</Link>
                <Link to="/register" className="bb-btn border">Register</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile nav drawer */}
      <MobileNav
        open={open}
        onClose={() => setOpen(false)}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
    </>
  );
}
