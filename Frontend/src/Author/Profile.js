import React, { useState, useEffect } from 'react';

const Profile = ({ email }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!email) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5284/users/by-email?email=${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser(data);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`http://localhost:5284/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update user data');

      setUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: '0', fontSize: '28px', fontWeight: 'bold' }}>{user.fullName}</h1>
        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '16px' }}>
          {user.specialization || 'No specialization'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Full Name</label>
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ''}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          ) : (
            <p style={{ margin: '0' }}>{user.fullName}</p>
          )}
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Email</label>
          <p style={{ margin: '0' }}>{user.email}</p>
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Specialization</label>
          {isEditing ? (
            <input
              type="text"
              name="specialization"
              value={formData.specialization || ''}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          ) : (
            <p style={{ margin: '0' }}>{user.specialization || 'Not specified'}</p>
          )}
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Location</label>
          {isEditing ? (
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          ) : (
            <p style={{ margin: '0' }}>{user.location || 'Not specified'}</p>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          borderBottom: '1px solid #eee', 
          paddingBottom: '5px',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>Biography</h3>
        {isEditing ? (
          <textarea
            name="bio"
            value={formData.bio || ''}
            onChange={handleInputChange}
            style={{ 
              width: '100%', 
              minHeight: '100px', 
              padding: '8px', 
              border: '1px solid #ddd', 
              borderRadius: '4px' 
            }}
          />
        ) : (
          <p style={{ margin: '0' }}>{user.bio || 'No bio provided'}</p>
        )}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          borderBottom: '1px solid #eee', 
          paddingBottom: '5px',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>Social Links</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
          <span>👍️ @{user.fullName?.toLowerCase().replace(/\s+/g, '')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>📅 LinkedIn.com/in/{user.fullName?.toLowerCase().replace(/\s+/g, '')}</span>
        </div>
      </div>

      {isEditing ? (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            onClick={handleCancel}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setIsEditing(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default Profile;