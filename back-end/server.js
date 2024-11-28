import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'; 
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js'; 
import config from './config/config.js'; 

// load env variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
const PORT = config.port;

// will get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Connect to MongoDB
connectDB();

// middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public'))); // serve static files (from public)

// Import routes
import userRoutes from './routes/users.js';
import tripRoutes from './routes/trips.js';
import locationRoutes from './routes/locations.js';
import activityRoutes from './routes/activities.js';

// route Handlers 
app.use('/users', userRoutes);
app.use('/trips', tripRoutes);
app.use('/locations', locationRoutes);
app.use('/activities', activityRoutes);

// root Route
app.get('/', (req, res) => {
  res.send('This is the TripTease API!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running in ${config.nodeEnv} mode on http://localhost:${PORT}`);
});
