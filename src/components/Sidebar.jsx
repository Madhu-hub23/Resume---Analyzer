// components/Sidebar.jsx

import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdUploadFile,
  MdBarChart,
  MdHistory,
  MdSettings,
} from "react-icons/md";

import { FaRobot } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

import "./Sidebar.css";

const navItems = [
  {
    label: " 🏠 Dashboard",
    path: "/dashboard",
  },

  {
    label: "📄 Resume Upload",
    path: "/upload",
  },

  {
    label: "📊 Result & Analyze",
    path: "/results",
  },

  {
    label: " 🕘 Scan History",
    path: "/history",
  },

  {
    label: " ⚙️ Settings",
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <div className="sidebar">
      {/* Logo */}

      <div>
        <div className="sidebar-logo">
          <div className="logo-left">
            <FaRobot className="robot-icon" />
            <h2>AI SCREENER</h2>
          </div>

          <IoChevronDown className="arrow-icon" />
        </div>

        {/* Nav */}

        <div className="sidebar-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "menu-item active"
                  : "menu-item"
              }
            >
              <span className="menu-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Profile */}

      <div className="profile-section">
        <div className="profile-avatar">H</div>

        <div>
          <h4>Harini</h4>
          <p>harini@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;