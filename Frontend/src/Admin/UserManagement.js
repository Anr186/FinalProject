import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [avatarImages, setAvatarImages] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5284/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAvatarUpload = (userId, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarImages(prev => ({
          ...prev,
          [userId]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return '#FF9AA2'; // пастельно-красный
      case 'Author': return '#FFB7B2'; // пастельно-розовый
      case 'Reviewer': return '#B5EAD7'; // пастельно-зеленый
      case 'Editor': return '#C7CEEA'; // пастельно-синий
      default: return '#E2F0CB'; // пастельно-салатовый
    }
  };

  const startEditRole = (userId, currentRole) => {
    setEditingRole(userId);
    setNewRole(currentRole);
  };

  const cancelEditRole = () => {
    setEditingRole(null);
    setNewRole('');
  };

  const saveRole = async (userId) => {
    try {
      const userToUpdate = users.find(u => u.id === userId);
      if (!userToUpdate) return;

      const response = await fetch(`http://localhost:5284/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userToUpdate,
          role: newRole
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update role');
      }

      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: newRole } : u
      ));
      setEditingRole(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating role:', err);
    }
  };

  const blockUser = async (userId) => {
    if (!window.confirm('Are you sure you want to block this user?')) return;
    
    try {
      const response = await fetch(`http://localhost:5284/users/${userId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to block user');
      }

      setUsers(users.filter(u => u.id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center', 
      fontSize: '18px',
      backgroundColor: '#d4d4d4',
      minHeight: '100vh'
    }}>
      Loading users...
    </div>
  );

  if (error) return (
    <div style={{ 
      padding: '40px', 
      color: 'red', 
      textAlign: 'center', 
      fontSize: '18px',
      backgroundColor: '#d4d4d4',
      minHeight: '100vh'
    }}>
      Error: {error}
    </div>
  );

  return (
    <div style={{ 
      backgroundColor: '#d4d4d4',
      minHeight: '100vh',
      padding: '40px 0'
    }}>
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontSize: '28px',
          marginBottom: '25px',
          color: '#333'
        }}>User Management</h2>
        
        <div style={{ margin: '25px 0' }}>
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 15px',
              width: '350px',
              border: '1px solid #ced4da',
              borderRadius: '6px',
              fontSize: '16px',
              outline: 'none',
              ':focus': {
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
              }
            }}
          />
        </div>

        {error && (
          <div style={{ 
            color: '#721c24',
            backgroundColor: '#f8d7da',
            borderColor: '#f5c6cb',
            padding: '15px',
            marginBottom: '25px',
            border: '1px solid transparent',
            borderRadius: '6px',
            fontSize: '16px'
          }}>
            {error}
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            fontSize: '16px'
          }}>
            <thead>
              <tr style={{ 
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #dee2e6'
              }}>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>User</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Role</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ position: 'relative' }}>
                      <div 
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          backgroundColor: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          border: '2px solid #ddd'
                        }}
                      >
                        {avatarImages[user.id] ? (
                          <img 
                            src={avatarImages[user.id]} 
                            alt="Avatar" 
                            style={{ 
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <span style={{ color: '#999', fontSize: '12px' }}></span>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleAvatarUpload(user.id, e)}
                        style={{
                          position: 'absolute',
                          width: '50px',
                          height: '50px',
                          opacity: 0,
                          cursor: 'pointer'
                        }}
                        title="Upload avatar"
                      />
                    </div>
                    <span>{user.fullName}</span>
                  </td>
                  <td style={{ padding: '15px' }}>{user.email}</td>
                  <td style={{ padding: '15px' }}>
                    {editingRole === user.id ? (
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        style={{
                          padding: '8px 12px',
                          border: '1px solid #ced4da',
                          borderRadius: '6px',
                          fontSize: '16px',
                          outline: 'none',
                          ':focus': {
                            borderColor: '#80bdff',
                            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
                          }
                        }}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Author">Author</option>
                        <option value="Reviewer">Reviewer</option>
                        <option value="Editor">Editor</option>
                      </select>
                    ) : (
                      <span style={{
                        backgroundColor: getRoleColor(user.role),
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        color: '#333'
                      }}>
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '15px', display: 'flex', gap: '10px' }}>
                    {editingRole === user.id ? (
                      <>
                        <button 
                          onClick={() => saveRole(user.id)}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'all 0.3s',
                            ':hover': {
                              backgroundColor: '#218838'
                            }
                          }}
                        >
                          Save
                        </button>
                        <button 
                          onClick={cancelEditRole}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'all 0.3s',
                            ':hover': {
                              backgroundColor: '#5a6268'
                            }
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => startEditRole(user.id, user.role)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          transition: 'all 0.3s',
                          ':hover': {
                            backgroundColor: '#0069d9'
                          }
                        }}
                      >
                        Edit Role
                      </button>
                    )}
                    <button 
                      onClick={() => blockUser(user.id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        transition: 'all 0.3s',
                        ':hover': {
                          backgroundColor: '#c82333'
                        }
                      }}
                    >
                      Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '30px' }}>
          <Link to="/admin/users/add" style={{
            textDecoration: 'none',
            padding: '12px 24px',
            backgroundColor: '#17a2b8',
            color: 'white',
            borderRadius: '6px',
            display: 'inline-block',
            fontSize: '16px',
            transition: 'all 0.3s',
            ':hover': {
              backgroundColor: '#138496',
              transform: 'translateY(-2px)'
            }
          }}>
            Add New User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;