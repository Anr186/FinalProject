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
      method: 'PATCH', // 
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


  if (loading) return <div style={{ padding: '20px' }}>Loading articles...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Articles</h2>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {articles.map(article => (
            <li key={article.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <h3>{article.title}</h3>
              <p>{article.summary || (article.content?.substring(0, 100) + '...')}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label>
                  Status: 
                  <select
                    value={article.status || 'draft'}
                    onChange={e => handleStatusChange(article.id, e.target.value)}
                    style={{ marginLeft: '8px' }}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                    <option value="canselled">Canselled</option>
                    <option value="submitted">Submitted</option>
                  </select>
                </label>

                <button
                  onClick={() => handleDelete(article.id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticlesManagement;
