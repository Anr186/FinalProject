import React from 'react';
import { Link } from 'react-router-dom';

const AddUser = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Add New User</h2>
      
      <div style={{ margin: '20px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>First Name</label>
            <input 
              type="text" 
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ced4da',
                borderRadius: '4px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Last Name</label>
            <input 
              type="text" 
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ced4da',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
        <input 
          type="email" 
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ced4da',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Role</label>
        <select style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ced4da',
          borderRadius: '4px'
        }}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
        <Link to="/admin/users" style={{
          textDecoration: 'none',
          padding: '8px 16px',
          backgroundColor: '#6c757d',
          color: 'white',
          borderRadius: '4px',
          display: 'inline-block'
        }}>
          Cancel
        </Link>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Create User
        </button>
      </div>
    </div>
  );
};

export default AddUser;