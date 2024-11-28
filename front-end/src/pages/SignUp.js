// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SignUpForm from '../components/forms/SignUpForm';
// import './SignUp.css';

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null); // state for handling errors

//   const handleFormSubmit = (userData) => {
//     console.log('Signing up with data:', userData);
    
//     // Simulate success or failure of sign-up logic here
//     const success = true; // Simulate success for now

//     if (success) {
//       navigate('/'); // Redirect to Home page on successful signup
//     } else {
//       setError('There was an issue creating your account. Please try again.'); // Simulated error message
//     }
//   };

//   return (
//     <div className="signup-page">
//       <SignUpForm onSubmit={handleFormSubmit} />
//       {error && <div className="error-message">{error}</div>} {/* Show error message */}
//       <button className="login-redirect-button" onClick={() => navigate('/log-in')}>
//         Already have an account? Log In
//       </button>
//     </div>
//   );
// };

// export default SignUp;

// // frontend/src/pages/SignUp.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SignUpForm from '../components/forms/SignUpForm';
// import './SignUp.css';

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null); // State for handling errors

//   const handleFormSubmit = async (userData) => {
//     console.log('Signing up with data:', userData);

//     try {
//       const response = await fetch('http://localhost:3002/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Save the token in localStorage after sign-up
//         localStorage.setItem('token', data.token);

//         // Set the user data (including avatar) to the state
//         setUser(data.user);
//         setIsLoggedIn(true);
        
//         // Redirect to home page after successful sign-up
//         navigate('/home');
//       } else {
//         // Set error state if something went wrong
//         setError(data.message || 'There was an issue creating your account. Please try again.');
//       }
//     } catch (error) {
//       // Handle fetch or network errors
//       setError('An error occurred. Please check your network connection and try again.');
//       console.error('Error signing up:', error);
//     }
//   };

//   return (
//     <div className="signup-page">
//       <SignUpForm onSubmit={handleFormSubmit} />
//       {error && <div className="error-message">{error}</div>} {/* Show error message */}
//       <button className="login-redirect-button" onClick={() => navigate('/log-in')}>
//         Already have an account? Log In
//       </button>
//     </div>
//   );
// };

// export default SignUp;

// frontend/src/pages/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/forms/SignUpForm';
import './SignUp.css';

const SignUp = ({ setIsLoggedIn, setUser }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State for handling errors

  const handleFormSubmit = async (userData) => {
    console.log('Signing up with data:', userData);

    try {
      const response = await fetch('http://localhost:3002/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Response from backend:', data); // Log the response from the server

      if (response.ok) {
        // Save the token in localStorage after sign-up
        localStorage.setItem('token', data.token);

        // Set the user data (including avatar) to the state
        setUser(data.user);
        setIsLoggedIn(true);

        // Redirect to home page after successful sign-up
        navigate('/');
      } else {
        // Set error state if something went wrong
        setError(data.message || 'There was an issue creating your account. Please try again.');
      }
    } catch (error) {
      // Handle fetch or network errors
      setError('An error occurred. Please check your network connection and try again.');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-page">
      <SignUpForm onSubmit={handleFormSubmit} />
      {error && <div className="error-message">{error}</div>} {/* Show error message */}
      <button className="login-redirect-button" onClick={() => navigate('/log-in')}>
        Already have an account? Log In
      </button>
    </div>
  );
};

export default SignUp;
