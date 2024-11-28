// import React, { useState, useEffect } from 'react';
// import ProfileHeader from '../components/profile/ProfileHeader';
// import ProfileForm from '../forms/ProfileForm';
// import './ProfilesPage.css';

// const ProfilesPage = () => {
//   const [userData, setUserData] = useState({
//     username: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     bio: '',
//   });
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     async function fetchUserData() {
//       try {
//         const response = await fetch('/users/user_123'); //hardcoded this backend route because we dont have unique id's bc we havent covered authentication in class yet
//         const data = await response.json();
//         const [firstName, lastName] = data.name.split(' '); 
//         setUserData({ ...data, firstName, lastName });
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     }
//     fetchUserData();
//   }, []);


//   //same with editing the user, not really essential and will change once we implement log-in / sign-up in future sprint
//   const handleEditToggle = () => {
//     setIsEditMode((prevMode) => !prevMode);
//   };


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="profiles-page">
//       <ProfileHeader name={`${userData.firstName} ${userData.lastName}`} profileAvatar={userData.profileAvatar} />
//       <ProfileForm
//         userData={userData}
//         isEditMode={isEditMode}
//         onEditToggle={handleEditToggle}
//         onInputChange={handleInputChange}
//       />
//     </div>
//   );
// };

// export default ProfilesPage;


// import React, { useState, useEffect } from 'react';
// import ProfileHeader from '../components/profile/ProfileHeader';
// import ProfileForm from '../forms/ProfileForm';
// import './ProfilesPage.css';

// const ProfilesPage = () => {
//   const [userData, setUserData] = useState({
//     username: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     bio: '',
//     avatar: '😎', // Set a default avatar in case it’s missing
//   });
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     // Get the token from localStorage to fetch user data
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Make a request to the backend to get the logged-in user's data
//       async function fetchUserData() {
//         try {
//           const response = await fetch('http://localhost:3002/users/:userId', {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//           });

//           if (!response.ok) {
//             throw new Error('Failed to fetch user data');
//           }

//           const data = await response.json();
//           setUserData({
//             username: data.username,
//             firstName: data.firstName,
//             lastName: data.lastName,
//             email: data.email,
//             bio: data.bio,
//             avatar: data.avatar || '😎', // Default avatar if not provided
//           });
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       }

//       fetchUserData();
//     }
//   }, []); // Empty dependency array means this runs only on component mount

//   const handleEditToggle = () => {
//     setIsEditMode((prevMode) => !prevMode);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="profiles-page">
//       <ProfileHeader 
//         name={`${userData.firstName} ${userData.lastName}`} 
//         profileAvatar={userData.avatar} 
//       />
//       <ProfileForm
//         userData={userData}
//         isEditMode={isEditMode}
//         onEditToggle={handleEditToggle}
//         onInputChange={handleInputChange}
//       />
//     </div>
//   );
// };

// export default ProfilesPage;


// import React, { useState, useEffect } from 'react';
// import ProfileHeader from '../components/profile/ProfileHeader';
// import ProfileForm from '../forms/ProfileForm';
// import './ProfilesPage.css';

// const ProfilesPage = () => {
//   const [userData, setUserData] = useState({
//     username: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     bio: '',
//     avatar: '😎', // Default avatar in case it's missing
//   });
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       async function fetchUserData() {
//         try {
//           const response = await fetch('http://localhost:3002/users/:userId', {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//           });

//           if (!response.ok) {
//             throw new Error('Failed to fetch user data');
//           }

//           const data = await response.json();
//           setUserData({
//             username: data.username,
//             firstName: data.firstName,
//             lastName: data.lastName,
//             email: data.email,
//             bio: data.bio,
//             avatar: data.avatar || '😎', // Default avatar if not provided
//           });
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       }

//       fetchUserData();
//     }
//   }, []); // Empty dependency array means this runs only on component mount

//   const handleEditToggle = () => {
//     setIsEditMode((prevMode) => !prevMode);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="profiles-page">
//       <ProfileHeader 
//         name={`${userData.firstName} ${userData.lastName}`} 
//         profileAvatar={userData.avatar} 
//       />
//       <ProfileForm
//         userData={userData}
//         isEditMode={isEditMode}
//         onEditToggle={handleEditToggle}
//         onInputChange={handleInputChange}
//       />
//     </div>
//   );
// };

// export default ProfilesPage;


// import React, { useState, useEffect } from 'react';
// import ProfileHeader from '../components/profile/ProfileHeader';
// import ProfileForm from '../forms/ProfileForm';
// import './ProfilesPage.css';

