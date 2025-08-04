import React from 'react';
import Navigation from '../Navigation/Navigation';

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Full Screen Menu */}
      <div className="fixed inset-0 bg-white z-50 md:hidden overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-bold text-gray-900">nnvStore</div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-900 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Centered Navigation Menu */}
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Navigation isMobile={true} onItemClick={onClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu; 