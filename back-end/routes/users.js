import express from 'express';
import usersController from '../controllers/usersController.js';
import User from '../models/User.js'; // Import the User model
import fs from 'fs';

const router = express.Router();
const users = JSON.parse(fs.readFileSync('./mock-data/users.json', 'utf-8'));
const trips = JSON.parse(fs.readFileSync('./mock-data/trips.json', 'utf-8'));

// Get all users (GET) - Retrieve and respond with a list of all users, including basic details only
router.get('/', usersController.getAllUsers);

// Get a specific user by ID (GET) - Retrieve details for the specified user, including their associated trips
router.get('/:userId', usersController.getUserById);

// Get trips associated with a user (GET) - Retrieve and respond with a list of trips for a specific user by userId
router.get('/:userId/trips', usersController.getUserTrips);

// Create a new user (POST)
router.post('/', usersController.createUser);

// Update user information (PUT)
router.put('/:userId', usersController.updateUser);

// Delete a user (DELETE)
router.delete('/:userId', usersController.deleteUser);

export default router;
