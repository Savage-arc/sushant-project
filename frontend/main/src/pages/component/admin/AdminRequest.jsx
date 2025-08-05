import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllRequestsApi, respondToRequestApi, testRequestsApi } from '../../../api/api';
import Adminsidebar from '../sidebar/adminsidebar';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../../utils/authUtils';

const AdminRequest = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [adminResponse, setAdminResponse] = useState('');
  const [status, setStatus] = useState('pending');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      console.log('Admin fetching requests...');
      
      // First test if the requests table exists
      try {
        const testResponse = await testRequestsApi();
        console.log('Test response:', testResponse.data);
      } catch (testError) {
        console.error('Test API error:', testError);
      }
      
      const response = await getAllRequestsApi();
      console.log('Admin requests response:', response.data);
      
      if (response.data.success) {
        console.log('Requests found:', response.data.requests.length);
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
    console.log('Setting mock requests for testing');
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
      },
      {
        id: 2,
        userId: 2,
        userName: "Jane Smith",
        userEmail: "jane@example.com",
        subject: "Course Material Access",
        message: "I'm having trouble accessing the physics course materials. Can you help?",
        status: "in_progress",
        adminResponse: "We're working on fixing the access issue. Please try again in 24 hours.",
        adminId: 1,
        adminName: "Admin User",
        createdAt: "2024-01-14T14:30:00.000Z",
        updatedAt: "2024-01-14T16:45:00.000Z"
      }
    ]);
  };

  const handleRespond = async (e) => {
    e.preventDefault();
    
    if (!adminResponse.trim()) {
      toast.error('Please enter a response');
      return;
    }

    try {
      console.log('Responding to request:', selectedRequest.id);
      const response = await respondToRequestApi(selectedRequest.id, {
        status,
        adminResponse
      });
      
      console.log('Response sent:', response.data);
      if (response.data.success) {
        toast.success('Response sent successfully!');
        setAdminResponse('');
        setStatus('pending');
        setSelectedRequest(null);
        fetchRequests(); // Refresh the list
      }
    } catch (error) {
      console.error('Error responding to request:', error);
      toast.error(error?.response?.data?.message || 'Failed to send response');
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
      <Adminsidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">📝 Student Requests</h1>
          <div className="text-lg">Welcome, {userName}!</div>
        </div>

        {/* Debug Info */}
        <div className="mb-6 bg-white bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🔍 Debug Information</h3>
          <p>Total Requests: {requests.length}</p>
          <p>Loading: {loading ? 'Yes' : 'No'}</p>
          <button 
            onClick={fetchRequests}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-2"
          >
            🔄 Refresh Requests
          </button>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-blue-200 text-lg">Loading requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-12 bg-white bg-opacity-5 rounded-xl">
              <p className="text-blue-200 text-lg mb-2">No requests found.</p>
              <p className="text-blue-300 text-sm">Students can send requests from their dashboard.</p>
            </div>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg hover:bg-opacity-15 transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200">{request.subject}</h3>
                    <p className="text-sm text-blue-300">
                      📧 {request.userEmail} | 📅 {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </div>
                
                <div className="bg-white bg-opacity-5 p-4 rounded-lg mb-4">
                  <p className="text-blue-100 mb-2"><strong>From:</strong> {request.userName}</p>
                  <p className="text-blue-100">{request.message}</p>
                </div>
                
                {request.adminResponse && (
                  <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg border border-blue-300 mb-4">
                    <h4 className="font-semibold text-blue-300 mb-2">
                      💬 Admin Response ({request.adminName})
                    </h4>
                    <p className="text-blue-200">{request.adminResponse}</p>
                  </div>
                )}
                
                {!request.adminResponse && (
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    💬 Respond
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Response Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl max-w-md w-full mx-4 border border-white border-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 text-blue-200">💬 Respond to Request</h2>
              <form onSubmit={handleRespond} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-200">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-white bg-opacity-10"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-200">Response</label>
                  <textarea
                    value={adminResponse}
                    onChange={(e) => setAdminResponse(e.target.value)}
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-white bg-opacity-10 placeholder-blue-200"
                    rows="4"
                    placeholder="Enter your response..."
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                  >
                    Send Response
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRequest(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRequest; 