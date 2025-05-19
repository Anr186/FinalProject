import React, { useState, useEffect } from 'react';

const ReviewArticles = ({ userId }) => {
  const [articles, setArticles] = useState([]);
  const [userInfo, setUserInfo] = useState({ fullName: '', specialization: '' });
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
        setUserInfo({ fullName: userData.fullName, specialization: userData.specialization });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticlesAndUser();
  }, [userId]);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>{userInfo.fullName || 'User'}</h1>
      <p style={{ color: '#666' }}>{userInfo.specialization || 'Writer'}</p>

      <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Articles Under Review</h2>

      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((article) => (
          <div
            key={article.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '5px',
              padding: '15px',
              marginBottom: '15px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" style={{ marginRight: '10px' }} />
              <h3 style={{ margin: 0 }}>{article.title}</h3>
            </div>
            <p style={{ marginLeft: '25px', color: '#666' }}>by {userInfo.fullName}</p>
            <div style={{ marginLeft: '25px', display: 'flex', gap: '15px' }}>
              <span style={{ color: 'green' }}>
                ✓ Submitted: {new Date(article.submittedDate).toLocaleDateString()}
              </span>
              <span>{article.category}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewArticles;
