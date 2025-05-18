import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Profile from './Profile';
import InProgressReviews from './InProgressReviews';
import CompletedReviews from './CompletedReviews';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>ReviewSystem</h1>
          <Navbar />
        </header>
        
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/in-progress" element={<InProgressReviews />} />
            <Route path="/completed" element={<CompletedReviews />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          © 2025 Review System. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;