import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';


const router = express.Router();

/**
 * POST /auth/signup
 * - Create a new user with hashed password.
 */
router.post(
  '/signup',
  [
    // Simple validation for required fields
    body('username').notEmpty().withMessage('Username is required.'),
    body('email').notEmpty().withMessage('Email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
    body('profileAvatar').notEmpty().withMessage('Profile avatar is required.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      }));
      return res.status(400).json({ errors: formattedErrors });
    }

    const { username, email, password, name, profileAvatar, bio } = req.body;

    try {
      // Check if the username or email already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        const conflictField = existingUser.username === username ? 'Username' : 'Email';
        return res
          .status(409)
          .json({ message: `${conflictField} already exists. Please choose another.` });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        name: name || '', // Optional field
        profileAvatar,
        bio: bio || '', // Optional field
      });
      await newUser.save();

      // Generate a JWT token
      const token = jwt.sign({ id: newUser._id }, config.jwtSecret, {
        expiresIn: '1h',
      });

      res.status(201).json({
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          name: newUser.name,
          profileAvatar: newUser.profileAvatar,
          bio: newUser.bio,
        },
      });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
  }
);


/**
 * POST /auth/login
 * - Authenticate user and return a JWT.
 */
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials (password)' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });

      res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  }
);

/**
 * POST /auth/logout
 * - Placeholder for future token invalidation logic.
 */
router.post(
  '/login',
  [
    // Validation for required fields
    body('username').notEmpty().withMessage('Username is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      }));
      return res.status(400).json({ errors: formattedErrors });
    }

    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User does not exist.' });
      }

      // Compare provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password.' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, config.jwtSecret, {
        expiresIn: '1h',
      });

      res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          name: user.name,
          profileAvatar: user.profileAvatar,
          bio: user.bio,
        },
      });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
  }
);


export default router;
