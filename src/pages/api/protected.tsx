/* eslint-disable import/no-anonymous-default-export */
import { authenticateToken } from '../../lib/middleware';

const handler = (req, res) => {
  res.status(200).json({ message: 'You have accessed a protected route!', user: req.user });
};

// Export a function that uses the middleware
export default (req, res) => {
  authenticateToken(req, res, () => handler(req, res));
};
