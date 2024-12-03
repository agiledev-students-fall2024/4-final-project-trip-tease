import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from './config.js';
import User from '../models/User.js';

/* 
  JWT Configuration:
  - Strategy: Passport JWT for authentication using JSON Web Tokens.
  - Extracts token from Authorization header (Bearer token).
  - Verifies token with the secret key and loads user information.
*/
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token
  secretOrKey: config.jwtSecret, // Secret key for token verification
};

/* 
  JWT Verification Function:
  - Validates the token's payload and fetches the associated user from the database.
*/
const jwtVerify = async (jwtPayload, done) => {
  try {
    console.log('JWT Payload:', jwtPayload); // Debugging step
    const user = await User.findById(jwtPayload.id).select('-passwordHash');
    if (user) {
      return done(null, user); // Attach user object to req.user
    }
    return done(null, false, { message: 'Invalid token or user not found.' });
  } catch (error) {
    console.error('Error in JWT verification:', error.message);
    return done(error, false);
  }
};


// Apply the JWT strategy
passport.use(new JwtStrategy(jwtOptions, jwtVerify));

/* 
  Middleware for Authentication:
  - Uses Passport's JWT strategy to authenticate requests.
  - Protects endpoints by ensuring valid tokens are passed.
*/
export const ensureAuthenticated = passport.authenticate('jwt', { session: false });

export default passport;
