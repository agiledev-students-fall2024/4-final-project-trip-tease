import { param } from 'express-validator';
import { body } from 'express-validator';
import { validate } from './validatorsCommon.js'; //this is the validate function we wrote

//no validation for get all trips because no params or body needed to be checked

//validate get trip by id
//to see where this is called, check back-end/routes/trips.js and get trip by id should be the second route
export const validateGetTripById = validate([
    param('tripId').isMongoId().withMessage('Invalid Trip ID, it must be a valid MongoDB ObjectId.')
]);

//basically the same as the previous one
export const validateGetTripLocations = validate([
    param('tripId').isMongoId().withMessage('Invalid Trip ID, it must be a valid MongoDB ObjectId.')
]);

//this is the create trip validator
//note that instead of using optional, we use a conditional if, because if it doesn't exist we want to halt subsequent checks to that value
export const validateCreateTrip = validate([
    body('name').notEmpty().withMessage('Trip name is required.'),
    body('description').if((value) => value !== undefined && value !== '').isString().withMessage('Description must be a string.'),
    body('startDate').if((value) => value !== undefined && value !== '').isISO8601().toDate().withMessage('Start date must be a valid ISO 8601 date.'),
    body('endDate').if((value) => value !== undefined && value !== '').isISO8601().toDate().withMessage('End date must be a valid ISO 8601 date.'),
    body('image').if((value) => value !== undefined && value !== '').isURL().withMessage('Image must be a valid URL.'),
]);

//join trip validator
export const validateJoinTrip = validate([
    param('tripId').isMongoId().withMessage('Invalid Trip ID. It must be a valid MongoDB ObjectId.'),
    body('userId').isMongoId().withMessage('Invalid User ID. It must be a valid MongoDB ObjectId.')
]);

//update trip status validator
export const validateUpdateTripStatus = validate([
    param('tripId').isMongoId().withMessage('Invalid Trip ID. It must be a valid MongoDB ObjectId.'),
    body('status').isString().withMessage('Status must be a string.').isIn(['upcoming', 'ongoing', 'completed']).withMessage('Status must be one of: upcoming, ongoing, completed.'),
]);