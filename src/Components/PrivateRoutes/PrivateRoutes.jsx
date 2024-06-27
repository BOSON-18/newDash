import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (token !== null) {
    return children; // Render the protected route components
  } else {
    return <Navigate to="/" />; // Redirect to the login page if token is null
  }
};

export default PrivateRoutes;
