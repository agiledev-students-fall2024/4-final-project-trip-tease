import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserProfile, updateUserProfile } from '../api/apiUtils';
import ProfileHeader from '../components/features/ProfileHeader';
import ProfileStats from '../components/features/ProfileStats';
import ProfileForm from '../components/forms/ProfileForm';
import './ProfilePage.css';

const ProfilesPage = () => {
  const { user, setUser } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [backendError, setBackendError] = useState('');

  const handleEditToggle = () => {
    setBackendError(''); // Clear errors when toggling
    setIsEditMode((prev) => !prev);
  };

  const handleSaveChanges = async (updatedData) => {
    try {
      setBackendError(''); // Clear previous backend errors
      await updateUserProfile(updatedData); // Save changes to backend
      const refreshedUser = await fetchUserProfile(); // Refetch the updated user profile
      setUser(refreshedUser); // Update AuthContext with refreshed data
      setIsEditMode(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating profile:', error.message);
      setBackendError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <ProfileHeader name={user?.name || 'Traveler'} profileAvatar={user?.profileAvatar} />
        {backendError && <div className="error-message">{backendError}</div>}
        {isEditMode ? (
          <ProfileForm
            user={user}
            onSaveChanges={handleSaveChanges}
            onCancelEdit={handleEditToggle}
          />
        ) : (
          <>
            <div className="profile-details">
              <div className="profile-detail-row">
                <span className="profile-detail-label">Username:</span>
                <span className="profile-detail-value">{user?.username}</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Email:</span>
                <span className="profile-detail-value">{user?.email}</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Name:</span>
                <span className="profile-detail-value">{user?.name || 'Not provided'}</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Bio:</span>
                <span className="profile-detail-value">{user?.bio || 'Not provided'}</span>
              </div>
            </div>
            <ProfileStats trips={user?.trips || []} createdAt={user?.createdAt} />
            <button onClick={handleEditToggle} className="edit-profile-button">Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilesPage;
