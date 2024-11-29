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
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to "logged in" for mock
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/users/64b1c7c8f2a5b9a2d5c8f001');
      const data = await response.json();
      setUser({ name: data.name, profileAvatar: data.profileAvatar });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUser(null); // Reset user data on sign-out
    window.location.href = '/log-in'; // Use window.location.href for navigation
  };

  const handleLogoClick = () => {
    window.location.href = '/'; // Use window.location.href to go back to the homepage
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
          <Route path="/profile" element={<ProfilesPage setUser={setUser} />} />
          <Route path="/create-trip/:userId" element={<AddTrip />} />
          <Route path="/join-trip" element={<JoinTrip />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
