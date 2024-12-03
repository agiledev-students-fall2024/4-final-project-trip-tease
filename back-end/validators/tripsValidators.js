import { param } from 'express-validator';
import { validate } from './validatorsCommon.js'; //this is the validate function we wrote

//no validation for get all trips because no params or body needed to be checked

//validate get trip by id
//to see where this is called, check back-end/routes/trips.js and get trip by id should be the second route
export const validateGetTripById = validate([
    param('tripId').isMongoId().withMessage('Invalid Trip ID. It must be a valid MongoDB ObjectId.')
]);

//basically the same as the previous one
export const validateGetTripLocations = validate([
    param('tripId').isMongoId().withMessage('Invalid Trip ID. It must be a valid MongoDB ObjectId.')
]);