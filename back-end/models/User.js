import mongoose from 'mongoose';

/* 
  User Schema
  - Represents a user in the system, including account details and references to their trips.
  - Fields:
    - username: Unique username for the user
    - email: User's email, must be unique
    - password: Encrypted password for security
    - name: Full name of the user
    - profileAvatar: Required emoji representing the user, defaults to 😎 if none selected
    - bio: Short biography of the user
    - trips: Array of references to Trip documents (trips the user is participating in)
*/

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Unique username
    email: { type: String, required: true, unique: true }, // Unique email address
    password: { type: String, required: true }, // Encrypted password
    name: { type: String }, // Full name
    profileAvatar: { type: String, required: true, default: '😎' }, // Required emoji, defaults to 😎
    bio: { type: String }, // Short biography
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }], // References to trips
}, 
{ timestamps: true }); // Automatically adds createdAt and updatedAt fields

const User = mongoose.model('User', UserSchema);

export default User;
