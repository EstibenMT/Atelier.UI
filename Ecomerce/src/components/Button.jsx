import React from 'react';

export default function Button({ children, type = 'button', className = '' }) {
    return (
        <button
            type={type}
            className={`bg-black text-white py-2 rounded-md hover:bg-gray-800 transition ${className}`}
        >
            {children}
        </button>
    );
}
