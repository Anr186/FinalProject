import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = ({ user, onLogout }) => {
  const navButtonStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(70, 70, 110, 0.7)', // Синеватый оттенок для админки
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    display: 'inline-block'
  };

  const navButtonHover = {
    backgroundColor: 'rgba(90, 90, 130, 0.9)', 
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
  };

  const [hoverStates, setHoverStates] = React.useState({
    users: false,
    articles: false,
    logout: false
  });

  const handleMouseEnter = (button) => {
    setHoverStates({ ...hoverStates, [button]: true });
  };

  const handleMouseLeave = (button) => {
    setHoverStates({ ...hoverStates, [button]: false });
  };

  return (
    <nav style={{ 
      display: 'flex', 
      gap: '20px',
      padding: '12px 24px',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1a1a2e', // Темно-синий фон для админки
      backgroundImage: 'url(./img/navBackgr.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'overlay',
      color: 'white',
      boxShadow: '0 2px 4px rgba(255,255,255,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <h2 style={{ 
          margin: '0',
          fontSize: '20px',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>Admin Dashboard</h2>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link 
            to="/admin/users" 
            style={{ 
              ...navButtonStyle,
              ...(hoverStates.users ? navButtonHover : {}),
            }}
            onMouseEnter={() => handleMouseEnter('users')}
            onMouseLeave={() => handleMouseLeave('users')}
          >
            User Management
          </Link>
          <Link 
            to="/admin/articles" 
            style={{ 
              ...navButtonStyle,
              ...(hoverStates.articles ? navButtonHover : {}),
            }}
            onMouseEnter={() => handleMouseEnter('articles')}
            onMouseLeave={() => handleMouseLeave('articles')}
          >
            Articles
          </Link>
        </div>
      </div>
      
      <button 
        onClick={onLogout}
        style={{
          ...navButtonStyle,
          backgroundColor: 'rgba(220, 80, 80, 0.5)', // Красный для кнопки выхода
          ...(hoverStates.logout ? { 
            backgroundColor: 'rgba(220, 80, 80, 0.7)',
            ...navButtonHover 
          } : {}),
        }}
        onMouseEnter={() => handleMouseEnter('logout')}
        onMouseLeave={() => handleMouseLeave('logout')}
      >
        Logout ({user?.email})
      </button>
    </nav>
  );
};

export default AdminNavbar;