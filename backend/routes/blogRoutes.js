const express = require('express');
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  addComment,
  deleteComment,
} = require('../controllers/blogController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// Public Routes
router.get('/', getBlogs);
router.get('/:id', getBlogById);

// Protected Routes (requires authentication)
router.post('/', auth, createBlog);
router.put('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);

// Blog-specific actions (like, comment)
router.put('/like/:id', auth, likeBlog);
router.post('/:id/comment', auth, addComment);
router.delete('/:id/comment/:commentId', auth, deleteComment);

module.exports = router;
