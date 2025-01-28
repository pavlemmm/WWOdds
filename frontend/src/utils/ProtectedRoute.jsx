import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, guestOnly = false, admin = false }) => {
    const { state: authState } = useAuth();
    const { token, user } = authState;

    if (admin && !user) {
        return <Navigate to='/login' />;
    }

    if (admin && !user.isAdmin) {
        return <Navigate to='/' />;
    }

    if (guestOnly && user) {
        return <Navigate to='/' />;
    }

    if (!guestOnly && !user) {
        return <Navigate to='/login' />;
    }

    return children;
};

export default ProtectedRoute;
