import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../forms/ProfileForm';
import './ProfilesPage.css';
import { useNavigate } from 'react-router-dom';


const ProfilesPage = ({ user, setUser }) => {
  const navigate = useNavigate();  // Initialize navigate function
  // const [isEditMode, setIsEditMode] = useState(false);

  // Navigate to the Edit Profile page when the button is clicked
  const handleEditProfileClick = () => {
    navigate('/edit-profile'); // Redirect to Edit Profile page
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
      // setIsEditMode(false); // Switch back to view mode
    } else {
      alert(data.error || 'Error updating profile');
    }
  };

  return (
    <div className="profiles-page">
      <ProfileHeader
        name={user.name || 'Traveler'} 
        profileAvatar={user.profileAvatar}
      />
      <ProfileForm
        user={user}
        onEditUserData={handleEditProfileClick}
        // isEditMode={isEditMode}
        // onEditToggle={handleEditToggle}
        // onInputChange={handleInputChange}
        // onSaveChanges={handleSaveChanges}
      />
    </div>
  );
};

export default ProfilesPage;
