import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      gap: '20px',
      padding: '10px 20px',
      borderBottom: '1px solid #eee',
      marginBottom: '20px'
    }}>
      <Link to="/profile" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Profile</Link>
      <Link to="/articles" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>My Articles</Link>
      <Link to="/submit" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Submit Article</Link>
    </nav>
  );
};

export default Navbar;