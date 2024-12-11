import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TripTabs from '../components/tabs/TripTabs';
import TripList from '../components/lists/TripList';
import './HomePage.css';

const Home = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('current');

  if (!user && !isLoading) {
    return <Navigate to="/log-in" replace />;
  }

  return (
    <div className="home">
      <div className="home__trips">
        <div className="home__trips-header">
          <div className="header-left">
            <h2 className="home__trips-title">My Trips</h2>
          </div>
          <div className="header-right">
            <a href="/join-trip" className="join-trip-link">
              Join Trip
            </a>
            <a href={`/create-trip/${user.id}`} className="create-trip-link">
              Create Trip
            </a>
          </div>
        </div>
        <TripTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {user && <TripList userId={user.id} activeTab={activeTab} />}
      </div>
    </div>
  );
};

export default Home;
