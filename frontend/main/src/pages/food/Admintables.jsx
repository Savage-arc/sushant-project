import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Adminsidebar from "../component/sidebar/adminsidebar";
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../utils/authUtils';
import toast from 'react-hot-toast';

const Admintables = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [bookingRequests, setBookingRequests] = useState([]);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  useEffect(() => {
    // Get user name from token
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || 'Admin');
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserName('Admin');
      }
    } else {
      setUserName('Admin');
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Mock booking requests data
      const mockBookingRequests = [
        {
          id: 1,
          customerName: "user1",
          customerEmail: "user1@email.com",
          customerPhone: "+1-555-0123",
          tableId: 1,
          tableName: "Table 1",
          date: "2024-01-15",
          time: "19:00",
          guests: 4,
          status: "pending",
          createdAt: "2024-01-10T10:30:00Z"
        },
        {
          id: 2,
          customerName: "user2",
          customerEmail: "use2@email.com",
          customerPhone: "+1-555-0456",
          tableId: 3,
          tableName: "Table 3",
          date: "2024-01-16",
          time: "20:00",
          guests: 2,
          status: "approved",
          createdAt: "2024-01-10T11:15:00Z"
        },
        {
          id: 3,
          customerName: "Mike Wilson",
          customerEmail: "mike.w@email.com",
          customerPhone: "+1-555-0789",
          tableId: 2,
          tableName: "Table 2",
          date: "2024-01-14",
          time: "18:30",
          guests: 6,
          specialRequests: "Business dinner",
          status: "rejected",
          createdAt: "2024-01-10T09:45:00Z"
        },
        {
          id: 4,
          customerName: "Emily Davis",
          customerEmail: "emily.d@email.com",
          customerPhone: "+1-555-0321",
          tableId: 4,
          tableName: "Table 4",
          date: "2024-01-17",
          time: "19:30",
          guests: 3,
          specialRequests: "Vegetarian menu options",
          status: "pending",
          createdAt: "2024-01-10T14:20:00Z"
        }
      ];

      // Mock tables data
      const mockTables = [
        { id: 1, name: "Table 1", capacity: 4, location: "Window", status: "booked" },
        { id: 2, name: "Table 2", capacity: 6, location: "Center", status: "available" },
        { id: 3, name: "Table 3", capacity: 2, location: "Corner", status: "booked" },
        { id: 4, name: "Table 4", capacity: 4, location: "Garden View", status: "booked" },
        { id: 5, name: "Table 5", capacity: 8, location: "Private Area", status: "available" },
        { id: 6, name: "Table 6", capacity: 2, location: "Bar", status: "available" }
      ];
      
      setBookingRequests(mockBookingRequests);
      setTables(mockTables);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (bookingId, newStatus) => {
    const updatedRequests = bookingRequests.map(request => 
      request.id === bookingId ? { ...request, status: newStatus } : request
    );
    setBookingRequests(updatedRequests);
    
    const statusText = newStatus === 'approved' ? 'approved' : 'rejected';
    toast.success(`Booking request ${statusText} successfully!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-600 bg-opacity-20 text-yellow-300';
      case 'approved':
        return 'bg-green-600 bg-opacity-20 text-green-300';
      case 'rejected':
        return 'bg-red-600 bg-opacity-20 text-red-300';
      default:
        return 'bg-gray-600 bg-opacity-20 text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'approved':
        return '✅';
      case 'rejected':
        return '❌';
      default:
        return '❓';
    }
  };

  const getTableStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-600 bg-opacity-20 text-green-300';
      case 'booked':
        return 'bg-red-600 bg-opacity-20 text-red-300';
      default:
        return 'bg-gray-600 bg-opacity-20 text-gray-300';
    }
  };

  const filteredRequests = bookingRequests.filter(request => {
    if (selectedFilter === 'all') return true;
    return request.status === selectedFilter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-700 text-amber-500">
      <Adminsidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-amber-300">📋 study Management</h1>
          <div className="text-lg text-amber-200">Welcome, {userName}!</div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white bg-opacity-10 p-6 rounded-xl border border-amber-300 border-opacity-30">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-300">{bookingRequests.length}</div>
              <div className="text-amber-200 text-sm">Total Bookings</div>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl border border-amber-300 border-opacity-30">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-300">
                {bookingRequests.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-amber-200 text-sm">Pending Requests</div>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl border border-amber-300 border-opacity-30">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-300">
                {tables.filter(t => t.status === 'available').length}
              </div>
              <div className="text-amber-200 text-sm">Available Tables</div>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl border border-amber-300 border-opacity-30">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-300">
                {tables.filter(t => t.status === 'booked').length}
              </div>
              <div className="text-amber-200 text-sm">Booked Tables</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {['all', 'pending', 'approved', 'rejected'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedFilter === filter
                    ? 'bg-amber-600 text-white'
                    : 'bg-white bg-opacity-10 text-amber-200 hover:bg-opacity-20'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)} 
                {filter !== 'all' && (
                  <span className="ml-2 px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs">
                    {bookingRequests.filter(r => r.status === filter).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Booking Requests */}
        <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg border border-amber-300 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-amber-200">📝 Booking Requests</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
              <p className="text-amber-200">Loading booking requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-8 text-amber-200">
              <p className="text-lg">No booking requests found.</p>
              <p className="text-sm mt-2">All requests have been processed!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredRequests.map((request) => (
                <div key={request.id} className="bg-white bg-opacity-5 p-6 rounded-lg border border-amber-300 border-opacity-30 hover:bg-opacity-10 transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-amber-200">
                          {request.customerName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)} {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-amber-100">
                        <div>
                          <p><strong>📧 Email:</strong> {request.customerEmail}</p>
                          <p><strong>📞 Phone:</strong> {request.customerPhone}</p>
                          <p><strong>👥 Guests:</strong> {request.guests} people</p>
                        </div>
                        <div>
                          <p><strong>📅 Date:</strong> {formatDate(request.date)}</p>
                          <p><strong>🕐 Time:</strong> {formatTime(request.time)}</p>
                          <p><strong>🪑 Table:</strong> {request.tableName}</p>
                        </div>
                      </div>
                      {request.specialRequests && (
                        <div className="mt-3 p-3 bg-amber-900 bg-opacity-30 rounded-lg border border-amber-300">
                          <p className="text-amber-200"><strong>💬 Special Requests:</strong></p>
                          <p className="text-amber-100">{request.specialRequests}</p>
                        </div>
                      )}
                    </div>
                    
                    {request.status === 'pending' && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'approved')}
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-medium"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'rejected')}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition font-medium"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm text-amber-300 border-t border-amber-300 border-opacity-30 pt-3">
                    📅 Request submitted: {new Date(request.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Restaurant Layout */}
        <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg border border-amber-300">
          <h2 className="text-2xl font-semibold mb-6 text-amber-200">🏪 Restaurant Layout</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`p-4 rounded-lg border-2 text-center transition ${
                  table.status === 'available'
                    ? 'border-green-400 bg-green-900 bg-opacity-20'
                    : 'border-red-400 bg-red-900 bg-opacity-20'
                }`}
              >
                <div className="text-lg font-bold text-amber-200 mb-1">
                  {table.name}
                </div>
                <div className="text-sm text-amber-300 mb-2">
                  👥 {table.capacity} seats
                </div>
                <div className="text-xs text-amber-400 mb-2">
                  📍 {table.location}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTableStatusColor(table.status)}`}>
                  {table.status === 'available' ? '✅ Available' : '🔒 Booked'}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
              <span className="text-amber-200 text-sm">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
              <span className="text-amber-200 text-sm">Booked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admintables; 