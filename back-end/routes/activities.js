import express from 'express';
// import * as activitiesController from '../controllers/activitiesController.js';
import activitiesController from '../controllers/activitiesController.js';
import fs from 'fs';

const router = express.Router();
// const activities = JSON.parse(fs.readFileSync('./mock-data/activities.json', 'utf-8'));
// const activitiesPath = './mock-data/activities.json'; // Define activitiesPath globally

// Get all activities (GET) - Retrieve and respond with a list of all activities in the system
router.get('/', activitiesController.getActivities);

  //we don't need this, we want to access the database
  // const saveActivitiesToFile = () => {
  //   fs.writeFileSync(activitiesPath, JSON.stringify(activities, null, 2), 'utf-8');
  // };

//TODO: build the controller
router.post('/', activitiesController.createActivity);


router.get('/location/:locationId', (req, res) => {
    const locationId = req.params.locationId;
    const filteredActivities = activities.filter(activity => activity.locationId === locationId);
  
    if (filteredActivities.length > 0) {
      res.json(filteredActivities);
    } else {
      res.status(404).json({ error: 'No activities found for this location' });
    }
  });
  
// I think this might not need to be used, could delete @ant
// Get a specific activity by ID (GET) - Retrieve details for the specified activity, including embedded comments
router.get('/:activityId', (req, res) => {
    const activityId = req.params.activityId;
    const activity = activities.find(a => a.id === activityId);
  
    if (activity) {
      res.json(activity);
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  });

// Create a new activity (POST) - Add a new activity within a location and respond with the newly created activity data
//note: we don't have any error handling here, we need to add this once we include the database connection.
// ie. if it fails to send the data to the database, it should send back a 4xx code, although it may not be possible because
//form submit only happens when all fields are inputted correctly
router.post('/', (req, res) => {
    const newActivity = {
      id: `activity_${Date.now()}`, // @ant what is the correct way for me to create activity IDs?
      ...req.body // right now, we are getting incomplete forms so the object data is also incomplete
    };
  
    console.log(newActivity);
    // activities.push(newActivity);
    // fs.writeFileSync('./mock-data/activities.json', JSON.stringify(activities, null, 2), 'utf-8');
    res.status(201).json(newActivity);
  });

// We don't have an edit functionality yet
// Update activity information (PUT) - Modify the specified activity data and respond with the updated activity information
router.put('/:activityId', (req, res) => {
    const activityId = req.params.activityId;
    const activityIndex = activities.findIndex(a => a.id === activityId);
  
    if (activityIndex !== -1) {
      activities[activityIndex] = { ...activities[activityIndex], ...req.body };
      fs.writeFileSync('./mock-data/activities.json', JSON.stringify(activities, null, 2), 'utf-8');
      res.json(activities[activityIndex]);
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  });  

// Currently, we don't have a delete button
// Delete an activity (DELETE) - Remove the specified activity and respond with a confirmation message
router.delete('/:activityId', (req, res) => {
    const activityId = req.params.activityId;
    const activityIndex = activities.findIndex(a => a.id === activityId);
  
    if (activityIndex !== -1) {
      activities.splice(activityIndex, 1);
      fs.writeFileSync('./mock-data/activities.json', JSON.stringify(activities, null, 2), 'utf-8');
      res.json({ message: 'Activity deleted successfully' });
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  });  

router.post('/:activityId/upvote', activitiesController.upvoteActivity);

router.post('/:activityId/downvote', activitiesController.downvoteActivity);

// Add a comment to an activity (POST) - Add a new comment to the activity and respond with the created comment data

router.post('/:activityId/comments', activitiesController.addCommentToActivity);


//I removed update bc it seem redundant and not needed for now we can implement later if wanted
//we should add an update or delete later on TODO:


// Delete a comment (DELETE) - Remove the specified comment and respond with a confirmation message

router.delete('/:activityId/comments/:commentId', activitiesController.deleteCommentFromActivity);

router.put('/:activityId/toggle-completion', activitiesController.toggleActivityCompletion);

export default router;