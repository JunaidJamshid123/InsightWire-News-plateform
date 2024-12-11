const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');  // Assuming this middleware is set up to authenticate the JWT

// Example user profile route
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Assuming `req.user` contains the authenticated user details (from JWT)
    const user = req.user;
    return res.json({
      email: user.email,
      username: user.username,
      mobile: user.mobile,
      country: user.country
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
