import React from 'react';
import './ProfileForm.css';

const emojis = ['😀', '😎', '🌍', '🧳', '🎒', '🚴', '✈️', '🏞️', '🌄'];

const ProfileForm = ({ userData, isEditMode, onEditToggle, onInputChange }) => {
  return (
    <form className="profile-form">
      <div className="form-section">
        <div className="field-group">
          <label>Username</label>
          {isEditMode ? (
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={onInputChange}
            />
          ) : (
            <p>{userData.username}</p>
          )}
        </div>
      </div>

      {/* This is the Emoji Picker for Profile Avatar */}
      <div className="form-section">
        <div className="field-group">
          <label>Profile Avatar</label>
          {isEditMode ? (
            <select
              name="profileAvatar"
              value={userData.profileAvatar}
              onChange={onInputChange}
            >
              {emojis.map((emoji) => (
                <option key={emoji} value={emoji}>
                  {emoji}
                </option>
              ))}
            </select>
          ) : (
            <p className="selected-emoji">{userData.profileAvatar}</p>
          )}
        </div>
      </div>

      <div className="form-section">
        <div className="name-fields">
          <div className="name-field">
            <label>First Name</label>
            {isEditMode ? (
              <input
                type="text"
                name="fullName"
                value={userData.name}
                onChange={onInputChange}
              />
            ) : (
              <p>{userData.name}</p>
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="field-group">
          <label>Email</label>
          {isEditMode ? (
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={onInputChange}
            />
          ) : (
            <p>{userData.email}</p>
          )}
        </div>
        <div className="field-group">
          <label>Password</label>
          {isEditMode ? (
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={onInputChange}
            />
          ) : (
            <p>********</p>
          )}
        </div>
      </div>

      <div className="form-section">
        <div className="field-group">
          <label>Bio</label>
          {isEditMode ? (
            <textarea
              name="bio"
              value={userData.bio}
              onChange={onInputChange}
            />
          ) : (
            <p>{userData.bio}</p>
          )}
        </div>
      </div>

      <div className="button-group">
        <button type="button" onClick={onEditToggle} className="edit-button">
          {isEditMode ? 'Save Changes' : 'Edit Profile'}
        </button>
        {isEditMode && (
          <button type="button" className="sign-out-button">
            Sign Out
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
