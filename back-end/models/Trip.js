import mongoose from 'mongoose';

/* 
  Trip Schema
  - Represents a trip created by a user, including details like participants, associated locations, and status.
  - Fields:
    - name: Name of the trip (e.g., "California Road Trip")
    - description: Optional description of the trip
    - startDate & endDate: Dates defining the trip's schedule
    - participants: Array of references to User documents (users part of the trip)
    - locations: Array of references to Location documents (places visited during the trip)
    - status: Status of the trip ('upcoming', 'ongoing', or 'completed')
    - image: URL string for an optional image representing the trip
    - owner: Reference to the User document who created the trip
*/
const TripSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the trip
    description: { type: String }, // Optional description
    startDate: { type: Date }, // Start date of the trip
    endDate: { type: Date }, // End date of the trip
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of participants
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }], // List of associated locations
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed'], // Allowed trip statuses
      default: 'upcoming', // Default status
    },
    image: { type: String, default: '' }, // Optional image URL
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the trip
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Trip = mongoose.model('Trip', TripSchema);

export default Trip;
