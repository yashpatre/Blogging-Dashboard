import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/blogApi'; // Import all functions from blogApi.js as 'api'

// Async thunk to fetch all blogs
export const fetchBlogs = createAsyncThunk(
    'blogs/fetchBlogs',
    async (_, { rejectWithValue }) => {
        try {
            const blogs = await api.getBlogs(); // Use the correct function name
            return blogs;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to fetch a single blog and its details
export const fetchBlogDetails = createAsyncThunk(
    'blogs/fetchBlogDetails',
    async (blogId, { rejectWithValue }) => {
        try {
            const blog = await api.getBlogById(blogId); // Use the correct function name
            return blog;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to create a new blog
export const createBlog = createAsyncThunk(
    'blogs/createBlog',
    async (blogData, { rejectWithValue }) => {
        try {
            const blog = await api.createBlog(blogData);
            return blog;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to update a blog
export const updateBlog = createAsyncThunk(
    'blogs/updateBlog',
    async ({ id, blogData }, { rejectWithValue }) => {
        try {
            const blog = await api.updateBlog(id, blogData);
            return blog;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a blog
export const deleteBlog = createAsyncThunk(
    'blogs/deleteBlog',
    async (id, { rejectWithValue }) => {
        try {
            await api.deleteBlog(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to like a blog
export const likeBlog = createAsyncThunk(
    'blogs/likeBlog',
    async (id, { rejectWithValue }) => {
        try {
            const blog = await api.likeBlog(id);
            return blog;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to add a comment
export const addComment = createAsyncThunk(
    'blogs/addComment',
    async ({ id, commentData }, { rejectWithValue }) => {
        try {
            const blog = await api.addComment(id, commentData);
            return blog;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a comment
export const deleteComment = createAsyncThunk(
    'blogs/deleteComment',
    async ({ blogId, commentId }, { rejectWithValue }) => {
        try {
            const blog = await api.deleteComment(blogId, commentId);
            return blog;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const blogSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogs: [],
        blogDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All Blogs
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Blog Details
            .addCase(fetchBlogDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.blogDetails = action.payload;
            })
            .addCase(fetchBlogDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Blog
            .addCase(createBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs.push(action.payload); // Add the new blog to the list
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Blog
            .addCase(updateBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.loading = false;
                const updatedBlog = action.payload;
                state.blogs = state.blogs.map((blog) =>
                    blog._id === updatedBlog._id ? updatedBlog : blog
                );
                // Also update the blogDetails if it's the one being viewed
                if (state.blogDetails && state.blogDetails._id === updatedBlog._id) {
                    state.blogDetails = updatedBlog;
                }
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Blog
            .addCase(deleteBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
                if (state.blogDetails && state.blogDetails._id === action.payload) {
                    state.blogDetails = null;
                }
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Like Blog
            .addCase(likeBlog.pending, (state) => {
                state.error = null;
            })
            .addCase(likeBlog.fulfilled, (state, action) => {
                const likedBlog = action.payload;
                // Update the blog in the main list
                state.blogs = state.blogs.map((blog) =>
                    blog._id === likedBlog._id ? likedBlog : blog
                );
                // Update the details view if it matches
                if (state.blogDetails && state.blogDetails._id === likedBlog._id) {
                    state.blogDetails = likedBlog;
                }
            })
            .addCase(likeBlog.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Add Comment
            .addCase(addComment.pending, (state) => {
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const blogWithNewComment = action.payload;
                // Update the blog in the main list
                state.blogs = state.blogs.map((blog) =>
                    blog._id === blogWithNewComment._id ? blogWithNewComment : blog
                );
                // Update the details view if it matches
                if (state.blogDetails && state.blogDetails._id === blogWithNewComment._id) {
                    state.blogDetails = blogWithNewComment;
                }
            })
            .addCase(addComment.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Delete Comment
            .addCase(deleteComment.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                const blogWithDeletedComment = action.payload;
                // Update the blog in the main list
                state.blogs = state.blogs.map((blog) =>
                    blog._id === blogWithDeletedComment._id ? blogWithDeletedComment : blog
                );
                // Update the details view if it matches
                if (state.blogDetails && state.blogDetails._id === blogWithDeletedComment._id) {
                    state.blogDetails = blogWithDeletedComment;
                }
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logout } = blogSlice.actions; // Export any plain reducers you might have
export default blogSlice.reducer;
