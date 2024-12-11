import Activity from '../models/Activity.js';
import Location from '../models/Location.js';
import User from '../models/User.js';

// Get all activities
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find(); // Fetch all activities
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error.message);
    res.status(500).json({ error: 'Failed to retrieve activities' });
  }
};

// Get activities by location ID
const emojiMap = ['😀', '🍕', '🎉', '🐶', '🌟', '🎸', '🛹']; // Example emojis

const getActivitiesByLocation = async (req, res) => {
  try {
    const { locationId } = req.params;

    // Fetch activities for the specified location
    const activities = await Activity.find({ locationId }).lean();

    if (activities.length === 0) {
      // Return an empty array if no activities are found
      return res.status(200).json([]);
    }

    // Collect unique user IDs from activities and comments
    const userIds = new Set();
    activities.forEach((activity) => {
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
        avatar: user.profileAvatar || emojiMap[index % emojiMap.length], // Assign emoji if no avatar
      };
      return acc;
    }, {});

    // Enrich activities and comments with cached usernames and avatars
    const enrichedActivities = activities.map((activity) => ({
      ...activity,
      cachedUsername: userMap[activity.createdBy]?.username || 'Unknown User',
      cachedAvatar: userMap[activity.createdBy]?.avatar || '🤔', // Default emoji if no avatar
      comments: activity.comments.map((comment) => ({
        ...comment,
        cachedUsername: userMap[comment.userId]?.username || 'Anonymous',
        cachedAvatar: userMap[comment.userId]?.avatar || '👻', // Default emoji for anonymous
      })),
    }));

    // Return enriched activities
    res.status(200).json(enrichedActivities);
  } catch (error) {
    console.error('Error fetching activities by location:', error.message);
    res.status(500).json({ error: 'Failed to retrieve activities for this location' });
  }
};




// Get a specific activity by ID
const getActivityById = async (req, res) => {
  try {
    const { activityId } = req.params;
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    console.error('Error fetching activity by ID:', error.message);
    res.status(500).json({ error: 'Failed to retrieve activity' });
  }
};

// Create a new activity
const createActivity = async (req, res) => {
  try {
    const { name, description, price, locationId, type } = req.body; // Add `type`

    // Check if location exists
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Validate `type` field to ensure it matches the allowed values
    const allowedTypes = ['food', 'activities', 'stay'];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid activity type' });
    }

    // Create new activity
    const newActivity = new Activity({
      name,
      description,
      locationId,
      tripId: location.tripId, // Fetch tripId from the location
      price: parseInt(price, 10), // Ensure price is stored as a number
      type, // Include the type field
      createdBy: req.user?.id || 'system', // Use authenticated user or default to 'system'
    });

    const savedActivity = await newActivity.save();

    // Update the location with the new activity
    await Location.findByIdAndUpdate(
      locationId,
      { $push: { activities: savedActivity._id } },
      { new: true }
    );

    res.status(201).json(savedActivity);
  } catch (error) {
    console.error('Error creating activity:', error.message);
    res.status(500).json({ error: 'Failed to create activity' });
  }
};

//Updated Activity
const updateActivityStatus = async (req, res) => {
  const { activityId } = req.params;
  const { isCompleted } = req.body;

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    activity.isCompleted = isCompleted;
    await activity.save();
    
    res.status(200).json({
      message: 'Activity status updated successfully',
      activity
    });
  } catch (error) {
    console.error('Error updating activity status:', error);
    res.status(500).json({ error: 'Failed to update activity status' });
  }
};

// Upvote an activity
const upvoteActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    activity.votes += 1;
    await activity.save();

    res.status(200).json({ message: 'Upvoted successfully', votes: activity.votes });
  } catch (error) {
    console.error('Error upvoting activity:', error.message);
    res.status(500).json({ error: 'Failed to upvote activity' });
  }
};

// Downvote an activity
const downvoteActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    if (activity.votes > 0) {
      activity.votes -= 1;
      await activity.save();
    } else {
      return res.status(400).json({ error: 'Votes cannot be less than 0' });
    }

    res.status(200).json({ message: 'Downvoted successfully', votes: activity.votes });
  } catch (error) {
    console.error('Error downvoting activity:', error.message);
    res.status(500).json({ error: 'Failed to downvote activity' });
  }
};

// Add a comment to an activity
const addCommentToActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const { userId, commentString } = req.body;

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    const comment = {
      id: `comment_${Date.now()}`,
      userId,
      commentString,
    };

    activity.comments.push(comment);
    await activity.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error.message);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Delete a comment from an activity
const deleteCommentFromActivity = async (req, res) => {
  try {
    const { activityId, commentId } = req.params;

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    const commentIndex = activity.comments.findIndex((comment) => comment.id === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    activity.comments.splice(commentIndex, 1);
    await activity.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error.message);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

export default {
  getActivities,
  getActivitiesByLocation,
  getActivityById,
  createActivity,
  updateActivityStatus,
  upvoteActivity,
  downvoteActivity,
  addCommentToActivity,
  deleteCommentFromActivity,
};
