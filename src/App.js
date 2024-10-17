import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login'
import PageRoute from './PageRoute';

const App = () => {

  const isAuthenticated = () => {
    return localStorage.getItem('encryptedToken') !== null;
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={
          <ProtectedRoute>
            <PageRoute />
          </ProtectedRoute>} />
      </Routes>
    </Router >
  );
};

export default App;
