import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
    user: localStorage.getItem('user') || null,
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
            localStorage.setItem('user', action.payload);
            return { user: action.payload };

        case 'LOGOUT':
            localStorage.removeItem('user');
            return { user: null };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return <AuthContext.Provider value={{ user: state.user, dispatch }}>{children}</AuthContext.Provider>;
};

// Custom hook for using the AuthContext
export const useAuth = () => useContext(AuthContext);
