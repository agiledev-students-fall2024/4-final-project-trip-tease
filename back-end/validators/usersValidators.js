import { param } from 'express-validator';
import { body } from 'express-validator';
import { validate } from './validatorsCommon.js';

/*
routes that don't need validators:
(because they don't have input fields to be processed)
1. '/me'
2. '/'
*/

export const validateGetUserById = validate([
    param('userId').isMongoId().withMessage('Invalid Trip ID, it must be a valid MongoDB ObjectId.')
]);

export const validateGetUserTripsById = validate([
    param('userId').isMongoId().withMessage('Invalid Trip ID, it must be a valid MongoDB ObjectId.')
]);

//validate post request to create user
//bio is the only optional field
export const validateCreateUser = validate([
    body('username').notEmpty().withMessage('Username is required.'),
    body('profileAvatar').notEmpty().withMessage('Avatar is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
    body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Email must be a valid email address.'),
    body('bio').if((value) => value !== undefined && value !== '').isString().withMessage('bio must be a string.'),
]);

//pretty much same as create user
export const validateUpdateUser = validate([
    body('username').notEmpty().withMessage('Username is required.'),
    body('profileAvatar').notEmpty().withMessage('Avatar is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
    body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Email must be a valid email address.'),
    body('bio').if((value) => value !== undefined && value !== '').isString().withMessage('bio must be a string.'),
]);

//have we actually built a route for this?
export const validateDeleteUserById = validate([
    param('userId').isMongoId().withMessage('Invalid Trip ID, it must be a valid MongoDB ObjectId.')
]);