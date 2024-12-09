import React from 'react';
import NavLink from './NavLink';

const signed = true;
const links = ['INFO', 'SING UP', 'SIGN IN'];
const linksSigned = ['INFO', 'PROFILE', 'SIGN OUT'];

function Navbar() {
    return (
        <nav className='shadow-xl bg-gray-400 dark:bg-gray-700'>
            <div className='flex justify-between items-center container mx-auto'>
                <h1 className='px-5'>LOGO</h1>
                <ul className='flex'>
                    {signed ? linksSigned.map(el => <NavLink key={el}>{el}</NavLink>) : links.map(el => <NavLink key={el}>{el}</NavLink>)}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
