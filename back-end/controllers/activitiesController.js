import Activity from '../models/Activity.js'; // Activity model
import Location from '../models/Location.js'; //Location model used to get the tripId

// Get all activities (GET) - Retrieve and respond with a list of all activities in the system
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find(); 
    res.status(200).json(activities); 
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Failed to retrieve activities' }); 
  }
};

// Get activities by locationId (GET) - Retrieve activities filtered by a specific location
const getActivitiesByLocation = async (req, res) => {
  try {
    const { locationId } = req.params; // Extract locationId from the request parameters
    const activities = await Activity.find({ locationId }); // Find activities with the given locationId

    if (activities.length > 0) {
      res.status(200).json(activities); // Respond with the filtered activities
    } else {
      res.status(404).json({ error: 'No activities found for this location' }); // Handle case where no activities are found
    }
  } catch (error) {
    console.error('Error fetching activities by location:', error);
    res.status(500).json({ error: 'Failed to retrieve activities for this location' }); // Handle errors
  }
};

// Placeholder functions for other routes
const createActivity = async (req, res) => {

  try{
    //get info from submitted form
    const { name, description, price, locationId } = req.body;

    //get associated tripId
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    const tripId = location.tripId;

    //create the new activity
    const newActivity = new Activity({
      name,
      description,
      locationId,
      tripId,
      price,
      description: '',
      createdBy: '64b1c7c8f2a5b9a2d5c8f001',
      //TODO: change createdBy once auth implemented
      // just took a random userId i found in the database tbh, lol, i've no idea which user this actually is hahaha
      //maybe we set this through auth?
      type: 'activities', //this also shouldn't be directly set to activities, but we haven't set this in the form
      //we also might just get rid of this filter so...
    });

    //save the activity
    const savedActivity = await newActivity.save();

    //append the new activity to the associated location
    const updatedLocation = await Location.findByIdAndUpdate(
      locationId, //this is what we are searching by
      { $push: { activities: savedActivity._id } }, //this is what does the appending
      { new: true } //this returns the updated location in case we want to send it back too
    );

    res.status(201).json({
      message: 'activity created successfully :)',
      activity: savedActivity,
      updatedLocation: updatedLocation
    });

  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'failed to add activity :(' });
  };
};

const upvoteActivity = async (req, res) => {
  const { activityId } = req.params;

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    activity.votes += 1; // Increment votes
    await activity.save(); // Save changes to the database

    res.status(200).json({ message: 'Activity upvoted successfully', votes: activity.votes });
  } catch (error) {
    console.error('Error upvoting activity:', error);
    res.status(500).json({ error: 'Failed to upvote activity' });
  }
};

const downvoteActivity = async (req, res) => {
  const { activityId } = req.params;

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    if (activity.votes > 0) {
      activity.votes -= 1; 
      await activity.save(); 
      return res.status(200).json({ message: 'Activity downvoted successfully', votes: activity.votes });
    } else {
      return res.status(400).json({ message: 'Votes cannot go below 0', votes: activity.votes });
    }
  } catch (error) {
    console.error('Error downvoting activity:', error);
    res.status(500).json({ error: 'Failed to downvote activity' });
  }
};

//TODO: show profile picture and name of comment once auth implemented
const addCommentToActivity = async (req, res) => {
  const { activityId } = req.params;
  const { userId, commentString } = req.body;

  if (!userId || !commentString) {
      return res.status(400).json({ error: 'Missing required comment fields' });
  }

  try {
      const activity = await Activity.findById(activityId);
      if (!activity) {
          return res.status(404).json({ error: 'Activity not found' });
      }

      const comment = {
          userId,
          commentString
      };
      activity.comments.push(comment);

      await activity.save();
      res.status(201).json({ message: 'Comment added successfully', comments: activity.comments });
  } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Failed to add comment' });
  }
};



const deleteCommentFromActivity = async (req, res) => {
  const { activityId, commentId } = req.params;

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    const commentIndex = activity.comments.findIndex(comment => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    activity.comments.splice(commentIndex, 1);
    await activity.save();
    res.status(200).json({ message: 'Comment deleted successfully', activity });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};


// Export all controller functions as a single default object
export default {
  getActivities,
  getActivitiesByLocation,
  createActivity,
  upvoteActivity,
  downvoteActivity,
  addCommentToActivity,
  deleteCommentFromActivity,
};
