import React from 'react';

const Profile = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ marginBottom: '5px' }}>John Doe</h1>
      <p style={{ color: '#666', marginTop: '0' }}>Technology Writer</p>

      <div style={{ margin: '20px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Full Name</label>
            <p>John Doe</p>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Email</label>
            <p>john@example.com</p>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Specialization</label>
            <p>Technology</p>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Location</label>
            <p>New York, USA</p>
          </div>
        </div>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Bio</h3>
        <p>Technology writer with 5+ years of experience in software development and AI.</p>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Social Links</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>👍️ @johndoe</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>📅 LinkedIn.com/in/johndoe</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Save Changes
        </button>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#f44336', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Profile;