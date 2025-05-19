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
      password: 'defaultPassword123',
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
    <div style={{ 
      backgroundColor: '#d4d4d4',
      minHeight: '100vh',
      padding: '40px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '40px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px'
      }}>
        <h2 style={{ 
          fontSize: '28px',
          marginBottom: '30px',
          color: '#333',
          textAlign: 'center'
        }}>
          Add New User
        </h2>

        {error && (
          <div style={{ 
            color: '#721c24',
            backgroundColor: '#f8d7da',
            padding: '15px',
            marginBottom: '25px',
            borderRadius: '6px',
            border: '1px solid #f5c6cb',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px', 
                  fontWeight: '500',
                  color: '#555',
                  fontSize: '16px'
                }}>
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '16px',
                    transition: 'all 0.3s',
                    ':focus': {
                      borderColor: '#80bdff',
                      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                      outline: 'none'
                    }
                  }}
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px', 
                  fontWeight: '500',
                  color: '#555',
                  fontSize: '16px'
                }}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '16px',
                    transition: 'all 0.3s',
                    ':focus': {
                      borderColor: '#80bdff',
                      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                      outline: 'none'
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              fontWeight: '500',
              color: '#555',
              fontSize: '16px'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '16px',
                transition: 'all 0.3s',
                ':focus': {
                  borderColor: '#80bdff',
                  boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                  outline: 'none'
                }
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              fontWeight: '500',
              color: '#555',
              fontSize: '16px'
            }}>
              Role
            </label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '16px',
                backgroundColor: 'white',
                transition: 'all 0.3s',
                ':focus': {
                  borderColor: '#80bdff',
                  boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                  outline: 'none'
                }
              }}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Author">Author</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: '20px',
            marginTop: '30px'
          }}>
            <Link 
              to="/admin/users" 
              style={{
                textDecoration: 'none',
                padding: '12px 24px',
                backgroundColor: '#FFB7B2', // Пастельно-розовый
                color: '#333',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 0.3s',
                border: 'none',
                cursor: 'pointer',
                ':hover': {
                  backgroundColor: '#FF9AA2',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                backgroundColor: '#B5EAD7', // Пастельно-зеленый
                color: '#333',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 0.3s',
                border: 'none',
                cursor: 'pointer',
                ':hover': {
                  backgroundColor: '#97D9B2',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;