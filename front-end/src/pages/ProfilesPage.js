import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../forms/ProfileForm';
import './ProfilesPage.css';

const ProfilesPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bio: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/users/64b1c7c8f2a5b9a2d5c8f001'); // hardcoded until login/sign up is implemented
        const data = await response.json();
        const [firstName, lastName] = data.name.split(' '); 
        setUserData({ ...data, firstName, lastName });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, []);


  //same with editing the user, not really essential and will change once we implement log-in / sign-up in future sprint
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
      <ProfileHeader name={`${userData.firstName} ${userData.lastName}`} profilePicture={userData.profileAvatar} />
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
