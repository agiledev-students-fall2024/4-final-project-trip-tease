//this will contain the global error handling function that will be imported into the rest of the validators files
import { validationResult } from 'express-validator';


// validation result handler, this will be used LITERALLY EVERYWHERE, in all the functions, this is the main fn of this file
// this function returns an array of middleware to run, read comments in function to read what they are
// the array of middleware will be called sequentially by each route
export const validate = (rules)=>
    [...rules, //destructures the rules array of middleware functions we pass in -> each one is an express-validator rule that adds errors to the request
        (req,res,next) => { // this is the last function in the array, which a middleware function that checks if errors exist using validationResult() 
                            // which is from express-validator
                            // and sends the appropriate response
            const errors = validationResult(req);
            console.log('validating!');
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ];