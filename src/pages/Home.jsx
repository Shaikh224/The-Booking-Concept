import React from 'react';
import FlightSearch from './FlightSearch'; // Import the FlightSearch component

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Travel Smart!</h1>
      <p className="text-xl mt-4 text-gray-600">
        Simplifying travel, one journey at a time.
      </p>

      {/* Add FlightSearch component here */}
      <div className="container mx-auto mt-16">
        <FlightSearch />
      </div>

    </div>
  );
}

export default Home;