const passengerData = [
  {
    pnr: "PNR123",
    flightNumber: "QP-101",
    passengerName: "John Doe",
    departureCity: "Mumbai (BOM)",
    arrivalCity: "Delhi (DEL)",
    departureDate: "2023-11-23",
    departureTime: "10:00 AM",
    arrivalTime: "12:00 PM",
    status: "Boarding", // Matching the flight status from the Akasa flights
    departureAirport: "BOM", // IATA code for Mumbai
    arrivalAirport: "DEL"  // IATA code for Delhi
  },
  {
    pnr: "PNR210",
    flightNumber: "QP-202",
    passengerName: "Jane Smith",
    departureCity: "Bengaluru (BLR)",
    arrivalCity: "Chennai (MAA)",
    departureDate: "2023-11-25",
    departureTime: "07:30 AM",
    arrivalTime: "09:30 AM",
    status: "Departed", // Matching the flight status from the Akasa flights
    departureAirport: "BLR", // IATA code for Bengaluru
    arrivalAirport: "MAA"  // IATA code for Chennai
  },
  {
    pnr: "PNR1123",
    flightNumber: "QP-102", // Matching the flight number for consistency
    passengerName: "Robert Jones",
    departureCity: "Mumbai (BOM)",
    arrivalCity: "Delhi (DEL)",
    departureDate: "2023-11-23",
    departureTime: "06:00 PM",
    arrivalTime: "08:00 PM",
    status: "Check-in", // Matching the flight status from the Akasa flights
    departureAirport: "BOM", // IATA code for Mumbai
    arrivalAirport: "DEL"  // IATA code for Delhi
  },
  {
    pnr: "PNR4455",
    flightNumber: "QP-103", // Matching the flight number for consistency
    passengerName: "Mary Davis",
    departureCity: "Mumbai (BOM)",
    arrivalCity: "Delhi (DEL)",
    departureDate: "2023-11-24",
    departureTime: "09:00 AM",
    arrivalTime: "11:00 AM",
    status: "On Time", // Matching the flight status from the Akasa flights
    departureAirport: "BOM", // IATA code for Mumbai
    arrivalAirport: "DEL"  // IATA code for Delhi
  },
  {
    pnr: "PNR5678",
    flightNumber: "QP-203", 
    passengerName: "Peter Brown",
    departureCity: "Bengaluru (BLR)",
    arrivalCity: "Chennai (MAA)",
    departureDate: "2023-11-26",
    departureTime: "04:00 PM",
    arrivalTime: "06:00 PM",
    status: "Boarding", // Matching the flight status from the Akasa flights
    departureAirport: "BLR", 
    arrivalAirport: "MAA" 
  },
  {
    pnr: "PNR9101",
    flightNumber: "QP-304", 
    passengerName: "Sarah Wilson",
    departureCity: "Hyderabad (HYD)",
    arrivalCity: "Kolkata (CCU)",
    departureDate: "2023-11-28",
    departureTime: "02:00 PM",
    arrivalTime: "04:00 PM",
    status: "Departed", // Matching the flight status from the Akasa flights
    departureAirport: "HYD", 
    arrivalAirport: "CCU"
  },
  {
    pnr: "PNR1213",
    flightNumber: "QP-405", 
    passengerName: "David Lee",
    departureCity: "Delhi (DEL)",
    arrivalCity: "Mumbai (BOM)",
    departureDate: "2023-11-30",
    departureTime: "05:00 PM",
    arrivalTime: "07:00 PM",
    status: "Check-in", // Matching the flight status from the Akasa flights
    departureAirport: "DEL",
    arrivalAirport: "BOM"
  },
  {
    pnr: "PNR1124", 
    flightNumber: "QP-111", // Matching flight number from Akasa data
    passengerName: "Emily Carter",
    departureCity: "Mumbai (BOM)",
    arrivalCity: "Delhi (DEL)",
    departureDate: "2023-11-28", 
    departureTime: "07:00 AM",
    arrivalTime: "09:00 AM",
    status: "On Time", // Matching the flight status from the Akasa flights
    departureAirport: "BOM",
    arrivalAirport: "DEL" 
  },
  // Add more passenger data... 
];

export default passengerData;