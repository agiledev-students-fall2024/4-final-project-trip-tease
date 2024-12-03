import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogInForm from '../components/forms/LogInForm';
import './LogInPage.css';

const LogInPage = () => {
  const { login } = useAuth(); // Access login from AuthContext
  const navigate = useNavigate();

  const handleFormSubmit = async (username, password) => {
    await login(username, password); // Attempt login
    navigate('/'); // Redirect on success
  };

  return (
    <div className="login-page">
      <LogInForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default LogInPage;
