import User from '../models/User.js'; // User model
import Trip from '../models/Trip.js'; // Trip model
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user (POST)
// In your `createUser` function (backend):
const createUser = async (req, res) => {
  const { username, profileAvatar, name, email, password, bio } = req.body;

  // Log the request body to see what data is being received
  console.log('Received request body for user creation:', req.body);


  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      username,
      profileAvatar,
      name,
      email,
      password,
      bio,
    });

    await newUser.save();

    // Exclude the password from the response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User created successfully',
      user: userResponse,  // Send the user object without the password
      token,
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};

// Get all users (GET) - Retrieve and respond with a list of all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Get a specific user by ID (GET) - Retrieve details for the specified user, including their associated trips
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract user ID from the request parameters
    const user = await User.findById(userId).populate('trips'); // Populate user's trips

    if (user) {
      res.status(200).json(user); // Respond with the user details
    } else {
      res.status(404).json({ error: 'User not found' }); // Handle case where user does not exist
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve the user' });
  }
};

// Get trips associated with a user (GET) - Retrieve and respond with a list of trips for a specific user by userId
const getUserTrips = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract user ID from the request parameters
    const user = await User.findById(userId).populate('trips'); // Populate user's trips

    if (user && user.trips.length > 0) {
      res.status(200).json(user.trips); // Respond with the list of trips
    } else {
      res.status(404).json({ error: 'No trips found for this user' }); // Handle case where no trips are found
    }
  } catch (error) {
    console.error('Error fetching user trips:', error);
    res.status(500).json({ error: 'Failed to retrieve trips for the user' });
  }
};

const deleteUser = async (req, res) => {
  res.status(501).json({ message: 'Delete user endpoint not implemented yet' });
};

// Placeholder for updateUser
const updateUser = async (req, res) => {
  res.status(501).json({ message: 'Update user endpoint not implemented yet' });
};

// Export all controller functions as a single default object
export default {
  getAllUsers,
  getUserById,
  getUserTrips,
  createUser,
  updateUser,
  deleteUser,
};
