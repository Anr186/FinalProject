import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="reviewer-navbar">
      <div className="reviewer-status">
        <h2>John Smith</h2>
        <span className="status-badge">Active Reviewer</span>
      </div>
      
      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Profile
        </NavLink>
        <NavLink 
          to="/in-progress" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          In Progress Reviews
        </NavLink>
        <NavLink 
          to="/completed" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Completed Reviews
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;