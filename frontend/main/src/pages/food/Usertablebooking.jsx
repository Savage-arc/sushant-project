import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Usersidebar from "../component/sidebar/usersidebar";
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../utils/authUtils'; 

const Usertablebooking = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  useEffect(() => {
    // Get user name from token
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || 'Guest');
        setBookingDetails(prev => ({
          ...prev,
          name: decoded.name || 'Guest',
          email: decoded.email || ''
        }));
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserName('Guest');
      }
    } else {
      setUserName('Guest');
    }

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);

    fetchTables();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchTables();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchTables = async () => {
    try {
      setLoading(true);
      console.log('Fetching restaurant tables...');
      
      // Mock table data
      const mockTables = [
        {
          id: 1,
          number: "T1",
          capacity: 2,
          location: "Window",
          status: "available",
          price: 0,
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400"
        },
        {
          id: 2,
          number: "T2",
          capacity: 4,
          location: "Garden",
          status: "available",
          price: 0,
          image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400"
        },
        {
          id: 3,
          number: "T3",
          capacity: 6,
          location: "Private",
          status: "booked",
          price: 0,
          image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400"
        },
        {
          id: 4,
          number: "T4",
          capacity: 2,
          location: "Bar",
          status: "available",
          price: 0,
          image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400"
        },
        {
          id: 5,
          number: "T5",
          capacity: 8,
          location: "VIP",
          status: "available",
          price: 50,
          image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400"
        },
        {
          id: 6,
          number: "T6",
          capacity: 4,
          location: "Window",
          status: "available",
          price: 0,
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400"
        }
      ];
      
      setTables(mockTables);
    } catch (error) {
      console.error('Error fetching tables:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (table) => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time for your booking');
      return;
    }

    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone) {
      alert('Please fill in all required booking details');
      return;
    }

    if (selectedGuests > table.capacity) {
      alert(`This table can only accommodate ${table.capacity} guests`);
      return;
    }

    const booking = {
      tableId: table.id,
      tableNumber: table.number,
      date: selectedDate,
      time: selectedTime,
      guests: selectedGuests,
      customerDetails: bookingDetails,
      totalPrice: table.price
    };

    alert(`Booking confirmed for Table ${table.number} on ${selectedDate} at ${selectedTime} for ${selectedGuests} guests!`);
    
    // In a real app, this would send the booking to the backend
    console.log('Booking details:', booking);
  };

  const availableTables = tables.filter(table => table.status === 'available');
  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-700 text-amber-500">
      <Usersidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">📅 Table Booking</h1>
          <div className="text-lg">Welcome, {userName}!</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Tables */}
          <div className="lg:col-span-2">
            <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-4">🍽️ Available Tables</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
                  <p className="mt-4">Loading restaurant tables...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableTables.map((table) => (
                    <div key={table.id} className="bg-white bg-opacity-5 rounded-lg p-4 hover:bg-opacity-10 transition">
                      <img
                        src={table.image}
                        alt={`Table ${table.number}`}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">Table {table.number}</h3>
                        <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                          Available
                        </span>
                      </div>
                      <div className="text-sm text-amber-200 mb-3">
                        <p>📍 {table.location}</p>
                        <p>👥 Capacity: {table.capacity} guests</p>
                        {table.price > 0 && <p>💰 Reservation fee: ${table.price}</p>}
                      </div>
                      <button
                        onClick={() => handleBooking(table)}
                        className="w-full py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                      >
                        Book This Table
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {!loading && availableTables.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-amber-200">No tables available for the selected time. Please try a different time or date.</p>
                </div>
              )}
            </div>

            {/* Restaurant Layout */}
            <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">🏢 Restaurant Layout</h2>
              <div className="grid grid-cols-3 gap-4">
                {tables.map((table) => (
                  <div 
                    key={table.id} 
                    className={`p-4 rounded-lg text-center ${
                      table.status === 'available' 
                        ? 'bg-green-600 bg-opacity-20 border border-green-400' 
                        : 'bg-red-600 bg-opacity-20 border border-red-400'
                    }`}
                  >
                    <div className="text-lg font-bold">Table {table.number}</div>
                    <div className="text-sm">{table.capacity} seats</div>
                    <div className="text-xs mt-1">
                      {table.status === 'available' ? '🟢 Available' : '🔴 Booked'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-amber-200">
                <p>🟢 Available | 🔴 Booked</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold mb-4">📝 Booking Details</h2>
              
              <div className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-10 border border-amber-300 text-white"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-10 border border-amber-300 text-white"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time} className="text-gray-800">{time}</option>
                    ))}
                  </select>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Number of Guests</label>
                  <select
                    value={selectedGuests}
                    onChange={(e) => setSelectedGuests(parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-10 border border-amber-300 text-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num} className="text-gray-800">{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                {/* Customer Details */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    value={bookingDetails.name}
                    onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-10 border border-amber-300 text-white"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    value={bookingDetails.email}
                    onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-10 border border-amber-300 text-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={bookingDetails.phone}
                    onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-10 border border-amber-300 text-white"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Special Requests</label>
                  <textarea
                    value={bookingDetails.specialRequests}
                    onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-10 border border-amber-300 text-white"
                    rows="3"
                    placeholder="Any special requests or dietary requirements..."
                  />
                </div>

                <div className="pt-4 border-t border-amber-300">
                  <p className="text-sm text-amber-200 mb-4">
                    * Required fields must be filled to complete booking
                  </p>
                  <p className="text-xs text-amber-300">
                    💡 Tip: Select your preferred table from the available options above, then fill in your details here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usertablebooking; 