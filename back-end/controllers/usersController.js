// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js'; // User model
// import Trip from '../models/Trip.js'; // Trip model

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// // Get all users (GET) - Retrieve and respond with a list of all users
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find(); 
//     res.status(200).json(users); 
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Failed to retrieve users' });
//   }
// };

// // Get a specific user by ID (GET) - Retrieve details for the specified user, including their associated trips
// const getUserById = async (req, res) => {
//   try {
//     const userId = req.params.userId; // Extract user ID from the request parameters
//     const user = await User.findById(userId).populate('trips'); // Populate user's trips

//     if (user) {
//       res.status(200).json(user); // Respond with the user details
//     } else {
//       res.status(404).json({ error: 'User not found' }); // Handle case where user does not exist
//     }
//   } catch (error) {
//     console.error('Error fetching user by ID:', error);
//     res.status(500).json({ error: 'Failed to retrieve the user' });
//   }
// };

// // Get trips associated with a user (GET) - Retrieve and respond with a list of trips for a specific user by userId
// const getUserTrips = async (req, res) => {
//   try {
//     const userId = req.params.userId; // Extract user ID from the request parameters
//     const user = await User.findById(userId).populate('trips'); // Populate user's trips

//     if (user && user.trips.length > 0) {
//       res.status(200).json(user.trips); // Respond with the list of trips
//     } else {
//       res.status(404).json({ error: 'No trips found for this user' }); // Handle case where no trips are found
//     }
//   } catch (error) {
//     console.error('Error fetching user trips:', error);
//     res.status(500).json({ error: 'Failed to retrieve trips for the user' });
//   }
// };

// // Placeholder functions for unimplemented methods
// // const createUser = async (req, res) => {
// //   res.status(501).json({ message: 'Create user endpoint not implemented yet' });
// // };

// // Create a new user (POST) - Register the user and save to the database
// const createUser = async (req, res) => {
//   const { username, avatar, firstName, lastName, email, password, bio } = req.body;

//   try {
//     // Log the data being received from the sign-up form
//     console.log("Received user data:", { username, avatar, firstName, lastName, email, password, bio });

//     // Check if the user already exists by email
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });  // Handle duplicate user
//     }

//     // Hash the password before saving to the database
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user object with the provided data
//     const newUser = new User({
//       username,
//       avatar,  // Avatar from the form
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,  // Store the hashed password
//       bio,
//     });

//     // Save the new user to the database
//     await newUser.save();

//     // Log the saved user to the console
//     console.log("Saved user data:", newUser);

//     // Send a success response back with the user data (excluding password)
//     res.status(201).json({
//       message: 'User created successfully',
//       user: {
//         username: newUser.username,
//         avatar: newUser.avatar,
//         firstName: newUser.firstName,
//         lastName: newUser.lastName,
//         email: newUser.email,
//         bio: newUser.bio,
//       },
//     });

//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ message: 'Failed to create user' });
//   }
// };

// const updateUser = async (req, res) => {
//   res.status(501).json({ message: 'Update user endpoint not implemented yet' });
// };

// const deleteUser = async (req, res) => {
//   res.status(501).json({ message: 'Delete user endpoint not implemented yet' });
// };

// // Export all controller functions as a single default object
// export default {
//   getAllUsers,
//   getUserById,
//   getUserTrips,
//   createUser,
//   updateUser,
//   deleteUser,
// };


// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';  // User model
// import Trip from '../models/Trip.js';  // Trip model

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// // Get all users (GET) - Retrieve and respond with a list of all users
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find(); 
//     res.status(200).json(users); 
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Failed to retrieve users' });
//   }
// };

// // Get a specific user by ID (GET) - Retrieve details for the specified user, including their associated trips
// const getUserById = async (req, res) => {
//   try {
//     const userId = req.params.userId; // Extract user ID from the request parameters
//     const user = await User.findById(userId).populate('trips'); // Populate user's trips

//     if (user) {
//       res.status(200).json(user); // Respond with the user details
//     } else {
//       res.status(404).json({ error: 'User not found' }); // Handle case where user does not exist
//     }
//   } catch (error) {
//     console.error('Error fetching user by ID:', error);
//     res.status(500).json({ error: 'Failed to retrieve the user' });
//   }
// };

// // Get trips associated with a user (GET) - Retrieve and respond with a list of trips for a specific user by userId
// const getUserTrips = async (req, res) => {
//   try {
//     const userId = req.params.userId; // Extract user ID from the request parameters
//     const user = await User.findById(userId).populate('trips'); // Populate user's trips

//     if (user && user.trips.length > 0) {
//       res.status(200).json(user.trips); // Respond with the list of trips
//     } else {
//       res.status(404).json({ error: 'No trips found for this user' }); // Handle case where no trips are found
//     }
//   } catch (error) {
//     console.error('Error fetching user trips:', error);
//     res.status(500).json({ error: 'Failed to retrieve trips for the user' });
//   }
// };

// // Create a new user (POST) - Register the user and save to the database
// const createUser = async (req, res) => {
//   const { username, profileAvatar, firstName, lastName, email, password, bio } = req.body;

//   try {
//     // Log the data being received from the sign-up form
//     console.log("Received user data:", { username, profileAvatar, firstName, lastName, email, password, bio });

//     // Check if the user already exists by email
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });  // Handle duplicate user
//     }

