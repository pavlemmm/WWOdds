import React from 'react';

function Button({ children, type, onClick, className }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={'px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-500 hover:border-gray-400 ' + className}
        >
            {children}
        </button>
    );
}

export default Button;
