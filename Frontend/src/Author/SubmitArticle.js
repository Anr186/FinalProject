import React, { useState, useEffect } from 'react';

const SubmitArticle = ({ userId }) => {
  const [article, setArticle] = useState({
    title: '',
    category: '',
    content: '',
    userId: userId || null
  });

  const [wordFile, setWordFile] = useState(null);
  const [imageFile, setImageFile] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userId) {
      setArticle(prev => ({ ...prev, userId }));
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWordFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setWordFile(file);
    } else {
      setError('Please upload a valid Word document (.docx)');
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setImageFile(file);
    } else {
      setError('Please upload a valid image file (PNG or JPEG)');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const articleResponse = await fetch('http://localhost:5284/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: article.title,
          category: article.category,
          content: article.content,
          userId: article.userId,
          status: "Submitted",
          wordDocumentPath: "",
          imagePngPath: ""
        })
      });

      if (!articleResponse.ok) {
        const errorData = await articleResponse.json();
        throw new Error(errorData.message || 'Failed to submit article');
      }

      const createdArticle = await articleResponse.json();

      if (wordFile) {
        const wordFormData = new FormData();
        wordFormData.append('file', wordFile);

        const wordUploadResponse = await fetch(`http://localhost:5284/articles/${createdArticle.id}/upload-word`, {
          method: 'POST',
          body: wordFormData
        });

        if (!wordUploadResponse.ok) {
          throw new Error('Failed to upload Word document');
        }

        const wordUploadResult = await wordUploadResponse.json();
        
        let imageUploadResult = null;
        if (imageFile) {
          const imageFormData = new FormData();
          imageFormData.append('file', imageFile);

          const imageUploadResponse = await fetch(`http://localhost:5284/articles/${createdArticle.id}/upload-image`, {
            method: 'POST',
            body: imageFormData
          });

          if (!imageUploadResponse.ok) {
            throw new Error('Failed to upload image');
          }

          imageUploadResult = await imageUploadResponse.json();
        }
        await fetch(`http://localhost:5284/articles/${createdArticle.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            wordDocumentPath: wordUploadResult.filePath,
            imagePngPath: imageUploadResult?.filePath || "",
            title: article.title,
            category: article.category,
            content: article.content,
            userId: article.userId,
            status: "Submitted"
          })
        });
      }

      setSuccess(true);
      setArticle({
        title: '',
        category: '',
        content: '',
        userId: userId || null
      });
      setWordFile(null);
      setImageFile(null);
      document.getElementById('wordFile').value = '';
      document.getElementById('imageFile').value = '';
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '30px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ 
        color: '#2c3e50',
        marginBottom: '25px',
        textAlign: 'center'
      }}>Submit Article for Review</h1>
      
      {success && (
        <div style={{ 
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '10px' }}>✓</span>
          Article submitted successfully!
        </div>
      )}
      
      {error && (
        <div style={{ 
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '10px' }}>⚠️</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#2c3e50'
          }}>
            Article Title
          </label>
          <input
            type="text"
            name="title"
            value={article.title}
            onChange={handleChange}
            placeholder="Enter article title"
            style={{ 
              width: '100%', 
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#2c3e50'
          }}>
            Category
          </label>
          <select
            name="category"
            value={article.category}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              backgroundColor: '#fff'
            }}
            required
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Environment">Environment</option>
            <option value="Science">Science</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#2c3e50'
          }}>
            Article Content
          </label>
          <textarea
            name="content"
            value={article.content}
            onChange={handleChange}
            placeholder="Write your article content here..."
            style={{ 
              width: '100%', 
              minHeight: '200px', 
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical'
            }}
            required
          />
        </div>

        <div style={{ 
          marginBottom: '25px',
          border: '2px dashed #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          transition: 'all 0.3s ease'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '12px',
            fontWeight: '600',
            color: '#2c3e50',
            fontSize: '16px'
          }}>
            Upload Word Document
          </label>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#e3f2fd',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '15px'
            }}>
              <svg 
                width="30" 
                height="30" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#3498db" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            
            <label htmlFor="wordFile" style={{
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'background-color 0.2s'
            }}>
              Choose File
            </label>
            
            <input
              id="wordFile"
              type="file"
              accept=".docx"
              onChange={handleWordFileChange}
              style={{ 
                width: '0.1px',
                height: '0.1px',
                opacity: 0,
                overflow: 'hidden',
                position: 'absolute',
                zIndex: -1
              }}
            />
            
            {wordFile ? (
              <div style={{ 
                marginTop: '15px',
                color: '#28a745',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                <span style={{ marginRight: '8px' }}>✓</span>
                Selected: {wordFile.name}
              </div>
            ) : (
              <p style={{ 
                marginTop: '15px',
                color: '#6c757d',
                fontSize: '14px',
                marginBottom: '0'
              }}>
              </p>
            )}
            
            <p style={{ 
              marginTop: '5px',
              color: '#adb5bd',
              fontSize: '12px'
            }}>
              Only .docx files accepted
            </p>
          </div>
        </div>

        <div style={{ 
          marginBottom: '25px',
          border: '2px dashed #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          transition: 'all 0.3s ease'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '12px',
            fontWeight: '600',
            color: '#2c3e50',
            fontSize: '16px'
          }}>
            Upload Article Image (PNG/JPEG)
          </label>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#e3f2fd',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '15px'
            }}>
              <svg 
                width="30" 
                height="30" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#3498db" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            
            <label htmlFor="imageFile" style={{
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'background-color 0.2s'
            }}>
              Choose Image
            </label>
            
            <input
              id="imageFile"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageFileChange}
              style={{ 
                width: '0.1px',
                height: '0.1px',
                opacity: 0,
                overflow: 'hidden',
                position: 'absolute',
                zIndex: -1
              }}
            />
            
            {imageFile ? (
              <div style={{ 
                marginTop: '15px',
                color: '#28a745',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                <span style={{ marginRight: '8px' }}>✓</span>
                Selected: {imageFile.name}
              </div>
            ) : (
              <p style={{ 
                marginTop: '15px',
                color: '#6c757d',
                fontSize: '14px',
                marginBottom: '0'
              }}>
              </p>
            )}
            
            <p style={{ 
              marginTop: '5px',
              color: '#adb5bd',
              fontSize: '12px'
            }}>
              Only PNG or JPEG images accepted
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            cursor: 'pointer'
          }}>
            <input 
              type="checkbox" 
              required 
              style={{ 
                width: '18px',
                height: '18px',
                cursor: 'pointer'
              }} 
            />
            <span style={{ color: '#495057' }}>
              I confirm this is my original work and I agree to the submission guidelines
            </span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
          <button
            type="submit"
            disabled={isSubmitting || !article.userId}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: article.userId ? 'pointer' : 'not-allowed',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background-color 0.2s',
              opacity: isSubmitting ? 0.7 : 1
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
                    display: 'inline-block'
                  }} />
                </span>
                Submitting...
              </>
            ) : 'Submit for Review'}
          </button>
        </div>
      </form>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SubmitArticle;