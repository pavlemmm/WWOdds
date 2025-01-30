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
        <div className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-50'>
            <div className='relative px-4 py-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg'>
                <button className='absolute top-0 right-2 text-gray-500' onClick={onClose}>
                    x
                </button>
                {children}
            </div>
        </div>
    );
}
