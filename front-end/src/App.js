// // App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/common/Header';
// import Home from './pages/Home';
// import PastTrip from './pages/PastTrip';
// import ActivitiesPage from './pages/ActivitiesPage';
// import Locations from './pages/Locations';
// import AddActivity from './pages/AddActivity';
// import AddLocation from './pages/AddLocation';
// import ProfilesPage from './pages/ProfilesPage';
// import AddTrip from './pages/AddTrip';
// import JoinTrip from './pages/JoinTrip';
// import LogIn from './pages/LogIn';
// import SignUp from './pages/SignUp';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to "logged in" for mock
//   const user = { name: "John Doe", profileAvatar: "🧑" };

//   const handleSignOut = () => {
//     setIsLoggedIn(false);
//   };

//   const handleLogoClick = () => {
//     setIsLoggedIn(true); // Mock auto-login when returning to homepage
//   };

//   return (
//     <Router>
//       <Header user={user} isLoggedIn={isLoggedIn} onSignOut={handleSignOut} onLogoClick={handleLogoClick} />
//       <main className="App-main">
//         <Routes>
//           <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
//           <Route path="/past-trip/:locationId" element={<PastTrip />} /> 
//           <Route path="/activities/:locationId" element={<ActivitiesPage />} /> 
//           <Route path="/locations/:tripId" element={<Locations />} />
//           <Route path="/add-activity/:locationId" element={<AddActivity />} />
//           <Route path="/add-location/:tripId" element={<AddLocation />} />
//           <Route path="/profile" element={<ProfilesPage />} />
//           <Route path="/create-trip/:userId" element={<AddTrip />} />
//           <Route path="/join-trip" element={<JoinTrip />} />
//           <Route path="/log-in" element={<LogIn />} />
//           <Route path="/sign-up" element={<SignUp />} />
//         </Routes>
//       </main>
//     </Router>
//   );
// };

// export default App;


// // App.js
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/common/Header';
// import Home from './pages/Home';
// import PastTrip from './pages/PastTrip';
// import ActivitiesPage from './pages/ActivitiesPage';
// import Locations from './pages/Locations';
// import AddActivity from './pages/AddActivity';
// import AddLocation from './pages/AddLocation';
// import ProfilesPage from './pages/ProfilesPage';
// import AddTrip from './pages/AddTrip';
// import JoinTrip from './pages/JoinTrip';
// import LogIn from './pages/LogIn';
// import SignUp from './pages/SignUp';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   // On initial load, check if the user is logged in by checking the token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Fetch user data if the user is logged in (token exists)
//       fetch('http://localhost:3002/users/me', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setUser(data);  // Store the user data, including avatar
//           setIsLoggedIn(true);  // User is logged in
//         })
//         .catch((error) => {
//           console.error('Error fetching user data:', error);
//           setIsLoggedIn(false);
//         });
//     }
//   }, []);

//   const handleSignOut = () => {
//     setIsLoggedIn(false);
//     setUser(null);
//     localStorage.removeItem('token'); // Remove token on sign out
//   };

//   const handleLogoClick = () => {
//     // This could be used to go to the homepage
//     setIsLoggedIn(true);
//   };

//   return (
//     <Router>
//       <Header
//         user={user}
//         isLoggedIn={isLoggedIn}
//         onSignOut={handleSignOut}
//         onLogoClick={handleLogoClick}
//       />
//       <main className="App-main">
//         <Routes>
//           <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
//           <Route path="/past-trip/:locationId" element={<PastTrip />} /> 
//           <Route path="/activities/:locationId" element={<ActivitiesPage />} /> 
//           <Route path="/locations/:tripId" element={<Locations />} />
//           <Route path="/add-activity/:locationId" element={<AddActivity />} />
//           <Route path="/add-location/:tripId" element={<AddLocation />} />
//           <Route path="/profile" element={<ProfilesPage />} />
//           <Route path="/create-trip/:userId" element={<AddTrip />} />
//           <Route path="/join-trip" element={<JoinTrip />} />
//           <Route path="/log-in" element={<LogIn />} />
//           {/* <Route path="/sign-up" element={<SignUp />} /> */}
//           <Route path="/sign-up" element={<SignUp setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
//         </Routes>
//       </main>
//     </Router>
//   );
// };

