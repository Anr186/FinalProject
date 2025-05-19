import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Profile from './Profile';
import ReviewArticles from './ReviewArticles';
import SubmitArticle from './SubmitArticle';

function App({ user, onLogout }) {
  return (
      <div className="App">
        <Navbar user={user} onLogout={onLogout} />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/articles" element={<ReviewArticles />} />
          <Route path="/submit" element={<SubmitArticle />} />
          <Route path="/" element={<Profile/>} />
        </Routes>
      </div>
  );
}

export default App;