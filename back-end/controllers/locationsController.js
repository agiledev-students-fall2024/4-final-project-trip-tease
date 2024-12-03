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
    console.log('location trying to get added!');
    try{

        //TODO (but not necessary): add a trip validation to make error handling more graceful

        const { name, address, tripId } = req.body;

        const newLoc = new Location({ 
            //all other fields will use their default values as defined in the schema
            //namely, the activities array will be set to [] because it is set as an array type in the schema
            name,
            address,
            tripId
        });

        const savedNewLoc = await newLoc.save(); //saves the location into the database
        console.log(savedNewLoc); //prints it, just for debugging

        const updatedTrip = await Trip.findByIdAndUpdate(
            tripId, //pass in the tripId
            { $push: { locations: savedNewLoc._id } }, //adds the id to the trip's locations array
            { new: true } //returns the new trip
        );

        res.status(201).json({
            message: 'saved location and added to trip :)',
            updatedTrip: updatedTrip,
            newLoc: savedNewLoc
        });

    }catch(error){
        console.error('error creating location :( ->', error);
        res.status(500).json({ error: 'failed to create a new location & add to trip...' });
    };
};

export default {
    getLocation,
    getLocationActivities,
    addLocation
  };