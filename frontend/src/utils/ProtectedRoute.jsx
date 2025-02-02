import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const getRedirectPath = (user, { guest, admin }) => {
    if (admin) return user?.isAdmin ? null : user ? '/' : '/login';
    if (guest) return user ? '/' : null;
    return user ? null : '/login';
};

const ProtectedRoute = ({ children, guest = false, admin = false }) => {
    const { state: authState } = useAuth();
    const { user } = authState;

    const redirectPath = getRedirectPath(user, { guest, admin });
    return redirectPath ? <Navigate to={redirectPath} /> : children;
};

export default ProtectedRoute;
