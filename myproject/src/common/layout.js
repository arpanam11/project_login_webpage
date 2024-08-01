import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className="main">
      <Sidebar />
      <div className="contain">
        <Navbar />
        <div className="body-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;