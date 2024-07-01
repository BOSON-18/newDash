import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OpenRoutes = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (token !== null) {
      return <Navigate to="/dashboard" />; // Redirect to the login page if token is null
    } else {
      return children; // Render the protected route components
  }
};

export default OpenRoutes;
