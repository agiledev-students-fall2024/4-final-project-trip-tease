import React, { useState, useEffect, useCallback } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../forms/ProfileForm';
import './ProfilesPage.css';
import { useNavigate } from 'react-router-dom';


const ProfilesPage = ({ user, setUser }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  // Function to fetch the latest user data wrapped with useCallback
  const fetchUserData = useCallback(async () => {
    if (!user || !user.id) {
      console.log("User ID is not available");
      return; // Don't fetch if user or user.id is not available
    }
  
    const userId = user.id; // Get the user ID from the `user` prop
  
    try {
      const response = await fetch(`/users/${userId}`);
      const data = await response.json();
  
      if (response.ok) {
        setUser(data); // Update the global user state with the latest user data
      } else {
        alert(data.error || 'Error fetching user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Failed to retrieve user data');
    } 
  }, [user.id, setUser]); // Only re-run the callback if user.id or setUser changes
  
  

  // Fetch the user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]); // Use fetchUserData as a dependency

  const handleEditToggle = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Directly update the user prop object (for profile editing)
    user[name] = value;
    setUser({ ...user });
  };

  const handleSaveChanges = async () => {
    const userId = user.id; // Get the user ID from the passed `user` prop

    try {
      // Send updated data to the backend
      const response = await fetch(`/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        // If successful, update localStorage with the updated user data
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data); // Update the global user state with the updated data
        console.log('Profile updated:', data);
        await fetchUserData(); // Refetch the latest user data

        setIsEditMode(false); // Switch back to view mode
        navigate('/profile');

        // Wait for the user data to be fetched and then update the UI
      } else {
        alert(data.error || 'Error updating profile');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  return (
    <div className="profiles-page">
      <ProfileHeader
        name={user.name || 'Traveler'} // Default to 'Traveler' if no name is set
        profileAvatar={user.profileAvatar}
      />
      <ProfileForm
        user={user}
        isEditMode={isEditMode}
        onEditToggle={handleEditToggle}
        onInputChange={handleInputChange}
        onSaveChanges={handleSaveChanges}
        onCancelEdit={handleCancelClick}
      />
    </div>
  );
};

export default ProfilesPage;