//     // Hash the password before saving to the database
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Combine first and last name into a full name field (optional)
//     const name = `${firstName} ${lastName}`;

//     // Create a new user object with the provided data
//     const newUser = new User({
//       username,
//       profileAvatar,  // Avatar from the form
//       name,  // Combined first name and last name
//       email,
//       password: hashedPassword,  // Store the hashed password
//       bio,
//     });

//     // Save the new user to the database
//     await newUser.save();

//     // Log the saved user to the console
//     console.log("Saved user data:", newUser);

//     // Generate a JWT token for the user
//     const token = jwt.sign(
//       { userId: newUser._id, email: newUser.email },
//       JWT_SECRET, // The JWT secret from .env
//       { expiresIn: '1h' }
//     );

//     // Send a success response back with the user data (excluding password)
//     res.status(201).json({
//       message: 'User created successfully',
//       user: {
//         username: newUser.username,
//         profileAvatar: newUser.profileAvatar, // Avatar from the database
//         name: newUser.name,  // Full name
//         email: newUser.email,
//         bio: newUser.bio,
//       },
//       token, // Send the generated JWT token
//     });

//   } catch (error) {
//     console.error('Error creating user:', error); // Log the error in case of failure
//     res.status(500).json({ message: 'Failed to create user' });
//   }
// };

// // Export all controller functions as a single default object
// export default {
//   getAllUsers,
//   getUserById,
//   getUserTrips,
//   createUser,
// };



// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const JWT_SECRET = process.env.JWT_SECRET;

// // Create a new user (POST)
// const createUser = async (req, res) => {
//   const { username, profileAvatar, name, email, password, bio } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       username,
//       profileAvatar,
//       name,
//       email,
//       password: hashedPassword,
//       bio,
//     });

//     await newUser.save();

//     const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({
//       message: 'User created successfully',
//       user: {
//         username: newUser.username,
//         profileAvatar: newUser.profileAvatar,
//         name: newUser.name,
//         email: newUser.email,
//         bio: newUser.bio,
//       },
//       token,
//     });

//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create user', error: error.message });
//   }
// };

// // Get all users (GET)
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve users' });
//   }
// };

// // // Get user by ID (GET)
// // const getUserById = async (req, res) => {
// //   try {
// //     const user = await User.findById(req.params.userId);
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }
// //     res.status(200).json(user);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Failed to retrieve user' });
// //   }
// // };

// // Get user's trips (GET)
// const getUserTrips = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).populate('trips');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user.trips);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve user trips' });
//   }
// };

// // Update user information (PUT)
// const updateUser = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update user' });
//   }
// };

// // Get a specific user by ID (GET) - Retrieve details for the specified user, including their associated trips
// const getUserById = async (req, res) => {
//   try {
//     const userId = req.params.userId; // Extract user ID from the request parameters
//     const user = await User.findById(userId).populate('trips'); // Populate user's trips

//     if (user) {
//       res.status(200).json(user); // Respond with the user details
//     } else {
//       res.status(404).json({ error: 'User not found' }); // Handle case where user does not exist
//     }
//   } catch (error) {
//     console.error('Error fetching user by ID:', error);
//     res.status(500).json({ error: 'Failed to retrieve the user' });
//   }
// };

// // Delete a user (DELETE)
// const deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.userId);
//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ message: 'User deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete user' });
//   }
// };

// // Get current logged-in user's data (GET)
// const getCurrentUser = async (req, res) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded JWT:', decoded); // Debug log for token decoding
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({
//       username: user.username,
//       profileAvatar: user.profileAvatar,
//       name: user.name,
//       email: user.email,
//       bio: user.bio,
//     });
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).json({ message: 'Failed to fetch user data' });
//   }
// };


// export default {
//   createUser,
//   getAllUsers,
//   getUserById,
//   getUserTrips,
//   updateUser,
//   deleteUser,
//   getCurrentUser,
// };


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user (POST)
const createUser = async (req, res) => {
  const { username, profileAvatar, name, email, password, bio } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      profileAvatar,
      name,
      email,
      password: hashedPassword, // Store the hashed password
      bio,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        username: newUser.username,
        profileAvatar: newUser.profileAvatar,
        name: newUser.name,
        email: newUser.email,
        bio: newUser.bio,
      },
      token,
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};

// Login (POST) - Verify user credentials and generate JWT token
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Compare the password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        profileAvatar: user.profileAvatar,
        bio: user.bio,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// Get all users (GET)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
};

// Get a specific user by ID (GET)
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract user ID from the request parameters
    const user = await User.findById(userId).populate('trips'); // Populate user's trips

    if (user) {
      res.status(200).json(user); // Respond with the user details
    } else {
      res.status(404).json({ message: 'User not found' }); // Handle case where user does not exist
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Failed to retrieve the user' });
  }
};

// Get user's trips (GET)
const getUserTrips = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('trips');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.trips);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user trips' });
  }
};

// Update user information (PUT)
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// Delete a user (DELETE)
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

// Get current logged-in user's data (GET)
const getCurrentUser = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      username: user.username,
      profileAvatar: user.profileAvatar,
      name: user.name,
      email: user.email,
      bio: user.bio,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
};

export default {
  createUser,
  login,
  getAllUsers,
  getUserById,
  getUserTrips,
  updateUser,
  deleteUser,
  getCurrentUser,
};
