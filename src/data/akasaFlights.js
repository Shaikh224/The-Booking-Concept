function generateUniqueFlightNumber(baseNumber, counter) {
  counter++;
  const numberPart = parseInt(baseNumber.slice(-3), 10);
  const newNumber = `QP-${numberPart + counter}`;
  return newNumber;
}

let flightNumberCounter = 1; 

const akasaFlights = [
  {
    flightNumber: 'QP-101',
    departureCity: 'Mumbai (BOM)',
    arrivalCity: 'Delhi (DEL)',
    departureDate: '2023-11-23',
    departureTime: '10:00 AM',
    arrivalTime: '12:00 PM',
    status: 'Boarding',
    delay: 15,
    gate: '12A',
    price: 4500, // Added price
    duration: '2h 15m', // Added duration 
  },
  {
    flightNumber: 'QP-202',
    departureCity: 'Bengaluru (BLR)',
    arrivalCity: 'Chennai (MAA)',
    departureDate: '2024-11-25',
    departureTime: '07:30 AM',
    arrivalTime: '09:30 AM',
    status: 'Departed',
    delay: 0,
    gate: '5B',
    price: 3800, // Added price
    duration: '1h 45m', // Added duration 
  },
  // ... (Rest of the flights - add price and duration to each)

  {
    flightNumber: 'QP-102',
    departureCity: 'Mumbai (BOM)',
    arrivalCity: 'Delhi (DEL)',
    departureDate: '2023-11-23',
    departureTime: '06:00 PM',
    arrivalTime: '08:00 PM',
    status: 'Check-in',
    delay: 10,
    gate: '18C',
    price: 5200, 
    duration: '2h 30m',
  },
  {
    flightNumber: 'QP-103',
    departureCity: 'Mumbai (BOM)',
    arrivalCity: 'Delhi (DEL)',
    departureDate: '2023-11-24',
    departureTime: '09:00 AM',
    arrivalTime: '11:00 AM',
    status: 'On Time',
    delay: 0,
    gate: '12B',
    price: 4800, 
    duration: '2h 15m',
  },

  //  Bengaluru (BLR) to Chennai (MAA)
  {
    flightNumber: 'QP-203',
    departureCity: 'Bengaluru (BLR)',
    arrivalCity: 'Chennai (MAA)',
    departureDate: '2023-11-26',
    departureTime: '04:00 PM',
    arrivalTime: '06:00 PM',
    status: 'Boarding',
    delay: 5,
    gate: '10A',
    price: 3500,
    duration: '1h 50m',
  },

  // Hyderabad (HYD) to Kolkata (CCU)
  {
    flightNumber: 'QP-304',
    departureCity: 'Hyderabad (HYD)',
    arrivalCity: 'Kolkata (CCU)',
    departureDate: '2023-11-28',
    departureTime: '02:00 PM',
    arrivalTime: '04:00 PM',
    status: 'Departed',
    delay: 0,
    gate: '7D',
    price: 4000,
    duration: '2h 00m',
  },

  // Delhi (DEL) to Mumbai (BOM) 
  {
    flightNumber: 'QP-405',
    departureCity: 'Delhi (DEL)',
    arrivalCity: 'Mumbai (BOM)',
    departureDate: '2023-11-30',
    departureTime: '05:00 PM',
    arrivalTime: '07:00 PM',
    status: 'Check-in',
    delay: 15,
    gate: '14B',
    price: 4200, 
    duration: '2h 00m',
  },

  // More flights, generating unique numbers 
  {
    flightNumber: generateUniqueFlightNumber('QP-111', flightNumberCounter), 
    departureCity: 'Mumbai (BOM)',
    arrivalCity: 'Delhi (DEL)',
    departureDate: '2023-11-28', 
    departureTime: '07:00 AM',
    arrivalTime: '09:00 AM',
    status: 'On Time', 
    delay: 0,
    gate: '11A', 
    price: 3900,
    duration: '1h 55m',
  },
  {
    flightNumber: generateUniqueFlightNumber('QP-222', flightNumberCounter), 
    departureCity: 'Bengaluru (BLR)',
    arrivalCity: 'Chennai (MAA)',
    departureDate: '2023-12-01', 
    departureTime: '10:00 AM',
    arrivalTime: '12:00 PM',
    status: 'Check-in', 
    delay: 5,
    gate: '13B', 
    price: 4000,
    duration: '2h 10m',
  },
  {
    flightNumber: generateUniqueFlightNumber('QP-353', flightNumberCounter), 
    departureCity: 'Hyderabad (HYD)',
    arrivalCity: 'Kolkata (CCU)',
    departureDate: '2023-12-03',
    departureTime: '03:00 PM',
    arrivalTime: '05:00 PM',
    status: 'Boarding', 
    delay: 0,
    gate: '17C',
    price: 3500,
    duration: '2h 00m',
  },
  {
    flightNumber: generateUniqueFlightNumber('QP-414', flightNumberCounter), 
    departureCity: 'Delhi (DEL)',
    arrivalCity: 'Mumbai (BOM)',
    departureDate: '2023-12-05', 
    departureTime: '11:00 AM',
    arrivalTime: '01:00 PM',
    status: 'Delayed', 
    delay: 15,
    gate: '20A',
    price: 4400,
    duration: '2h 10m',
  },

  // More flights, generating unique numbers (for each route)
  {
    flightNumber: generateUniqueFlightNumber('QP-181', flightNumberCounter), 
    departureCity: 'Mumbai (BOM)',
    arrivalCity: 'Delhi (DEL)',
    departureDate: '2023-12-06', 
    departureTime: '01:00 PM',
    arrivalTime: '03:00 PM',
    status: 'Departed', 
    delay: 0,
    gate: '21B',
    price: 4600, 
    duration: '2h 15m',
  },
  {
    flightNumber: generateUniqueFlightNumber('QP-262', flightNumberCounter),
    departureCity: 'Bengaluru (BLR)',
    arrivalCity: 'Chennai (MAA)',
    departureDate: '2023-12-08', 
    departureTime: '09:00 PM',
    arrivalTime: '11:00 PM',
    status: 'Boarding', 
    delay: 10,
    gate: '22A',
    price: 3800,
    duration: '1h 50m',
  },
  {
    flightNumber: generateUniqueFlightNumber('QP-343', flightNumberCounter), 
    departureCity: 'Hyderabad (HYD)',
    arrivalCity: 'Kolkata (CCU)',
    departureDate: '2023-12-09', 
    departureTime: '07:00 PM',
    arrivalTime: '09:00 PM',
    status: 'Check-in', 
    delay: 10,
    gate: '23C',
    price: 3850,
    duration: '2h 05m',
  },
  {
    flightNumber: generateUniqueFlightNumber('QP-498', flightNumberCounter), 
    departureCity: 'Delhi (DEL)',
    arrivalCity: 'Mumbai (BOM)',
    departureDate: '2023-12-10',
    departureTime: '05:00 PM',
    arrivalTime: '07:00 PM',
    status: 'On Time', 
    delay: 0,
    gate: '24A',
    price: 3950,
    duration: '1h 45m',
  },

];

export default akasaFlights;