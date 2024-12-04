import { param, body } from 'express-validator';
import { validate } from './validatorsCommon.js';


export const validateGetLocationById = validate([
    param('locationId').isMongoId().withMessage('Invalid Location ID, it must be a valid MongoDB ObjectId.')
]);


export const validateCreateLocation = validate([
    body('name').notEmpty().withMessage('Location name is required.'),
    body('tripId').notEmpty().isMongoId().withMessage('Trip ID must be a valid MongoDB ObjectId.'),
    body('address').if((value) => value !== undefined && value !== '').isString().withMessage('Address must be a string.'),
    body('image').if((value) => value !== undefined && value !== '').isURL().withMessage('Image must be a valid URL.'),
]);

export const validateGetActivitiesForLocation = validate([
    param('locationId')
        .isMongoId()
        .withMessage('Invalid Location ID, it must be a valid MongoDB ObjectId.')
]);
