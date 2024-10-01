import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Travel Smart</Link>

        <ul className="flex space-x-6">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/flight-search">Flight Search</Link></li>
          <li><Link to="/manage-bookings">Manage Bookings</Link></li>
          <li><Link to="/schedule">Schedule</Link></li> 
          {/* Add more navigation links here */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;