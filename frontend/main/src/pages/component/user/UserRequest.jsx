import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createRequestApi, getUserRequestsApi } from '../../../api/api';
import Usersidebar from '../sidebar/usersidebar';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../../utils/authUtils';

const UserRequest = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [requests, setRequests] = useState([]);
  const [userName, setUserName] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || 'User');
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserName('User');
      }
    } else {
      setUserName('User');
    }
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getUserRequestsApi();
      if (response.data.success) {
        setRequests(response.data.requests);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      console.log('Sending request:', { subject, message });
      const response = await createRequestApi({ subject, message });
      console.log('Create request response:', response.data);
      if (response.data.success) {
        toast.success('Request sent successfully!');
        setSubject('');
        setMessage('');
        setShowForm(false);
        fetchRequests();
      }
    } catch (error) {
      console.error('Create request error:', error);
      toast.error(error?.response?.data?.message || 'Failed to send request');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-amber-600 bg-amber-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'in_progress': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'in_progress': return 'In Progress';
      default: return status;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-700 text-amber-500">
      {/* Sidebar */}
      <Usersidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">📝 Contact Restaurant</h1>
          <div className="text-lg">Welcome, {userName}!</div>
        </div>

        {/* Create Request Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition duration-300 font-semibold"
          >
            {showForm ? 'Cancel' : 'Send New Message'}
          </button>
        </div>

        {/* Request Form */}
        {showForm && (
          <div className="bg-white bg-opacity-10 p-6 rounded-xl mb-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">💬 New Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-amber-200">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white bg-white bg-opacity-10 placeholder-amber-200"
                  placeholder="Enter message subject (e.g., Special dietary request, Table preference)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-amber-200">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white bg-white bg-opacity-10 placeholder-amber-200"
                  rows="4"
                  placeholder="Describe your request, feedback, or special requirements in detail..."
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition duration-300 font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        )}

        {/* Requests List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">📨 Your Messages</h2>
          {requests.length === 0 ? (
            <div className="text-center py-8 text-amber-200 bg-white bg-opacity-5 rounded-xl">
              <p className="text-lg">No messages yet. Send your first message to the restaurant!</p>
              <p className="text-sm mt-2 text-amber-300">Perfect for special requests, feedback, or questions about our services.</p>
            </div>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg hover:bg-opacity-15 transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{request.subject}</h3>
                    <p className="text-sm text-amber-200">
                      📅 {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </div>
                <p className="text-amber-100 mb-4">{request.message}</p>
                
                {request.adminResponse && (
                  <div className="bg-amber-900 bg-opacity-30 p-4 rounded-lg border border-amber-300">
                    <h4 className="font-semibold text-amber-300 mb-2">
                      🍽️ Restaurant Response ({request.adminName})
                    </h4>
                    <p className="text-amber-200">{request.adminResponse}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRequest; 