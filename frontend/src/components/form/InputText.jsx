import React from 'react';

function InputText({ title, type, id, placeholder, required, value, onChange, className }) {
    return (
        <div className={className}>
            {title && (
                <label htmlFor={id} className='text-sm font-medium text-gray-900 dark:text-white'>
                    {title}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                id={id}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}

export default InputText;
