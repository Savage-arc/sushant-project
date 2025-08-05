import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaCalendarAlt,
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaTasks,
  FaEnvelope,
  FaChartLine,
  FaClock,
  FaGraduationCap
} from "react-icons/fa";
import { logout } from "../../../utils/authUtils";

const Usersidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-black p-6 flex flex-col justify-between min-h-screen shadow-lg">
      <div>
        <h2 className="text-3xl font-bold mb-8 text-white text-center">📚 StudyPlanner</h2>
        <nav className="space-y-4 text-sm">
          <SidebarItem
            icon={<FaTachometerAlt />}
            label="Dashboard"
            onClick={() => navigate("/userdashboard")}
          />
          <SidebarItem
            icon={<FaCalendarAlt />}
            label="Study Schedule"
            onClick={() => navigate("/studyschedule")}
          />
          <SidebarItem
            icon={<FaTasks />}
            label="Task Manager"
            onClick={() => navigate("/taskmanager")}
          />
          {/* <SidebarItem
            icon={<FaChartLine />}
            label="Progress Tracker"
            onClick={() => navigate("/useryoga")}
          /> */}
          {/* <SidebarItem
            icon={<FaClock />}
            label="Study Timer"
            onClick={() => navigate("/usercardio")}
          /> */}
          <SidebarItem
            icon={<FaBook />}
            label="Course Materials"
            onClick={() => navigate("/userweight")}
          />
          <SidebarItem
            icon={<FaGraduationCap />}
            label="Announcement"
            onClick={() => navigate("/userannouncement")}
          />
          <SidebarItem
            icon={<FaEnvelope />}
            label="Contact Support"
            onClick={() => navigate("/userrequest")}
          />
        </nav>
      </div>

      <div className="pt-6 border-t border-gray-700">
        <SidebarItem
          icon={<FaSignOutAlt />}
          label="Logout"
          onClick={handleLogout}
        />
        <p className="text-xs text-gray-400 text-center mt-4">
          © {new Date().getFullYear()} StudyPlanner
        </p>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 cursor-pointer transition py-2 px-2 rounded hover:bg-gray-800"
  >
    <span className="text-lg">{icon}</span>
    <span className="text-base">{label}</span>
  </div>
);

export default Usersidebar;
