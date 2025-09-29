const mongoose = require("mongoose");

// Comment Sub-Schema
const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Blog Schema
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true }, // Quill HTML
    image: { type: String }, // ✅ use `image`, not `imageUrl`
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, default: "General", trim: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
