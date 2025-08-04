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
    <div className="flex min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-700 text-amber-500">
      {/* Sidebar */}
      <Adminsidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-300">🍽️ Welcome {userName}</h1>
          <div className="text-lg text-amber-200">Restaurant Management</div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {/* Manage Food Menu */}
          <div className="bg-white bg-opacity-10 rounded-xl shadow-lg p-6 hover:bg-opacity-20 transition transform hover:scale-105 border border-amber-300">
            <h2 className="text-2xl font-semibold mb-2 text-amber-200">🍽️ Food Menu</h2>
            <p className="text-amber-100 mb-4">Manage restaurant menu items, prices, and availability.</p>
            <button
              onClick={() => navigate("/adminfood")}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 w-full font-semibold"
            >
              ✏️ Manage Menu
            </button>
          </div>

          {/* Manage Tables */}
          <div className="bg-white bg-opacity-10 rounded-xl shadow-lg p-6 hover:bg-opacity-20 transition transform hover:scale-105 border border-amber-300">
            <h2 className="text-2xl font-semibold mb-2 text-amber-200">📅 Table Management</h2>
            <p className="text-amber-100 mb-4">Manage restaurant tables and booking availability.</p>
            <button
              onClick={() => navigate("/admintables")}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 w-full font-semibold"
            >
              ✏️ Manage Tables
            </button>
          </div>

          {/* Manage Announcements */}
          <div className="bg-white bg-opacity-10 rounded-xl shadow-lg p-6 hover:bg-opacity-20 transition transform hover:scale-105 border border-amber-300">
            <h2 className="text-2xl font-semibold mb-2 text-amber-200">📢 Announcements</h2>
            <p className="text-amber-100 mb-4">Post restaurant updates and special announcements.</p>
            <button
              onClick={() => navigate("/adminannouncement")}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 w-full font-semibold"
            >
              ✏️ Manage Announcements
            </button>
          </div>

          {/* Manage User Requests */}
          <div className="bg-white bg-opacity-10 rounded-xl shadow-lg p-6 hover:bg-opacity-20 transition transform hover:scale-105 border border-amber-300">
            <h2 className="text-2xl font-semibold mb-2 text-amber-200">💬 Customer Messages</h2>
            <p className="text-amber-100 mb-4">Review and respond to customer requests and feedback.</p>
            <button
              onClick={() => navigate("/adminrequest")}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 w-full font-semibold"
            >
              ✏️ View Messages
            </button>
          </div>


        </div>

        {/* Quick Stats Section */}
        <div className="mt-12 bg-white bg-opacity-5 rounded-xl p-6 border border-amber-300 border-opacity-30">
          <h3 className="text-2xl font-semibold text-amber-200 mb-6">📈 Quick Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-300 mb-2">🍽️</div>
              <div className="text-amber-200 font-semibold">Menu Items</div>
              <div className="text-amber-300 text-2xl font-bold">24</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-300 mb-2">📅</div>
              <div className="text-amber-200 font-semibold">Today's Bookings</div>
              <div className="text-amber-300 text-2xl font-bold">12</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-300 mb-2">💬</div>
              <div className="text-amber-200 font-semibold">New Messages</div>
              <div className="text-amber-300 text-2xl font-bold">5</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-300 mb-2">⭐</div>
              <div className="text-amber-200 font-semibold">Rating</div>
              <div className="text-amber-300 text-2xl font-bold">4.8</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
