const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model (or use it according to your project structure)

// Middleware to authenticate token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format' });
  }

  const token = authHeader.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Authentication failed' });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = user; // Attach user info to request
      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};

module.exports = authenticateToken;
