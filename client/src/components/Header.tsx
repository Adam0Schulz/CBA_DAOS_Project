import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center text-white p-4 h-12 pl-10 pr-10">
      {/* Left side: HomePage Title */}
      <div>
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-blue-300"
        >
          Music Mates
        </Link>
      </div>

      {/* Right side: Navigation Buttons */}
      <nav className="flex items-center space-x-1">
        <Link to="/ensembles">
          <button className="text-lg text-white bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded">
            Ensembles
          </button>
        </Link>
        <Link to="/profile">
          <button className="text-lg text-white bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded">
            Profile
          </button>
        </Link>
        {isAuthenticated ? (
          <button 
            onClick={logout}
            className="text-lg text-blue-800 bg-white hover:bg-red-100 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="text-lg text-blue-800 bg-white hover:bg-gray-100 px-4 py-2 rounded">
              Login
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
