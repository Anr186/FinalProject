import React from 'react';

const CompletedReviews = () => {
  const completedReviews = [
    {
      id: 1,
      title: "Artificial Intelligence in Education",
      authors: "David Wilson, Emma Brown",
      date: "Completed: Apr 20, 2025",
      score: 4,
      decision: "Accept with Minor Revisions"
    },
    {
      id: 2,
      title: "Blockchain Technologies in Supply Chain",
      authors: "Robert Chang, Lisa Martinez",
      date: "Completed: Mar 15, 2025",
      score: 3,
      decision: "Major Revisions Required"
    },
    {
      id: 3,
      title: "Neural Networks in Image Processing",
      authors: "James Anderson, Maria Garcia",
      date: "Completed: Feb 28, 2025",
      score: 5,
      decision: "Accept as is"
    }
  ];

  const renderStars = (count) => {
    return (
      <span className="stars">
        {'★'.repeat(count)}{'☆'.repeat(5 - count)}
      </span>
    );
  };

  return (
    <div className="completed-reviews-page">
      <h3>Completed Reviews</h3>
      {completedReviews.map(review => (
        <div key={review.id} className="review-card completed-card">
          <h4>{review.title}</h4>
          <p className="authors">{review.authors}</p>
          <p className="date">{review.date}</p>
          <div className="review-score">
            <span>Review Score:</span>
            {renderStars(review.score)}
          </div>
          <p className="decision">Decision: {review.decision}</p>
          <button className="view-btn">View Full Review</button>
        </div>
      ))}
    </div>
  );
};

export default CompletedReviews;