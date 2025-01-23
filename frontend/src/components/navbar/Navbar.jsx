import React from 'react';
import NavLink from './NavLink';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
    const { user, dispatch } = useAuth();

    const logOut = () => {
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <nav className='shadow-xl bg-gray-400 dark:bg-gray-800'>
            <div className='flex justify-between items-center container mx-auto'>
                <h1 className='px-5 font-bold'>
                    <a href='/'>WWOdds</a>
                </h1>
                <ul className='flex'>
                    {user ? (
                        <>
                            <a href='/'>
                                <NavLink>Home</NavLink>
                            </a>
                            <button onClick={logOut}>
                                <NavLink>Log out</NavLink>
                            </button>
                        </>
                    ) : (
                        <>
                            <a href='/login'>
                                <NavLink>Login</NavLink>
                            </a>
                            <a href='/register'>
                                <NavLink>Register</NavLink>
                            </a>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
