import React, { useState, useEffect } from 'react';

const ReviewForm = ({ article, reviewerId, authorId, onClose, onSubmitSuccess }) => {
  const [review, setReview] = useState({
    articleId: article.id,
    reviewerId,
    authorId: authorId.toString(),
    rating: 0,
    recommendation: '',
    originality: '',
    presentationQuality: '',
    commentsToAuthors: '',
    status: 'Pending',
    attachments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5284/recenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit review');
      }

      const existingArticleResponse = await fetch(`http://localhost:5284/articles/${article.id}`);
      if (!existingArticleResponse.ok) {
        const data = await existingArticleResponse.json();
        throw new Error(data.message || 'Failed to fetch current article');
      }

      const existingArticle = await existingArticleResponse.json();

      const articleUpdateResponse = await fetch(`http://localhost:5284/articles/${article.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...existingArticle, status: 'submitted' }),
      });

      if (!articleUpdateResponse.ok) {
        const data = await articleUpdateResponse.json();
        throw new Error(data.message || 'Failed to update article status');
      }

      setSuccess(true);
      onSubmitSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleDownload = (filePath) => {
  if (!filePath) return;
  
  const fullPath = filePath.startsWith('http') ? filePath : 
                  `http://localhost:5284${filePath.startsWith('/') ? filePath : `/${filePath}`}`;
  
  const link = document.createElement('a');
  link.href = fullPath;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.download = filePath.split('/').pop() || 'download';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        opacity: 0,
        animation: 'fadeIn 0.3s ease-out forwards',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '650px',
          padding: '30px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          transform: 'translateY(20px)',
          animation: 'slideUp 0.3s ease-out forwards',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid #e0e0e0',
        }}
      >
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(20px); }
              to { transform: translateY(0); }
            }
          `}
        </style>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ 
            margin: 0,
            color: '#2c3e50',
            fontSize: '24px',
            fontWeight: '600',
          }}>
            Review: "{article.title}"
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#7f8c8d',
              padding: '5px',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              ':hover': {
                backgroundColor: '#f5f5f5',
                color: '#2c3e50',
              }
            }}
          >
            &times;
          </button>
        </div>

        <div style={{ 
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          borderLeft: '4px solid #3498db',
        }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: '500', color: '#2c3e50' }}>
            <strong>Author:</strong> {article.user?.fullName || 'Unknown'}
          </p>
          <p style={{ 
            color: '#7f8c8d',
            fontStyle: 'italic',
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.5',
          }}>
            {article.summary || article.content?.slice(0, 150) + '...'}
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          borderLeft: '4px solid #2ecc71',
        }}>
          <h4 style={{ 
            margin: '0 0 10px 0',
            color: '#2c3e50',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Article Attachments
          </h4>

          {article.wordDocumentPath && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              backgroundColor: 'white',
              borderRadius: '6px',
              marginBottom: '10px',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#2b5797" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ marginRight: '10px' }}
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span style={{ color: '#2c3e50' }}>
                  {article.wordDocumentPath.split('/').pop()}
                </span>
              </div>
              <button
                onClick={() => handleDownload(article.wordDocumentPath)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#2b5797',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.2s',
                  ':hover': {
                    backgroundColor: '#1e3f72'
                  }
                }}
              >
                Download
              </button>
            </div>
          )}

          {article.imagePngPath && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              backgroundColor: 'white',
              borderRadius: '6px',
              marginBottom: '10px',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#d35400" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ marginRight: '10px' }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <span style={{ color: '#2c3e50' }}>
                  {article.imagePngPath.split('/').pop()}
                </span>
              </div>
              <button
                onClick={() => handleDownload(article.imagePngPath)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#d35400',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.2s',
                  ':hover': {
                    backgroundColor: '#a04000'
                  }
                }}
              >
                Download
              </button>
            </div>
          )}

          {!article.wordDocumentPath && !article.imagePngPath && (
            <p style={{ 
              color: '#7f8c8d',
              fontStyle: 'italic',
              margin: 0,
              fontSize: '14px'
            }}>
              No attachments available for this article
            </p>
          )}
        </div>

        {success && (
          <div style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ marginRight: '10px', fontSize: '18px' }}>✓</span>
            Review submitted successfully!
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ marginRight: '10px', fontSize: '18px' }}>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#2c3e50',
            }}>
              Rating (1-5)
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReview(prev => ({ ...prev, rating: star }))}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: review.rating === star ? '2px solid #3498db' : '2px solid #e0e0e0',
                    backgroundColor: review.rating >= star ? '#ffc107' : 'white',
                    color: review.rating >= star ? 'white' : '#7f8c8d',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  {star}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#2c3e50',
            }}>
              Recommendation
            </label>
            <select
              name="recommendation"
              value={review.recommendation}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#f8f9fa',
                fontSize: '14px',
                transition: 'border 0.2s',
                ':focus': {
                  outline: 'none',
                  borderColor: '#3498db',
                  boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)',
                }
              }}
            >
              <option value="">Select recommendation</option>
              <option value="Accept as is">Accept as is</option>
              <option value="Accept with minor revisions">Accept with minor revisions</option>
              <option value="Major revisions required">Major revisions required</option>
              <option value="Reject">Reject</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#2c3e50',
            }}>
              Originality
            </label>
            <textarea
              name="originality"
              value={review.originality}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#f8f9fa',
                fontSize: '14px',
                transition: 'border 0.2s',
                ':focus': {
                  outline: 'none',
                  borderColor: '#3498db',
                  boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)',
                }
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#2c3e50',
            }}>
              Presentation Quality
            </label>
            <textarea
              name="presentationQuality"
              value={review.presentationQuality}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#f8f9fa',
                fontSize: '14px',
                transition: 'border 0.2s',
                ':focus': {
                  outline: 'none',
                  borderColor: '#3498db',
                  boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)',
                }
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#2c3e50',
            }}>
              Comments to Authors
            </label>
            <textarea
              name="commentsToAuthors"
              value={review.commentsToAuthors}
              onChange={handleChange}
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#f8f9fa',
                fontSize: '14px',
                transition: 'border 0.2s',
                ':focus': {
                  outline: 'none',
                  borderColor: '#3498db',
                  boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)',
                }
              }}
              placeholder="Provide constructive feedback for the authors..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                padding: '12px 24px',
                backgroundColor: '#f8f9fa',
                color: '#2c3e50',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.2s',
                ':hover': {
                  backgroundColor: '#e9ecef',
                },
                ':disabled': {
                  opacity: 0.6,
                  cursor: 'not-allowed',
                }
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '12px 24px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.2s',
                ':hover': {
                  backgroundColor: '#2980b9',
                },
                ':disabled': {
                  backgroundColor: '#95a5a6',
                  cursor: 'not-allowed',
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={{ display: 'inline-block', marginRight: '8px' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      display: 'inline-block',
                    }} />
                  </span>
                  Submitting...
                </>
              ) : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InProgressReviews = ({ reviewerId }) => {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewFormArticle, setReviewFormArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, usersRes] = await Promise.all([
          fetch('http://localhost:5284/articles'),
          fetch('http://localhost:5284/users'),
        ]);
        if (!articlesRes.ok || !usersRes.ok) throw new Error('Failed to load data');

        const articlesData = await articlesRes.json();
        const usersData = await usersRes.json();

        setArticles(articlesData);
        setUsers(usersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleReject = (articleId) => {
    if (!window.confirm('Are you sure you want to reject this article?')) return;
    setArticles(prev => prev.filter(a => a.id !== articleId));
  };

  const handleAccept = (article) => {
    setReviewFormArticle(article);
  };

  const handleCloseReviewForm = () => {
    setReviewFormArticle(null);
  };

  const handleReviewSubmitSuccess = () => {
    alert('Review submitted successfully');
    setReviewFormArticle(null);
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.fullName : 'Unknown';
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Articles for Review</h3>
      {articles.length === 0 && <p style={{ color: '#7f8c8d' }}>No articles available.</p>}
      
      <div style={{ display: 'grid', gap: '20px' }}>
        {articles.map(article => (
          <div 
            key={article.id} 
            style={{ 
              padding: '20px',
              border: '2px solid #3498db',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
              }
            }}
          >
            <h4 style={{ 
              margin: '0 0 10px 0',
              color: '#2c3e50',
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>
              {article.title}
            </h4>
            
            <p style={{ 
              margin: '0 0 8px 0',
              color: '#34495e',
              fontWeight: '500'
            }}>
              Author: <span style={{ color: '#7f8c8d' }}>{getUserName(article.userId)}</span> 
            </p>

            <p style={{ 
              margin: '0 0 8px 0',
              color: '#34495e',
              fontWeight: '500'
            }}>
              Category:<span style={{ color: '#7f8c8d' }}> {article.category}</span> 
            </p>
            
            <p style={{ 
              color: '#7f8c8d',
              marginBottom: '15px',
              lineHeight: '1.5'
            }}>
              {article.summary || article.content?.slice(0, 150) + '...'}
            </p>

            <div style={{ 
              display: 'flex', 
              gap: '10px',
              marginTop: '15px'
            }}>
              <button
                onClick={() => handleAccept(article)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#2ecc71',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'background-color 0.2s',
                  ':hover': {
                    backgroundColor: '#27ae60'
                  }
                }}
              >
                Accept
              </button>

              <button
                onClick={() => handleReject(article.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'background-color 0.2s',
                  ':hover': {
                    backgroundColor: '#c0392b'
                  }
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {reviewFormArticle && (
        <ReviewForm
          article={reviewFormArticle}
          reviewerId={reviewerId}
          authorId={reviewFormArticle.userId}
          onClose={handleCloseReviewForm}
          onSubmitSuccess={handleReviewSubmitSuccess}
        />
      )}
    </div>
  );
};

export default InProgressReviews;