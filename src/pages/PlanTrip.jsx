// PlanTrip.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlaneDeparture,
  faClock,
  faLocationDot,
  faMapMarkerAlt, // For waiting time 
  faHourglassStart, // For waiting time 
  faCircleCheck,
  faCalendarDays, 
  faBuilding 
} from '@fortawesome/free-solid-svg-icons';
// No need to import additional CSS for now. You can style inline as needed.

function PlanTrip() {
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [startingPoint, setStartingPoint] = useState(''); 
  const location = useLocation();
  const { departureAirport, departureTime, gateNumber, travelTime } = location.state;

  // Mock Data (adjust travel times)
  const travelTimes = {
    'DEL': {
      'Gurgaon': 60,  // 1 hour to reach airport from Gurgaon
      'Noida': 45,   // 45 minutes to reach airport from Noida
      'Indirapuram': 30 // 30 minutes to reach airport from Indirapuram
    },
    'BOM': {
      'Meera Road': 40,
      'Navi Mumbai': 52,
      'Thane': 30
    },
    'BLR': {
      'Indira Nagar': 100,
      'LalBagh': 48,
      'SouthEnd Circle': 38
    },
    'HYD': {
      'Hitech Road': 120,
      'New Road': 45,
    }
  };

  // Calculate Estimated Time 
  const calculateEstimatedTime = () => {
    // Assuming these times are in minutes
    const checkInTime = 30; 
    const securityCheckTime = 15; 
    const gateWaitingTime = 20; 

    if (travelTimes[departureAirport] && travelTimes[departureAirport][startingPoint]) {
      const totalTime = travelTimes[departureAirport][startingPoint] + travelTime + checkInTime + securityCheckTime + gateWaitingTime;
      const hours = Math.floor(totalTime / 60);
      const minutes = totalTime % 60;
      const formattedTime = `${hours}h ${minutes}m`;
      setEstimatedTime(formattedTime);
    } else {
      setEstimatedTime('Not Available');
    }
  };

  useEffect(() => {
    calculateEstimatedTime();
  }, [startingPoint]); 

  // Function to get Today's Date
  const getTodayDate = () => {
    const today = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', dateOptions);
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Trip Planner</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Display Departure Details */}
        <div className="mb-2">
          <p className="font-bold mb-1">
            <FontAwesomeIcon icon={faCalendarDays} className="mr-1" />
            Departure Date:
          </p>
          <p>{getTodayDate()}</p>
        </div>
        <div className="mb-2">
          <p className="font-bold mb-1">
            <FontAwesomeIcon icon={faClock} className="mr-1" />
            Departure Time:
          </p>
          <p>{departureTime}</p>
        </div>
        <div className="mb-2">
          <p className="font-bold mb-1">
            <FontAwesomeIcon icon={faPlaneDeparture} className="mr-1" />
            Departure Airport:
          </p>
          <p>{departureAirport}</p>
        </div>

        {/* Estimated Gate */}
        <div className="mb-2">
          <p className="font-bold mb-1">
            <FontAwesomeIcon icon={faBuilding} className="mr-1" />
            Gate:
          </p>
          <p>{gateNumber}</p>
        </div>

        {/* Your Journey Section with Icons */}
        <div className="mb-2">
          <p className="font-bold mb-1">Your Journey:</p>
          <ul className="trip-breakdown">
            <li className="flex items-center">
              <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
              Starting Point:
              <span className="starting-point">
                {startingPoint || "Select Starting Point"}
              </span>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              {startingPoint && `To: ${departureAirport}`}
            </li>
            {startingPoint && (
              <>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faHourglassStart} className="mr-2" />
                  Check-in:
                  <span>30 Minutes</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faHourglassStart} className="mr-2" />
                  Security:
                  <span>15 Minutes</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faHourglassStart} className="mr-2" />
                  Gate Waiting:
                  <span>20 Minutes</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Starting Point Dropdown */}
        <div className="mb-2">
          <label
            htmlFor="startingPoint"
            className="block text-gray-700 font-bold mb-2"
          >
            Starting Point:
          </label>
          <select
            id="startingPoint"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={startingPoint}
            onChange={(e) => setStartingPoint(e.target.value)}
          >
            <option value="">Select Your Starting Point</option>
            {travelTimes[departureAirport] &&
              Object.keys(travelTimes[departureAirport]).map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-2">
          <p className="font-bold mb-1">Estimated Time to Boarding Gate:</p>
          <p className="text-green-500 font-bold rounded-md bg-green-100 p-2">
            <FontAwesomeIcon icon={faCircleCheck} className="mr-2" />
            {estimatedTime || "Not Available"}
          </p>
        </div>

        {/* ... any other elements... */}
      </div>
    </div>
  );
}

export default PlanTrip;