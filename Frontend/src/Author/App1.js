import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Profile from './Profile';
import ReviewArticles from './ReviewArticles';
import SubmitArticle from './SubmitArticle';

function App({ user, onLogout }) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!user?.email) return;
      try {
        const response = await fetch(`http://localhost:5284/users/by-email?email=${encodeURIComponent(user.email)}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUserId(data.id);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, [user?.email]);

  return (
    <div className="App">
      <Navbar user={user} onLogout={onLogout} />
      <Routes>
        <Route path="/profile" element={<Profile email={user?.email} />} />
        <Route path="/articles" element={<ReviewArticles userId={userId}/>} />
        <Route path="/submit" element={<SubmitArticle userId={userId} />} />
        <Route path="/" element={<Profile email={user?.email} />} />
      </Routes>
    </div>
  );
}

export default App;
