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

  if (!user) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#d4d4d4'
    }}>
      {/* Основное содержимое */}
      <div style={{
        flex: 1,
        maxWidth: '800px',
        width: '100%',
        margin: '20px auto',
        padding: '30px',
        backgroundColor: 'black',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderRadius: '8px'
      }}>
        {/* Заголовок с именем и специализацией */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ 
            margin: '0', 
            fontSize: '32px', 
            fontWeight: 'bold',
            color: '#333'
          }}>{user.fullName}</h1>
          <p style={{ 
            margin: '5px 0 0 0', 
            color: '#666', 
            fontSize: '18px',
            fontStyle: 'italic'
          }}>
            {user.specialization || 'No specialization'}
          </p>
        </div>

        {/* Раздел Personal Information */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#444',
            marginBottom: '15px',
            paddingBottom: '5px',
            borderBottom: '2px solid #eee'
          }}>Personal Information</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{ 
                fontWeight: 'bold',
                color: '#666',
                marginBottom: '5px'
              }}>Full Name</div>
              <div style={{ fontSize: '16px' }}>{user.fullName}</div>
            </div>
            <div>
              <div style={{ 
                fontWeight: 'bold',
                color: '#666',
                marginBottom: '5px'
              }}>Email</div>
              <div style={{ fontSize: '16px' }}>{user.email}</div>
            </div>
            <div>
              <div style={{ 
                fontWeight: 'bold',
                color: '#666',
                marginBottom: '5px'
              }}>Specialization</div>
              <div style={{ fontSize: '16px' }}>{user.specialization || 'Not specified'}</div>
            </div>
            <div>
              <div style={{ 
                fontWeight: 'bold',
                color: '#666',
                marginBottom: '5px'
              }}>Location</div>
              <div style={{ fontSize: '16px' }}>{user.location || 'Not specified'}</div>
            </div>
          </div>
        </div>

        {/* Раздел Bio */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#444',
            marginBottom: '15px',
            paddingBottom: '5px',
            borderBottom: '2px solid #eee'
          }}>Bio</h2>
          <div style={{ 
            lineHeight: '1.6',
            fontSize: '16px',
            color: '#333'
          }}>
            {user.bio || 'No bio provided'}
          </div>
        </div>

        {/* Раздел Social Links */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#444',
            marginBottom: '15px',
            paddingBottom: '5px',
            borderBottom: '2px solid #eee'
          }}>Social Links</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" disabled style={{ cursor: 'default' }} />
              <span>facebook.com/{user.fullName?.toLowerCase().replace(/\s+/g, '')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" checked disabled style={{ cursor: 'default' }} />
              <span>twitter.com/{user.fullName?.toLowerCase().replace(/\s+/g, '')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" disabled style={{ cursor: 'default' }} />
              <span>linkedin.com/in/{user.fullName?.toLowerCase().replace(/\s+/g, '')}</span>
            </div>
          </div>
        </div>

        {/* Кнопки редактирования */}
        {isEditing ? (
          <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s',
                ':hover': {
                  backgroundColor: '#45a049'
                }
              }}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              onClick={handleCancel}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s',
                ':hover': {
                  backgroundColor: '#d32f2f'
                }
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s',
              ':hover': {
                backgroundColor: '#0b7dda'
              }
            }}
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Футер */}
      <footer style={{ 
        width: '100%',
        padding: '30px 0',
        backgroundImage: 'url(./img/footer-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        marginTop: 'auto'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 0
        }}></div>

        <div style={{ 
          position: 'relative',
          zIndex: 1,
          color: 'white',
          padding: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <span style={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'default',
              transition: 'color 0.3s',
              ':hover': {
                color: 'white'
              }
            }}>Terms</span>
            <span style={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'default',
              transition: 'color 0.3s',
              ':hover': {
                color: 'white'
              }
            }}>Privacy</span>
            <span style={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'default',
              transition: 'color 0.3s',
              ':hover': {
                color: 'white'
              }
            }}>Security</span>
            
            <span style={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'default',
              transition: 'color 0.3s',
              ':hover': {
                color: 'white'
              }
            }}>Contact</span>
            <span style={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'default',
            }}>Manage cookies</span>
          </div>
          
          
        </div>
      </footer>
    </div>
  );
};

export default Profile;