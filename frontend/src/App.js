import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import Layout from "./components/layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import store from "./store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { setAuthenticated, stopLoading } from "./features/authSlice";

function AppContent() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    const checkAuthStatus = async () => {
      try {
        if (token && userStr) {
          const user = JSON.parse(userStr);
          if (user && user.id) {
            dispatch(setAuthenticated({ user, token }));
          } else {
            localStorage.removeItem("user");
          }
        }
      } catch (e) {
        console.error("Invalid user data in localStorage:", e);
        localStorage.removeItem("user");
      } finally {
        dispatch(stopLoading());
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  console.log("AppContent render - loading:", loading, "isAuthenticated:", isAuthenticated); // Debug log

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route
            path="/blogs"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <BlogList />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CreateBlog />
              </PrivateRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}