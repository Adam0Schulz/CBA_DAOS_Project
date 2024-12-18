import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center px-8 py-4">
        {/* Left side: HomePage Title */}
        <div>
          <Link
            to="/"
            className="text-3xl font-bold text-red-600 hover:text-red-700 transition duration-300"
          >
            Musik Samspil
          </Link>
        </div>

        {/* Right side: Navigation Buttons */}
        <nav className="flex items-center space-x-4">
          <Link to="/ensembles">
            <button className="text-lg bg-blue-900 text-white hover:bg-blue-800 px-6 py-2 rounded-md transition duration-300">
              Ensembles
            </button>
          </Link>
          <Link to="/musicians">
            <button className="text-lg bg-blue-900 text-white hover:bg-blue-800 px-6 py-2 rounded-md transition duration-300">
              Musicians
            </button>
          </Link>
          <Link to="/profile">
            <button className="text-lg bg-blue-900 text-white hover:bg-blue-800 px-6 py-2 rounded-md transition duration-300">
              Profile
            </button>
          </Link>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="text-lg text-blue-900 bg-white border border-blue-900 hover:bg-blue-100 px-6 py-2 rounded-md transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="text-lg text-blue-900 bg-white border border-blue-900 hover:bg-blue-100 px-6 py-2 rounded-md transition duration-300">
                Login
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
