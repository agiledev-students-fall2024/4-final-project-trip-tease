import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './context/AuthContext'; // Ensure default export for AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the entire application with AuthProvider to manage user state */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// reportWebVitals is not necessary unless explicitly needed.
