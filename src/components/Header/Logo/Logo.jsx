import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="text-lg font-bold text-gray-900">nnvStore</div>
    </Link>
  );
};

export default Logo; 