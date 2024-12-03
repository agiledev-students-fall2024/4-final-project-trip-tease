import axiosInstance from './axiosInstance';

/** UTILITY FUNCTIONS */

/**
 * Save token and user data to localStorage
 * @param {string} token - Authentication token
 * @param {Object} user - User information
 */
const saveAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

/** AUTHENTICATION APIs */

/**
 * Login user with username and password
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Object} - Token and user data
 * @throws {Error} - If login fails
 */
export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { username, password });
    const { token, user } = response.data;
    saveAuthData(token, user);
    return { token, user };
  } catch (error) {
    // Properly propagate the error message from the backend
    console.log(error.message)
    console.log(error.response.data.message)
    const message = error.response.data.message;
    throw new Error(message);
  }
};


/**
 * Sign up a new user
 * @param {Object} userData - New user details
 * @returns {Object} - Token and user data
 * @throws {Error} - If signup fails
 */
export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/signup', userData);
    const { token, user } = response.data;
    saveAuthData(token, user);
    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

/**
 * Logout function
 * Clears user session from localStorage and invalidates token (if supported by backend).
 */
export const logout = async () => {
  try {
    // Example: If your backend supports session invalidation, send a request
    await axiosInstance.post('/auth/logout'); // Adjust the endpoint if needed
  } catch (error) {
    console.error('Logout failed:', error.message);
    // Proceed to clear local session even if server logout fails
  } finally {
    localStorage.removeItem('token'); // Clear token
    localStorage.removeItem('user'); // Clear user info
  }
};


/** USER APIs */

/**
 * Fetch all users
 * @returns {Array} - List of all users
 * @throws {Error} - If fetching users fails
 */
export const fetchAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

/**
 * Fetch details of a specific user
 * @param {string} userId - User ID
 * @returns {Object} - User details
 * @throws {Error} - If fetching user fails
 */
export const fetchUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user details');
  }
};

/**
 * Update user details
 * @param {string} userId - User ID
 * @param {Object} userData - Updated user data
 * @returns {Object} - Updated user details
 * @throws {Error} - If updating user fails
 */
export const updateUserById = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, userData);
    return response.data; // Return updated user data
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update user';
    throw new Error(message);
  }
};

/**
 * Fetch the authenticated user's profile
 * @returns {Object} - User details
 * @throws {Error} - If fetching profile faxils
 */
export const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};

/**
 * Update the authenticated user's profile
 * @param {Object} userData - Updated profile data
 * @returns {Object} - Updated user details
 * @throws {Error} - If updating profile fails
 */
