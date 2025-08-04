import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaCalendarAlt } from "react-icons/fa";
import Usersidebar from "../sidebar/usersidebar";
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../../utils/authUtils';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || 'Guest');
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserName('Guest');
      }
    } else {
      setUserName('Guest');
    }
  }, []);

  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-700 text-amber-500"
    >
      <Usersidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-10">🍽️ Welcome {userName}</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          <Card
            title="Food Order"
            icon={<FaUtensils size={50} />}
            onClick={() => navigate("/foodorder")}
          />
          <Card
            title="Table Booking"
            icon={<FaCalendarAlt size={50} />}
            onClick={() => navigate("/tablebooking")}
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, icon, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white bg-opacity-10 p-6 rounded-xl shadow hover:bg-opacity-20 transition hover:scale-105 text-center"
  >
    <div className="mb-4 text-amber-400 flex justify-center">{icon}</div>
    <h2 className="text-xl font-semibold">{title}</h2>
  </div>
);

export default UserDashboard;
