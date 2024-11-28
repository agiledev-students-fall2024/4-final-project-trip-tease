// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ProfileDropdown.css';

// const ProfileDropdown = ({ onSignOut, user }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="profile-dropdown">
//       <button
//         className="profile-dropdown-item"
//         onClick={() => navigate('/profile')}
//       >
//         <span className="profile-dropdown-item-icon">{user?.profileAvatar || "👤"}</span>
//         View Profile
//       </button>
//       <button
//         className="profile-dropdown-item"
//         onClick={() => {
//           onSignOut(); 
//           setTimeout(() => navigate('/log-in'), 0); 
//         }}
//       >
//         <span className="profile-dropdown-item-icon">🚪</span> Sign Out
//       </button>
//     </div>
//   );
// };

// export default ProfileDropdown;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ProfileDropdown.css';

// const ProfileDropdown = ({ onSignOut }) => {
//   const [user, setUser] = useState(null); // To hold the user data
//   const navigate = useNavigate();

//   // Fetch user data from backend using the JWT token
//   useEffect(() => {
//     const token = localStorage.getItem('token');  // Get JWT token from localStorage

//     if (token) {
//       // Make a GET request to fetch the user data (including avatar)
//       fetch('http://localhost:3002/users/me', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setUser(data); // Store the user data in state
//         })
//         .catch((error) => {
//           console.error('Error fetching user data:', error);
//         });
//     }
//   }, []);

//   return (
//     <div className="profile-dropdown">
//       {user ? (
//         <>
//           <button
//             className="profile-dropdown-item"
//             onClick={() => navigate('/profile')}
//           >
//             <span className="profile-dropdown-item-icon">
//               {user.avatar ? <img src={user.avatar} alt="Profile" /> : '👤'}
//             </span>
//             View Profile
//           </button>
//           <button
//             className="profile-dropdown-item"
//             onClick={() => {
//               onSignOut();
//               setTimeout(() => navigate('/log-in'), 0); // Redirect to log-in page
//             }}
//           >
//             <span className="profile-dropdown-item-icon">🚪</span> Sign Out
//           </button>
//         </>
//       ) : (
//         // If no user data is available, show a loading state or sign-in prompt
//         <div>Loading...</div>
//       )}
//     </div>
//   );
// };

// export default ProfileDropdown;

// 

// // ProfileDropdown.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ProfileDropdown.css';

// const ProfileDropdown = ({ onSignOut, user }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="profile-dropdown">
//       {user ? (
//         <>
//           <button
//             className="profile-dropdown-item"
//             onClick={() => navigate('/profile')}
//           >
//             <span className="profile-dropdown-item-icon">
//               {user.profileAvatar ? ( 
//                 <img src={user.profileAvatar} alt="Profile" /> // Display the avatar image
//               ) : (
//                 '👤' // Default icon if no avatar exists
//               )}
//             </span>
//             View Profile
//           </button>
//           <button
//             className="profile-dropdown-item"
//             onClick={() => {
//               onSignOut();
//               navigate('/log-in'); // Redirect to log-in page
//             }}
//           >
//             <span className="profile-dropdown-item-icon">🚪</span> Sign Out
//           </button>
//         </>
//       ) : (
//         <div>Loading...</div> // Show loading state until user data is available
//       )}
//     </div>
//   );
// };

// export default ProfileDropdown;

// ProfileDropdown.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileDropdown.css';

const ProfileDropdown = ({ onSignOut, user }) => {
  const navigate = useNavigate();

  return (
    <div className="profile-dropdown">
      {user ? (
        <>
          <button
            className="profile-dropdown-item"
            onClick={() => navigate('/profile')}
          >
            <span className="profile-dropdown-item-icon">
              {/* Use user.avatar (profileAvatar) here */}
              {user.avatar ? <img src={user.avatar} alt="Profile" /> : '👤'}
            </span>
            View Profile
          </button>
          <button
            className="profile-dropdown-item"
            onClick={() => {
              onSignOut();
              setTimeout(() => navigate('/log-in'), 0); // Redirect to log-in page
            }}
          >
            <span className="profile-dropdown-item-icon">🚪</span> Sign Out
          </button>
        </>
      ) : (
        // If no user data is available, show a loading state or sign-in prompt
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProfileDropdown;
