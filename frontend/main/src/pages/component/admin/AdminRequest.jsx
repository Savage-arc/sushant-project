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
      const response = await getAllRequestsApi();
      console.log('Admin requests response:', response.data);
      if (response.data.success) {
        setRequests(response.data.requests);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to fetch requests');
    }
  };

  const handleRespond = async (e) => {
    e.preventDefault();
    
    if (!adminResponse.trim()) {
      toast.error('Please enter a response');
      return;
    }

    try {
      const response = await respondToRequestApi(selectedRequest.id, {
        status,
        adminResponse
      });
      
      if (response.data.success) {
        toast.success('Response sent successfully!');
        setAdminResponse('');
        setStatus('pending');
        setSelectedRequest(null);
        fetchRequests();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to send response');
    }
  };

  const testTable = async () => {
    try {
      const response = await testRequestsApi();
      console.log('Test response:', response.data);
      toast.success(`Table test: ${response.data.message}, Count: ${response.data.count}`);
    } catch (error) {
      console.error('Test error:', error);
      toast.error('Table test failed');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600 bg-opacity-20 text-yellow-300';
      case 'approved': return 'bg-green-600 bg-opacity-20 text-green-300';
      case 'rejected': return 'bg-red-600 bg-opacity-20 text-red-300';
      case 'in_progress': return 'bg-amber-600 bg-opacity-20 text-amber-300';
      default: return 'bg-gray-600 bg-opacity-20 text-gray-300';
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
      <Adminsidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-amber-300">💬 Customer Messages</h1>
          <div className="text-lg text-amber-200">Welcome, {userName}!</div>
        </div>
        
        {/* Test Button */}
        <div className="mb-6">
          <button
            onClick={testTable}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
          >
            Test Table
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Requests List */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-amber-200">📨 All Messages</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {requests.length === 0 ? (
                <div className="text-center py-8 text-amber-200">
                  <p className="text-lg">No customer messages found.</p>
                  <p className="text-sm mt-2">Customer messages will appear here once they contact the restaurant.</p>
                </div>
              ) : (
                requests.map((request) => (
                  <div 
                    key={request.id} 
                    className={`bg-white bg-opacity-10 p-4 rounded-lg border border-amber-300 border-opacity-30 cursor-pointer transition hover:bg-opacity-15 ${
                      selectedRequest?.id === request.id ? 'ring-2 ring-amber-500' : ''
                    }`}
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-amber-200">{request.subject}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                      </span>
                    </div>
                    <p className="text-sm text-amber-100 mb-2">{request.message.substring(0, 100)}...</p>
                    <div className="text-xs text-amber-300">
                      <p>From: {request.userName} ({request.userEmail})</p>
                      <p>Date: {new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Response Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-amber-200">✉️ Respond to Message</h2>
            {selectedRequest ? (
              <div className="bg-white bg-opacity-10 p-6 rounded-lg border border-amber-300 border-opacity-30">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2 text-amber-200">{selectedRequest.subject}</h3>
                  <p className="text-amber-100 mb-4">{selectedRequest.message}</p>
                  <div className="text-sm text-amber-300">
                    <p>From: {selectedRequest.userName} ({selectedRequest.userEmail})</p>
                    <p>Date: {new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {selectedRequest.adminResponse && (
                  <div className="bg-amber-900 bg-opacity-30 p-4 rounded-lg mb-4 border border-amber-300">
                    <h4 className="font-semibold text-amber-300 mb-2">🍽️ Previous Response</h4>
                    <p className="text-amber-200">{selectedRequest.adminResponse}</p>
                  </div>
                )}

                <form onSubmit={handleRespond} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-amber-200">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white"
                    >
                      <option value="pending" className="text-gray-800">Pending</option>
                      <option value="approved" className="text-gray-800">Approved</option>
                      <option value="rejected" className="text-gray-800">Rejected</option>
                      <option value="in_progress" className="text-gray-800">In Progress</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-amber-200">Response</label>
                    <textarea
                      value={adminResponse}
                      onChange={(e) => setAdminResponse(e.target.value)}
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
                      rows="4"
                      placeholder="Enter your response to the customer..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition duration-300 font-semibold"
                  >
                    Send Response
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white bg-opacity-10 p-6 rounded-lg border border-amber-300 border-opacity-30 text-center text-amber-200">
                <p>Select a customer message to respond</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRequest; 