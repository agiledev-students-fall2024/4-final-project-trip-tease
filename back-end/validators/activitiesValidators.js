import { param, body } from 'express-validator';
import { validate } from './validatorsCommon.js';


export const validateGetActivityById = validate([
    param('activityId').isMongoId().withMessage('Invalid Activity ID, it must be a valid MongoDB ObjectId.')
]);

export const validateCreateActivity = validate([
    body('name').notEmpty().withMessage('Activity name is required.'),
    body('locationId').notEmpty().isMongoId().withMessage('Location ID must be a valid MongoDB ObjectId.'),
    body('type')
        .notEmpty()
        .isIn(['food', 'activities', 'stay'])
        .withMessage('Type must be one of: food, activities, stay.'),
    body('price').if((value) => value !== undefined).isInt({ min: 0, max: 4 }).withMessage('Price must be an integer between 0 and 4.'),
    body('description').if((value) => value !== undefined && value !== '').isString().withMessage('Description must be a string.'),
    body('image').if((value) => value !== undefined && value !== '').isURL().withMessage('Image must be a valid URL.'),
]);

export const validateEditActivity = validate([
    param('activityId').isMongoId().withMessage('Activity ID must be a valid MongoDB ObjectId.'),
    body('name').if((value) => value !== undefined && value !== '').isString().withMessage('Activity name must be a string.'),
    body('description').if((value) => value !== undefined && value !== '').isString().withMessage('Description must be a string.'),
    body('price')
        .if((value) => value !== undefined && value !== '')
        .isInt({ min: 0, max: 4 })
        .withMessage('Price must be an integer between 0 and 4.'),
    body('isCompleted').if((value) => value !== undefined && value !== '').isBoolean().withMessage('Status (isCompleted) must be a boolean value.'),
]);

export const validateCreateComment = validate([
    param('activityId')
        .isMongoId()
        .withMessage('Invalid Activity ID, it must be a valid MongoDB ObjectId.'),
    body('userId')
        .notEmpty()
        .isMongoId()
        .withMessage('User ID is required and must be a valid MongoDB ObjectId.'),
    body('commentString')
        .notEmpty()
        .isString()
        .withMessage('Comment content is required and must be a string.')
]);

export const validateDeleteComment = validate([
    param('activityId')
        .isMongoId()
        .withMessage('Invalid Activity ID, it must be a valid MongoDB ObjectId.'),
    param('commentId')
        .isString()
        .notEmpty()
        .withMessage('Comment ID is required and must be a valid string.')
]);

export const validateGetActivitiesByLocationId = validate([
    param('locationId')
        .isMongoId()
        .withMessage('Invalid Location ID, it must be a valid MongoDB ObjectId.')
]);

export const validateUpvoteActivity = validate([
    param('activityId')
        .isMongoId()
        .withMessage('Invalid Activity ID, it must be a valid MongoDB ObjectId.')
]);

export const validateDownvoteActivity = validate([
    param('activityId')
        .isMongoId()
        .withMessage('Invalid Activity ID, it must be a valid MongoDB ObjectId.')
]);