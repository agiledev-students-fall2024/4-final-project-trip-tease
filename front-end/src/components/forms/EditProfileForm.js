import React, { useState } from 'react';
import './EditProfileForm.css';

const SignUpForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [profileAvatar, setProfileAvatar] = useState('😊'); // Default emoji
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', { username, profileAvatar, name, email, password, bio });
    onSubmit({ username, profileAvatar, name, email, password, bio });
    
    setUsername('');
    setProfileAvatar('😊'); // Reset to default emoji
    setName('');
    setEmail('');
    setPassword('');
    setBio('');
  };

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label>
        Profile Avatar:
        <div className="avatar-selection">
          {['😊', '😎', '🌎', '🧳', '🎒', '✈️', '🏞️', '🌄'].map((emoji) => (
            <button
              key={emoji}
              type="button"
              className={`avatar-button ${profileAvatar === emoji ? 'selected' : ''}`}
              onClick={() => setProfileAvatar(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </label>

      <label>
        Full Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <label>
        Bio:
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us a bit about yourself"
          rows="4"
        />
      </label>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default EditProfleForm;
