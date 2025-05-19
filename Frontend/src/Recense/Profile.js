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
    <div className="profile-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ margin: '0', fontSize: '28px', fontWeight: 'bold' }}>{user.fullName}</h1>
        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '16px' }}>
          {user.specialization || 'No specialization'}
        </p>
      </div>

      <section className="personal-info-section" style={{ marginBottom: '30px' }}>
        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Personal Information</h3>
        <div className="info-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          marginTop: '15px'
        }}>
          <div className="info-item">
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
          <div className="info-item">
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Email</label>
            <p style={{ margin: '0' }}>{user.email}</p>
          </div>
          <div className="info-item">
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Institution</label>
            {isEditing ? (
              <input
                type="text"
                name="Location"
                value={formData.Location || ''}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            ) : (
              <p style={{ margin: '0' }}>{user.Location || 'Not specified'}</p>
            )}
          </div>
          <div className="info-item">
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Field of Expertise</label>
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
        </div>
      </section>

      <section className="stats-section" style={{ marginBottom: '30px' }}>
        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Review Statistics</h3>
        <div className="stats-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '20px',
          marginTop: '15px',
          textAlign: 'center'
        }}>
          <div className="stat-item">
            <span className="stat-number" style={{ fontSize: '24px', fontWeight: 'bold' }}>0</span>
            <span className="stat-label" style={{ display: 'block', color: '#666' }}>Total Reviews</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" style={{ fontSize: '24px', fontWeight: 'bold' }}>0</span>
            <span className="stat-label" style={{ display: 'block', color: '#666' }}>In Progress</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" style={{ fontSize: '24px', fontWeight: 'bold' }}>0</span>
            <span className="stat-label" style={{ display: 'block', color: '#666' }}>Completed</span>
          </div>
        </div>
      </section>

      <section className="preferences-section" style={{ marginBottom: '30px' }}>
        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Review Preferences</h3>
        <div style={{ marginTop: '15px' }}>
          <div className="preference-item" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="checkbox" 
                name="availableForReviews"
                checked={formData.availableForReviews !== false}
                onChange={(e) => setFormData(prev => ({ ...prev, availableForReviews: e.target.checked }))}
              />
              Available for new reviews
            </label>
          </div>
          <div className="preference-item">
            <label style={{ display: 'block', marginBottom: '5px' }}>Maximum concurrent reviews</label>
            <select 
              value={formData.maxConcurrentReviews || 3}
              onChange={(e) => setFormData(prev => ({ ...prev, maxConcurrentReviews: parseInt(e.target.value) }))}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Biography</h3>
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
              borderRadius: '4px',
              marginTop: '10px'
            }}
          />
        ) : (
          <p style={{ margin: '10px 0 0 0' }}>{user.bio || 'No bio provided'}</p>
        )}
      </section>

      <div style={{ display: 'flex', gap: '10px' }}>
        {isEditing ? (
          <>
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
          </>
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
    </div>
  );
};

export default Profile;