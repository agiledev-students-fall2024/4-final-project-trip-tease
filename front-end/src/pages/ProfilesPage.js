import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../forms/ProfileForm';
import './ProfilesPage.css';
import { Link, useParams } from 'react-router-dom';


const ProfilesPage = () => {
  // Initialize userData state with all necessary fields
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    bio: '',
    profileAvatar: '', 
  });
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch user data when component mounts
  useEffect(() => {
    async function fetchUserData() {
      try {
        // Fetch user data from the backend
        const response = await fetch(`/users/64b1c7c8f2a5b9a2d5c8f001`); // Example hardcoded user ID
        const data = await response.json();

        // Check if the data contains the required fields, especially `id`
        if (data && data.id) {
          setUserData(data);  // Set the fetched data to userData state
          console.log('User data fetched:', data);
        } else {
          console.error("User data missing id:", data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  // Handle changes to form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value, // Update the respective field in userData
    }));
  };

  // Save changes to the user data
  const handleSaveChanges = async (userData) => {
    if (!userData.id) {  // Ensure id is available before making the PUT request
      console.error("User ID is missing, cannot save changes.");
      return; // Exit if id is not available
    } else {
      console.log("Saving changes for user with ID:", userData.id);
    }

    try {
      const response = await fetch(`/users/${userData.id}`, {  // Use userData.id in URL
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
      setUserData(updatedUser);  // Update state with the updated user data
      setIsEditMode(false);  // Close the edit mode
      console.log('User data updated:', updatedUser);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div className="profiles-page">
      <ProfileHeader name={userData.name} profilePicture={userData.profileAvatar} />
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
