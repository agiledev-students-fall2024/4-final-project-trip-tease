// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import LogInForm from '../components/forms/LogInForm';
// import './LogIn.css';

// const LogIn = () => {
//   const navigate = useNavigate();

//   const handleFormSubmit = (credentials) => {
//     console.log('Logging in with credentials:', credentials);
//     // here is where u connect the log in to the backend
//     navigate('/'); // this just routes you back to the home page
//   };

//   return (
//     <div className="login-page">
//       <LogInForm onSubmit={handleFormSubmit} />
//       <button className="signup-redirect-button" onClick={() => navigate('/sign-up')}>
//         Create an account? Sign Up
//       </button>
//     </div>
//   );
// };

// export default LogIn;



// import React, { useState } from 'react';
// import LogInForm from '../components/forms/LogInForm';
// import './LogIn.css';

// const LogIn = ({ setIsLoggedIn, setUser }) => {
//   const [error, setError] = useState(null);

//   const handleFormSubmit = async (credentials) => {
//     console.log('Logging in with credentials:', credentials);

//     try {
//       // Connect to the backend for authentication (for now, we simulate this)
//       const response = await fetch('http://localhost:3002/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(credentials),
//       });

//       if (!response.ok) {
//         throw new Error('Invalid credentials');
//       }

//       const data = await response.json();

//       // Save the token in localStorage
//       localStorage.setItem('token', data.token);

//       // Set the logged-in status and user data
//       setIsLoggedIn(true);
//       setUser(data.user);

//       // Optionally, you can fetch the user data here if needed (using `getCurrentUser` or similar)
//       console.log('User logged in successfully:', data.user);

//       // After logging in, navigate to the home page (handle it in App.js)
//       // Instead of using navigate(), we can trigger the homepage route by updating the app state
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setError('Failed to log in. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="login-page">
//       <LogInForm onSubmit={handleFormSubmit} />
//       {error && <div className="error-message">{error}</div>} {/* Display error message if any */}
//       <button className="signup-redirect-button" onClick={() => window.location.href = '/sign-up'}>
//         Create an account? Sign Up
//       </button>
//     </div>
//   );
// };

// export default LogIn;

// import React, { useState } from 'react';
// import LogInForm from '../components/forms/LogInForm';
// import './LogIn.css';

// const LogIn = ({ setIsLoggedIn, setUser }) => {
//   const [error, setError] = useState(null); // For handling errors

//   const handleFormSubmit = async (credentials) => {
//     console.log('Logging in with credentials:', credentials);

//     try {
//       const response = await fetch('http://localhost:3002/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(credentials),
//       });

//       if (!response.ok) {
//         throw new Error('Invalid credentials');  // Show an error if the credentials are invalid
//       }

//       const data = await response.json();

//       // Set the user data and logged-in state
//       localStorage.setItem('token', data.token);  // Save the token in localStorage
//       setUser(data.user);
//       setIsLoggedIn(true);
      
//       // Optionally, you can manually handle the redirection using the window location
//       window.location.href = '/';  // Redirect to the home page

//     } catch (error) {
//       console.error('Error logging in:', error);
//       setError('Invalid username or password');  // Set error message if login fails
//     }
//   };

//   return (
//     <div className="login-page">
//       {error && <div className="error-message">{error}</div>} {/* Show error message */}
//       <LogInForm onSubmit={handleFormSubmit} />
//       <button className="signup-redirect-button" onClick={() => window.location.href = '/sign-up'}>
//         Create an account? Sign Up
//       </button>
//     </div>
//   );
// };

// export default LogIn;




import React, { useState } from 'react';
import LogInForm from '../components/forms/LogInForm';
import './LogIn.css';

const LogIn = ({ setIsLoggedIn, setUser }) => {
  const [error, setError] = useState(null); // For handling errors

  const handleFormSubmit = async (credentials) => {
    console.log('Logging in with credentials:', credentials);

    try {
      // Fetch all users (this is less efficient, especially if you have many users)
      const response = await fetch('http://localhost:3002/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const users = await response.json();

      // Find the user by username in the response
      const user = users.find((u) => u.username === credentials.username);

      if (!user) {
        setError('User not found');
        return;
      }

      // Validate the password (you should ideally do this on the backend)
      const isPasswordValid = user.password === credentials.password; // Or compare hashes on the backend
      if (!isPasswordValid) {
        setError('Invalid username or password');
        return;
      }

      // Set user data and logged-in state
      localStorage.setItem('token', user.token); // Assuming your response contains a token
      setUser(user);  // Set the user object
      setIsLoggedIn(true);

      // Optionally, redirect the user to the home page using window.location.href
      window.location.href = '/';  // Redirect to home page after login

    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password');  // Set error message if login fails
    }
  };

  return (
    <div className="login-page">
      {error && <div className="error-message">{error}</div>} {/* Show error message */}
      <LogInForm onSubmit={handleFormSubmit} />
      <button className="signup-redirect-button" onClick={() => window.location.href = '/sign-up'}>
        Create an account? Sign Up
      </button>
    </div>
  );
};

export default LogIn;
