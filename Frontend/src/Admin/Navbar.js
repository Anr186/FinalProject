import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ margin: '0 20px 0 0' }}>Admin Dashboard</h2>
        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link to="/admin/users" style={{ textDecoration: 'none', color: '#495057', fontWeight: '500' }}>User Management</Link>
          <Link to="/admin/articles" style={{ textDecoration: 'none', color: '#495057', fontWeight: '500' }}>Articles</Link>
        </nav>
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
    </div>
  );
};

export default Navbar;