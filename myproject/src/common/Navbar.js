import React from 'react';

const Navbar = () => {
  return (
    <nav class="navbar navbar-inverse navbar-fixed-top bg-light">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">WebSiteName</a>
      </div>
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Home</a></li>
      </ul>
    </div>
  </nav>
  );
};

export default Navbar;
