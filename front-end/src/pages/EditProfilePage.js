import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProfilePage.css'; // Ensure to create a corresponding CSS file for styling

const EditProfile = ({ setUser, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    username: '',
    profileAvatar: '',
    name: '',
    email: '',
    bio: '',
  });

  // Fetch current user data from localStorage when the component mounts
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setUserData({
        username: currentUser.username,
        profileAvatar: currentUser.profileAvatar,
        name: currentUser.name,
        email: currentUser.email,
        bio: currentUser.bio,
      });
    }
  }, []);

  // Handle form submission for updating user data
  const handleFormSubmit = async (updatedData) => {
    console.log('Submitting updated profile data:', updatedData);

    try {
      const userId = JSON.parse(localStorage.getItem('user'))._id; // Get userId from localStorage
      const response = await axios.put(`/users/${userId}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // On successful update, update user in localStorage and state
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user); // Update user state
        setIsLoggedIn(true); // Keep the logged-in state intact
        navigate('/profile'); // Redirect to profile page after successful update
      } else {
        setError(response.data.message || 'An error occurred while updating your profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('There was an issue updating your profile. Please try again.');
    }
  };

  return (
    <div className="edit-profile-page">
      <h2>Edit Profile</h2>
      <form className="edit-profile-form" onSubmit={(e) => { e.preventDefault(); handleFormSubmit(userData); }}>
        <label>
          Username:
          <input
            type="text"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            required
          />
        </label>

        <label>
          Profile Avatar:
          <div className="avatar-selection">
            {['😊', '😎', '🌎', '🧳', '🎒', '✈️', '🏞️', '🌄'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                className={`avatar-button ${userData.profileAvatar === emoji ? 'selected' : ''}`}
                onClick={() => setUserData({ ...userData, profileAvatar: emoji })}
              >
                {emoji}
              </button>
            ))}
          </div>
        </label>

        <label>
          Full Name:
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
          />
        </label>

        <label>
          Bio:
          <textarea
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
            placeholder="Tell us a bit about yourself"
            rows="4"
          />
        </label>

        <div className="button-group">
          <button type="submit">Update Profile</button>
          <button className="cancel-button" onClick={() => navigate('/profile')}>
            Cancel
          </button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default EditProfile;
