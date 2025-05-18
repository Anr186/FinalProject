import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Profile from './Profile';
import ReviewArticles from './ReviewArticles';
import SubmitArticle from './SubmitArticle';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/articles" element={<ReviewArticles />} />
          <Route path="/submit" element={<SubmitArticle />} />
          <Route path="/" element={<Profile/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;