import React, { useEffect, useState } from 'react';

const CompletedReviews = () => {
  const [completedReviews, setCompletedReviews] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5284/recenses').then(res => {
        if (!res.ok) throw new Error('Ошибка загрузки рецензий');
        return res.json();
      }),
      fetch('http://localhost:5284/articles').then(res => {
        if (!res.ok) throw new Error('Ошибка загрузки статей');
        return res.json();
      }),
    ])
    .then(([reviewsData, articlesData]) => {
      setCompletedReviews(reviewsData);
      setArticles(articlesData);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  const renderStars = (count) => (
    <span className="stars" style={{color: '#f5a623'}}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  );

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  const getArticleTitle = (articleId) => {
    const article = articles.find(a => a.id === articleId);
    return article ? article.title : 'Unknown Article';
  };

  return (
    <div className="completed-reviews-page">
      <h3>Completed Reviews</h3>
      {completedReviews.length === 0 && <p>No completed reviews found.</p>}
      {completedReviews.map(review => (
        <div key={review.id} className="review-card completed-card" style={{border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem'}}>
          <p>
            <strong style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {getArticleTitle(review.articleId)}
            </strong>
          </p>
          <p><strong>Rating:</strong> {renderStars(review.rating)}</p>
          <p><strong>Recommendation:</strong> {review.recommendation}</p>
          <p><strong>Originality:</strong> {review.originality}</p>
          <p><strong>Presentation Quality:</strong> {review.presentationQuality}</p>
          <p><strong>Comments to Authors:</strong> {review.commentsToAuthors}</p>
          {/* <p><strong>Status:</strong> {review.status}</p> */}
          <p><strong>Created At:</strong> {new Date(review.createdAt).toLocaleString()}</p>
          <button className="view-btn">View Full Review</button>
        </div>
      ))}
    </div>
  );
};

export default CompletedReviews;
