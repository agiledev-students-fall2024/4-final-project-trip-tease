import User from '../models/User.js'; // User model
import Trip from '../models/Trip.js'; // Trip model
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

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

// Update user details (PUT) - Allows a user to update their profile
const updateUser = async (req, res) => {
  const { userId } = req.params;  // Get userId from the request parameters
  const { username, profileAvatar, name, email, bio } = req.body;  // Extract the fields from the request body

  try {
    // Find the user to be updated
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email or username is already taken by another user (excluding the current user)
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ message: 'Username or email is already taken by another user' });
    }

    // Update the user fields with the new data
    user.username = username || user.username;
    user.profileAvatar = profileAvatar || user.profileAvatar;
    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;

    // Save the updated user to the database
    await user.save();

    // Exclude the password from the response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: 'User updated successfully',
      user: userResponse,  // Return the updated user details (excluding the password)
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
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
