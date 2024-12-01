import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogInForm from '../components/forms/LogInForm';
import './LogIn.css';

const LogIn = ({ setUser, setIsLoggedIn }) => {
  const [allUsers, setAllUsers] = useState([]); // State to store all users
  const navigate = useNavigate();

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch('/users');
        const data = await response.json();
        setAllUsers(data); // Set the users state

        console.log('Fetched users:', data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleSubmit = (credentials) => {
    console.log('Logging in with credentials:', credentials);
    
    // Check if the user exists and credentials are correct
    const foundUser = allUsers.find(user => user.username === credentials.username && user.password === credentials.password);
  
    // Ensure allUsers is defined and not empty
    if (allUsers && allUsers.length > 0) {
      const foundUser = allUsers.find(user => user.username === credentials.username && user.password === credentials.password);
  
      if (foundUser) {
        // Set the logged-in user and update login status
        setUser(foundUser);
        setIsLoggedIn(true);
        navigate('/'); // Navigate to the home page on successful login
      } else {
        alert('Invalid username or password');
      }
    } else {
      console.error('Users not loaded or empty');
      alert('There was an issue with the login system.');
    }
  };
  

  return (
    <div className="login-page">
      <LogInForm onSubmit={handleSubmit} />
      <button className="signup-redirect-button" onClick={() => navigate('/sign-up')}>
        Create an account? Sign Up
      </button>
    </div>
  );
};

export default LogIn;