export const updateUserProfile = async (userData) => {
  try {
    const response = await axiosInstance.put('/users/me', userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update profile');
  }
};

/**
 * Delete a user
 * @param {string} userId - User ID
 * @returns {Object} - Confirmation message
 * @throws {Error} - If deletion fails
 */
export const deleteUserById = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

/** TRIP APIs */

/**
 * Fetch all trips
 * @returns {Array} - List of all trips
 * @throws {Error} - If fetching trips fails
 */
export const fetchTrips = async () => {
  try {
    const response = await axiosInstance.get('/trips');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch trips');
  }
};

/**
 * Fetch details of a specific trip
 * @param {string} tripId - Trip ID
 * @returns {Object} - Trip details
 * @throws {Error} - If fetching trip details fails
 */
export const fetchTripDetails = async (tripId) => {
  try {
    const response = await axiosInstance.get(`/trips/${tripId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch trip details');
  }
};


/**
 * Fetch trips for a specific user
 * @param {string} userId - User ID
 * @returns {Array} - List of trips
 * @throws {Error} - If fetching trips fails
 */
export const fetchTripsForUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}/trips`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user trips');
  }
};

/**
 * Create a new trip
 * @param {Object} tripData - Trip details
 * @returns {Object} - Newly created trip data
 * @throws {Error} - If creating trip fails
 */
export const createTrip = async (tripData) => {
  try {
    const response = await axiosInstance.post('/trips', tripData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create trip');
  }
};

/**
 * Join a trip
 * @param {string} userId - User ID
 * @param {string} tripId - Trip ID
 * @returns {Object} - Confirmation message and updated trip
 * @throws {Error} - If joining trip fails
 */
export const joinTrip = async (userId, tripId) => {
  try {
    const response = await axiosInstance.post(`/trips/${tripId}/join`, { userId });
    return response.data;
  } catch (error) {
    // Check if the error has a response and a data.message field
    const errorMessage = error.response?.data?.message || error.message || 'Failed to join the trip.';
    console.error('Join Trip Error:', errorMessage);
    throw new Error(errorMessage); // Throw the message for frontend to handle
  }
};


/**
 * Update trip status
 * @param {string} tripId - Trip ID
 * @param {string} status - New trip status
 * @returns {Object} - Updated trip data
 * @throws {Error} - If updating status fails
 */
export const updateTripStatus = async (tripId, status) => {
  try {
    const response = await axiosInstance.put(`/trips/${tripId}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update trip status');
  }
};

/** LOCATION APIs */

/**
 * Fetch location details
 * @param {string} locationId - Location ID
 * @returns {Object} - Location details
 * @throws {Error} - If fetching location details fails
 */
export const fetchLocationDetails = async (locationId) => {
  try {
    const response = await axiosInstance.get(`/locations/${locationId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch location details');
  }
};


/**
 * Fetch locations for a specific trip
 * @param {string} tripId - Trip ID
 * @returns {Array} - List of locations
 * @throws {Error} - If fetching locations fails
 */
export const fetchLocationsForTrip = async (tripId) => {
  try {
    const response = await axiosInstance.get(`/trips/${tripId}/locations`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch locations');
  }
};

/**
 * Create a new location
 * @param {Object} locationData - Location details
 * @returns {Object} - Newly created location
 * @throws {Error} - If creating location fails
 */
export const createLocation = async (locationData) => {
  try {
    const response = await axiosInstance.post('/locations', locationData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create location');
  }
};

/** ACTIVITY APIs */

/**
 * Fetch all activities for a specific location
 * @param {string} locationId - Location ID
 * @returns {Array} - List of activities
 * @throws {Error} - If fetching activities fails
 */
export const fetchActivitiesForLocation = async (locationId) => {
  try {
    const response = await axiosInstance.get(`/activities/location/${locationId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch activities');
  }
};

/**
 * Create a new activity
 * @param {Object} activityData - Activity details
 * @returns {Object} - Newly created activity
 * @throws {Error} - If creating activity fails
 */
export const createActivity = async (activityData) => {
  try {
    const response = await axiosInstance.post('/activities', activityData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create activity');
  }
};

/**
 * Upvote an activity
 * @param {string} activityId - Activity ID
 * @returns {Object} - Updated activity data
 * @throws {Error} - If upvoting fails
 */
export const upvoteActivity = async (activityId) => {
  try {
    const response = await axiosInstance.post(`/activities/${activityId}/upvote`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to upvote activity');
  }
};

/**
 * Downvote an activity
 * @param {string} activityId - Activity ID
 * @returns {Object} - Updated activity data
 * @throws {Error} - If downvoting fails
 */
export const downvoteActivity = async (activityId) => {
  try {
    const response = await axiosInstance.post(`/activities/${activityId}/downvote`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to downvote activity');
  }
};

/**
 * Add a comment to an activity
 * @param {string} activityId - Activity ID
 * @param {Object} comment - Comment data
 * @returns {Object} - Updated activity data
 * @throws {Error} - If adding comment fails
 */
export const addCommentToActivity = async (activityId, comment) => {
  try {
    const response = await axiosInstance.post(`/activities/${activityId}/comments`, comment);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add comment');
  }
};

/** PARTICIPANTS APIs */

/**
 * Fetch participants of a trip
 * @param {string} tripId - Trip ID
 * @returns {Array} - List of participants
 * @throws {Error} - If fetching participants fails
 */
export const fetchTripParticipants = async (tripId) => {
  try {
    const response = await axiosInstance.get(`/trips/${tripId}/participants`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch trip participants');
  }
};
