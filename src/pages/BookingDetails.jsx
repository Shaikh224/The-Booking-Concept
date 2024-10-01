import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import akasaFlights from '../data/akasaFlights'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faPlaneArrival, faCalendarAlt, faClock, faUser } from '@fortawesome/free-solid-svg-icons';

function BookingDetails() {
  const { flightId } = useParams(); 
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [showLogin, setShowLogin] = useState(false);

  const [searchParams] = useSearchParams();
  const adults = parseInt(searchParams.get('adults'), 10) || 1;
  const children = parseInt(searchParams.get('children'), 10) || 0;
  const numPassengers = adults + children;

  const [passengers, setPassengers] = useState(Array(numPassengers).fill(0).map((_, index) => ({
    firstName: isLoggedIn && index === 0 ? currentUser.firstName : '',
    lastName: isLoggedIn && index === 0 ? currentUser.lastName : '',
    dob: isLoggedIn && index === 0 ? currentUser.dob : '',
  })));

  useEffect(() => {
    const flightData = akasaFlights.find(flight => flight.flightNumber === flightId);
    if (flightData) {
      setFlight(flightData); 
    }
  }, [flightId]); 

  const handleLogin = (email, password) => {
    const fakeUsers = {
      "john.doe@example.com": {
        firstName: "John",
        lastName: "Doe",
        dob: "1990-01-01",
        password: "password123" 
      },
      // Add more fake users here
    };

    if (fakeUsers[email] && fakeUsers[email].password === password) {
      setCurrentUser(fakeUsers[email]);
      setIsLoggedIn(true);
      setShowLogin(false);
      setPassengers(Array(numPassengers).fill(0).map((_, index) => ({
        firstName: index === 0 ? fakeUsers[email].firstName : '',
        lastName: index === 0 ? fakeUsers[email].lastName : '',
        dob: index === 0 ? fakeUsers[email].dob : '',
      }))); 
    } else {
      alert("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setPassengers(Array(numPassengers).fill(0).map(() => ({
      firstName: '',
      lastName: '',
      dob: '', 
    })));
  };

  const handleFirstNameChange = (index, value) => {
    setPassengers(prevPassengers => 
      prevPassengers.map((p, i) => 
        i === index ? { ...p, firstName: value } : p
      )
    );
  };

  const handleLastNameChange = (index, value) => {
    setPassengers(prevPassengers => 
      prevPassengers.map((p, i) => 
        i === index ? { ...p, lastName: value } : p
      )
    );
  };

  const handleDobChange = (index, value) => {
    setPassengers(prevPassengers => 
      prevPassengers.map((p, i) => 
        i === index ? { ...p, dob: value } : p
      )
    );
  };

  const handleContinue = () => {
    localStorage.setItem('passengers', JSON.stringify(passengers));
    localStorage.setItem('flight', JSON.stringify(flight));

    navigate(`/seats/${flightId}`, {
      state: { 
        passengers: passengers, 
        flight: flight
      }
    });
  };

  if (!flight) {
    return <div>Loading flight details...</div>; 
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Booking Details
        </h2>

        <div className="mb-4">
          {!isLoggedIn && !showLogin && (
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowLogin(true)} 
            >
              Existing User
            </button>
          )}

          {isLoggedIn && (
            <>
              <span>Welcome, {currentUser.firstName}!</span>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          {showLogin && (
            <div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleLogin(document.getElementById("email").value, document.getElementById("password").value)}
              >
                Login
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Flight Information</h3>
          <div className="grid grid-cols-3 gap-4"> 
            <div className="col-span-2">
              <div className="flex items-center mb-3">
                <FontAwesomeIcon icon={faPlaneDeparture} className="text-indigo-600 mr-2" />
                <p>From: {flight.departureCity}</p>
              </div>
              <div className="flex items-center mb-3">
                <FontAwesomeIcon icon={faPlaneArrival} className="text-indigo-600 mr-2" />
                <p>To: {flight.arrivalCity}</p>
              </div>
              <div className="flex items-center mb-3">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-indigo-600 mr-2" />
                <p>Date: {flight.departureDate}</p>
              </div>
              <div className="flex items-center mb-3">
                <FontAwesomeIcon icon={faClock} className="text-indigo-600 mr-2" />
                <p>Departure Time: {flight.departureTime}</p>
              </div>
              <div className="flex items-center mb-3">
                <FontAwesomeIcon icon={faClock} className="text-indigo-600 mr-2" />
                <p>Arrival Time: {flight.arrivalTime}</p>
              </div>
              <div className="flex items-center mb-3">
                <span className="mr-2">Duration:</span> <span>{flight.duration}</span>
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold mb-2 text-indigo-600">Price:</div>
              <div className="text-2xl font-semibold">₹{flight.price}</div> 
            </div>
          </div>
        </div>

        <form onSubmit={(event) => event.preventDefault()} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Passenger Information</h3>
          {passengers.map((passenger, index) => (
            <div key={index} className="mb-4 flex flex-col">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faUser} className="text-indigo-600 mr-2" />
                <label htmlFor={`firstName-${index}`} className="block text-gray-700 font-bold">
                  First Name
                </label>
              </div>
              <input
                type="text"
                id={`firstName-${index}`}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                value={passenger.firstName}
                onChange={(e) => handleFirstNameChange(index, e.target.value)}
              />

              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faUser} className="text-indigo-600 mr-2" />
                <label htmlFor={`lastName-${index}`} className="block text-gray-700 font-bold">
                  Last Name
                </label>
              </div>
              <input
                type="text"
                id={`lastName-${index}`}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                value={passenger.lastName}
                onChange={(e) => handleLastNameChange(index, e.target.value)}
              />

              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-indigo-600 mr-2" />
                <label htmlFor={`dob-${index}`} className="block text-gray-700 font-bold">
                  Date of Birth
                </label>
              </div>
              <input
                type="date"
                id={`dob-${index}`}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                value={passenger.dob}
                onChange={(e) => handleDobChange(index, e.target.value)}
              />
            </div>
          ))}

          <button
            type="button"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleContinue}
          >
            Continue
          </button>
        </form>
      </div>
      
    </div>
  );
}

export default BookingDetails;