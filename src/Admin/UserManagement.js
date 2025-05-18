import React from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const users = [
    { id: 1, name: 'John Doe', role: 'Editor', status: 'Active' }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2>User Management</h2>
      
      <div style={{ margin: '20px 0' }}>
        <input 
          type="text" 
          placeholder="Search users..." 
          style={{
            padding: '8px 12px',
            width: '300px',
            border: '1px solid #ced4da',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px'
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#f8f9fa',
              borderBottom: '1px solid #dee2e6'
            }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>User</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px' }}>{user.name}</td>
                <td style={{ padding: '12px' }}>{user.role}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    color: user.status === 'Active' ? '#28a745' : '#dc3545',
                    fontWeight: '500'
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to="/admin/users/add" style={{
          textDecoration: 'none',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          borderRadius: '4px',
          display: 'inline-block'
        }}>
          Add New User
        </Link>
      </div>
    </div>
  );
};

export default UserManagement;