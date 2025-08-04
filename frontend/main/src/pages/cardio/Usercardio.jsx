









import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Usersidebar from "../component/sidebar/usersidebar";
import { getAllCardioSessionsApi } from "../../api/api";
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../utils/authUtils'; 

const Usercardio = () => {
  const navigate = useNavigate();
  const [cardioSessions, setCardioSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    // Get user name from token
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

    // Load workout history from localStorage (keep this as it's user-specific data)
    const savedHistory = localStorage.getItem('cardioWorkoutHistory');
    if (savedHistory) {
      setWorkoutHistory(JSON.parse(savedHistory));
    }

    fetchSessions();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchSessions();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      console.log('Fetching cardio sessions for user...');
      const response = await getAllCardioSessionsApi();
      console.log('Cardio sessions response:', response.data);
      if (response.data.success) {
        setCardioSessions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching cardio sessions:', error);
      console.error('Error response:', error.response?.data);
      // If no sessions exist, use default ones
      setCardioSessions([
        {
          id: 1,
          title: "HIIT Workout",
          description:
            "High-intensity intervals to burn calories fast. 30 seconds sprint and take 20 sec rest and repeat it again.",
        },
        {
          id: 2,
          title: "Treadmill Run",
          description: "Endurance cardio using a treadmill for 30 minutes.",
        },
        {
          id: 3,
          title: "Jump Rope",
          description: "Quick cardio using a jump rope, 5 sets of 2 minutes.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getProgressStats = () => {
    const totalSessions = cardioSessions.length;
    const completedCount = workoutHistory.length;
    const completionRate = totalSessions > 0 ? Math.round((completedCount / totalSessions) * 100) : 0;
    
    const thisWeek = workoutHistory.filter(workout => {
      const workoutDate = new Date(workout.completedAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return workoutDate >= weekAgo;
    }).length;

    const thisMonth = workoutHistory.filter(workout => {
      const workoutDate = new Date(workout.completedAt);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return workoutDate >= monthAgo;
    }).length;

    return {
      totalSessions,
      completedCount,
      completionRate,
      thisWeek,
      thisMonth
    };
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 text-gray-800">
      {/* Sidebar */}
      <Usersidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">🏃‍♂️ Cardio Sessions</h1>
          <div className="flex gap-2">
            {/* <button
              onClick={() => setShowProgress(!showProgress)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              📊 {showProgress ? 'Hide Progress' : 'Show Progress'}
            </button> */}
            <button
              onClick={fetchSessions}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              🔄 Refresh
            </button>
            <button
              onClick={() => navigate("/userdashboard")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              ⬅ Back
            </button>
          </div>
        </div>

        {/* Progress Tracker */}
        {showProgress && (
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">📊 Your Cardio Progress</h2>
            {(() => {
              const stats = getProgressStats();
              return (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalSessions}</div>
                    <div className="text-sm text-gray-600">Total Sessions</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.completedCount}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{stats.completionRate}%</div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{stats.thisWeek}</div>
                    <div className="text-sm text-gray-600">This Week</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{stats.thisMonth}</div>
                    <div className="text-sm text-gray-600">This Month</div>
                  </div>
                </div>
              );
            })()}
            
            {/* Recent Workout History */}
            {workoutHistory.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Recent Workouts</h3>
                <div className="max-h-40 overflow-y-auto">
                  {workoutHistory.slice(0, 5).map((workout) => (
                    <div key={workout.id} className="flex justify-between items-center p-2 bg-gray-50 rounded mb-2">
                      <span className="font-medium">{workout.sessionTitle}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(workout.completedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sessions */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">Loading cardio sessions...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cardioSessions.map((session) => (
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

export default Usercardio;
