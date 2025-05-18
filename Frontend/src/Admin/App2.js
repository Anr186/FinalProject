import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import UserManagement from './UserManagement';
import AddUser from './AddUser';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/users/add" element={<AddUser />} />
          <Route path="/admin/articles" element={<div style={{ padding: '20px' }}>Articles Management</div>} />
          <Route path="/admin" element={<UserManagement />} />
          <Route path="/" element={<UserManagement />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;