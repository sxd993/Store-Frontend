import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  return (
    <Link to="/login" className="text-gray-900 hover:text-gray-700 transition-colors">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </Link>
  );
};

export default UserMenu; 