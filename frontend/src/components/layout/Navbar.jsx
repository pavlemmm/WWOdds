import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const { state: authState, dispatch } = useAuth();
    const { user } = authState;

    const [theme, setTheme] = useTheme();

    const logOut = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <nav className='shadow-xl border-b dark:border-gray-700 dark:bg-gray-800 bg-gray-300 border-gray-400'>
            <div className='flex justify-between items-center container mx-auto'>
                <h1 className='px-5 font-bold'>
                    <Link to='/'>WWOdds</Link>
                </h1>
                <ul className='flex'>
                    <NavLink onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                        {theme === 'light' ? '🌙' : '☀️'}
                    </NavLink>
                    {user ? (
                        <>
                            <NavLink to='/'>Home</NavLink>
                            {user.isAdmin && <NavLink to='/admin'>Admin</NavLink>}
                            <NavLink onClick={logOut}>Log out</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to='/login'>Login</NavLink>
                            <NavLink to='/register'>Register</NavLink>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

const NavLink = ({ children, to, onClick }) => {
    const el = <li className='p-3 dark:hover:bg-gray-700 hover:bg-gray-400 transition-all'>{children}</li>;
    if (to) return <Link to={to}>{el}</Link>;
    if (onClick) return <button onClick={onClick}>{el}</button>;
    return el;
};

const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    return [theme, setTheme];
};
