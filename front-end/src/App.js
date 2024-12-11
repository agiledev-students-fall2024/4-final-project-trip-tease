import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import RouteAuth from './components/common/RouteAuth';
import Home from './pages/HomePage';
import PastTrip from './pages/PastTripPage';
import ActivitiesPage from './pages/ActivitiesPage';
import Locations from './pages/LocationsPage';
import AddActivity from './pages/AddActivityPage';
import AddLocation from './pages/AddLocationPage';
import ProfilesPage from './pages/ProfilePage';
import AddTrip from './pages/AddTripPage';
import JoinTrip from './pages/JoinTripPage';
import LogIn from './pages/LogInPage';
import SignUp from './pages/SignUpPage';
import EditTripPage from './pages/EditTripPage'; 
import EditActivity from './pages/EditActivityPage';

const App = () => {
  return (
    <Router>
      <Header /> {/* Always display the Header */}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/log-in" element={<RouteAuth isProtected={false}><LogIn /></RouteAuth>} />
          <Route path="/sign-up" element={<RouteAuth isProtected={false}><SignUp /></RouteAuth>} />

          {/* Protected Routes */}
          <Route path="/" element={<RouteAuth isProtected><Home /></RouteAuth>} />
          <Route path="/past-trip/:locationId" element={<RouteAuth isProtected><PastTrip /></RouteAuth>} />
          <Route path="/activities/:locationId" element={<RouteAuth isProtected><ActivitiesPage /></RouteAuth>} />
          <Route path="/locations/:tripId" element={<RouteAuth isProtected><Locations /></RouteAuth>} />
          <Route path="/add-activity/:locationId" element={<RouteAuth isProtected><AddActivity /></RouteAuth>} />
          <Route path="/add-location/:tripId" element={<RouteAuth isProtected><AddLocation /></RouteAuth>} />
          <Route path="/edit-trip/:tripId" element={<RouteAuth isProtected><EditTripPage /></RouteAuth>} /> {/* Add EditTripPage */}
          <Route path="/profile" element={<RouteAuth isProtected><ProfilesPage /></RouteAuth>} />
          <Route path="/create-trip/:userId" element={<RouteAuth isProtected><AddTrip /></RouteAuth>} />
          <Route path="/join-trip" element={<RouteAuth isProtected><JoinTrip /></RouteAuth>} />

          <Route path="/edit-activity/:activityId" element={<RouteAuth isProtected><EditActivity /></RouteAuth>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
