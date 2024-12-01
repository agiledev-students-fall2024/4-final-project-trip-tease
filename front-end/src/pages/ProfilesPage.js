import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../forms/ProfileForm';
import './ProfilesPage.css';


const ProfilesPage = ({ user, setUser }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch the latest user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
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
    };

    fetchUserData();
  }, [user.id, setUser]); // Re-run this effect whenever `user.id` changes

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
      alert('Profile updated successfully');
      setIsEditMode(false); // Switch back to view mode
    } else {
      alert(data.error || 'Error updating profile');
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
