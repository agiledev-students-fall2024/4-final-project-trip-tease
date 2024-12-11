import  Location from '../models/Location.js'; // Location model
import  Activity from '../models/Activity.js'; // Activity model
import Trip from '../models/Trip.js';
import User from '../models/User.js'; // User model

const emojiMap = ['😀', '🍕', '🎉', '🐶', '🌟', '🎸', '🛹']; // Example emojis

export const getLocation = async (req, res) => {
  try {
    const locationId = req.params.locationId;

    // Fetch the location and populate activities
    const location = await Location.findById(locationId).populate('activities').lean();
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Collect unique user IDs from activities and comments
    const userIds = new Set();
    location.activities.forEach((activity) => {
      userIds.add(activity.createdBy); // Collect activity creator IDs
      activity.comments.forEach((comment) => {
        userIds.add(comment.userId); // Collect commenter IDs
      });
    });

    // Fetch user information based on collected user IDs
    const users = await User.find({ _id: { $in: [...userIds] } }).lean();
    const userMap = users.reduce((acc, user, index) => {
      acc[user._id] = {
        username: user.username,
        avatar: user.profileAvatar, // Assign emoji
      };
      return acc;
    }, {});

    // Enrich activities and comments with cached usernames and avatars
    const enrichedActivities = location.activities.map((activity) => ({
      ...activity,
      cachedUsername: userMap[activity.createdBy]?.username || 'Unknown User',
      cachedAvatar: userMap[activity.createdBy]?.avatar || '🤔',
      comments: activity.comments.map((comment) => ({
        ...comment,
        cachedUsername: userMap[comment.userId]?.username || 'Anonymous',
        cachedAvatar: userMap[comment.userId]?.avatar || '👻',
      })),
    }));

    // Return enriched location object with activities
    const enrichedLocation = {
      ...location,
      activities: enrichedActivities,
    };

    res.json(enrichedLocation);
  } catch (error) {
    console.error('Error fetching location details:', error);
    res.status(500).json({ error: 'Failed to retrieve location details' });
  }
};

  

export const getLocationActivities = async (req, res) => {
    console.log('this is being used!')
    try{
        const locationId = req.params.locationId;
        const location = await Location.findById(locationId).populate('activities');
        res.json(location.activities);

    }catch(error){
        res.status(500).json({ error: 'Failed to retrieve activities for the location' });
    };
}

export const addLocation = async (req, res) => {
  console.log('Attempting to add location...');
  try {
      const { name, address, tripId, image } = req.body;

      // Validate input fields
      if (!name || !tripId) {
          return res.status(400).json({ error: 'Name and tripId are required fields.' });
      }

      // Check if the trip exists
      const trip = await Trip.findById(tripId);
      if (!trip) {
          return res.status(404).json({ error: 'Trip not found. Cannot add location to a non-existent trip.' });
      }

      // Create a new location
      const newLocation = new Location({
          name,
          address,
          tripId, // Link the location to the trip
          image: image || 'https://picsum.photos/200', // Use default image if none provided
      });

      // Save the location to the database
      const savedLocation = await newLocation.save();
      console.log('New location saved:', savedLocation);

      // Update the trip with the new location ID
      const updatedTrip = await Trip.findByIdAndUpdate(
          tripId,
          { $push: { locations: savedLocation._id } }, // Add the location ID to the trip's locations array
          { new: true } // Return the updated trip
      );

      if (!updatedTrip) {
          return res.status(404).json({ error: 'Failed to update trip with new location.' });
      }

      // Respond with success
      res.status(201).json({
          message: 'Location successfully created and added to trip.',
          newLocation,
          updatedTrip,
      });
  } catch (error) {
      console.error('Error adding location:', error.message);
      res.status(500).json({ error: 'Failed to create location and update trip.' });
  }
};


/**
 * Update a location (PUT)
 * - Updates details of an existing location, such as name, address, or image.
 * @param {string} locationId - The ID of the location to update.
 * @param {string} name - Updated name for the location.
 * @param {string} address - Updated address or description for the location.
 * @param {string} image - Updated image URL for the location.
 */
export const updateLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const { name, address, image } = req.body;

    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ error: 'Location not found.' });
    }

    if (name) location.name = name;
    if (address) location.address = address;
    if (image) location.image = image;

    const updatedLocation = await location.save();
    res.status(200).json(updatedLocation);
  } catch (error) {
    console.error('Error updating location:', error.message);
    res.status(500).json({ error: 'Failed to update the location.' });
  }
};

export default {
  getLocation,
  getLocationActivities,
  addLocation,
  updateLocation,
};