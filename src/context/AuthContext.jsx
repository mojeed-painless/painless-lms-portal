// lms-react-app/src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context object
const AuthContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
// Define the base URL for your backend API
const API_URL = `${API_BASE}/api/users`;



// 2. Custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. The Provider Component
export const AuthProvider = ({ children }) => {
  // Check localStorage for stored user info on initial load
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- API Handlers ---

  const login = async (identifier, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${API_URL}/login`,
        { identifier, password },
        config
      );

      // Save user data to state and local storage
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoading(false);
      return data; // Return data on success
      
    } catch (err) {
      const errorMessage = err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
      
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  const register = async (username, email, password, role) => {
    setIsLoading(true);
    setError(null);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${API_URL}/register`,
        { username, email, password, role },
        config
      );

      // Registration is often followed by automatic login
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoading(false);
      return data;

    } catch (err) {
      const errorMessage = err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
      
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    // You might also want to redirect the user here
  };
  
  // --- Context Value ---
  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};