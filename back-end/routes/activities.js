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

export default router;
