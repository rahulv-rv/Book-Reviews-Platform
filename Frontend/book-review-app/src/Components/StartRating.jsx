import React from 'react';

const StarRating = ({ rating, ratingCount }) => {
  const totalStars = 5;
  const safeRating = isNaN(parseFloat(rating)) ? 0 : parseFloat(rating);
  const fullStars = Math.floor(safeRating);
  const halfStar = safeRating - fullStars >= 0.5;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ display: 'flex', color: '#FFD700', fontSize: '1rem' }}>
        {Array.from({ length: totalStars }, (_, i) => {
          if (i < fullStars) return <span key={i}>★</span>;
          if (i === fullStars && halfStar) return <span key={i}>☆</span>;
          return <span key={i}>☆</span>;
        })}
      </div>
      <span style={{ color: '#000', fontSize: '0.9rem' }}>
        ({ratingCount} ratings)
      </span>
    </div>
  );
};

export default StarRating;
