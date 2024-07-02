// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'rohit@test');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = auth;
