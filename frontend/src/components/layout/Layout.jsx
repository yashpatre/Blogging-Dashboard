// src/components/layout/Layout.jsx
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Layout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="bb-container pt-24 pb-10">
        <Outlet />
      </main>
    </>
  );
}
