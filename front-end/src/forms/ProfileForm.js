import React from 'react';
import './ProfileForm.css';

const emojis = ['😀', '😎', '🌍', '🧳', '🎒', '🚴', '✈️', '🏞️', '🌄'];

const ProfileForm = ({ user, onEditUserData }) => {
  return (
    <form className="profile-form">
      <div className="form-section">
        <div className="field-group">
          <label>Username</label>
            <p>{user.username}</p>
        </div>
      </div>

      {/* This is the Emoji Picker for Profile Avatar */}
      <div className="form-section">
        <div className="field-group">
          <label>Profile Avatar</label>
            <p className="selected-emoji">{user.profileAvatar}</p>
        </div>
      </div>

      <div className="form-section">
        <div className="name-fields">
          <div className="name-field">
            <label>Full Name</label>
              <p>{user.name || 'Traveler'}</p> 
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="field-group">
          <label>Email</label>
            <p>{user.email}</p>
        </div>
        <div className="field-group">
          <label>Password</label>
            <p>********</p>
        </div>
      </div>

      <div className="form-section">
        <div className="field-group">
          <label>Bio</label>
            <p>{user.bio}</p>
        </div>
      </div>

      <div className="button-group">
      <button type="button" onClick={onEditUserData} className="edit-button">
        {'Edit Profile'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
