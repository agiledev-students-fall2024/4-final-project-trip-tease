import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To handle navigation after successful signup
import SignUpForm from '../components/forms/SignUpForm'; // Assuming you have a SignUpForm component
import axios from 'axios';  // Import axios for making HTTP requests
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // For error handling

  const [userData, setUserData] = useState({
    username: '',
    profileAvatar: '',
    name: '',
    email: '',
    password: "",
    bio: "",
  });

  const handleFormSubmit = async (tripData) => {
    try{
      const newUser = { ...userData };
      const response = await axios.post('/users', newUser);

      if (response.status === 201){
        console.log("added a user :)", response.data);
        navigate('/');
      }else{console.error("failed to add user :(")};
    }catch(error){
      console.error("error creating user", error);
    };
  };


  // const handleFormSubmit = async (userData) => {
  //   console.log('Signing up with data:', userData); // Log the data to confirm what is being sent
    
  //   try {
  //     const response = await axios.post('/users', userData, {
  //       headers: {
  //         'Content-Type': 'application/json',  // Ensure the request body is JSON
  //       },
  //     });
  
  //     console.log('Response data:', response.data);
  
  //     if (response.status === 201) {
  //       // User created successfully
  //       localStorage.setItem('token', response.data.token);  // Save the token to localStorage
  //       navigate('/');  // Redirect to the Home page
  //     } else {
  //       // Handle unsuccessful signup
  //       setError(response.data.message || 'An error occurred during signup');
  //     }
  
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //     setError('There was an issue creating your account. Please try again.');
  //   }
  // };
  

  return (
    <div className="signup-page">
      <SignUpForm onSubmit={handleFormSubmit} />  {/* Pass handleFormSubmit to SignUpForm */}
      {error && <div className="error-message">{error}</div>}  {/* Show error message if any */}
      <button className="login-redirect-button" onClick={() => navigate('/log-in')}>
        Already have an account? Log In
      </button>
    </div>
  );
};

export default SignUp;
