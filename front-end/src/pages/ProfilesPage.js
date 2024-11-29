import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../forms/ProfileForm';
import './ProfilesPage.css';

const ProfilesPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    // lastName: '',
    email: '',
    password: '',
    bio: '',
    id: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/users/64b1c7c8f2a5b9a2d5c8f001`); // hardcoded until login/sign up is implemented
        const data = await response.json();

        // Check if _id is present in the fetched data
        if (data && data.id) {
          setUserData(data); // Set user data only if _id is valid
          console.log('User data fetched:', data);
        } else {
          console.error("User data missing _id:", data);
        }


        // const [firstName, lastName] = data.name.split(' '); 
        setUserData(data);
        // setUserData({ ...data, firstName, lastName });
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

  const handleSaveChanges = async (userData) => {
    if (!userData.id) {  // Check for 'id' instead of '_id'
      console.error("User ID is missing, cannot save changes.");
      return; // Exit if userData.id is not available
    }
  
    try {
      const userId = userData.id;  // Use the id from userData
      const response = await fetch(`http://localhost:3002/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),  // Send updated user data
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
  
      const updatedUser = await response.json();
      setUserData(updatedUser);  // Update state with the new user data
      setIsEditMode(false);  // Close the edit mode
      console.log('User data updated:', updatedUser);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
  
  
  return (
    <div className="profiles-page">
      <ProfileHeader name={`${userData.name}`} profilePicture={userData.profileAvatar} />
      <ProfileForm
        userData={userData}
        isEditMode={isEditMode}
        onEditToggle={handleEditToggle}
        onInputChange={handleInputChange}
        onSaveChanges={handleSaveChanges}  // Pass the save function to ProfileForm
      />
    </div>
  );
};

export default ProfilesPage;
