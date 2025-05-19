import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="reviewer-navbar" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      // backgroundImage: 'url(../img/navBackgr.png)',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="reviewer-status">
          <h2 style={{ margin: 0 }}>{user?.name || 'Reviewer'}</h2>
          <span className="status-badge">Active Reviewer</span>
        </div>

        <div className="nav-links" style={{ display: 'flex', gap: '15px' }}>
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
      </div>

      <button 
        onClick={onLogout}
        style={{
          background: 'none',
          border: 'none',
          color: '#495057',
          fontWeight: '500',
          cursor: 'pointer'
        }}
      >
        Logout ({user?.email})
      </button>
    </nav>
  );
};

export default Navbar;
