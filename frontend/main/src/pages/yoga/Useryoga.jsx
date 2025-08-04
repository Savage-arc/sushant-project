import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Usersidebar from "../component/sidebar/usersidebar";
import { getAllYogaSessionsApi } from "../../api/api";

const Yoga = () => {
  const navigate = useNavigate();
  const [yogaSessions, setYogaSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await getAllYogaSessionsApi();
      if (response.data.success) {
        setYogaSessions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching yoga sessions:', error);
      // If no sessions exist, use default ones
      setYogaSessions([
        {
          id: 1,
          title: "Morning Flow",
          description: "Start your day with light stretching and breathing exercises.",
        },
        {
          id: 2,
          title: "Power Yoga",
          description: "Strength-focused yoga to energize your body and build muscle.",
        },
        {
          id: 3,
          title: "Relax & Restore",
          description: "Wind down with calm poses and slow breathing for relaxation.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100">
      {/* Sidebar */}
      <Usersidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 text-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">🧘‍♀️ Yoga Sessions</h1>
          <button
            onClick={() => navigate("/userdashboard")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          >
            ⬅ Back
          </button>
        </div>

        {/* Session Cards */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">Loading yoga sessions...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {yogaSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
              >
                <h2 className="text-2xl font-semibold mb-2">{session.title}</h2>
                <p className="text-gray-700 mb-4">{session.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Yoga;
