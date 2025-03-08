import React from 'react';

function Navbar() {
  return (
    <nav className="fixed w-full p-4" style={{ backgroundColor: "#dfc634" }}>
      <div className="container mx-auto flex justify-between items-center gap-x-8">

        <div className="flex items-center space-x-2">
          <div className="text-white font-serif text-3xl font-bold">Notes</div>
        </div>

        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-white text-2xl hover:text-gray-200 hover:scale-105 transition-transform duration-200">
            Home
          </a>
          <a href="#" className="text-white text-2xl hover:text-gray-200 hover:scale-105 transition-transform duration-200">
            About
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;