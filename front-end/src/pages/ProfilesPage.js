// ProfilesPage.js
import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../components/profile/ProfileForm';
import './ProfilesPage.css';

const ProfilesPage = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bio: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch user data from the API when the component mounts
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('https://mock-api-misty-fog-1131.fly.dev/api/users/user_123'); 
        const data = await response.json();
        setUserData(data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, []);

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  // Update user data in state as form values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="profiles-page">
      <ProfileHeader name={`${userData.firstName} ${userData.lastName}`} />
      <ProfileForm
        userData={userData}
        isEditMode={isEditMode}
        onEditToggle={handleEditToggle}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default ProfilesPage;
