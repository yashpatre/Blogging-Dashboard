// src/components/layout/MobileNav.jsx
import { Link } from "react-router-dom";

export default function MobileNav({ open, onClose, isAuthenticated, onLogout }) {
  if (!open) return null;

  return (
    <div className="md:hidden fixed inset-0 z-40">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-dark-card shadow-nav p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-heading text-primary">Menu</span>
          <button onClick={onClose} className="bb-btn-ghost rounded-full px-3 py-1">✕</button>
        </div>

        <nav className="flex flex-col gap-3">
          <Link to="/" className="hover:text-primary" onClick={onClose}>Home</Link>
          <Link to="/blogs" className="hover:text-primary" onClick={onClose}>My Blogs</Link>
          <Link to="/create" className="hover:text-primary" onClick={onClose}>Create</Link>
          <Link to="/profile" className="hover:text-primary" onClick={onClose}>Profile</Link>

          <div className="h-px bg-gray-200 dark:bg-[#3a3b3c] my-2" />

          {isAuthenticated ? (
            <button
              onClick={() => { onLogout?.(); onClose(); }}
              className="bb-btn-primary"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="bb-btn-primary text-center" onClick={onClose}>Login</Link>
              <Link to="/register" className="bb-btn text-center border" onClick={onClose}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
