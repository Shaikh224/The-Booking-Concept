import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import FlightSearch from './pages/FlightSearch'; 
import Navbar from './components/Navbar'; // Import the Navbar
import ManageBooking from './pages/ManageBooking'; 
import BookingDetails from './pages/BookingDetails';
import Schedule from './pages/Schedule';
import PlanTrip from './pages/PlanTrip';
import DocumentKeeper from './pages/DocumentKeeper';
import AI from './pages/Ai';
import SeatSelection from './pages/SeatSelection';
import Confirmation from './pages/Confirmation';


function App() {
  return (
    <BrowserRouter>
      <header>
        <Navbar /> 
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flight-search" element={<FlightSearch />} />
        
        {/* Booking flow routes (these were already included) */}
        <Route path="/booking/:flightId" element={<BookingDetails />} />
        <Route path="/seats/:flightId" element={<SeatSelection />} />
        <Route path="/confirmation" element={<Confirmation />} /> 
        
        <Route path="/manage-bookings" element={<ManageBooking />} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/plantrip" element={<PlanTrip/>} />
        <Route path="/document" element={<DocumentKeeper/>} />
        <Route path="/ai" element={<AI/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;