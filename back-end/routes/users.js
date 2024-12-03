import express from 'express';
import { ensureAuthenticated } from '../config/jwt-config.js'; // Middleware for authentication
import usersController from '../controllers/usersController.js'; // Controller for user-related logic
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// Routes

/**
 * GET /api/users/me
 * Fetch the authenticated user's profile.
 * - Requires authentication.
 * - Excludes sensitive fields like passwordHash.
 * - Populates related fields, such as trips (update the field based on your schema).
 */
router.get('/me', ensureAuthenticated, async (req, res) => {
  try {
    // Ensure req.user.id exists and is valid
    if (!req.user || !req.user.id) {
      return res.status(400).json({ error: 'Invalid user token or missing user ID' });
    }

    // Fetch the user from the database
    const user = await User.findById(req.user.id)
      .select('-passwordHash') // Exclude sensitive fields
      .populate('trips'); // Adjust based on your schema's relationships

    // Handle case when user is not found
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the user data
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ error: 'Failed to retrieve the user', details: error.message });
  }
});

/**
 * GET /api/users/
 * Retrieve and respond with a list of all users, including basic details only.
 */
router.get('/', ensureAuthenticated, usersController.getAllUsers);

/**
 * GET /api/users/:userId
 * Retrieve details for the specified user, including their associated trips.
 */
router.get('/:userId', ensureAuthenticated, usersController.getUserById);

/**
 * GET /api/users/:userId/trips
 * Retrieve and respond with a list of trips for a specific user by userId.
 */
router.get('/:userId/trips', ensureAuthenticated, usersController.getUserTrips);

/**
 * POST /api/users/
 * Create a new user in the database.
 */
router.post('/', usersController.createUser);

/**
 * PUT /api/users/:userId
 * Update user information for a specific user.
 */
router.put('/:userId', ensureAuthenticated, usersController.updateUser);

/**
 * DELETE /api/users/:userId
 * Delete a user from the database by ID.
 */
router.delete('/:userId', ensureAuthenticated, usersController.deleteUser);




export default router;
