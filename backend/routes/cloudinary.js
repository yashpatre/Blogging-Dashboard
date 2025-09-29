// routes/cloudinary.js
const express = require("express");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

// ✅ Route to generate a signed upload signature
router.get("/signature", (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Use Cloudinary helper to sign request
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      timestamp,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (err) {
    console.error("Cloudinary signature error:", err.message);
    res.status(500).json({ error: "Failed to generate signature" });
  }
});

module.exports = router;
