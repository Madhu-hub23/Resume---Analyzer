// components/Sidebar.jsx

import { NavLink } from "react-router-dom";
import { useState } from "react";

import {
  MdDashboard,
  MdUploadFile,
  MdBarChart,
  MdHistory,
  MdSettings,
} from "react-icons/md";

import { FaRobot } from "react-icons/fa";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

import "./Sidebar.css";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Resume Upload",
    path: "/upload",
    icon: <MdUploadFile />,
  },
  {
    label: "Result & Analyze",
    path: "/results",
    icon: <MdBarChart />,
  },
  {
    label: "Scan History",
    path: "/history",
    icon: <MdHistory />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <MdSettings />,
  },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div>
        {/* Logo Section */}
        <div className="sidebar-logo">
          <div className="logo-left">
            <FaRobot className="robot-icon" />

            {!collapsed && <h2>AI SCREENER</h2>}
          </div>
<button
  className="toggle-btn"
  onClick={() => {
    console.log("clicked");
    setCollapsed(!collapsed);
  }}
>
  Test
</button>
        </div>

        {/* Navigation */}
        <div className="sidebar-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <span className="menu-icon">{item.icon}</span>

              {!collapsed && (
                <span className="menu-label">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-avatar">H</div>

        {!collapsed && (
          <div>
            <h4>Harini</h4>
            <p>harini@gmail.com</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;