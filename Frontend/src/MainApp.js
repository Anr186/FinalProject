import React, { useState, useEffect } from 'react';
import AuthApp from './Registration/App'; 
import UserApp from './Author/App1';
import AdminApp from './Admin/App2'; 
import ReviewApp from './Recense/App3';

function MainApp() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!user ? (
        <AuthApp onLogin={handleLogin} />
      ) : user.role === 'Admin' ? (
        <AdminApp user={user} onLogout={handleLogout} />
      ) : user.role === 'Reviewer' ? (
        <ReviewApp user={user} onLogout={handleLogout} /> 
      ) : (
        <UserApp user={user} onLogout={handleLogout} />
      )}
    </>
  );
}

export default MainApp;