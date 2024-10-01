import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom'; 

function SeatSelection() {
  const { state } = useLocation(); 
  const passengers = state.passengers;
  const flight = state.flight;
  const navigate = useNavigate(); 
  const { flightId } = useParams(); 

  const [selectedSeats, setSelectedSeats] = useState([]); 
  const [selectedFood, setSelectedFood] = useState({}); 

  const passengerAges = passengers.map(passenger => {
    const dob = new Date(passenger.dob); 
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--; 
    }
    return age;
  });

  // Seat Class and Layout 
  const seatClass = 'Economy'; // Adjust as needed (Economy, Business, etc.) 
  const seatRows = 3; 
  const seatsPerRow = 3;
  const totalSeats = seatRows * seatsPerRow;
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1); // Seat numbers

  // Food Options (More variety)
  const foodOptions = [
    { name: "Vegetarian Meal", ageRestriction: null }, 
    { name: "Chicken Meal", ageRestriction: 12 },
    { name: "Vegan Meal", ageRestriction: null },
    { name: "Gluten-Free Meal", ageRestriction: null },
    { name: "Special Meal", ageRestriction: null }, 
    { name: "Light Meal", ageRestriction: null }, 
    // ... more options as needed
  ];

  const handleSeatClick = (seatIndex) => {
    if (selectedSeats.includes(seatIndex)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatIndex)); 
    } else {
      setSelectedSeats([...selectedSeats, seatIndex]); 
    }
  };

  const handleFoodChange = (passengerIndex, foodIndex) => {
    setSelectedFood(prevSelectedFood => ({
      ...prevSelectedFood,
      [passengerIndex]: foodIndex,
    }));
  };

  const handleContinue = () => {
    navigate('/confirmation', {
      state: {
        passengers: passengers,
        flight: flight,
        selectedSeats: selectedSeats,
        selectedFood: selectedFood
      }
    });
  };

  // Seat Suggestion Logic (can be refined based on actual layout)
  const suggestedSeats = passengers.map((_, index) => {
    const age = passengerAges[index];
    if (age < 12) { 
      return { seat: 'Window seat' }; 
    } else if (age < 60) {
      return { seat: 'Middle seat' }; 
    } else {
      return { seat: 'Aisle seat' }; 
    }
  });

  // Determine aisle seat positions based on seat layout 
  const getAisleSeats = () => {
    const aisleSeats = [];
    for (let row = 0; row < seatRows; row++) {
      aisleSeats.push((row * seatsPerRow) + seatsPerRow - 1);
      aisleSeats.push((row * seatsPerRow));
    }
    return aisleSeats;
  };

  const aisleSeats = getAisleSeats();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Seat Selection
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Flight Information</h3>
          <p>From: {flight.departureCity} </p>
          <p>To: {flight.arrivalCity}</p>
          <p>Date: {flight.departureDate}</p>
        </div>

        {/* Seat Selection Area (3x3 layout) */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Select Your Seats ({seatClass} Class)</h3>

          <div className="grid grid-cols-3 gap-4">
            {seats.map((seat, seatIndex) => (
              <div 
                key={seatIndex} 
                className={`border rounded-md p-2 cursor-pointer 
                ${selectedSeats.includes(seatIndex) ? 'bg-indigo-200' : ''}
                ${aisleSeats.includes(seatIndex) ? 'border-l-4 border-r-4' : ''} 
                `} 
                onClick={() => handleSeatClick(seatIndex)}
              >
                {/* Display seat numbers (can adjust for better UI) */}
                {seat} {aisleSeats.includes(seatIndex) ? 'A' : ''} 
              </div>
            ))}
          </div>

          {/* Seat Suggestion (Based on Age) */}
          {suggestedSeats.map((suggestion, index) => (
            <p key={index}>
              Suggested Seat for Passenger {index + 1}: {suggestion.seat}
            </p>
          ))}
        </div>

        {/* Food Selection (Improved) */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Select Your Meals</h3>
          {passengers.map((passenger, passengerIndex) => (
            <div key={passengerIndex} className="mb-3">
              <p>Passenger {passengerIndex + 1} ({passengerAges[passengerIndex]} years old):</p>
              <select 
                value={selectedFood[passengerIndex] || ''} 
                onChange={(e) => handleFoodChange(passengerIndex, e.target.value)} 
              >
                <option value="">Select a Meal</option>
                {foodOptions.map((option, foodIndex) => (
                  <option key={foodIndex} value={foodIndex} disabled={option.ageRestriction && passengerAges[passengerIndex] < option.ageRestriction}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;