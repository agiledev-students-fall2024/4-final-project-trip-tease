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
          <h2 className="home__trips-title">My Trips</h2>
          <div className="home__trips-actions">
            <a href="/join-trip">Join Trip</a>
            <span className="home__trips-actions__separator">|</span>
            {user && <a href={`/create-trip/${user.id}`}>Create Trip</a>}
          </div>
        </div>
        <TripTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {user && <TripList userId={user.id} activeTab={activeTab} />}
      </div>
    </div>
  );
};

export default Home;
