import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../forms/ProfileForm';
import './ProfilesPage.css';

const ProfilesPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    profileAvatar: '',
    name: '',
    email: '',
    password: '',
    bio: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Get the current logged-in user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData({ ...parsedUser });
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="profiles-page">
      <ProfileHeader
        name={`${userData.name} `}
        profileAvatar={userData.profileAvatar}
      />
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
