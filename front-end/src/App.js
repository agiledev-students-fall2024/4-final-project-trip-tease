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
  // Retrieve user data from localStorage safely (only if available)
  const storedUser = localStorage.getItem('user');
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

  const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn === 'true'); // Default to stored value
  // const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null); // Default to stored user object
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : { username: '', name: '', profileAvatar: '', email: '', bio: '' });


  // Handle login persistence with localStorage
  useEffect(() => {
    if (user && isLoggedIn) {
      // Store user and login state in localStorage when logged in
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      // Clear localStorage when logged out
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  }, [user, isLoggedIn]); // Depend on user and isLoggedIn

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUser(null); // Reset user data on sign-out
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.clear(); // Clear all data from localStorage
    window.location.href = '/log-in'; // Redirect to login page on sign-out
  };

  const handleLogoClick = () => {
    // Clicking the logo should not log out the user
    window.location.href = '/'; // Redirect to the homepage
  };

  return (
    <Router>
      <Header user={user} isLoggedIn={isLoggedIn} onSignOut={handleSignOut} onLogoClick={handleLogoClick} />
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/past-trip/:locationId" element={<PastTrip />} /> 
          <Route path="/activities/:locationId" element={<ActivitiesPage />} /> 
          <Route path="/locations/:tripId" element={<Locations />} />
          <Route path="/add-activity/:locationId" element={<AddActivity />} />
          <Route path="/add-location/:tripId" element={<AddLocation />} />
          <Route path="/profile" element={<ProfilesPage user={user} setUser={setUser} />} />
          <Route path="/create-trip/:userId" element={<AddTrip />} />
          <Route path="/join-trip" element={<JoinTrip />} />
          <Route path="/log-in" element={<LogIn user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/sign-up" element={<SignUp user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
