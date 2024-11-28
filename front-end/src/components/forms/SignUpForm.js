// import React, { useState } from 'react';
// import './SignUpForm.css';

// const SignUpForm = ({ onSubmit }) => {
//   const [username, setUsername] = useState('');
//   const [avatar, setAvatar] = useState('😊'); // Default emoji
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [bio, setBio] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ username, avatar, firstName, lastName, email, password, bio });
//     setUsername('');
//     setAvatar('😊'); // Reset to default emoji
//     setFirstName('');
//     setLastName('');
//     setEmail('');
//     setPassword('');
//     setBio('');
//   };

//   return (
//     <form className="signup-form" onSubmit={handleSubmit}>
//       <h2>Sign Up</h2>

//       <label>
//         Username:
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//       </label>

//       <label>
//         Profile Avatar:
//         <div className="avatar-selection">
//           {['😊', '😎', '🌎', '🧳', '🎒', '✈️', '🏞️', '🌄'].map((emoji) => (
//             <button
//               key={emoji}
//               type="button"
//               className={`avatar-button ${avatar === emoji ? 'selected' : ''}`}
//               onClick={() => setAvatar(emoji)}
//             >
//               {emoji}
//             </button>
//           ))}
//         </div>
//       </label>

//       <label>
//         First Name:
//         <input
//           type="text"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           required
//         />
//       </label>

//       <label>
//         Last Name:
//         <input
//           type="text"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           required
//         />
//       </label>

//       <label>
//         Email:
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </label>

//       <label>
//         Password:
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </label>

//       <label>
//         Bio:
//         <textarea
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           placeholder="Tell us a bit about yourself"
//           rows="4"
//         />
//       </label>

//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignUpForm;

import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [profileAvatar, setProfileAvatar] = useState('😊'); // Default emoji
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine firstName and lastName into one name field for the backend
    const name = `${firstName} ${lastName}`;

    // Submit the form with the correct data
    onSubmit({ username, profileAvatar, name, email, password, bio });
    
    // Reset the form
    setUsername('');
    setProfileAvatar('😊'); // Reset to default emoji
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setBio('');
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

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
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>

      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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

export default SignUpForm;
