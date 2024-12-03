import Activity from '../models/Activity.js';
import Location from '../models/Location.js';

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
const getActivitiesByLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const activities = await Activity.find({ locationId }); // Fetch activities for the location
    if (activities.length === 0) {
      return res.status(404).json({ error: 'No activities found for this location' });
    }
    res.status(200).json(activities);
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
    const { name, description, price, locationId } = req.body;

    // Check if location exists
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Create new activity
    const newActivity = new Activity({
      name,
      description,
      locationId,
      tripId: location.tripId, // Fetch tripId from the location
      price,
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
  upvoteActivity,
  downvoteActivity,
  addCommentToActivity,
  deleteCommentFromActivity,
};
