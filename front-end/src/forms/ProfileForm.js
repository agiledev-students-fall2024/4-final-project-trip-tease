import React from 'react';
import './ProfileForm.css';

const emojis = ['😀', '😎', '🌍', '🧳', '🎒', '🚴', '✈️', '🏞️', '🌄'];

const ProfileForm = ({ user, isEditMode, onEditToggle, onInputChange, onSaveChanges, onCancelEdit }) => {
  return (
    <form className="profile-form">
      <div className="form-section">
        <div className="field-group">
          <label>Username</label>
          {isEditMode ? (
            <input
              type="text"
              name="username"
              value={user.username || ''}  // Fallback to empty string if `user.username` is undefined
              onChange={onInputChange}
            />
          ) : (
            <p>{user.username}</p>
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
              value={user.profileAvatar || '🤩'}  
              onChange={onInputChange}
            >
              {emojis.map((emoji) => (
                <option key={emoji} value={emoji}>
                  {emoji}
                </option>
              ))}
            </select>
          ) : (
            <p className="selected-emoji">{user.profileAvatar}</p>
          )}
        </div>
      </div>

      <div className="form-section">
        <div className="name-fields">
          <div className="name-field">
            <label>Full Name</label>
            {isEditMode ? (
              <input
                type="text"
                name="fullName"
                value={user.name || 'Traveler'} 
                onChange={onInputChange}
              />
            ) : (
              <p>{user.name }</p>
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
              value={user.email || ''}  
              onChange={onInputChange}
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>
        <div className="field-group">
          <label>Password</label>
          {isEditMode ? (
            <input
              type="password"
              name="password"
              value={user.password || ''} 
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
              value={user.bio || ''} 
              onChange={onInputChange}
            />
          ) : (
            <p>{user.bio}</p>
          )}
        </div>
      </div>

      <div className="button-group">
      <button type="button" onClick={isEditMode ? onSaveChanges : onEditToggle} className="edit-button">
          {isEditMode ? 'Save Changes' : 'Edit Profile'}
        </button>
        {isEditMode && (
          <button type="button" onClick={onCancelEdit} className="sign-out-button">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
