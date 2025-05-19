import React, { useState, useEffect } from 'react';
import userImage from '../files/king_cat.png';

const ReviewArticles = ({ userId }) => {
  const [articles, setArticles] = useState([]);
  const [userInfo, setUserInfo] = useState({ fullName: '', specialization: '', joinDate: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchArticlesAndUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const articlesResponse = await fetch(`http://localhost:5284/articles/user/${userId}`);
        if (!articlesResponse.ok) throw new Error('Failed to fetch articles');
        const articlesData = await articlesResponse.json();

        const userResponse = await fetch(`http://localhost:5284/users/${userId}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user info');
        const userData = await userResponse.json();

        setArticles(articlesData);
        setUserInfo({ 
          fullName: userData.fullName, 
          specialization: userData.specialization,
          joinDate: userData.createdAt ? new Date(userData.createdAt).getFullYear() : '2025'
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticlesAndUser();
  }, [userId]);

  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  };

  if (loading) return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20px'
    }}>
      Loading articles...
    </div>
  );

  if (error) return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'red',
      fontSize: '20px'
    }}>
      Error: {error}
    </div>
  );

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      boxSizing: 'border-box',
      fontSize: '1.1em',
      justifyContent: 'center',
      alignItems: 'flex-start',
      display:'flex',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        width: '80%',
        minHeight: '90vh',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <img 
            src={userImage} 
            alt="User" 
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              marginRight: '25px',
              objectFit: 'cover',
              border: '3px solid #e0e0e0'
            }}
          />
          <div>
            <h1 style={{ margin: '0', fontSize: '38px', color: '#333333' }}>
              {userInfo.fullName || 'User'}
            </h1>
            <p style={{ 
              margin: '5px 0 0',
              color: '#666666',
              fontSize: '22px'
            }}>
              {userInfo.specialization || 'Writer'} | Member since {userInfo.joinDate}
            </p>
          </div>
        </div>

        <h2 style={{
          fontSize: '30px',
          color: '#333333',
          marginBottom: '25px',
          paddingBottom: '10px',
          borderBottom: '2px solid #1976d2',
          display: 'inline-block'
        }}>
          Articles Under Review
        </h2>

        {articles.length === 0 ? (
          <div style={cardStyle}>
            <p style={{ fontSize: '20px', color: '#666' }}>No articles found.</p>
          </div>
        ) : (
          articles.map((article, index) => (
            <div 
              key={article.id}
              style={cardStyle}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input 
                  type="checkbox" 
                  style={{ 
                    marginRight: '15px',
                    width: '20px',
                    height: '20px',
                    accentColor: '#1976d2'
                  }} 
                />
                <h3 style={{ 
                  margin: '0',
                  fontSize: '24px',
                  color: '#333333'
                }}>{article.title}</h3>
              </div>
              <p style={{ 
                margin: '8px 0 0 35px',
                color: '#666666',
                fontSize: '22px'
              }}>by {userInfo.fullName || 'Author'}</p>
              
              <div style={{
                margin: '15px 0 0 35px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <span style={{ 
                  color: '#388e3c',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#388e3c'
                  }}></span>
                  Submitted: {new Date(article.submittedDate).toLocaleDateString()}
                </span>
                <span style={{
                  backgroundColor: '#f5f5f5',
                  color: '#555555',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: '500',
                  border: '1px solid #e0e0e0'
                }}>{article.category || 'Uncategorized'}</span>
              </div>
              
              {article.progress && (
                <div style={{
                  margin: '15px 0 0 35px',
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${article.progress}%`,
                    height: '100%',
                    backgroundColor: '#1976d2',
                    borderRadius: '4px'
                  }}></div>
                </div>
              )}
            </div>
          ))
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '40px'
        }}>
          {[
            { title: 'All Articles', count: articles.length, color: '#1976d2' },
            { title: 'Reading Review', count: articles.filter(a => a.status === 'reading').length, color: '#ff9800' },
            { title: 'In Progress', count: articles.filter(a => a.status === 'in_progress').length, color: '#388e3c' },
            { title: 'Reviewed', count: articles.filter(a => a.status === 'reviewed').length, color: '#7b1fa2' }
          ].map((item, index) => (
            <div key={index} style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{
                margin: '0 0 15px',
                fontSize: '22px',
                color: '#666666'
              }}>{item.title}</h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: item.color
                }}>{item.count}</span>
                <button style={{
                  background: 'none',
                  border: 'none',
                  color: '#1976d2',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '18px',
                  fontWeight: '500'
                }}>
                  View all
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1976d2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewArticles;