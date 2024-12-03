import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'; 
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js'; 
import config from './config/config.js'; 
import passport from 'passport';
import './config/jwt-config.js'; // Initialize Passport JWT strategy

// Load environment variables
dotenv.config();

const app = express();
const PORT = config.port;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (from public)

// Import routes
import userRoutes from './routes/users.js';
import tripRoutes from './routes/trips.js';
import locationRoutes from './routes/locations.js';
import activityRoutes from './routes/activities.js';
import authRoutes from './routes/auth.js';

// Route Handlers 
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/auth', authRoutes); // Added auth routes

// Root Route
app.get('/api/', (req, res) => {
  res.send('This is the TripTease API!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running in ${config.nodeEnv} mode on http://localhost:${PORT}/api`);
});
