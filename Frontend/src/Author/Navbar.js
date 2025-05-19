import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navButtonStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(60, 60, 60, 0.7)', 
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    display: 'inline-block'
  };

  const navButtonHover = {
    backgroundColor: 'rgba(80, 80, 80, 0.9)', 
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
  };

  const [hoverStates, setHoverStates] = React.useState({
    profile: false,
    articles: false,
    submit: false,
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
      // marginBottom: '20px',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#242424', 
      backgroundImage: 'url(./img/navBackgr.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'overlay', 
      color: 'white',
      boxShadow: '0 2px 4px rgba(255,255,255,1)'
    }}>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link 
          to="/profile" 
          style={{ 
            ...navButtonStyle,
            ...(hoverStates.profile ? navButtonHover : {}),
          }}
          onMouseEnter={() => handleMouseEnter('profile')}
          onMouseLeave={() => handleMouseLeave('profile')}
        >
          Profile
        </Link>
        <Link 
          to="/articles" 
          style={{ 
            ...navButtonStyle,
            ...(hoverStates.articles ? navButtonHover : {}),
          }}
          onMouseEnter={() => handleMouseEnter('articles')}
          onMouseLeave={() => handleMouseLeave('articles')}
        >
          My Articles
        </Link>
        <Link 
          to="/submit" 
          style={{ 
            ...navButtonStyle,
            
            ...(hoverStates.submit ? { 
              
              ...navButtonHover 
            } : {}),
          }}
          onMouseEnter={() => handleMouseEnter('submit')}
          onMouseLeave={() => handleMouseLeave('submit')}
        >
          Submit Article
        </Link>
      </div>
      <button 
        onClick={onLogout}
        style={{
          ...navButtonStyle,
          backgroundColor: 'rgba(220, 80, 80, 0.3)', 
          ...(hoverStates.logout ? { 
            backgroundColor: 'rgba(220, 80, 80, 0.5)',
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

export default Navbar;