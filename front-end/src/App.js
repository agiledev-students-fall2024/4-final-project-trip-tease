import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TripsPage from './pages/home/TripsPage';
import Header from './pages/universals/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<TripsPage />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />  {/* Optional: Catch-all route */}
      </Routes>
    </Router>
  );
};

export default App;