import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaCalendarAlt, FaTasks, FaChartLine, FaClock, FaGraduationCap } from "react-icons/fa";
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
        setUserName(decoded.name || 'Student');
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserName('Student');
      }
    } else {
      setUserName('Student');
    }
  }, []);

  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 text-blue-100"
    >
      <Usersidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-10">📚 Welcome {userName}</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card
            title="Study Schedule"
            description="Plan your study sessions"
            icon={<FaCalendarAlt size={50} />}
            onClick={() => navigate("/studyschedule")}
          />
          <Card
            title="Task Manager"
            description="Track your assignments"
            icon={<FaTasks size={50} />}
            onClick={() => navigate("/taskmanager")}
          />
          <Card
            title="Progress Tracker"
            description="Monitor your learning"
            icon={<FaChartLine size={50} />}
            onClick={() => navigate("/useryoga")}
          />
          <Card
            title="Study Timer"
            description="Pomodoro technique"
            icon={<FaClock size={50} />}
            onClick={() => navigate("/usercardio")}
          />
          <Card
            title="Course Materials"
            description="Access your resources"
            icon={<FaBook size={50} />}
            onClick={() => navigate("/userweight")}
          />
          <Card
            title="Achievements"
            description="View your milestones"
            icon={<FaGraduationCap size={50} />}
            onClick={() => navigate("/userannouncement")}
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, description, icon, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white bg-opacity-10 p-6 rounded-xl shadow hover:bg-opacity-20 transition hover:scale-105 text-center border border-white border-opacity-20"
  >
    <div className="mb-4 text-blue-300 flex justify-center">{icon}</div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-sm text-blue-200 opacity-80">{description}</p>
  </div>
);

export default UserDashboard;
