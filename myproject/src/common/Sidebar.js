import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        BrandName
      </div>
      <ul className="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/Home">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/project">project</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/profile">Profile</a>
        </li>
        {/* Add more navigation items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
