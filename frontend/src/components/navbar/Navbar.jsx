import React from 'react';
import NavLink from './NavLink';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
    const { user, dispatch } = useAuth();

    const logOut = () => {
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <nav className='shadow-xl border-b border-gray-700 bg-gray-800'>
            <div className='flex justify-between items-center container mx-auto'>
                <h1 className='px-5 font-bold'>
                    <Link to='/'>WWOdds</Link>
                </h1>
                <ul className='flex'>
                    {user ? (
                        <>
                            <Link to='/'>
                                <NavLink>Home</NavLink>
                            </Link>
                            <button onClick={logOut}>
                                <NavLink>Log out</NavLink>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to='/login'>
                                <NavLink>Login</NavLink>
                            </Link>
                            <Link to='/register'>
                                <NavLink>Register</NavLink>
                            </Link>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
