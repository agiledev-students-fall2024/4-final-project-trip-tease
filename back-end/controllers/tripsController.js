import Trip from '../models/Trip.js'; // Trip model
import User from '../models/User.js'; // User model
import mongoose from 'mongoose'; // Import mongoose for object ID validation

// Get all trips (GET) - Retrieve and respond with a list of all trips in the system
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate('participants') // Populate participant details
      .populate('locations');   // Populate location details
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ error: 'Failed to retrieve trips' });
  }
};

// Get a specific trip by ID (GET) - Retrieve details for the specified trip, including associated locations and participants
const getTripById = async (req, res) => {
  try {
    const tripId = req.params.tripId; // Extract trip ID from the request parameters
    const trip = await Trip.findById(tripId)
      .populate('participants') // Include full details for participants
      .populate('locations');   // Include full details for locations

    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ error: 'Trip not found' });
    }
  } catch (error) {
    console.error('Error fetching trip by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve the trip' });
  }
};

// Get locations for a specific trip by tripId (GET) - Retrieve only the locations associated with a specific trip
const getTripLocations = async (req, res) => {
  try {
    const tripId = req.params.tripId; // Extract trip ID from the request parameters
    const trip = await Trip.findById(tripId).populate('locations'); // Populate the locations field

    if (trip && trip.locations.length >= 0) {
      res.status(200).json(trip.locations);
    } else {
      res.status(404).json({ error: 'No locations found for this trip' });
    }
  } catch (error) {
    console.error('Error fetching trip locations:', error);
    res.status(500).json({ error: 'Failed to retrieve locations for the trip' });
  }
};

// Create a new trip (POST) - Add a new trip to the system and respond with the newly created trip data
const createTrip = async (req, res) => {
  try {
    const { name, description, startDate, endDate, image } = req.body;

    // Validate the required fields
    if (!name) {
      return res.status(400).json({ error: 'Trip name is required.' });
    }

    // Prepare new trip data
    const newTripData = {
      name,
      description: description || '', // Default to an empty string if not provided
      startDate: startDate ? new Date(startDate) : undefined, // Convert to Date if provided
      endDate: endDate ? new Date(endDate) : undefined, // Convert to Date if provided
      image: image || 'https://picsum.photos/200', // Default to an empty string if not provided
      status: 'upcoming', // Set default status to "upcoming"
      participants: req.user ? [req.user._id] : [], // Add the creator as the first participant if authenticated
    };

    // Create and save the new trip
    const newTrip = new Trip(newTripData);
    const savedTrip = await newTrip.save();

    // Update the user's trips array
    if (req.user) {
      await User.findByIdAndUpdate(
        req.user._id, // User's ID
        { $push: { trips: savedTrip._id } }, // Add the trip ID to the user's trips array
        { new: true } // Return the updated document
      );
    }

    res.status(201).json(savedTrip); // Respond with the newly created trip
  } catch (error) {
    console.error('Error creating trip:', error.message);
    res.status(500).json({ error: 'Failed to create the trip.' });
  }
};

// Join a trip (POST) - Add a user to the list of participants for a specific trip
const joinTrip = async (req, res) => {
  try {
    const { tripId } = req.params; // Extract trip ID from the request parameters
    const { userId } = req.body; // Extract user ID from the request body

    console.log(`Attempting to join trip: tripId=${tripId}, userId=${userId}`);

    // Validate tripId format
    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      console.error('Invalid trip ID format');
      return res.status(400).json({ message: 'Invalid trip ID format. Please enter a valid trip ID.' });
    }

    const trip = await Trip.findById(tripId); // Find the trip by ID
    const user = await User.findById(userId); // Find the user by ID

    if (!trip) {
      console.error('Trip not found');
      return res.status(404).json({ message: 'Trip not found. Please check the trip ID and try again.' });
    }

    if (!user) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found. Please ensure you are logged in and try again.' });
    }

    // Check if the user is already a participant
    if (trip.participants.includes(userId)) {
      console.error('User already a participant');
      return res.status(400).json({ message: 'You are already a participant in this trip.' });
    }

    // Add user to trip participants
    trip.participants.push(userId);

    // Add trip to user's list of trips
    user.trips.push(tripId);

    // Save changes to both trip and user
    await trip.save();
    await user.save();

    res.status(200).json({ message: 'Successfully joined the trip', trip });
  } catch (error) {
    console.error('Error joining trip:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};



// Update trip status (PUT) - Modify the status of a trip (e.g., upcoming, ongoing, completed)
const updateTripStatus = async (req, res) => {
  try {
    const { tripId } = req.params; // Extract trip ID from the request parameters
    const { status } = req.body; // Extract the new status from the request body

    const trip = await Trip.findById(tripId); // Find the trip by ID

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' }); // Handle case where trip does not exist
    }

    trip.status = status; // Update the status field
    await trip.save(); // Save the changes to the database

    res.status(200).json({ message: 'Trip status updated successfully', trip }); // Respond with the updated trip
  } catch (error) {
    console.error('Error updating trip status:', error);
    res.status(500).json({ error: 'Failed to update trip status' });
  }
};

// Placeholder functions for other routes
const updateTrip = async (req, res) => {
  res.status(501).json({ message: 'Update trip endpoint not implemented yet' });
};

const deleteTrip = async (req, res) => {
  res.status(501).json({ message: 'Delete trip endpoint not implemented yet' });
};

// Export all controller functions as a single default object
export default {
  getAllTrips,
  getTripById,
  getTripLocations,
  createTrip,
  joinTrip,
  updateTripStatus,
  updateTrip,
  deleteTrip,
};
