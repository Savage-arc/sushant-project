import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../../utils/authUtils';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  
  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" replace />;
  }
  
  try {
    const decoded = jwtDecode(token);
    
    if (!decoded) {
      // Redirect to login if token is invalid
      return <Navigate to="/login" replace />;
    }
    
    // If user is authenticated, render the protected component
    return children;
  } catch (error) {
    console.error('Error decoding token:', error);
    // Redirect to login if token is invalid
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute; 