import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav style={{ 
      display: 'flex', 
      gap: '20px',
      padding: '10px 20px',
      borderBottom: '1px solid #eee',
      marginBottom: '20px',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/profile" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Profile</Link>
        <Link to="/articles" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>My Articles</Link>
        <Link to="/submit" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Submit Article</Link>
      </div>
      <button 
        onClick={onLogout}
        style={{
          background: 'none',
          border: 'none',
          color: '#333',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Logout ({user?.email})
      </button>
    </nav>
  );
};

export default Navbar;