import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) { root.classList.add("dark"); localStorage.setItem("theme", "dark"); }
    else { root.classList.remove("dark"); localStorage.setItem("theme", "light"); }
  }, [dark]);

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setDark((d) => !d)}
      className="rounded-full p-2 hover:bg-secondary dark:hover:bg-[#2c2d2e] transition"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun / Moon minimalist SVGs */}
      {dark ? (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.8 1.41 1.41-1.8 1.79-1.4-1.4zM12 4V1h-2v3h2zm7 8h3v-2h-3v2zM4 12H1v-2h3v2zm8 8v3h-2v-3h2zm7.24-2.84l1.8 1.79-1.41 1.41-1.79-1.8 1.4-1.4zM6.76 19.16l-1.79 1.8-1.41-1.41 1.8-1.79 1.4 1.4zM12 6a6 6 0 100 12 6 6 0 000-12z"/></svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M21.64 13A9 9 0 1111 2.36a7 7 0 1010.64 10.64z"/></svg>
      )}
    </button>
  );
}
