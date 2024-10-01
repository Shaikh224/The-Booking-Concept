// FlightSearch.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import akasaFlights from '../data/akasaFlights'; // Assuming this is your mock flight data
import { 
  faPlane, faClock, faLocationDot, faCloudSun, faCloudRain, 
  faCloudShowersHeavy, faCloudBolt, faSnowflake, faCircleCheck, 
  faCircleXmark, faCalendarDays, faArrowRight, 
  faExclamationTriangle 
} from '@fortawesome/free-solid-svg-icons';  

function FlightSearch() {
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const navigate = useNavigate();
  const [departureWeatherAlert, setDepartureWeatherAlert] = useState(null);
  const [arrivalWeatherAlert, setArrivalWeatherAlert] = useState(null);

  // Mock Weather Data
  const mockWeatherData = {
    'Delhi': {
      '2024-09-15': {
        condition: 'Partly Cloudy',
        icon: faCloudSun,
        message: 'Partly cloudy skies expected. Dress in layers.'
      },
      '2024-09-16': {
        condition: 'Sunny',
        icon: faCloudSun,
        message: 'Sunny weather forecast. Enjoy the sunshine!'
      }
      // Add more dates for Delhi
    },
    'Mumbai': {
      '2024-03-15': {
        condition: 'Rainy',
        icon: faCloudRain,
        message: 'Rain is expected. Bring an umbrella.'
      },
      '2024-03-16': {
        condition: 'Overcast',
        icon: faCloudSun,
        message: 'Cloudy conditions are forecasted. Pack layers of clothing.'
      }
 // Add more dates for Mumbai
    },'Chennai': {
      '2024-09-15': {
        condition: 'Cyclone',
        icon: faCloudRain,
        message: 'For your safety reschedule your trip to another day'
      },
      '2024-09-16': {
        condition: 'Overcast',
        icon: faCloudSun,
        message: 'Cloudy conditions are forecasted. Pack layers of clothing.'
      }}
    // Add more cities as needed
  };

  // Function to fetch weather data using mock data
const fetchWeatherData = (departure, arrival, date) => {
  const departureAirport = departure.split(' ')[0];
  const arrivalAirport = arrival.split(' ')[0];

  // Access the correct data from mockWeatherData 
  const departureAlert = mockWeatherData[departureAirport] && mockWeatherData[departureAirport][date];
  const arrivalAlert = mockWeatherData[arrivalAirport] && mockWeatherData[arrivalAirport][date];

  // Set the weather alert states *after* accessing the data 
  setDepartureWeatherAlert(departureAlert); 
  setArrivalWeatherAlert(arrivalAlert);
};
  // Available cities for dropdown
  const cities = ['Delhi (DEL)', 'Mumbai (BOM)', 'Bengaluru (BLR)', 'Chennai (MAA)', 'Hyderabad (HYD)', 'Kolkata (CCU)'];

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSearching(true);
  };

  const handleBookFlight = () => {
    if (selectedFlight) {
      navigate(`/booking/${selectedFlight.flightNumber}?adults=${adults}&children=${children}`); 
      setSelectedFlight(null);
    } else {
      alert("Please select a flight to book.");
    }
  };

  // UseEffect to update the weather data based on search
  useEffect(() => {
    if (isSearching && departureCity && arrivalCity && date) { 
      fetchWeatherData(departureCity, arrivalCity, date); 
    }
  }, [isSearching, departureCity, arrivalCity, date, fetchWeatherData]); 

  // UseEffect to filter and update the search results
  useEffect(() => {
    if (isSearching) { 
      setSearchResults(akasaFlights.filter((flight) => {
        const departureMatch = !departureCity || flight.departureCity === departureCity; 
        const arrivalMatch = !arrivalCity || flight.arrivalCity === arrivalCity; 

        return departureMatch && arrivalMatch; 
      }));
    } else {
      setSearchResults([]); 
    }
  }, [isSearching, departureCity, arrivalCity]); 

  return (
    <div className="bg-gray-100 min-h-screen"> 
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">Akasa Air Flight Search</h2> 
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="departure" className="block text-gray-700 font-bold mb-2">Departure City:</label>
              <select 
                id="departure" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
              >
                <option value="">Select Departure City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="arrival" className="block text-gray-700 font-bold mb-2">Arrival City:</label>
              <select 
                id="arrival" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={arrivalCity}
                onChange={(e) => setArrivalCity(e.target.value)}
              >
                <option value="">Select Arrival City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date:</label>
              <input
                type="date"
                id="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="adults" className="block text-gray-700 font-bold mb-2">Adults:</label>
              <input
                type="number"
                id="adults"
                min="1" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value, 10))}
              />
            </div>
            <div>
              <label htmlFor="children" className="block text-gray-700 font-bold mb-2">Children:</label>
              <input
                type="number"
                id="children"
                min="0"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value, 10))}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <FontAwesomeIcon icon={faPlane} className="mr-2" /> Search Flights
          </button>
        </form>

        {/* Departure Weather Alert Section */}
        {departureWeatherAlert && (
          <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 mr-2" />
            <span className="font-bold">Weather Alert at Departure ({departureCity}): </span> 
            {' '}
            <FontAwesomeIcon icon={departureWeatherAlert.icon} className="text-yellow-500 ml-2 mr-2" />
            {departureWeatherAlert.condition}. 
            <span>{departureWeatherAlert.message}</span>
          </div>
        )}

        {/* Arrival Weather Alert Section */}
        {arrivalWeatherAlert && (
          <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 mr-2" />
            <span className="font-bold">Weather Alert at Arrival ({arrivalCity}): </span> 
            {' '}
            <FontAwesomeIcon icon={arrivalWeatherAlert.icon} className="text-yellow-500 ml-2 mr-2" />
            {arrivalWeatherAlert.condition}. 
            <span>{arrivalWeatherAlert.message}</span>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Search Results:</h2>
          {searchResults.length === 0 && (
            <p className="text-gray-500">
              {isSearching ? "Loading flights..." : "No flights found matching your criteria."}
            </p>
          )}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((flight) => (
              <li 
                key={flight.flightNumber}  
                className={`bg-white shadow rounded-lg p-4 hover:bg-indigo-100 cursor-pointer ${selectedFlight === flight ? 'bg-indigo-100' : ''}`} 
                onClick={() => setSelectedFlight(flight)}
              >
                <h3 className="text-lg font-bold mb-2">
                  {flight.flightNumber} - {flight.departureCity} to {flight.arrivalCity}
                </h3>
                <div className="text-sm">
                  <span>{flight.departureDate}</span>{' '}
                  |{' '}
                  <span>{flight.departureTime}</span> -{' '}
                  <span>{flight.arrivalTime}</span>
                  <br />
                  <span>Duration: {flight.duration}</span>{' '}
                  <span>Price: ₹{flight.price}</span>
  
                </div>
                <button 
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={handleBookFlight}
                >
                  Book Now
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FlightSearch; 