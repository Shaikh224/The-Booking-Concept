import React from 'react';
import akasaFlights from '../data/akasaFlights'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlaneDeparture, 
  faPlaneArrival, 
  faClock, 
  faCircleCheck, 
  faCircleXmark, 
  faCloudShowersHeavy, 
  faCloudSun, 
  faBuilding, // You were using faPlane 
  faPlane // Import this here! 
} from '@fortawesome/free-solid-svg-icons';


  // Generate random statuses and gate numbers for flights
function Schedule() {
    // Function to generate random statuses
    const generateRandomStatus = () => {
      const statuses = [
        'On Time',
        'Delayed',
        'Boarding', 
        'Check-in',
        'Departed'
      ];
      return statuses[Math.floor(Math.random() * statuses.length)];
    };
  
    // Function to generate random gate numbers
    const generateRandomGate = () => {
      return Math.floor(Math.random() * 20) + 1; // Generates random gate numbers between 1 and 20
    };
  
    // Generate random statuses and gate numbers for flights
    const flightsWithStatusAndGate = akasaFlights.map((flight) => ({
      ...flight,
      status: generateRandomStatus(), // Now this function will be accessible
      gate: generateRandomGate(),    
    }));

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Akasa Air Flight Schedule</h2>
      
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Flight Number</th>
            <th className="px-4 py-2">Route</th>
            <th className="px-4 py-2">Departure Time</th>
            <th className="px-4 py-2">Arrival Time</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Gate</th> {/* Added gate column */}
          </tr>
        </thead>
        <tbody>
          {flightsWithStatusAndGate.map((flight, index) => (
            <tr key={index}> 
              <td className="border px-4 py-2">{flight.flightNumber}</td>
              <td className="border px-4 py-2">
                <span className="font-semibold">
                  <FontAwesomeIcon icon={faPlaneDeparture} className="mr-1" />
                  {flight.departureCity}
                </span> 
                <span className="ml-2">
                  <FontAwesomeIcon icon={faPlaneArrival} className="mr-1" />
                  {flight.arrivalCity} 
                </span>
              </td>
              <td className="border px-4 py-2"><FontAwesomeIcon icon={faClock} className="mr-1" /> {flight.departureTime}</td>
              <td className="border px-4 py-2"><FontAwesomeIcon icon={faClock} className="mr-1" /> {flight.arrivalTime}</td>
              <td className="border px-4 py-2">
                <div className="flex items-center">
                  {flight.status === 'On Time' && (
                    <div className="bg-green-500 text-white font-bold py-1 px-3 rounded-md mr-2">
                      <FontAwesomeIcon icon={faCircleCheck} className="mr-1" /> {flight.status}
                    </div>
                  )}
                  {flight.status === 'Delayed' && (
                    <div className="bg-red-500 text-white font-bold py-1 px-3 rounded-md mr-2">
                      <FontAwesomeIcon icon={faCircleXmark} className="mr-1" /> {flight.status} 
                    </div>
                  )}
                  {flight.status === 'Boarding' && (
                    <div className="bg-blue-500 text-white font-bold py-1 px-3 rounded-md mr-2">
                      <FontAwesomeIcon icon={faPlaneDeparture} className="mr-1" /> {flight.status} 
                    </div>
                  )}
                  {flight.status === 'Check-in' && (
                    <div className="bg-yellow-500 text-white font-bold py-1 px-3 rounded-md mr-2">
                      <FontAwesomeIcon icon={faClock} className="mr-1" /> {flight.status} 
                    </div>
                  )}
                  {flight.status === 'Departed' && (
                    <div className="bg-gray-500 text-white font-bold py-1 px-3 rounded-md mr-2">
                      <FontAwesomeIcon icon={faPlane} className="mr-1" /> {flight.status} 
                    </div>
                  )}
                  {/* Add more status cases... */}
                </div> 
              </td> 
              <td className="border px-4 py-2">{flight.gate}</td>  {/* Displaying the gate number */}
            </tr> 
          ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Schedule; 