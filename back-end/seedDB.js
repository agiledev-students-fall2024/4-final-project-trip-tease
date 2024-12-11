// 

import mongoose from 'mongoose';
import User from './models/User.js'; // Adjust the path as needed
import Trip from './models/Trip.js'; // Adjust the path as needed
import config from './config/config.js'; // Update with your database connection config

const assignJohnDoeAsOwner = async () => {
  try {
    // Connect to the database
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB.');

    // John Doe's user ID
    const johnDoeId = '64b1c7c8f2a5b9a2d5c8f001';

    // Fetch trips where John Doe is a participant
    const trips = await Trip.find({ participants: johnDoeId });

    if (trips.length === 0) {
      console.log('No trips found where John Doe is a participant.');
      return;
    }

    // Update each trip to set John Doe as the owner
    for (const trip of trips) {
      if (!trip.owner) { // Only update if the owner is not already set
        trip.owner = johnDoeId; // Set John Doe as the owner
        await trip.save(); // Save the updated trip
        console.log(`Updated trip ${trip._id} with owner John Doe (${johnDoeId}).`);
      } else {
        console.log(`Trip ${trip._id} already has an owner (${trip.owner}).`);
      }
    }

    console.log('All applicable trips updated with John Doe as owner.');
  } catch (error) {
    console.error('Error assigning John Doe as owner:', error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

// Run the script
assignJohnDoeAsOwner();
