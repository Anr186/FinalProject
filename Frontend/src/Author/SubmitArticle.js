import React, { useState, useEffect } from 'react';

const SubmitArticle = ({ userId }) => {
  const [article, setArticle] = useState({
    title: '',
    category: '',
    content: ''
  });

  useEffect(() => {
    if (userId) {
      setArticle(prev => ({ ...prev, userId }));
    }
  }, [userId]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5284/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: article.title,
          category: article.category,
          content: article.content,
          userId: article.userId,
          status: "Submitted"
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit article');
      }

      setSuccess(true);
      setArticle({
        title: '',
        category: '',
        content: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Submit Article for Review</h1>
      {success && <div style={{ color: 'green', margin: '10px 0' }}>Article submitted successfully!</div>}
      {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ margin: '20px 0' }}>
          <h2>Article Title</h2>
          <input
            type="text"
            name="title"
            value={article.title}
            onChange={handleChange}
            placeholder="Enter article title"
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ margin: '20px 0' }}>
          <h2>Category</h2>
          <select
            name="category"
            value={article.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            required
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Environment">Environment</option>
          </select>
        </div>
        <div style={{ margin: '20px 0' }}>
          <h2>Article Content</h2>
          <textarea
            name="content"
            value={article.content}
            onChange={handleChange}
            placeholder="Write your article content here..."
            style={{ width: '100%', minHeight: '200px', padding: '8px' }}
            required
          />
        </div>

        <div style={{ margin: '20px 0' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" required />
            <span>I confirm this is my original work and I agree to the submission guidelines</span>
          </label>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={isSubmitting || !article.userId}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: article.userId ? 'pointer' : 'not-allowed',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitArticle;
