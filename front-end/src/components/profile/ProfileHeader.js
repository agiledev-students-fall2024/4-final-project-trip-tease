// ProfileHeader.js
import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ name }) => {
const profilePictureUrl = 'https://picsum.photos/100'; 

    return (
        <div className="profile-header">
        <div className="profile-picture">
            <img src={profilePictureUrl} alt="Profile" className="profile-picture-img" />
        </div>
        <h1 className="profile-welcome">Welcome, {name}</h1>
        <h2 className="profile-settings-title">Profile Settings</h2>
        </div>
    );
};

export default ProfileHeader;
