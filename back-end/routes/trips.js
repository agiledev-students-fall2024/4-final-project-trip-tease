import express from 'express';
import tripsController from '../controllers/tripsController.js';
import { ensureAuthenticated } from '../config/jwt-config.js'; // Middleware for authentication
import { validateGetTripById, validateGetTripLocations, validateCreateTrip, validateJoinTrip, validateUpdateTripStatus } from '../validators/tripsValidators.js'; //import the validators
import fs from 'fs';

const router = express.Router();
// const trips = JSON.parse(fs.readFileSync('./mock-data/trips.json', 'utf-8'));
// const locations = JSON.parse(fs.readFileSync('./mock-data/locations.json', 'utf-8'));
// const users = JSON.parse(fs.readFileSync('./mock-data/users.json', 'utf-8'));

// Get all trips (GET) - Retrieve and respond with a list of all trips in the system
router.get('/', ensureAuthenticated, tripsController.getAllTrips);

// Get a specific trip by ID (GET) - Retrieve details for the specified trip, including associated locations and participants
router.get('/:tripId', ensureAuthenticated, validateGetTripById, tripsController.getTripById);
//note: here is the example validator call
//note: ensure authenticated ALWAYS GOES FIRST

// Get Trip info (locations) for a specific trip by tripId
router.get('/:tripId/locations', ensureAuthenticated, validateGetTripLocations, tripsController.getTripLocations);

// Create a new trip (POST) - Add a new trip to the system and respond with the newly created trip data
router.post('/', ensureAuthenticated, validateCreateTrip, tripsController.createTrip);

// Join a Trip (POST) - Check if trip exists and add to user's and trip's data if valid
router.post('/:tripId/join', ensureAuthenticated, validateJoinTrip, tripsController.joinTrip);

// Update trip status by Trip ID (PUT) - Modify the status of a trip (e.g., upcoming, ongoing, completed)
router.put('/:tripId/status', ensureAuthenticated, validateUpdateTripStatus, tripsController.updateTripStatus);

//Stretch Goal Routes
// TODO: Update trip information (PUT) - Modify trip data and respond with the updated information
// TODO: Delete a trip (DELETE) - Remove the specified trip and respond with a confirmation message

export default router;
