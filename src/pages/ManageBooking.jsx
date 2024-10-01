import React, { useState, useEffect } from 'react';
import passengerData from '../data/passengerdata';
import akasaFlights from '../data/akasaFlights';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlane,
  faClock,
  faLocationDot,
  faCloudSun,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudBolt,
  faSnowflake,
  faCircleCheck,
  faCircleXmark,
  faCalendarDays,
  faArrowRight,
  faUserCheck,
  faLock,
  faHourglassEnd,
  faPlaneDeparture,
  faFlagCheckered,
  faSuitcase,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 

function ManageBooking() {
  const [pnr, setPnr] = useState('');
  const [booking, setBooking] = useState(null);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [newDepartureDate, setNewDepartureDate] = useState('');
  const [departureWeather, setDepartureWeather] = useState(null);
  const [arrivalWeather, setArrivalWeather] = useState(null);
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState(null); 
  const [estimatedGate, setEstimatedGate] = useState(null);
  const [estimatedDepartureTime, setEstimatedDepartureTime] = useState(null); 
  const navigate = useNavigate();

  // Timeline States (with randomized progress)
  const [timeline, setTimeline] = useState([
    {
      id: 'checkin',
      label: 'Check-in',
      completed: false,
      time: null,
      progress: 0, 
    },
    {
      id: 'security',
      label: 'Security Check',
      completed: false,
      time: null,
      progress: 0,
    },
    {
      id: 'waiting',
      label: 'Waiting at Gate',
      completed: false,
      time: null,
      progress: 0,
    },
    {
      id: 'boarding',
      label: 'Boarding',
      completed: false,
      time: null,
      progress: 0,
    },
    {
      id: 'arrived',
      label: 'Arrived at Destination',
      completed: false,
      time: null,
      progress: 0,
    },
    {
      id: 'baggage',
      label: 'Baggage Claim',
      completed: false,
      time: null,
      progress: 0,
    },
  ]);

  // Time Tracking 
  const [currentTime, setCurrentTime] = useState(null); 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Function to update the timeline (simulated) with random progress
  const updateTimeline = () => {
    const [hours, minutes] = booking.departureTime.split(':');
    const departureTimestamp = new Date().setHours(hours, minutes, 0); 
    const timelineCopy = [...timeline];
    const now = currentTime || new Date().getTime();

    timelineCopy.forEach((step, index) => {
      if (step.id === 'checkin') {
        if (now >= departureTimestamp) {
          step.completed = true;
          step.time = departureTimestamp;
          step.progress = 100; 
        }
      } else if (now >= departureTimestamp) {
        // Randomly calculate progress for all steps after check-in
        let stepProgress = Math.round(((now - departureTimestamp) / 7200000) * 100);
        stepProgress = Math.min(stepProgress, 100); 
        stepProgress = Math.max(stepProgress, 0);

        // Slightly delay the progress of each step
        stepProgress -= index * 10;
        stepProgress = Math.max(stepProgress, 0);

        if (stepProgress > 100) {
          // Set completed once it's past 100%
          step.completed = true;
          step.progress = 100;
        } else {
          step.progress = stepProgress; 
        }

        if (step.id === 'arrived' && step.progress === 100) {
          // Set the Baggage Claim as completed
          timelineCopy[5].completed = true; 
          timelineCopy[5].progress = 100; 
        }
      } 
    });

    setTimeline(timelineCopy);
  };

  useEffect(() => {
    if (booking) {
      updateTimeline();
    }
  }, [booking, currentTime]); 

  // Function to render the timeline
  const renderTimeline = () => {
    return (
      <div className="mt-4" style={{ backgroundColor: '#F0F0F1', padding: '20px', borderRadius: '8px', maxWidth: '100%' }}> 
        <h4 className="font-bold text-xl mb-4 text-center">Journey Timeline</h4>
        <div className="flex items-center flex-wrap" style={{ maxWidth: '100%' }}>
          {timeline.map((step) => (
            <div
              key={step.id}
              style={{ 
                width: '120px', 
                margin: '8px', 
                padding: '12px 16px', 
                backgroundColor: step.completed ? '#33ff58' : '#58d68d ', 
                color: '#fff', 
                borderRadius: '4px', 
                textAlign: 'center',
                maxWidth: '100%'
              }}
            >
              <div style={{ 
                position: 'relative', 
                marginBottom: '6px' 
              }}>
                <FontAwesomeIcon
                  icon={
                    step.id === 'checkin'
                      ? faUserCheck
                      : step.id === 'security'
                      ? faLock
                      : step.id === 'waiting'
                      ? faHourglassEnd
                      : step.id === 'boarding'
                      ? faPlaneDeparture
                      : step.id === 'arrived'
                      ? faFlagCheckered
                      : step.id === 'baggage'
                      ? faSuitcase
                      : faPlane
                  }
                  className="mr-1"
                  style={{ color: '#fff' }}
                />{' '}
                {step.label}
              </div>

              {/* Progress Bar */}
              <div style={{
                height: '8px', 
                backgroundColor: '#333', 
                borderRadius: '4px', 
                width: `${step.progress}%`,
                maxWidth: '100%'
              }}></div>

              {step.completed && (
                <span className="mt-2">
                  (Completed {new Date(step.time).toLocaleTimeString()})
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Function to handle PNR submission 
  const handleSubmit = (event) => {
    event.preventDefault();
    const foundBooking = passengerData.find((b) => {
      const isPNRMatch = b.pnr === pnr;
      if (isPNRMatch) {
        const isFlightMatch = akasaFlights.some((f) => f.flightNumber === b.flightNumber && f.status === b.status);
        return isFlightMatch;
      } else {
        return false;
      }
    });

    setBooking(foundBooking);
  };

  // Function to handle cancelling a booking
  const handleCancelBooking = () => {
    if (booking) {
      const updatedBooking = { ...booking, status: 'Cancelled' };
      const updatedPassengerData = passengerData.map((b) => (b.pnr === booking.pnr ? updatedBooking : b));
      setBooking(updatedBooking); 
      alert("Booking cancelled successfully!");
    } else {
      alert("Please check a booking first.");
    }
  };

  // Function to handle rescheduling a booking
  const handleRescheduleBooking = () => {
    if (booking) {
      setIsRescheduling(true);
    } else {
      alert("Please check a booking first.");
    }
  };

  // Function to handle confirming a rescheduled booking
  const handleConfirmReschedule = (event) => {
    event.preventDefault();
    if (booking && newDepartureDate) {
      const updatedBooking = {
        ...booking,
        departureDate: newDepartureDate,
        status: 'Rescheduled'
      };
      const updatedPassengerData = passengerData.map((b) => (b.pnr === booking.pnr ? updatedBooking : b));
      setBooking(updatedBooking);
      setIsRescheduling(false);
      setNewDepartureDate('');
      alert("Booking rescheduled successfully!");
    } else {
      alert("Please select a new departure date.");
    }
  };

  // Function to fetch weather data using WeatherAPI.com
  const fetchWeatherData = async (airportCode) => {
    try {
      const apiKey = '529c972ad0msh4d259b49e7cbe0ep14bfbcjsnb25ef50d96e4'; // Replace with your actual API key
      const response = await axios.get(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=iata:${airportCode}`,
        {
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  // Function to calculate estimated departure time based on weather status
  const calculateEstimatedDepartureTime = () => {
    if (booking && departureWeather) {
      const [hours, minutes] = booking.departureTime.split(':');
      let estimatedHours = parseInt(hours, 10);
      let estimatedMinutes = parseInt(minutes, 10);

      if (departureWeather.current.condition.text.toLowerCase().includes('thunder') ||
        departureWeather.current.condition.text.toLowerCase().includes('storm') ||
        departureWeather.current.condition.text.toLowerCase().includes('heavy rain') ||
        departureWeather.current.condition.text.toLowerCase().includes('heavy snow') ||
        departureWeather.current.condition.text.toLowerCase().includes('fog') ||
        departureWeather.current.condition.text.toLowerCase().includes('low visibility')) {
        estimatedHours += 1; 
      } else if (departureWeather.current.condition.text.toLowerCase().includes('rain') ||
        departureWeather.current.condition.text.toLowerCase().includes('showers') ||
        departureWeather.current.condition.text.toLowerCase().includes('mist')) {
        estimatedMinutes += 30;
      }

      if (estimatedMinutes >= 60) {
        estimatedMinutes -= 60;
        estimatedHours += 1;
      }

      return `${estimatedHours}:${estimatedMinutes < 10 ? `0${estimatedMinutes}` : estimatedMinutes}`;
    }

    return null; 
  };

  useEffect(() => {
    setEstimatedGate(Math.floor(Math.random() * 20) + 1);
  }, []);

  useEffect(() => {
    if (booking) {
      fetchWeatherData(booking.departureAirport).then(data => {
        setDepartureWeather(data);
      });
      fetchWeatherData(booking.arrivalAirport).then(data => {
        setArrivalWeather(data);
      });

      const estimatedTime = calculateEstimatedDepartureTime();
      if (estimatedTime) {
        setEstimatedDepartureTime(estimatedTime);
      }

      if (estimatedDepartureTime) {
        const [estimatedDepartureHours, estimatedDepartureMinutes] = estimatedDepartureTime.split(':').map(Number);
        const estimatedArrivalHours = estimatedDepartureHours + 2; 
        const estimatedArrivalMinutes = estimatedDepartureMinutes;
        const estimatedTimeArrival = `${estimatedArrivalHours}:${estimatedArrivalMinutes < 10 ? `0${estimatedArrivalMinutes}` : estimatedArrivalMinutes}`;
        setEstimatedArrivalTime(estimatedTimeArrival);
      }

      
    }
  }, [booking, departureWeather, arrivalWeather, estimatedDepartureTime]); 

  // Refactored UI Structure with improved styling and full width 
 
    return (
      <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md" 
      style={{fontFamily: "'Arial', sans-serif", maxWidth: '90%', margin: '0 auto'}} // Centering and max width
    > 
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
        Manage Booking
      </h2>

      {/* PNR Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6"> 
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="pnr" className="block text-gray-700 font-bold mb-2">
              PNR:
            </label>
            <input
              type="text"
              id="pnr"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <FontAwesomeIcon icon={faPlane} className="mr-2" /> Check Booking
          </button>
        </form>
      </div> 

      {booking ? (
        <div className="mt-4" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
          {/* Booking Details (Improved Spacing) */}
          <div className="mb-6"> 
            <h3 className="text-lg font-bold mb-4">Booking Details</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <p className="font-bold mb-1">PNR:</p>
                <p>{booking.pnr}</p>
              </div>
              <div>
                <p className="font-bold mb-1">Flight Number:</p>
                <p>{booking.flightNumber}</p>
              </div>
              <div>
                <p className="font-bold mb-1">Passenger:</p>
                <p>{booking.passengerName}</p>
              </div>
              <div>
                <p className="font-bold mb-1">Departure:</p>
                <p>{booking.departureCity}</p>
              </div>
              <div>
                <p className="font-bold mb-1">Arrival:</p>
                <p>{booking.arrivalCity}</p>
              </div>
              <div>
                <p className="font-bold mb-1">
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-1" />{" "}
                  Departure Date:
                </p>
                <p>{booking.departureDate}</p>
              </div>
              <div>
                <p className="font-bold mb-1">
                  <FontAwesomeIcon icon={faClock} className="mr-1" /> Departure
                  Time:
                </p>
                <p>{booking.departureTime}</p>
              </div>
              <div>
                <p className="font-bold mb-1">
                  <FontAwesomeIcon icon={faClock} className="mr-1" /> Arrival
                  Time:
                </p>
                <p>{booking.arrivalTime}</p>
              </div>
            </div> 
          </div>
          {/* Flight Status and Weather (Improved Spacing) */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Flight Status & Weather</h3>

            <div className="mt-4">
              <h4 className="font-bold">Flight Status:</h4>
              <div className="flex items-center">
                {booking.status === "Delayed" && (
                  <div className="bg-red-500 text-white font-bold py-1 px-3 rounded-md mr-2">
                    <FontAwesomeIcon icon={faCircleXmark} className="mr-1" />{" "}
                    Delayed
                  </div>
                )}
                {booking.status === "Possible Delay" && (
                  <div className="bg-yellow-500 text-white font-bold py-1 px-3 rounded-md mr-2">
                    <FontAwesomeIcon icon={faClock} className="mr-1" /> Possible
                    Delays
                  </div>
                )}
                {booking.status === "On Time" && (
                  <div className="bg-green-500 text-white font-bold py-1 px-3 rounded-md mr-2">
                    <FontAwesomeIcon icon={faCircleCheck} className="mr-1" /> On
                    Time
                  </div>
                )}
                <span className="text-gray-700">{booking.status}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {departureWeather && (
                <div>
                  <p className="font-bold">
                    Departure ({booking.departureAirport}):{" "}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faLocationDot} className="mr-1" />{" "}
                    {departureWeather.location.name}
                  </p>
                  <div className="flex items-center">
                    {departureWeather.current.condition.text ===
                      "Thunderstorm" && (
                      <FontAwesomeIcon icon={faCloudBolt} className="mr-2" />
                    )}
                    {departureWeather.current.condition.text === "Rain" && (
                      <FontAwesomeIcon icon={faCloudRain} className="mr-2" />
                    )}
                    {departureWeather.current.condition.text === "Showers" && (
                      <FontAwesomeIcon
                        icon={faCloudShowersHeavy}
                        className="mr-2"
                      />
                    )}
                    {departureWeather.current.condition.text === "Snow" && (
                      <FontAwesomeIcon icon={faSnowflake} className="mr-2" />
                    )}
                    {departureWeather.current.condition.text !== "Thunderstorm" &&
                      departureWeather.current.condition.text !== "Rain" &&
                      departureWeather.current.condition.text !== "Showers" &&
                      departureWeather.current.condition.text !== "Snow" && (
                        <FontAwesomeIcon icon={faCloudSun} className="mr-2" />
                      )}
                    <p className="text-gray-700">
                      {departureWeather.current.condition.text}
                    </p>
                  </div>
                  <p>Temperature: {departureWeather.current.temp_c}°C</p>
                  <p>Humidity: {departureWeather.current.humidity}%</p>
                  <p>Wind: {departureWeather.current.wind_kph} kph</p>
                </div>
              )}
              {arrivalWeather && (
                <div>
                  <p className="font-bold">
                    Arrival ({booking.arrivalAirport}):{" "}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faLocationDot} className="mr-1" />{" "}
                    {arrivalWeather.location.name}
                  </p>
                  <div className="flex items-center">
                    {arrivalWeather.current.condition.text === "Thunderstorm" && (
                      <FontAwesomeIcon icon={faCloudBolt} className="mr-2" />
                    )}
                    {arrivalWeather.current.condition.text === "Rain" && (
                      <FontAwesomeIcon icon={faCloudRain} className="mr-2" />
                    )}
                    {arrivalWeather.current.condition.text === "Showers" && (
                      <FontAwesomeIcon
                        icon={faCloudShowersHeavy}
                        className="mr-2"
                      />
                    )}
                    {arrivalWeather.current.condition.text === "Snow" && (
                      <FontAwesomeIcon icon={faSnowflake} className="mr-2" />
                    )}
                    {arrivalWeather.current.condition.text !== "Thunderstorm" &&
                      arrivalWeather.current.condition.text !== "Rain" &&
                      arrivalWeather.current.condition.text !== "Showers" &&
                      arrivalWeather.current.condition.text !== "Snow" && (
                        <FontAwesomeIcon icon={faCloudSun} className="mr-2" />
                      )}
                    <p className="text-gray-700">
                      {arrivalWeather.current.condition.text}
                    </p>
                  </div>
                  <p>Temperature: {arrivalWeather.current.temp_c}°C</p>
                  <p>Humidity: {arrivalWeather.current.visibility}%</p>
                  <p>Wind: {arrivalWeather.current.wind_kph} kph</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <h4 className="font-bold">Estimated Departure:</h4>
              {estimatedDepartureTime && (
                <div className="flex items-center">
                  {estimatedDepartureTime !== booking.departureTime ? (
                    <>
                      <div className="bg-yellow-500 text-white font-bold py-1 px-3 rounded-md mr-2">
                        <FontAwesomeIcon icon={faClock} className="mr-1" />
                        <span className="text-sm">Potential delay</span>
                      </div>
                      <p>
                        <FontAwesomeIcon icon={faClock} className="mr-1" />{" "}
                        {estimatedDepartureTime}
                      </p>
                    </>
                  ) : (
                    <p>
                      <FontAwesomeIcon icon={faClock} className="mr-1" />{" "}
                      {booking.departureTime}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4">
              <h4 className="font-bold">Estimated Arrival:</h4>
              {estimatedArrivalTime && (
                <p>
                  <FontAwesomeIcon icon={faClock} className="mr-1" />{" "}
                  {estimatedArrivalTime}
                </p>
              )}{" "}
              {estimatedGate && (
                <p>
                  <FontAwesomeIcon icon={faArrowRight} className="mr-1" /> Gate:{" "}
                  {estimatedGate}
                </p>
              )}
            </div>
          </div>


          {/* Render Timeline */}
          <div className="mb-6">
            {renderTimeline()} 
          </div>


          {/* Buttons with spacing */}
          <div className="flex justify-center space-x-4"> 
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCancelBooking}
            >
              <FontAwesomeIcon icon={faCircleXmark} className="mr-2" /> Cancel
              Booking
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleRescheduleBooking}
            >
              <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />{" "}
              Reschedule
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate('/plantrip', { 
                state: {  
                  departureAirport: booking.departureAirport,  
                  departureTime: estimatedDepartureTime || booking.departureTime, 
                  gateNumber: estimatedGate || booking.gate || 'NA',
                  travelTime: 0  
                } 
              })}  
            >
              Airport Trip 
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate('/document')}
            >
            Document
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate('/ai')}
            >
            Ai
            </button>
          </div>
        </div>
        
      ) : (
        !booking &&
        pnr && (
          <p className="text-gray-500 mt-4 text-center">
            No booking found for this PNR.
          </p>
        )
      )}
    </div>
  );
}
  
export default ManageBooking;