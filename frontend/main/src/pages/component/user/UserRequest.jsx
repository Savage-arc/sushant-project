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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || 'Student');
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserName('Student');
      }
    } else {
      setUserName('Student');
    }
    fetchRequests();
  }, []);

  const checkTokenAvailability = () => {
    console.log('=== Token Debug Info ===');
    
    // Check tab-specific token
    const tabId = sessionStorage.getItem('tabId');
    console.log('Tab ID:', tabId);
    
    if (tabId) {
      const tabToken = sessionStorage.getItem(`token_${tabId}`);
      console.log('Tab-specific token:', tabToken ? tabToken.substring(0, 20) + '...' : 'Not found');
    }
    
    // Check direct sessionStorage token
    const sessionToken = sessionStorage.getItem('token');
    console.log('SessionStorage token:', sessionToken ? sessionToken.substring(0, 20) + '...' : 'Not found');
    
    // Check localStorage token
    const localToken = localStorage.getItem('token');
    console.log('LocalStorage token:', localToken ? localToken.substring(0, 20) + '...' : 'Not found');
    
    // Check authUtils token
    const authUtilsToken = getToken();
    console.log('AuthUtils token:', authUtilsToken ? authUtilsToken.substring(0, 20) + '...' : 'Not found');
    
    console.log('=== End Token Debug ===');
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      console.log('User fetching requests...');
      
      // Debug token availability
      checkTokenAvailability();
      
      const response = await getUserRequestsApi();
      console.log('User requests response:', response.data);
      
      if (response.data.success) {
        console.log('User requests found:', response.data.requests.length);
        setRequests(response.data.requests);
      } else {
        console.log('API returned success: false');
        toast.error('Failed to fetch requests');
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      console.error('Error response:', error.response?.data);
      toast.error('Failed to fetch requests');
      
      // Show mock data for testing
      setMockRequests();
    } finally {
      setLoading(false);
    }
  };

  const setMockRequests = () => {
    console.log('Setting mock requests for user testing');
    setRequests([
      {
        id: 1,
        userId: 1,
        userName: "John Doe",
        userEmail: "john@example.com",
        subject: "Study Schedule Request",
        message: "I need help adjusting my study schedule for the upcoming exams.",
        status: "pending",
        adminResponse: null,
        adminId: null,
        adminName: null,
        createdAt: "2024-01-15T10:00:00.000Z",
        updatedAt: "2024-01-15T10:00:00.000Z"
      }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      console.log('Sending request:', { subject, message });
      
      // Debug token before sending request
      checkTokenAvailability();
      
      const response = await createRequestApi({ subject, message });
      console.log('Create request response:', response.data);
      
      if (response.data.success) {
        toast.success('Request sent successfully!');
        setSubject('');
        setMessage('');
        setShowForm(false);
        fetchRequests(); // Refresh the list
      } else {
        toast.error(response.data.message || 'Failed to send request');
      }
    } catch (error) {
      console.error('Create request error:', error);
      console.error('Error response:', error.response?.data);
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
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 text-blue-100">
      <Usersidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">📝 Contact Support</h1>
          <div className="text-lg">Welcome, {userName}!</div>
        </div>

        {/* Debug Button */}
        <div className="mb-6">
          <button
            onClick={checkTokenAvailability}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition mr-4"
          >
            🔍 Debug Token
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
          >
            {showForm ? 'Cancel' : 'Send New Request'}
          </button>
        </div>

        {/* Request Form */}
        {showForm && (
          <div className="bg-white bg-opacity-10 p-6 rounded-xl mb-8 shadow-lg border border-white border-opacity-20">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">💬 New Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-400">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white bg-opacity-10 placeholder-blue-200"
                  placeholder="Enter request subject (e.g., Study schedule help, Course access issue)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-400">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white bg-opacity-10 placeholder-blue-200"
                  rows="4"
                  placeholder="Describe your request, issue, or question in detail..."
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
              >
                Send Request
              </button>
            </form>
          </div>
        )}

        {/* Requests List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-200">📨 Your Requests</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-blue-200 text-lg">Loading your requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-12 bg-white bg-opacity-5 rounded-xl">
              <p className="text-blue-200 text-lg mb-2">No requests yet.</p>
              <p className="text-blue-300 text-sm">Send a request to get help with your studies!</p>
            </div>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg hover:bg-opacity-15 transition border border-white border-opacity-20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200">{request.subject}</h3>
                    <p className="text-sm text-blue-300">
                      📅 {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </div>
                
                <div className="bg-white bg-opacity-5 p-4 rounded-lg mb-4">
                  <p className="text-blue-100">{request.message}</p>
                </div>
                
                {request.adminResponse && (
                  <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg border border-blue-300">
                    <h4 className="font-semibold text-blue-300 mb-2">
                      💬 Admin Response ({request.adminName})
                    </h4>
                    <p className="text-blue-200">{request.adminResponse}</p>
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