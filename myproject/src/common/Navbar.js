import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top bg-light">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">WebSite Name</a>
         
        </div>
        <ul className="nav navbar-nav">
          <li className="nav-item active"><a className="nav-link" href="#">Home page</a></li>
          {/* Add more nav items as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;