// export default App;

// App.js
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/common/Header';
// import Home from './pages/Home';
// import PastTrip from './pages/PastTrip';
// import ActivitiesPage from './pages/ActivitiesPage';
// import Locations from './pages/Locations';
// import AddActivity from './pages/AddActivity';
// import AddLocation from './pages/AddLocation';
// import ProfilesPage from './pages/ProfilesPage';
// import AddTrip from './pages/AddTrip';
// import JoinTrip from './pages/JoinTrip';
// import LogIn from './pages/LogIn';
// import SignUp from './pages/SignUp';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null); 
//   const navigate = useNavigate(); // Used for navigation
  
//   // On initial load, check if the user is logged in by checking the token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Fetch user data if the user is logged in (token exists)
//       fetch('http://localhost:3002/users/me', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data) {
//             setUser(data);  // Store the user data, including avatar
//             setIsLoggedIn(true);  // User is logged in
//             navigate('/');  // Redirect to home page
//           } else {
//             setIsLoggedIn(false);
//           }
//         })
//         .catch((error) => {
//           console.error('Error fetching user data:', error);
//           setIsLoggedIn(false);
//         });
//     }
//   }, []);

//   const handleSignOut = () => {
//     setIsLoggedIn(false);
//     setUser(null);
//     localStorage.removeItem('token'); // Remove token on sign out
//   };

//   return (
//     <Router>
//       <Header
//         user={user}
//         isLoggedIn={isLoggedIn}
//         onSignOut={handleSignOut}
//       />
//       <main className="App-main">
//         <Routes>
//           <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
//           <Route path="/past-trip/:locationId" element={<PastTrip />} /> 
//           <Route path="/activities/:locationId" element={<ActivitiesPage />} /> 
//           <Route path="/locations/:tripId" element={<Locations />} />
//           <Route path="/add-activity/:locationId" element={<AddActivity />} />
//           <Route path="/add-location/:tripId" element={<AddLocation />} />
//           <Route path="/profile" element={<ProfilesPage />} />
//           <Route path="/create-trip/:userId" element={<AddTrip />} />
//           <Route path="/join-trip" element={<JoinTrip />} />
//           <Route path="/log-in" element={<LogIn />} />
//           <Route path="/sign-up" element={<SignUp setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
//         </Routes>
//       </main>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Header from './components/common/Header';
import Home from './pages/Home';
import PastTrip from './pages/PastTrip';
import ActivitiesPage from './pages/ActivitiesPage';
import Locations from './pages/Locations';
import AddActivity from './pages/AddActivity';
import AddLocation from './pages/AddLocation';
import ProfilesPage from './pages/ProfilesPage';
import AddTrip from './pages/AddTrip';
import JoinTrip from './pages/JoinTrip';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // On initial load, check if the user is logged in by checking the token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data if the user is logged in (token exists)
      fetch('http://localhost:3002/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setUser(data);  // Store the user data, including avatar
            setIsLoggedIn(true);  // User is logged in
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);  // No token, user is not logged in
    }
  }, []);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token'); // Remove token on sign out
  };

  return (
    <Router>
      <Header
        user={user}
        isLoggedIn={isLoggedIn}
        onSignOut={handleSignOut}
      />
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/past-trip/:locationId" element={<PastTrip />} />
          <Route path="/activities/:locationId" element={<ActivitiesPage />} />
          <Route path="/locations/:tripId" element={<Locations />} />
          <Route path="/add-activity/:locationId" element={<AddActivity />} />
          <Route path="/add-location/:tripId" element={<AddLocation />} />
          <Route path="/profile" element={<ProfilesPage />} />
          <Route path="/create-trip/:userId" element={<AddTrip />} />
          <Route path="/join-trip" element={<JoinTrip />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
