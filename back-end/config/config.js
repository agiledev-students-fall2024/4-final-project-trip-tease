import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/* 
  Centralized Config
  - Exports all required environment variables
  - Ensures variables are loaded only once
*/

const config = {
    mongoURI: process.env.MONGO_URI, // MongoDB connection string
    port: process.env.PORT || 3002, // Application port
    jwtSecret: process.env.JWT_SECRET, // Secret for JSON Web Token
    nodeEnv: process.env.NODE_ENV || 'development', // Node environment
};

export default config;
