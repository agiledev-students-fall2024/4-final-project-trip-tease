import React, { useState } from 'react';
import './LogInForm.css';

const LogInForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(''); // Local error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    if (!formData.username || !formData.password) {
      setErrorMessage('Both fields are required.');
      return;
    }

    try {
      await onSubmit(formData.username, formData.password); // Trigger parent-provided `onSubmit`
    } catch (error) {
      console.error('Login error:', error); // Debug log
      console.log(error.message)
      const backendError =
        error.message || 'An error occurred. Please try again.';
      setErrorMessage(backendError); // Set error message from backend or fallback
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Log In</h2>

      {/* Display error message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="input-field"
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
          required
        />
      </label>
      <button type="submit" className="submit-button">
        Log In
      </button>
    </form>
  );
};

export default LogInForm;
