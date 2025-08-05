import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Adminsidebar from "../sidebar/adminsidebar";
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../../utils/authUtils';

const AdminDashboard = () => {
  const navigate = useNavigate();
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
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 text-blue-100">
      {/* Sidebar */}
      <Adminsidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-300">📚 Welcome {userName}</h1>
          <div className="text-lg text-blue-200">Study Planner Management</div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {/* Manage Courses */}
          <div className="bg-white bg-opacity-10 rounded-xl shadow-lg p-6 hover:bg-opacity-20 transition transform hover:scale-105 border border-blue-300">
            <h2 className="text-2xl font-semibold mb-2 text-blue-200">📖 Course Management</h2>
            <p className="text-blue-100 mb-4">Manage course materials, subjects, and curriculum.</p>
            <button
              onClick={() => navigate("/coursemanagement")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full font-semibold"
            >
              ✏️ Manage Courses
            </button>
          </div>

          {/* Manage Schedule */}
          <div className="bg-white bg-opacity-10 rounded-xl shadow-lg p-6 hover:bg-opacity-20 transition transform hover:scale-105 border border-blue-300">
            <h2 className="text-2xl font-semibold mb-2 text-blue-200">📅 Schedule Management</h2>
            <p className="text-blue-100 mb-4">Manage study schedules and time slots.</p>
            <button
              onClick={() => navigate("/schedulemanagement")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full font-semibold"
            >
              ✏️ Manage Schedule
            </button>
          </div>

          {/* Manage Assignments */}
          <div className="bg-white bg-opacity-10 rounded-xl shadow-lg p-6 hover:bg-opacity-20 transition transform hover:scale-105 border border-blue-300">
            <h2 className="text-2xl font-semibold mb-2 text-blue-200">📝 Assignment Management</h2>
            <p className="text-blue-100 mb-4">Create and manage assignments and tasks.</p>
            <button
              onClick={() => navigate("/adminannouncement")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full font-semibold"
            >
              ✏️ Manage Assignments
            </button>
          </div>

          {/* Analytics */}
          <div className="bg-white bg-opacity-10 rounded-xl shadow-lg p-6 hover:bg-opacity-20 transition transform hover:scale-105 border border-blue-300">
            <h2 className="text-2xl font-semibold mb-2 text-blue-200">📊 Analytics</h2>
            <p className="text-blue-100 mb-4">View student progress and performance analytics.</p>
            <button
              onClick={() => navigate("/adminrequest")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full font-semibold"
            >
              📈 View Analytics
            </button>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-12 bg-white bg-opacity-5 rounded-xl p-6 border border-blue-300 border-opacity-30">
          <h3 className="text-2xl font-semibold text-blue-200 mb-6">📈 Quick Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">📚</div>
              <div className="text-blue-200 font-semibold">Active Courses</div>
              <div className="text-blue-300 text-2xl font-bold">8</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">👥</div>
              <div className="text-blue-200 font-semibold">Total Students</div>
              <div className="text-blue-300 text-2xl font-bold">156</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">📝</div>
              <div className="text-blue-200 font-semibold">Pending Assignments</div>
              <div className="text-blue-300 text-2xl font-bold">23</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">⭐</div>
              <div className="text-blue-200 font-semibold">Avg. Performance</div>
              <div className="text-blue-300 text-2xl font-bold">87%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
