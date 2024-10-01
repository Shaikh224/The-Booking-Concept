import React, { useState, useEffect } from 'react';
import akasaFlights from '../data/akasaFlights'; // Import your flight data
import passengerData from '../data/passengerdata'; // Import your passenger data

const AI = () => {
  const [userInput, setUserInput] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [predefinedQuestions, setPredefinedQuestions] = useState([
    "What is the status of flight QP-101?",
    "What is the departure time for my flight with PNR123?",
    "What is the price of the flight from Bengaluru to Chennai?",
    "Is there a flight from Delhi to Mumbai on December 5th?",
    "What is the flight duration of QP-202?" 
  ]);

  // Function to simulate AI response
  const generateResponse = () => {
    // Mock AI logic (replace with actual AI later)
    const response = processQuestion(userInput);
    setGeneratedText(response);
  };

  // Function to process user's question (mock AI logic)
  const processQuestion = (question) => {
    // 1. Look for flight status
    if (question.includes('status of flight') || question.includes('flight status')) {
      const flightNumber = extractFlightNumber(question);
      const flight = akasaFlights.find(flight => flight.flightNumber === flightNumber);
      if (flight) {
        return `The status of flight ${flightNumber} is ${flight.status}.`;
      } else {
        return `I couldn't find information about flight ${flightNumber}.`;
      }
    }

    // 2. Look for departure time
    if (question.includes('departure time') || question.includes('when does my flight depart')) {
      const pnr = extractPNR(question);
      const passenger = passengerData.find(passenger => passenger.pnr === pnr);
      if (passenger) {
        return `Your flight with PNR ${pnr} departs at ${passenger.departureTime} on ${passenger.departureDate}.`;
      } else {
        return `I couldn't find a flight with PNR ${pnr}.`;
      }
    }

    // 3. Look for flight price
    if (question.includes('price of the flight') || question.includes('how much does it cost')) {
      const departureCity = extractDepartureCity(question);
      const arrivalCity = extractArrivalCity(question);
      const flight = akasaFlights.find(flight => 
        flight.departureCity === departureCity && flight.arrivalCity === arrivalCity
      );
      if (flight) {
        return `The price of the flight from ${departureCity} to ${arrivalCity} is ${flight.price}.`;
      } else {
        return `I couldn't find a flight from ${departureCity} to ${arrivalCity}.`;
      }
    }

    // 4. Look for flights by date
    if (question.includes('flight from') && question.includes('on') && question.includes('to')) {
      const departureCity = extractDepartureCity(question);
      const arrivalCity = extractArrivalCity(question);
      const departureDate = extractDepartureDate(question);
      const flights = akasaFlights.filter(flight => 
        flight.departureCity === departureCity && 
        flight.arrivalCity === arrivalCity && 
        flight.departureDate === departureDate
      );
      if (flights.length > 0) {
        return `Yes, there are flights from ${departureCity} to ${arrivalCity} on ${departureDate}.`;
      } else {
        return `I couldn't find any flights from ${departureCity} to ${arrivalCity} on ${departureDate}.`;
      }
    }
    // 5. Look for flight duration
    if (question.includes('flight duration')) {
      const flightNumber = extractFlightNumber(question);
      const flight = akasaFlights.find(flight => flight.flightNumber === flightNumber);
      if (flight) {
        return `The duration of flight ${flightNumber} is ${flight.duration}.`;
      } else {
        return `I couldn't find information about flight ${flightNumber}.`;
      }
    }


    // ... (Add more logic for different question types)

    // Default response if no match is found
    return `Sorry, I didn't understand your question. Please try rephrasing it.`;
  };

  // Helper functions to extract information from questions
  const extractFlightNumber = (question) => {
    // Implement logic to extract flight number (e.g., using regex)
    return question.match(/QP-\d+/)[0];
  };

  const extractPNR = (question) => {
    // Implement logic to extract PNR (e.g., using regex)
    return question.match(/PNR\d+/)[0];
  };

  const extractDepartureCity = (question) => {
    // Implement logic to extract departure city (e.g., using regex)
    return question.match(/(Bengaluru|Mumbai|Delhi|Hyderabad)\s\([^)]+\)/)[0];
  };

  const extractArrivalCity = (question) => {
    // Implement logic to extract arrival city (e.g., using regex)
    return question.match(/(Chennai|Delhi|Mumbai|Kolkata)\s\([^)]+\)/)[0];
  };

  const extractDepartureDate = (question) => {
    // Implement logic to extract departure date (e.g., using regex)
    return question.match(/\d{4}-\d{2}-\d{2}/)[0];
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateResponse();
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Chat with AI</h1>
      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">
        <div className="chat-history overflow-y-auto h-64 p-2">
          {generatedText && (
            <div className="bg-gray-200 rounded-md p-3 mb-2">
              <p className="text-gray-700">{generatedText}</p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Enter your question..."
            value={userInput}
            onChange={handleInputChange}
            className="flex-grow px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
        <div className="mt-4">
          <h2 className="text-lg font-medium mb-2">Predefined Questions:</h2>
          <ul>
            {predefinedQuestions.map((question, index) => (
              <li key={index} onClick={() => setUserInput(question)} className="cursor-pointer hover:text-blue-500">
                {question}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AI;