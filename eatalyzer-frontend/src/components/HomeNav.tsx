import React from 'react';
import { Link } from 'react-router-dom';

const HomeNav: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Eatalyzer</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav; 