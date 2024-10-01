import React from 'react';
import { useParams, useNavigate, useSearchParams, useLocation, Link } from 'react-router-dom';

function Confirmation() {
  const location = useLocation(); 
  const { passengers, flight, selectedSeats, selectedFood } = location.state || {}; 

  if (!passengers || !flight || !selectedSeats) { 
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl font-bold text-center mb-8 text-indigo-600">
            Confirmation
          </h2>
          <p>Please complete the booking process first.</p>
        </div>
      </div>
    );
  }

  // Function to get food name from selectedFood
  const getFoodName = (foodIndex) => {
    const foodOption = selectedFood[foodIndex];
    if (foodOption !== undefined) {
      return foodOptions[foodOption].name;
    } else {
      return 'No Meal Selected'; 
    }
  };

  // Food Options (This should match your SeatSelection foodOptions)
  const foodOptions = [
    { name: "Vegetarian Meal", ageRestriction: null }, 
    { name: "Chicken Meal", ageRestriction: 12 },
    { name: "Vegan Meal", ageRestriction: null },
    { name: "Gluten-Free Meal", ageRestriction: null },
    { name: "Special Meal", ageRestriction: null }, 
    { name: "Light Meal", ageRestriction: null }, 
    // ... more options as needed
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Booking Confirmation
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Flight Details</h3>
          <ul className="list-disc ml-6">
            <li>From: {flight.departureCity}</li>
            <li>To: {flight.arrivalCity}</li>
            <li>Date: {flight.departureDate}</li>
            <li>Departure Time: {flight.departureTime}</li>
            <li>Arrival Time: {flight.arrivalTime}</li>
            <li>Duration: {flight.duration}</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Passenger Details</h3>
          <ul>
            {passengers.map((passenger, index) => (
              <li key={index}>
                {passenger.firstName} {passenger.lastName} (DOB: {passenger.dob}) 
                {/* Add food selection */}
                <br/>
                {getFoodName(index)}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Selected Seats</h3>
          <ul>
            {selectedSeats.map(seat => (
              <li key={seat}>Seat {seat + 1}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center"> 
          <Link to="/plantrip" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Plan Your Trip
          </Link> 
        </div>

      </div>
    </div>
  );
}
export default Confirmation;