// const ProfilesPage = () => {
//   const [userData, setUserData] = useState({
//     username: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     bio: '',
//     avatar: '😎', // Default avatar in case it's missing
//   });
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       async function fetchUserData() {
//         try {
//           const response = await fetch('http://localhost:3002/users/:userId', {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//           });

//           if (!response.ok) {
//             throw new Error('Failed to fetch user data');
//           }

//           const data = await response.json();
//           setUserData({
//             username: data.username,
//             firstName: data.firstName || '', // Default to empty if not available
//             lastName: data.lastName || '', // Default to empty if not available
//             email: data.email,
//             bio: data.bio || '', // Default to empty if not available
//             avatar: data.avatar || '😎', // Default avatar if not provided
//           });
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       }

//       fetchUserData();
//     }
//   }, []); // Empty dependency array means this runs only on component mount

//   const handleEditToggle = () => {
//     setIsEditMode((prevMode) => !prevMode);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="profiles-page">
//       <ProfileHeader 
//         name={`${userData.firstName} ${userData.lastName}`} // Full name or default to username
//         profileAvatar={userData.avatar} // Avatar passed here
//       />
//       <ProfileForm
//         userData={userData}
//         isEditMode={isEditMode}
//         onEditToggle={handleEditToggle}
//         onInputChange={handleInputChange}
//       />
//     </div>
//   );
// };

// export default ProfilesPage;

// import React, { useState, useEffect } from 'react';
// import ProfileHeader from '../components/profile/ProfileHeader';
// import ProfileForm from '../forms/ProfileForm';
// import './ProfilesPage.css';

// const ProfilesPage = () => {
//   const [userData, setUserData] = useState({
//     username: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     bio: '',
//     avatar: '😎', // Default avatar in case it's missing
//   });
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [error, setError] = useState(null);  // To track errors

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       async function fetchUserData() {
//         try {
//           const response = await fetch('http://localhost:3002/users/:userId', {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//           });

//           if (!response.ok) {
//             throw new Error('Failed to fetch user data');
//           }

//           const data = await response.json();
//           setUserData({
//             username: data.username,
//             firstName: data.firstName || '', // Default to empty if not available
//             lastName: data.lastName || '', // Default to empty if not available
//             email: data.email,
//             bio: data.bio || '', // Default to empty if not available
//             avatar: data.avatar || '😎', // Default avatar if not provided
//           });
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//           setError('Failed to fetch user data. Please try again later.');
//         }
//       }

//       fetchUserData();
//     } else {
//       setError('No user is logged in. Please log in to view your profile.');
//     }
//   }, []); // Empty dependency array means this runs only on component mount

//   const handleEditToggle = () => {
//     setIsEditMode((prevMode) => !prevMode);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="profiles-page">
//       {error && <div className="error-message">{error}</div>} {/* Show error message */}
//       <ProfileHeader 
//         name={`${userData.firstName || userData.username} ${userData.lastName}`} // Fallback to username if name is missing
//         profileAvatar={userData.avatar} 
//       />
//       <ProfileForm
//         userData={userData}
//         isEditMode={isEditMode}
//         onEditToggle={handleEditToggle}
//         onInputChange={handleInputChange}
//       />
//     </div>
//   );
// };

// export default ProfilesPage;


import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../forms/ProfileForm';
import './ProfilesPage.css';

const ProfilesPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    name: '', // Full name from the model
    email: '',
    bio: '',
    profileAvatar: '😎', // Default avatar if not provided
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null); // To handle errors during data fetching

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);  // Check if the token exists and is correct
    if (token) {
      async function fetchUserData() {
        try {
          const response = await fetch('http://localhost:3002/users/:userId', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
        
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
        
          const data = await response.json();
          console.log('Fetched user data:', data);
          if (data && data.username) {
            setUserData({
              username: data.username || '',
              name: data.name || '', // Full name from the model
              email: data.email || '',
              bio: data.bio || '',
              profileAvatar: data.profileAvatar || '😎', // Default avatar if missing
              trips: data.trips || [], // Default to empty array if not provided
            });
          } else {
            setError('User data is invalid');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to fetch user data');  // Set error state
        }
      }
  
      fetchUserData();
    }
  }, []); // Empty dependency array means this runs only on component mount
  
  const handleEditToggle = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevData) => ({
      ...prevData, // Spread the previous data to keep the rest unchanged
      [name]: value || '', // Ensure value is a string (or empty string if undefined)
    }));
  };

  return (
    <div className="profiles-page">
      {error && <div className="error-message">{error}</div>} {/* Display error message if any */}
      <ProfileHeader 
        name={userData.name || userData.username} // Full name or fallback to username
        profileAvatar={userData.profileAvatar} // Avatar passed here
      />
      <ProfileForm
        userData={userData}
        isEditMode={isEditMode}
        onEditToggle={handleEditToggle}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default ProfilesPage;
