import React from 'react';

function Button({ children, type, onClick, className, style }) {
    let classNameString =
        className + ' px-3 py-2 border text-gray-900 rounded-lg dark:placeholder-gray-400 dark:text-white transition-all ';
    switch (style) {
        case 'blue':
            classNameString +=
                'dark:bg-blue-600 dark:hover:bg-blue-500 dark:border-blue-500 dark:hover:border-blue-400';
            break;
        case 'red':
            classNameString += 'dark:bg-red-800 dark:hover:bg-red-700 dark:border-red-600 dark:hover:border-red-500';
            break;
        default:
            classNameString +=
                'bg-gray-50 hover:bg-gray-500 hover:border-gray-400 border-gray-300 dark:bg-gray-700 dark:border-gray-600';
            break;
    }
    return (
        <button type={type} onClick={onClick} className={classNameString}>
            {children}
        </button>
    );
}

export default Button;
