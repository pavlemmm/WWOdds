import React from 'react';

function Sign() {
    return (
        <form className="grid gap-6 mb-6 md:grid-cols-2">
            <div class='mb-6'>
                <label for='email' class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Email address
                </label>
                <input
                    type='email'
                    id='email'
                    class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='john.doe@company.com'
                    required
                />
            </div>
        </form>
    );
}

export default Sign;
