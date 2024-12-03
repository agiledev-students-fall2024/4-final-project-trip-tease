import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignUpForm from '../components/forms/SignUpForm';
import './SignUpPage.css';

const SignUpPage = () => {
  const { signup } = useAuth(); // Access signup from AuthContext
  const navigate = useNavigate();

  const handleFormSubmit = async (userData) => {
    await signup(userData); // Trigger signup
    navigate('/'); // Redirect to the home page on success
  };

  return (
    <div className="signup-page">
      <SignUpForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default SignUpPage;
