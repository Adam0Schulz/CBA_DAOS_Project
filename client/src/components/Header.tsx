import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const isLoggedIn = false; // Replace with actual login status logic

  return (
    <header className="flex justify-between items-center bg-gray-800 text-white p-4">
      {/* Left side: HomePage Title */}
      <div>
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-gray-300"
        >
          Music Mates
        </Link>
      </div>

      {/* Right side: Navigation Buttons */}
      <nav className="flex space-x-6">
        <Link
          to="/ensembles"
          className="text-lg hover:text-gray-300"
        >
          Ensembles
        </Link>
        <Link
          to="/profile"
          className="text-lg hover:text-gray-300"
        >
          Profile
        </Link>
        <Link
          to={isLoggedIn ? "/logout" : "/login"}
          className="text-lg hover:text-gray-300"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
