import express from 'express';
import locationsController from '../controllers/locationsController.js';
import { ensureAuthenticated } from '../config/jwt-config.js'; // Middleware for authentication
import { validateGetLocationById, validateCreateLocation, validateGetActivitiesForLocation } from '../validators/locationsValidators.js';

import fs from 'fs';

const router = express.Router();
const locations = JSON.parse(fs.readFileSync('./mock-data/locations.json', 'utf-8'));


//get all information for a specific location
router.get('/:locationId', ensureAuthenticated, validateGetLocationById, locationsController.getLocation);

//get activities for location
router.get('/activities/:locationId', ensureAuthenticated, validateGetActivitiesForLocation, locationsController.getLocationActivities);

//post route for adding a new location
router.post('/', ensureAuthenticated, validateCreateLocation, locationsController.addLocation);

/**
 * Update location information (PUT)
 * - Updates an existing location with new details and responds with the updated location.
 */
router.put('/:locationId', ensureAuthenticated,locationsController.updateLocation);


//not needed anymore because @ant built this in trips.js
// Get locations by Trip ID (GET) - Retrieve all locations associated with a specific trip
// router.get('/trip/:tripId', (req, res) => {
//     const tripId = req.params.tripId;
//     const filteredLocations = locations.filter(location => location.tripId === tripId);
    
//     if (filteredLocations.length > 0) {
//       res.json(filteredLocations);
//     } else {
//       res.status(404).json({ error: 'No locations found for this trip' });
//     }
//   });

// TODO: Create a new location (POST) - Add a new location to a trip and respond with the newly created location data
router.post('/', ensureAuthenticated,  (req, res)=>{
  const newLocation = {
    ...req.body,
    status: 'upcoming',
    activities: [],
    id: `location_${Date.now()}`,
    image: "https://picsum.photos/200/305" //right now, not implementing the upload photo route
  };
  console.log('new location:'); //instead, this should be a backend connection that goes to the database
  console.log(newLocation);
  res.status(201).json(newLocation);
});

//Streth Goal Routes
// TODO: Update location information (PUT) - Modify location data and respond with the updated location information
// TODO: Delete a location (DELETE) - Remove the specified location and respond with a confirmation message

export default router;
