import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Usersidebar from "../component/sidebar/usersidebar";
import { getAllYogaSessionsApi } from "../../api/api";

const ProgressTracker = () => {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      setLoading(true);
      const response = await getAllYogaSessionsApi();
      if (response.data.success) {
        setProgressData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching progress data:', error);
      // If no data exists, use default progress items
      setProgressData([
        {
          id: 1,
          title: "Mathematics Progress",
          description: "Track your progress in algebra, geometry, and calculus modules.",
          progress: 75,
          totalModules: 12,
          completedModules: 9
        },
        {
          id: 2,
          title: "Physics Achievement",
          description: "Monitor your understanding of mechanics, thermodynamics, and quantum physics.",
          progress: 60,
          totalModules: 8,
          completedModules: 5
        },
        {
          id: 3,
          title: "English Literature",
          description: "Track your reading progress and essay writing skills development.",
          progress: 85,
          totalModules: 10,
          completedModules: 8
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-400';
    if (progress >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressBarColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 text-blue-100">
      {/* Sidebar */}
      <Usersidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 text-blue-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">📊 Progress Tracker</h1>
          <button
            onClick={() => navigate("/userdashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            ⬅ Back
          </button>
        </div>

        {/* Progress Cards */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-blue-200 text-lg">Loading your progress data...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {progressData.map((item) => (
              <div
                key={item.id}
                className="bg-white bg-opacity-10 rounded-xl shadow-lg p-6 hover:bg-opacity-20 transition transform hover:scale-105 border border-white border-opacity-20"
              >
                <h2 className="text-2xl font-semibold mb-2 text-blue-200">{item.title}</h2>
                <p className="text-blue-100 mb-4">{item.description}</p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className={`text-sm font-bold ${getProgressColor(item.progress)}`}>
                      {item.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressBarColor(item.progress)} transition-all duration-300`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Module Count */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-blue-200">Modules Completed:</span>
                  <span className="text-blue-300 font-semibold">
                    {item.completedModules} / {item.totalModules}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="mt-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.progress >= 80 
                      ? 'bg-green-600 bg-opacity-20 text-green-300' 
                      : item.progress >= 60
                      ? 'bg-yellow-600 bg-opacity-20 text-yellow-300'
                      : 'bg-red-600 bg-opacity-20 text-red-300'
                  }`}>
                    {item.progress >= 80 ? 'Excellent' : item.progress >= 60 ? 'Good Progress' : 'Needs Attention'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Overall Statistics */}
        <div className="mt-8 bg-white bg-opacity-10 rounded-xl p-6 border border-white border-opacity-20">
          <h3 className="text-2xl font-semibold mb-4 text-blue-200">📈 Overall Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">
                {progressData.length}
              </div>
              <div className="text-blue-200 text-sm">Active Subjects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">
                {progressData.reduce((sum, item) => sum + item.totalModules, 0)}
              </div>
              <div className="text-blue-200 text-sm">Total Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">
                {progressData.reduce((sum, item) => sum + item.completedModules, 0)}
              </div>
              <div className="text-blue-200 text-sm">Completed Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">
                {Math.round(progressData.reduce((sum, item) => sum + item.progress, 0) / progressData.length)}%
              </div>
              <div className="text-blue-200 text-sm">Average Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
