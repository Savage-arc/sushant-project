import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Adminsidebar from "../component/sidebar/adminsidebar";
import { getAllWeightSessionsApi, createWeightSessionApi, updateWeightSessionApi, deleteWeightSessionApi } from "../../api/api";

const AdminWeight = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await getAllWeightSessionsApi();
      if (response.data.success) {
        setSessions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching weight sessions:', error);
      // If no sessions exist, create default ones
      setSessions([
        {
          id: 1,
          title: "Upper Body Strength",
          description: "Focus on chest, shoulders, and arms using dumbbells and machines.",
        },
        {
          id: 2,
          title: "Leg Day",
          description: "Squats, lunges, and leg presses to strengthen your lower body.",
        },
        {
          id: 3,
          title: "Core Strength",
          description: "Weighted crunches, Russian twists, and planks for core development.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id, field, value) => {
    const updated = sessions.map((session) =>
      session.id === id ? { ...session, [field]: value } : session
    );
    setSessions(updated);
  };

  const handleSave = async (id) => {
    try {
      const session = sessions.find((s) => s.id === id);
      console.log('Updating session:', id, session);
      
      const response = await updateWeightSessionApi(id, {
        title: session.title,
        description: session.description
      });
      
      console.log('Update response:', response.data);
      
      if (response.data.success) {
        toast.success(`Session '${session.title}' updated successfully!`);
        fetchSessions(); // Refresh the data
      }
    } catch (error) {
      console.error('Error updating session:', error);
      console.error('Error response:', error.response?.data);
      toast.error(`Failed to update session: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    
    if (!newSession.title.trim() || !newSession.description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await createWeightSessionApi({
        title: newSession.title,
        description: newSession.description
      });
      
      if (response.data.success) {
        toast.success(`Session '${newSession.title}' created successfully!`);
        setNewSession({ title: '', description: '' });
        setShowCreateForm(false);
        fetchSessions(); // Refresh the data
      }
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error(`Failed to create session: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        const response = await deleteWeightSessionApi(id);
        
        if (response.data.success) {
          toast.success('Session deleted successfully!');
          fetchSessions(); // Refresh the data
        }
      } catch (error) {
        console.error('Error deleting session:', error);
        toast.error(`Failed to delete session: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-purple-100 to-pink-100 text-gray-800">
      {/* Sidebar */}
      <Adminsidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">🏋️‍♂️ Weight Training Sessions</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              ➕ {showCreateForm ? 'Cancel' : 'Add New Session'}
            </button>
            <button
              onClick={fetchSessions}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              🔄 Refresh
            </button>
            <button
              onClick={() => navigate("/admindashboard")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              ⬅ Back
            </button>
          </div>
        </div>

        {/* Create New Session Form */}
        {showCreateForm && (
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">➕ Create New Weight Training Session</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Session Title</label>
                <input
                  type="text"
                  value={newSession.title}
                  onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter session title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newSession.description}
                  onChange={(e) => setNewSession({...newSession, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="4"
                  placeholder="Enter session description"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Create Session
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewSession({ title: '', description: '' });
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Sessions Editor */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">Loading weight training sessions...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-xl shadow-lg p-5 space-y-3 hover:shadow-2xl transition"
              >
                <input
                  type="text"
                  value={session.title}
                  onChange={(e) =>
                    handleEdit(session.id, "title", e.target.value)
                  }
                  className="w-full p-2 border rounded text-lg font-semibold"
                />
                <textarea
                  rows="4"
                  value={session.description}
                  onChange={(e) =>
                    handleEdit(session.id, "description", e.target.value)
                  }
                  className="w-full p-2 border rounded text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(session.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDelete(session.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminWeight;
