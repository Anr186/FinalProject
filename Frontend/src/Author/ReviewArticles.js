import React from 'react';

const ReviewArticles= () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>John Doe</h1>
      <p style={{ color: '#666' }}>Technology Writer</p>

      <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Articles Under Review</h2>

      {[
        { 
          title: "Machine Learning Advances in 2025", 
          author: "Sarah Johnson", 
          date: "May 4, 2025", 
          category: "Technology" 
        },
        { 
          title: "Blockchain in Healthcare", 
          author: "Michael Chen", 
          date: "May 3, 2025", 
          category: "Healthcare" 
        },
        { 
          title: "Sustainable Energy Solutions", 
          author: "Emma Watson", 
          date: "May 2, 2025", 
          category: "Environment" 
        }
      ].map((article, index) => (
        <div key={index} style={{ 
          border: '1px solid #ddd', 
          borderRadius: '5px', 
          padding: '15px', 
          marginBottom: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" style={{ marginRight: '10px' }} />
            <h3 style={{ margin: '0' }}>{article.title}</h3>
          </div>
          <p style={{ marginLeft: '25px', color: '#666' }}>by {article.author}</p>
          <div style={{ marginLeft: '25px', display: 'flex', gap: '15px' }}>
            <span style={{ color: 'green' }}>✓ Submitted: {article.date}</span>
            <span>{article.category}</span>
          </div>
        </div>
      ))}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '15px' }}>
          <h3>All Articles</h3>
          <input 
            type="text" 
            placeholder="Search articles..." 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '15px' }}>
          <h3>Reading Review</h3>
          <button style={{ 
            background: 'none', 
            border: 'none', 
            color: '#0066cc', 
            cursor: 'pointer',
            padding: 0
          }}>
            View Details
          </button>
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '15px' }}>
          <h3>In Progress</h3>
          <button style={{ 
            background: 'none', 
            border: 'none', 
            color: '#0066cc', 
            cursor: 'pointer',
            padding: 0
          }}>
            View Details
          </button>
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '15px' }}>
          <h3>Reviewed</h3>
          <button style={{ 
            background: 'none', 
            border: 'none', 
            color: '#0066cc', 
            cursor: 'pointer',
            padding: 0
          }}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewArticles;