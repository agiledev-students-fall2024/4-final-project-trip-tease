// // Import Database Connection
// import connectDB from './config/db.js';

// // Import Models
// import User from './models/User.js';
// import Trip from './models/Trip.js';
// import Location from './models/Location.js';
// import Activity from './models/Activity.js';

// // Import Mock Data from the updated db-mock-data folder
// import users from './db-mock-data/users.js';
// import trips from './db-mock-data/trips.js';
// import locations from './db-mock-data/locations.js';
// import activities from './db-mock-data/activities.js';

// // Seed Data
// const seedDatabase = async () => {
//   try {
//     // Connect to the database
//     await connectDB();

//     console.log('Clearing existing data...');
//     await User.deleteMany();
//     await Trip.deleteMany();
//     await Location.deleteMany();
//     await Activity.deleteMany();

//     console.log('Inserting users...');
//     await User.insertMany(users);

//     console.log('Inserting trips...');
//     await Trip.insertMany(trips);

//     console.log('Inserting locations...');
//     await Location.insertMany(locations);

//     console.log('Inserting activities...');
//     await Activity.insertMany(activities);

//     console.log('Database seeding completed!');
//     process.exit();
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// seedDatabase();


import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from './models/User.js'; // Update with your correct User model path
import config from './config/config.js'; // Ensure database connection config

const updateMockPassword = async () => {
  try {
    await mongoose.connect(config.mongoURI); // Replace with your database URI

    const user = await User.findOne({ username: 'john_doe' });
    if (!user) {
      console.log('User not found');
      return;
    }

    const hashedPassword = await bcrypt.hash('password123', 10); // Hash the password
    user.password = hashedPassword; // Update the password field
    await user.save(); // Save the updated user

    console.log('Password updated successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating password:', error);
    mongoose.connection.close();
  }
};

updateMockPassword();
