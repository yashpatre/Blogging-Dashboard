import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/blogs';

// Helper function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper function to create the headers with the authorization token
const getConfig = () => {
    const token = getToken();
    if (!token) {
        // You could handle this more gracefully, but for now, it's good to throw an error
        throw new Error("No token found. Please log in.");
    }
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
};

// Function to get all blogs (no auth required)
export const getBlogs = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

// Function to get a single blog by ID (no auth required)
export const getBlogById = async (blogId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${blogId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching blog:', error);
        throw error;
    }
};

// Function to create a new blog (auth required)
export const createBlog = async (blogData) => {
    try {
        const response = await axios.post(
            BASE_URL,
            blogData,
            getConfig()
        );
        return response.data;
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
};

// Function to update a blog (auth required)
export const updateBlog = async (blogId, blogData) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/${blogId}`,
            blogData,
            getConfig()
        );
        return response.data;
    } catch (error) {
        console.error('Error updating blog:', error);
        throw error;
    }
};

// Function to delete a blog (auth required)
export const deleteBlog = async (blogId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/${blogId}`,
            getConfig()
        );
        return response.data;
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
};

// Function to like a blog post (auth required)
export const likeBlog = async (blogId) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/like/${blogId}`,
            {},
            getConfig()
        );
        return response.data;
    } catch (error) {
        console.error('Error liking blog:', error);
        throw error;
    }
};

// Function to add a comment to a blog post (auth required)
export const addComment = async (blogId, commentContent) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/${blogId}/comment`,
            { content: commentContent },
            getConfig()
        );
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

// Function to delete a comment from a blog post (auth required)
export const deleteComment = async (blogId, commentId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/${blogId}/comment/${commentId}`,
            getConfig()
        );
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};
