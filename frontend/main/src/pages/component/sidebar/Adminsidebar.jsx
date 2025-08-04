import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUtensils,
  FaCalendarAlt,
  FaBook,
  FaEnvelope,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { logout } from "../../../utils/authUtils";

const Adminsidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-black p-6 flex flex-col justify-between min-h-screen shadow-lg">
      <div>
        <h2 className="text-3xl font-bold mb-8 text-white text-center">🍽️ Tabletime</h2>
        <nav className="space-y-4 text-sm">
          <SidebarItem
            icon={<FaTachometerAlt />}
            label="Dashboard"
            onClick={() => navigate("/admindashboard")}
          />
          
          <SidebarItem
            icon={<FaUtensils />}
            label="Food Menu"
            onClick={() => navigate("/adminfood")}
          />
          <SidebarItem
            icon={<FaCalendarAlt />}
            label="Table Management"
            onClick={() => navigate("/admintables")}
          />
          <SidebarItem
            icon={<FaUsers />}
            label="Customers"
            onClick={() => navigate("/UserList")}
          />
          <SidebarItem
            icon={<FaBook />}
            label="Announcements"
            onClick={() => navigate("/adminannouncement")}
          />
          <SidebarItem
            icon={<FaEnvelope />}
            label="Customer Messages"
            onClick={() => navigate("/adminrequest")}
          />
        </nav>
      </div>

      {/* Logout button */}
      <div className="pt-6 border-t border-gray-700">
        <SidebarItem
          icon={<FaSignOutAlt />}
          label="Logout"
          onClick={handleLogout}
        />
        <p className="text-xs text-gray-400 text-center mt-4">
          © {new Date().getFullYear()} TasteBite
        </p>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 text-gray-300 hover:text-amber-400 cursor-pointer transition py-2 px-2 rounded hover:bg-gray-800"
  >
    <span className="text-lg">{icon}</span>
    <span className="text-base">{label}</span>
  </div>
);

export default Adminsidebar;