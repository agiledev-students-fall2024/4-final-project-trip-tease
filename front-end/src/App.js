// App.js
import React, { useState } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to "logged in" for mock
  const [user, setUser] = useState(null); // User is initially null when not logged in

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUser(null); // Clear user data when signing out
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      window.location.href = '/'; // Navigate to the homepage only if the user is logged in
    }
    // If the user is not logged in, do nothing
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
          <Route path="/profile" element={<ProfilesPage />} />
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
