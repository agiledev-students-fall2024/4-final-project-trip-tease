import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserProfile, login as loginAPI, signup as signupAPI } from '../api/apiUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Current user state
  const [isLoading, setIsLoading] = useState(true); // Loading state for auth

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await fetchUserProfile();
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          localStorage.removeItem('token'); // Clear token if fetch fails
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const { token, user } = await loginAPI(username, password); // Get token and basic user data
      localStorage.setItem('token', token); // Save token in local storage
      console.log('Setting user in AuthContext:', user); // Debug log
  
      // Fetch full user profile after login
      const fullUserProfile = await fetchUserProfile();
      setUser(fullUserProfile); // Update with full profile data
    } catch (error) {
      console.error('Login failed:', error.message);
      throw error; // Propagate error to UI
    }
  };
  

  const signup = async (userData) => {
    try {
      const { token } = await signupAPI(userData); // API returns the token
      localStorage.setItem('token', token); // Save token in local storage
  
      // Fetch full user profile after signup
      const fullUserProfile = await fetchUserProfile();
      setUser(fullUserProfile); // Update with full profile data
    } catch (error) {
      console.error('Signup failed:', error.message);
      throw error; // Rethrow error for UI to handle
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token'); // Clear token
    setUser(null); // Reset user
    window.location.href = '/'; // Redirect to home
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, login, signup, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
