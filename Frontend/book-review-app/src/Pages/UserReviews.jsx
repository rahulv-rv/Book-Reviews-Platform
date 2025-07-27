import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/UserReviews.css'; // You can style this later

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:1919/api/reviews/user/${email}`)
        .then(res => setReviews(res.data))
        .catch(err => console.error('Failed to fetch reviews:', err));
    }
  }, [email]);

  return (
    <div className="profile-page">
      <h2>My Reviews</h2>
      {reviews.length === 0 ? (
        <p>You haven't submitted any reviews yet.</p>
      ) : (
        <div className="review-list">
          {reviews.map((rev, index) => (
            <div className="review-card" key={index}>
              <h3>{rev.title}</h3>
              <p style={{ fontStyle: 'italic', color: '#555' }}>
                Reviewed Book: <strong>{rev.title}</strong> by <strong>{rev.author}</strong>
              </p>
              <p><strong>Author:</strong> {rev.author}</p>
              <p><strong>Rating:</strong> {rev.rating} / 5</p>
              <p><strong>Review:</strong> {rev.reviewText}</p>
              <p><strong>Genres:</strong> {rev.genre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviews;
