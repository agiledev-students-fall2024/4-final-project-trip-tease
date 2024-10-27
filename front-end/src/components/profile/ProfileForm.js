// ProfileForm.js
import React from 'react';
import './ProfileForm.css';

    const ProfileForm = ({ userData, isEditMode, onEditToggle, onInputChange }) => {
    return (
        <form className="profile-form">
        <div className="form-section">
            <label className="section-title"></label>
            <div className="name-fields">
            <div className="name-field">
                <label>First Name</label>
                {isEditMode ? (
                <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={onInputChange}
                />
                ) : (
                <p>{userData.firstName}</p>
                )}
            </div>
            <div className="name-field">
                <label>Last Name</label>
                {isEditMode ? (
                <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={onInputChange}
                />
                ) : (
                <p>{userData.lastName}</p>
                )}
            </div>
            </div>
        </div>

        <div className="form-section">
            <label className="section-title"></label>
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
            <label className="section-title"></label>
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
            <button type="button" onClick={onEditToggle}>
            {isEditMode ? 'Done' : 'Edit'}
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
