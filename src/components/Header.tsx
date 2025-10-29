import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-gray-600 via-black to-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
      <h1 className="text-2xl font-bold mb-6 text-white text-center md:text-left animate-pulse">
        Favorite Movies Booking
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
        <nav className="flex justify-center space-x-4">
          <a href="/dashboard" className="hover:underline">
            Dashboard
          </a>
          <a href="/movieslist" className="hover:underline">
            Movies
          </a>
        </nav>
        <div
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="p-2.5 bg-white text-black rounded hover:white cursor-pointer text-center"
        >
          Logout
        </div>
      </div>
    </header>
  );
};

export default Header;
