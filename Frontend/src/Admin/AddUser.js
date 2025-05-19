import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !role) {
      setError('Please fill all fields');
      return;
    }

    const newUser = {
      fullName: firstName + ' ' + lastName,
      email,
      role,
      password: '123', 
    };

    try {
      const response = await fetch('http://localhost:5284/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to create user');
      }
      navigate('/admin/users');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Add New User</h2>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ margin: '20px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
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
                value={lastName}
                onChange={e => setLastName(e.target.value)}
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
            value={email}
            onChange={e => setEmail(e.target.value)}
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
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ced4da',
              borderRadius: '4px'
            }}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Author">Author</option>
            <option value="Reviewer">Reviewer</option>
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
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
