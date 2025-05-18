import React from 'react';

const InProgressReviews = () => {
  const newRequests = [
    {
      id: 1,
      title: "Advanced Neural Networks in Image Processing",
      authors: "Mark Williams, Lisa Chen",
      abstract: "This paper presents novel approaches in neural network architectures for advanced image processing tasks...",
      meta: "⏱️ Expected time: 4-5 hours  25 pages",
      date: "Request: May 1, 2025"
    }
  ];

  const inProgress = [
    {
      id: 2,
      title: "Machine Learning Applications in Healthcare",
      authors: "Sarah Johnson, Michael Chen",
      progress: 60,
      due: "Due: May 15, 2025 (12 days remaining)"
    },
    {
      id: 3,
      title: "Blockchain in Supply Chain Management",
      authors: "Robert Lee, Anna Wang",
      progress: 30,
      due: "Due: May 20, 2025 (17 days remaining)"
    }
  ];

  return (
    <div className="in-progress-page">
      <section className="new-requests-section">
        <h3>New Review Requests</h3>
        {newRequests.map(request => (
          <div key={request.id} className="review-card request-card">
            <h4>{request.title}</h4>
            <p className="authors">{request.authors}</p>
            <p className="abstract">{request.abstract}</p>
            <p className="meta">{request.meta}</p>
            <p className="date">{request.date}</p>
            <div className="action-buttons">
              <button className="decline-btn">Decline</button>
              <button className="accept-btn">Accept Review</button>
            </div>
          </div>
        ))}
      </section>

      <section className="current-reviews-section">
        <h3>In Progress Reviews</h3>
        {inProgress.map(review => (
          <div key={review.id} className="review-card progress-card">
            <h4>{review.title}</h4>
            <p className="authors">{review.authors}</p>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${review.progress}%` }}></div>
            </div>
            <p className="progress-text">Progress: {review.progress}%</p>
            <p className="due-date">{review.due}</p>
            <button className="continue-btn">Continue Review</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default InProgressReviews;