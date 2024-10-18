import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1];

  // If no token is found, respond with unauthorized status
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' }); // Forbidden
    }
    req.user = user; // Attach the user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
};
