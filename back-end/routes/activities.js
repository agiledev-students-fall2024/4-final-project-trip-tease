import express from 'express';
import activitiesController from '../controllers/activitiesController.js';
import { ensureAuthenticated } from '../config/jwt-config.js'; // Middleware for authentication


const router = express.Router();

// Get all activities
router.get('/', ensureAuthenticated, activitiesController.getActivities);

// Get activities by location ID
router.get('/location/:locationId', ensureAuthenticated, activitiesController.getActivitiesByLocation);

// Get a specific activity by ID
router.get('/:activityId', ensureAuthenticated, activitiesController.getActivityById);

// Create a new activity
router.post('/', ensureAuthenticated, activitiesController.createActivity);

// Upvote an activity
router.post('/:activityId/upvote', ensureAuthenticated, activitiesController.upvoteActivity);

// Downvote an activity
router.post('/:activityId/downvote', ensureAuthenticated, activitiesController.downvoteActivity);

// Add a comment to an activity
router.post('/:activityId/comments', ensureAuthenticated, activitiesController.addCommentToActivity);

// Delete a comment from an activity
router.delete('/:activityId/comments/:commentId', ensureAuthenticated, activitiesController.deleteCommentFromActivity);

<<<<<<< HEAD
export default router;
=======
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
>>>>>>> origin/master
