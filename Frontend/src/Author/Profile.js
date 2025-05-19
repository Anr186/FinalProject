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

  if (!user) return <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  return (
    <div style={{ 
      maxWidth: '950px', 
      margin: '40px auto', 
      padding: '40px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#2d3748',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
      border: '1px solid #f0f4f8'
    }}>
      {/* Header Section */}
      <div style={{ 
        marginBottom: '50px',
        paddingBottom: '30px',
        borderBottom: '1px solid #f0f4f8',
        position: 'relative'
      }}>
        {isEditing && (
          <div style={{
            position: 'absolute',
            top: '-2px',  // Уменьшил отступ сверху
            left: '0',
            width: '80px',  // Уменьшил ширину полоски
            height: '3px',  // Уменьшил высоту полоски
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '2px',
            transition: 'all 0.3s ease'
          }}></div>
        )}
        
        <h1 style={{ 
          margin: '0 0 15px 0', 
          fontSize: '42px', 
          fontWeight: '700',
          color: '#1a202c',
          letterSpacing: '-0.5px',
          position: 'relative',
          paddingTop: isEditing ? '10px' : '0',  // Добавил padding только при редактировании
          transition: 'padding-top 0.3s ease'
        }}>{user.fullName}</h1>
        
        <p style={{ 
          margin: '0', 
          fontSize: '22px', 
          color: '#718096',
          fontStyle: user.specialization ? 'normal' : 'italic',
          fontWeight: '400'
        }}>
          {user.specialization || 'No specialization provided'}
        </p>
      </div>

      {/* Main Content Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '40px', 
        marginBottom: '40px' 
      }}>
        {/* Full Name */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #edf2f7',
          transition: 'all 0.3s ease',
          ...(isEditing && {
            boxShadow: '0 2px 10px rgba(102, 126, 234, 0.1)',
            borderColor: '#c3dafe'
          })
        }}>
          <label style={{ 
            display: 'block', 
            fontWeight: '600', 
            marginBottom: '12px',
            fontSize: '18px',
            color: '#4a5568'
          }}>Full Name</label>
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ''}
              onChange={handleInputChange}
              style={{ 
                width: '90%', 
                padding: '14px', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                fontSize: '17px',
                transition: 'all 0.2s',
                outline: 'none',
                backgroundColor: '#ffffff',
                ':focus': {
                  borderColor: '#667eea',
                  boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                }
              }}
            />
          ) : (
            <p style={{ 
              margin: '0', 
              fontSize: '19px',
              padding: '14px 0',
              color: '#2d3748'
            }}>{user.fullName}</p>
          )}
        </div>

        {/* Email - не редактируемое поле */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #edf2f7'
        }}>
          <label style={{ 
            display: 'block', 
            fontWeight: '600', 
            marginBottom: '12px',
            fontSize: '18px',
            color: '#4a5568'
          }}>Email</label>
          <p style={{ 
            margin: '0', 
            fontSize: '19px',
            padding: '14px 0',
            color: '#4c51bf',
            wordBreak: 'break-all'
          }}>{user.email}</p>
        </div>

        {/* Specialization */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #edf2f7',
          transition: 'all 0.3s ease',
          ...(isEditing && {
            boxShadow: '0 2px 10px rgba(102, 126, 234, 0.1)',
            borderColor: '#c3dafe'
          })
        }}>
          <label style={{ 
            display: 'block', 
            fontWeight: '600', 
            marginBottom: '12px',
            fontSize: '18px',
            color: '#4a5568'
          }}>Specialization</label>
          {isEditing ? (
            <input
              type="text"
              name="specialization"
              value={formData.specialization || ''}
              onChange={handleInputChange}
              style={{ 
                width: '90%', 
                padding: '14px', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                fontSize: '17px',
                transition: 'all 0.2s',
                outline: 'none',
                backgroundColor: '#ffffff',
                ':focus': {
                  borderColor: '#667eea',
                  boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                }
              }}
            />
          ) : (
            <p style={{ 
              margin: '0', 
              fontSize: '19px',
              padding: '14px 0',
              color: '#2d3748',
              fontStyle: user.specialization ? 'normal' : 'italic'
            }}>{user.specialization || 'Not specified'}</p>
          )}
        </div>

        {/* Location */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #edf2f7',
          transition: 'all 0.3s ease',
          ...(isEditing && {
            boxShadow: '0 2px 10px rgba(102, 126, 234, 0.1)',
            borderColor: '#c3dafe'
          })
        }}>
          <label style={{ 
            display: 'block', 
            fontWeight: '600', 
            marginBottom: '12px',
            fontSize: '18px',
            color: '#4a5568'
          }}>Location</label>
          {isEditing ? (
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleInputChange}
              style={{ 
                width: '90%', 
                padding: '14px', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                fontSize: '17px',
                transition: 'all 0.2s',
                outline: 'none',
                backgroundColor: '#ffffff',
                ':focus': {
                  borderColor: '#667eea',
                  boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                }
              }}
            />
          ) : (
            <p style={{ 
              margin: '0', 
              fontSize: '19px',
              padding: '14px 0',
              color: '#2d3748',
              fontStyle: user.location ? 'normal' : 'italic'
            }}>{user.location || 'Not specified'}</p>
          )}
        </div>
      </div>

      <div style={{ 
        marginBottom: '50px',
        backgroundColor: '#f8fafc',
        padding: '30px',
        borderRadius: '12px',
        border: '1px solid #edf2f7',
        transition: 'all 0.3s ease',
        ...(isEditing && {
          boxShadow: '0 2px 10px rgba(102, 126, 234, 0.1)',
          borderColor: '#c3dafe'
        })
      }}>
        <h3 style={{ 
          margin: '0 0 20px 0',
          fontWeight: '600',
          fontSize: '24px',
          color: '#2d3748',
          display: 'flex',
          alignItems: 'center'
        }}>
          {isEditing && (
            <span style={{
              display: 'inline-block',
              width: '10px',  
              height: '20px',  
              backgroundColor: '#667eea',
              borderRadius: '2px',
              marginRight: '12px',
              transition: 'all 0.3s ease'
            }}></span>
          )}
          Biography
        </h3>
        {isEditing ? (
          <textarea
            name="bio"
            value={formData.bio || ''}
            onChange={handleInputChange}
            style={{ 
              width: '95%', 
              minHeight: '180px', 
              padding: '16px', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px',
              fontSize: '17px',
              lineHeight: '1.6',
              transition: 'all 0.2s',
              outline: 'none',
              backgroundColor: '#ffffff',
              resize: 'vertical',
              ':focus': {
                borderColor: '#667eea',
                boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
              }
            }}
          />
        ) : (
          <p style={{ 
            margin: '0', 
            fontSize: '18px',
            lineHeight: '1.7',
            color: '#4a5568',
            fontStyle: user.bio ? 'normal' : 'italic'
          }}>{user.bio || 'No bio provided'}</p>
        )}
      </div>

      <div style={{ 
        marginBottom: '50px',
        backgroundColor: '#f8fafc',
        padding: '30px',
        borderRadius: '12px',
        border: '1px solid #edf2f7'
      }}>
        <h3 style={{ 
          margin: '0 0 20px 0',
          fontWeight: '600',
          fontSize: '24px',
          color: '#2d3748',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{
            display: 'inline-block',
            width: '4px',
            height: '20px',
            backgroundColor: '#a0aec0',
            borderRadius: '2px',
            marginRight: '12px'
          }}></span>
          Social Links
        </h3>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '15px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px',
            fontSize: '18px',
            padding: '12px 15px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#fef2f2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#dc2626',
              fontSize: '20px'
            }}>👍</div>
            <span style={{ color: '#2d3748' }}>@{user.fullName?.toLowerCase().replace(/\s+/g, '')}</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px',
            fontSize: '18px',
            padding: '12px 15px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#eff6ff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563eb',
              fontSize: '20px'
            }}>📅</div>
            <span style={{ color: '#2d3748' }}>linkedin.com/in/{user.fullName?.toLowerCase().replace(/\s+/g, '')}</span>
          </div>
        </div>
      </div>

      {isEditing ? (
        <div style={{ 
          display: 'flex', 
          gap: '20px',
          justifyContent: 'flex-end',
          paddingTop: '20px',
          borderTop: '1px solid #f0f4f8',
          marginTop: '30px'
        }}>
          <button 
            onClick={handleCancel}
            style={{
              padding: '14px 28px',
              backgroundColor: '#ffffff',
              color: '#4a5568',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s',
              boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
              ':hover': {
                backgroundColor: '#f7fafc',
                borderColor: '#cbd5e0',
                transform: 'translateY(-1px)'
              }
            }}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            style={{
              padding: '14px 28px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s',
              boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)',
              ':hover': {
                backgroundColor: '#5a67d8',
                transform: 'translateY(-1px)'
              },
              ':disabled': {
                opacity: '0.7',
                cursor: 'not-allowed',
                transform: 'none'
              }
            }}
          >
            {isSaving ? (
              <>
                <span style={{ display: 'inline-block', marginRight: '8px' }}>🌀</span>
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      ) : (
        <div style={{ 
          textAlign: 'right',
          paddingTop: '20px',
          borderTop: '1px solid #f0f4f8',
          marginTop: '30px'
        }}>
          <button 
            onClick={() => setIsEditing(true)}
            style={{
              padding: '14px 28px',
              backgroundColor: '#ffffff',
              color: '#667eea',
              border: '1px solid #667eea',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s',
              boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
              ':hover': {
                backgroundColor: '#f0f4ff',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px rgba(102, 126, 234, 0.1)'
              }
            }}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;