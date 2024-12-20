import express from 'express';
import activitiesController from '../controllers/activitiesController.js';
import { ensureAuthenticated } from '../config/jwt-config.js'; 
import { validateGetActivityById, validateCreateActivity, validateEditActivity, validateDeleteComment, validateCreateComment, validateGetActivitiesByLocationId, validateUpvoteActivity, validateDownvoteActivity } from '../validators/activitiesValidators.js';


const router = express.Router();

// Get all activities
router.get('/', ensureAuthenticated, activitiesController.getActivities);

//Update Status
router.put('/:activityId/status', ensureAuthenticated, activitiesController.updateActivityStatus);


// Get activities by location ID
router.get('/location/:locationId', ensureAuthenticated, validateGetActivitiesByLocationId, activitiesController.getActivitiesByLocation);

// Get a specific activity by ID
router.get('/:activityId', ensureAuthenticated, validateGetActivityById, activitiesController.getActivityById);

// Get a specific activity by ID
//haven't written the validator
router.put('/:activityId', ensureAuthenticated, validateEditActivity, activitiesController.editActivity);

// Create a new activity
router.post('/', ensureAuthenticated, validateCreateActivity, activitiesController.createActivity);

// Upvote an activity
router.post('/:activityId/upvote', ensureAuthenticated, validateUpvoteActivity, activitiesController.upvoteActivity);

// Downvote an activity
router.post('/:activityId/downvote', ensureAuthenticated, validateDownvoteActivity, activitiesController.downvoteActivity);

// Add a comment to an activity
router.post('/:activityId/comments', ensureAuthenticated, validateCreateComment, activitiesController.addCommentToActivity);

//delete an entire activity (along with handling its dependencies)
router.delete('/:activityId', ensureAuthenticated, activitiesController.deleteActivity);

// Delete a comment from an activity
router.delete('/:activityId/comments/:commentId', ensureAuthenticated, validateDeleteComment, activitiesController.deleteCommentFromActivity);

export default router;
