import React, { useState } from 'react';
import './ProfileForm.css';

const ProfileForm = ({ user, onSaveChanges, onCancelEdit }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (emoji) => {
    setFormData((prev) => ({ ...prev, profileAvatar: emoji }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSaveChanges(formData);
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  return (
    <div className="profile-form-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Profile Avatar:</label>
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
          <label htmlFor="name" className="form-label">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio" className="form-label">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            className="form-input"
            value={formData.bio}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="save-button">Save Changes</button>
          <button type="button" onClick={onCancelEdit} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
