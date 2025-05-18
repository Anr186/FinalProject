import React from 'react';

const Profile = () => {
  return (
    <div className="profile-page">
      <section className="personal-info-section">
        <h3>Personal Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Full Name</label>
            <p>John Smith</p>
          </div>
          <div className="info-item">
            <label>Email</label>
            <p>john.smith@university.edu</p>
          </div>
          <div className="info-item">
            <label>Institution</label>
            <p>University of Science</p>
          </div>
          <div className="info-item">
            <label>Field of Expertise</label>
            <p>Computer Science</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h3>Review Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">12</span>
            <span className="stat-label">Total Reviews</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">9</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </section>

      <section className="preferences-section">
        <h3>Review Preferences</h3>
        <div className="preference-item">
          <label>
            <input type="checkbox" defaultChecked /> Available for new reviews
          </label>
        </div>
        <div className="preference-item">
          <label>Maximum concurrent reviews</label>
          <select defaultValue="3">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </section>
    </div>
  );
};

export default Profile;