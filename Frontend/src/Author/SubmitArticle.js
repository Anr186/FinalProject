import React from 'react';

const SubmitArticle = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Submit Article for Review</h1>
      <p>Please fill in the details below to submit your article for review.</p>

      <div style={{ margin: '20px 0' }}>
        <h2>Article Title</h2>
        <input 
          type="text" 
          placeholder="Enter article title" 
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ margin: '20px 0' }}>
        <h2>Category</h2>
        <select style={{ width: '100%', padding: '8px' }}>
          <option>Select a category</option>
          <option>Technology</option>
          <option>Healthcare</option>
          <option>Environment</option>
        </select>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h2>Article Content</h2>
        <textarea 
          placeholder="Write your article content here..." 
          style={{ width: '100%', minHeight: '200px', padding: '8px' }}
        />
      </div>

      <div style={{ margin: '20px 0' }}>
        <h2>Featured Image</h2>
        <div style={{ 
          border: '2px dashed #ccc', 
          padding: '20px', 
          textAlign: 'center',
          borderRadius: '5px'
        }}>
          <p>Drag and drop your image here or</p>
          <button style={{ 
            background: 'none',
            border: '1px solid #0066cc',
            color: '#0066cc',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Browse Files
          </button>
        </div>
      </div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input type="checkbox" />
          <span>I confirm that this article is my original work and I have read and agree to the submission guidelines</span>
        </label>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={{ 
          padding: '10px 20px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Submit for Review
        </button>
        <button style={{ 
          padding: '10px 20px', 
          backgroundColor: '#f44336', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Save Draft
        </button>
      </div>
    </div>
  );
};

export default SubmitArticle;