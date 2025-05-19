import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import UserManagement from './UserManagement';
import AddUser from './AddUser';

function App({ user, onLogout }) {
  return (
      <div className="App">
        <Navbar user={user} onLogout={onLogout} />
        <Routes>
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/users/add" element={<AddUser />} />
          <Route path="/admin/articles" element={<div style={{ padding: '20px' }}>Articles Management</div>} />
          <Route path="/admin" element={<UserManagement />} />
          <Route path="/" element={<UserManagement />} /> 
        </Routes>
      </div>
  );
}

export default App;