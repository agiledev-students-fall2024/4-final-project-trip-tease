import express from 'express';
import usersController from '../controllers/usersController.js';
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
router.post('/', (req, res) => {
  const { username, password, email, name, profileAvatar, bio } = req.body;

  // Check if the user already exists
  const existingUser = users.find(u => u.username === username || u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Username or email already exists' });
  }

  // Create a new user and add to the users array
  const newUser = {
    id: users.length + 1, // simple id assignment
    username,
    password, // In a real system, hash the password before saving
    email,
    name,
    profileAvatar,
    bio,
  };

  users.push(newUser);

  // Save to the mock-data file (or implement database saving)
  fs.writeFileSync('./mock-data/users.json', JSON.stringify(users, null, 2));

  res.status(201).json(newUser);
});

// Update user information (PUT)
router.put('/:userId', (req, res) => {
  const { userId } = req.params;
  const { username, email, name, profileAvatar, bio } = req.body;

  // Find user by ID (mocking with users array)
  const userIndex = users.findIndex(u => u.id === parseInt(userId));

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Update the user data
  const updatedUser = { ...users[userIndex], username, email, name, profileAvatar, bio };
  users[userIndex] = updatedUser;

  // Save updated user list to mock-data file
  fs.writeFileSync('./mock-data/users.json', JSON.stringify(users, null, 2));

  res.json(updatedUser);  // Return updated user data to the frontend
});


// Delete a user (DELETE)
router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  const userIndex = users.findIndex(u => u.id === parseInt(userId));

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Remove the user from the array
  const deletedUser = users.splice(userIndex, 1);

  // Save the updated users array
  fs.writeFileSync('./mock-data/users.json', JSON.stringify(users, null, 2));

  res.json({ message: 'User deleted', user: deletedUser });
});

export default router;
