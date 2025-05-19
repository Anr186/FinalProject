// import React from 'react';
// import { Link } from 'react-router-dom';

// const UserManagement = () => {
//   const users = [
//     { id: 1, name: 'John Doe', role: 'Editor', status: 'Active' }
//   ];

//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
//       <h2>User Management</h2>
      
//       <div style={{ margin: '20px 0' }}>
//         <input 
//           type="text" 
//           placeholder="Search users..." 
//           style={{
//             padding: '8px 12px',
//             width: '300px',
//             border: '1px solid #ced4da',
//             borderRadius: '4px'
//           }}
//         />
//       </div>

//       <div style={{ overflowX: 'auto' }}>
//         <table style={{ 
//           width: '100%',
//           borderCollapse: 'collapse',
//           marginTop: '20px'
//         }}>
//           <thead>
//             <tr style={{ 
//               backgroundColor: '#f8f9fa',
//               borderBottom: '1px solid #dee2e6'
//             }}>
//               <th style={{ padding: '12px', textAlign: 'left' }}>User</th>
//               <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
//               <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
//               <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user.id} style={{ borderBottom: '1px solid #dee2e6' }}>
//                 <td style={{ padding: '12px' }}>{user.name}</td>
//                 <td style={{ padding: '12px' }}>{user.role}</td>
//                 <td style={{ padding: '12px' }}>
//                   <span style={{
//                     color: user.status === 'Active' ? '#28a745' : '#dc3545',
//                     fontWeight: '500'
//                   }}>
//                     {user.status}
//                   </span>
//                 </td>
//                 <td style={{ padding: '12px' }}>
//                   <button style={{
//                     padding: '5px 10px',
//                     backgroundColor: '#dc3545',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer'
//                   }}>
//                     Block
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         <Link to="/admin/users/add" style={{
//           textDecoration: 'none',
//           padding: '8px 16px',
//           backgroundColor: '#007bff',
//           color: 'white',
//           borderRadius: '4px',
//           display: 'inline-block'
//         }}>
//           Add New User
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState('');

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
          ...userToUpdate, // Включаем все текущие данные пользователя
          role: newRole    // Обновляем только роль
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

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

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

      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#ffeeee',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

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
              <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px' }}>{user.fullName}</td>
                <td style={{ padding: '12px' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>
                  {editingRole === user.id ? (
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      style={{
                        padding: '5px',
                        border: '1px solid #ced4da',
                        borderRadius: '4px'
                      }}
                    >
                      <option value="Author">Author</option>
                      <option value="Reviewer">Reviewer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td style={{ padding: '12px', display: 'flex', gap: '5px' }}>
                  {editingRole === user.id ? (
                    <>
                      <button 
                        onClick={() => saveRole(user.id)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Save
                      </button>
                      <button 
                        onClick={cancelEditRole}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#6c757d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => startEditRole(user.id, user.role)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Edit Role
                    </button>
                  )}
                  <button 
                    onClick={() => blockUser(user.id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
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