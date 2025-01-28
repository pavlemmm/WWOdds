import React, { createContext, useContext, useReducer } from 'react';
import { jwtDecode } from 'jwt-decode';

// Initial state
const tokenStorage = localStorage.getItem('token')
const initialState = {
    token: tokenStorage,
    user: tokenStorage ? jwtDecode(tokenStorage) : null,
};

// const authActions = {
//     REGISTER: 'REGISTER',
//     LOGIN: 'LOGIN',
//     LOGOUT: 'LOGOUT'
// }

// Reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER':
        case 'LOGIN':
            localStorage.setItem('token', action.payload);
            return {token: action.payload, user: jwtDecode(action.payload)};

        case 'LOGOUT':
            localStorage.removeItem('token');
            return {token: null, user: null};

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

// Custom hook for using the AuthContext
export const useAuth = () => useContext(AuthContext);
