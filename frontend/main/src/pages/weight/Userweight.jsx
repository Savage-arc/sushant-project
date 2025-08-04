import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Usersidebar from "../component/sidebar/usersidebar";
import { getAllWeightSessionsApi } from "../../api/api";
const UserWeight = () => {
  const navigate = useNavigate();
  const [weightSessions, setWeightSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await getAllWeightSessionsApi();
      if (response.data.success) {
        setWeightSessions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching weight sessions:', error);
      // If no sessions exist, use default ones
      setWeightSessions([
        {
          id: 1,
          title: "Upper Body Strength",
          description: "Bench press, push-ups, and bicep curls to build upper body muscle.",
        },
        {
          id: 2,
          title: "Leg Day",
          description: "Squats, lunges, and deadlifts for strong legs and glutes.",
        },
        {
          id: 3,
          title: "Full Body Circuit",
          description: "Combination of compound exercises targeting all major muscle groups.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = (id) => {
    // This function is kept for UI consistency but doesn't track completion
    console.log('Session completed:', id);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-200 via-orange-100 to-red-100 text-gray-800">
      {/* Sidebar on the left */}
      <Usersidebar />

      {/* Main content area */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">🏋️ Weight Training</h1>
          
          <button
            onClick={() => navigate("/userdashboard")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
          >
            ⬅ Back
          </button>
          
        </div>

        {/* Workout Sessions */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">Loading weight training sessions...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {weightSessions.map((session) => (
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

export default UserWeight;
