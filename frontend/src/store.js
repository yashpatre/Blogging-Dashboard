import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import blogReducer from "./features/blogSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/login/fulfilled", "auth/register/fulfilled"],
        ignoredPaths: ["payload.headers"],
      },
    }),
});

export default store;
