import React, { useEffect, useState } from 'react';

const ArticlesManagement = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:5284/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`http://localhost:5284/articles/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete article');
      }
      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const articleToUpdate = articles.find(article => article.id === id);
      if (!articleToUpdate) throw new Error('Article not found');

      const updatedArticle = { ...articleToUpdate, status: newStatus };

      const response = await fetch(`http://localhost:5284/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedArticle),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setArticles(prev => prev.map(article =>
        article.id === id ? updatedArticle : article
      ));
    } catch (err) {
      alert(err.message);
    }
  };

  const getArticleStyle = (status) => {
    switch (status) {
      case 'cancelled': return { backgroundColor: 'rgba(255, 200, 200, 0.3)' };
      case 'submitted': return { backgroundColor: 'rgba(200, 255, 200, 0.3)' };
      case 'published': return { backgroundColor: 'rgba(200, 200, 255, 0.3)' };
      default: return {};
    }
  };

  if (loading) return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center', 
      fontSize: '18px',
      backgroundColor: '#d4d4d4',
      minHeight: '100vh'
    }}>
      Loading articles...
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
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          fontSize: '24px',
          marginBottom: '25px',
          color: '#333',
          textAlign: 'center'
        }}>
          All Articles
        </h2>

        {articles.length === 0 ? (
          <p style={{ 
            textAlign: 'center',
            fontSize: '16px',
            color: '#666'
          }}>
            No articles found.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {articles.map(article => (
              <div 
                key={article.id} 
                style={{ 
                  padding: '20px',
                  border: '1px solid #eee',
                  borderRadius: '6px',
                  ...getArticleStyle(article.status),
                  transition: 'all 0.3s ease'
                }}
              >
                <h3 style={{ 
                  margin: '0 0 10px 0',
                  fontSize: '20px',
                  color: '#222'
                }}>
                  {article.title}
                </h3>
                <p style={{ 
                  margin: '0 0 15px 0',
                  color: '#555',
                  fontSize: '16px'
                }}>
                  {article.summary || (article.content?.substring(0, 150) + '...')}
                </p>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px',
                  flexWrap: 'wrap'
                }}>
                  <div>
                    <label style={{ 
                      fontSize: '16px',
                      marginRight: '8px'
                    }}>
                      Status: 
                    </label>
                    <select
                      value={article.status || 'draft'}
                      onChange={e => handleStatusChange(article.id, e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        fontSize: '16px',
                        minWidth: '120px'
                      }}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="submitted">Submitted</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleDelete(article.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      transition: 'all 0.3s',
                      ':hover': {
                        backgroundColor: '#c82333'
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesManagement;