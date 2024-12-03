import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    profileAvatar: '😊',
    name: '',
    email: '',
    password: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (emoji) => {
    setFormData((prev) => ({ ...prev, profileAvatar: emoji }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ username: '', profileAvatar: '😊', name: '', email: '', password: '', bio: '' });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Profile Avatar:</label>
        <div className="avatar-grid">
          {['😊', '😎', '🌎', '🧳', '🎒', '✈️', '🏞️', '🌄'].map((emoji) => (
            <button
              key={emoji}
              type="button"
              className={`avatar-button ${formData.profileAvatar === emoji ? 'selected' : ''}`}
              onClick={() => handleAvatarSelect(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows="4"
          placeholder="Tell us about yourself..."
        />
      </div>

      <button type="submit" className="signup-button">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
