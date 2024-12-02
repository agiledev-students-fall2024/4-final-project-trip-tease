import React from 'react';
import './ProfileForm.css';

const emojis = ['😀', '😎', '🌍', '🧳', '🎒', '🚴', '✈️', '🏞️', '🌄'];

const ProfileForm = ({ user, isEditMode, onEditToggle, onInputChange, onSaveChanges, onCancelEdit }) => {
  return (
    <form className="profile-form">
      {/* Username Section */}
      <div className="form-section">
        <div className="field-group">
          <label>Username</label>
          {isEditMode ? (
            <input
              type="text"
              name="username"
              value={user.username || ''} // Default to an empty string
              onChange={onInputChange}
            />
          ) : (
            <p>{user.username}</p>
          )}
        </div>
      </div>

      {/* Profile Avatar Section */}
      <div className="form-section">
        <div className="field-group">
          <label>Profile Avatar</label>
          {isEditMode ? (
            <select
              name="profileAvatar"
              value={user.profileAvatar || emojis[0]} // Default to the first emoji
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

      {/* Full Name Section */}
      <div className="form-section">
        <div className="name-field">
          <label>Full Name</label>
          {isEditMode ? (
            <input
              type="text"
              name="fullName"
              value={user.fullName || ''} // Default to an empty string
              onChange={onInputChange}
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>
      </div>

      {/* Email Section */}
      <div className="form-section">
        <div className="field-group">
          <label>Email</label>
          {isEditMode ? (
            <input
              type="email"
              name="email"
              value={user.email || ''} // Default to an empty string
              onChange={onInputChange}
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>
      </div>

      {/* Password Section */}
      <div className="form-section">
        <div className="field-group">
          <label>Password</label>
          {isEditMode ? (
            <input
              type="password"
              name="password"
              value={user.password || ''} // Default to an empty string
              onChange={onInputChange}
            />
          ) : (
            <p>********</p>
          )}
        </div>
      </div>

      {/* Bio Section */}
      <div className="form-section">
        <div className="field-group">
          <label>Bio</label>
          {isEditMode ? (
            <textarea
              name="bio"
              value={user.bio || ''} // Default to an empty string
              onChange={onInputChange}
            />
          ) : (
            <p>{user.bio}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="button-group">
        {isEditMode ? (
          <>
            <button type="button" onClick={onSaveChanges} className="save-button">
              Save Changes
            </button>
            <button type="button" onClick={onCancelEdit} className="cancel-button">
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={onEditToggle} className="edit-button">
            Edit Profile
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
