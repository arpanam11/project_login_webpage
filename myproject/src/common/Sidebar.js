import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo or Brand */}
      <div className="sidebar-logo">
        {/* Your logo or brand name here */}
      </div>

      {/* Navigation Links */}
      <ul className="sidebar-nav">
        <li className="nav-item">
          <a href="/" className="nav-link">Dashboard</a>
        </li>
        <li className="nav-item">
          <a href="/settings" className="nav-link">Settings</a>
        </li>
        <li className="nav-item">
          <a href="/profile" className="nav-link">Profile</a>
        </li>
      </ul>

      {/* Optional Elements */}
      {/* Example: User information */}
      <div className="sidebar-user">
        {/* User name, avatar, etc. */}
      </div>
    </div>
  );
};

export default Sidebar;
