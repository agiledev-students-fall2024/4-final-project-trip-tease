// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import ProfileDropdown from './components/profile/ProfileDropdown';
import { AuthProvider, useAuth } from './context/AuthContext';
import PastTrip from './pages/PastTrip';
import './App.css';
import ActivitiesPage from './pages/ActivitiesPage';
import Locations from './pages/Locations';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
};

const Main = () => {
  const { isLoggedIn, logout } = useAuth(); 
  const user = isLoggedIn ? { name: "J Doe", profilePicture: "https://via.placeholder.com/100" } : null;

  const handleSignUp = () => {
    console.log('User signed up');
  };

  return (
    <>
      <Header user={user} isLoggedIn={isLoggedIn} />
      <main className="App-main">
        <ProfileDropdown onSignOut={logout} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage onSignUp={handleSignUp} />} />
          <Route path="/past-trip/:id" element={<PastTrip />} />
          <Route path="/a" element={<ActivitiesPage />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
