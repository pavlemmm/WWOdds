import { useEffect } from 'react';

export default function Modal({ children, isOpen, onClose }) {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
            <div className='relative px-4 py-6 dark:bg-gray-800 bg-gray-300 border dark:border-gray-700 border-gray-400 rounded-lg shadow-lg'>
                <button className='absolute top-0 right-2 text-gray-500' onClick={onClose}>
                    x
                </button>
                {children}
            </div>
        </div>
    );
}
