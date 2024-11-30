import jwt from 'jsonwebtoken';

// Secret key for JWT (same as the one used in createUser)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to check if the request has a valid token
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);  // Verify the token
    req.user = decoded; // Attach the decoded payload to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default authenticate;
