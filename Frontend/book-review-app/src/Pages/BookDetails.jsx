import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookDetails.css';
import StarRating from '../Components/StartRating';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = res.data.volumeInfo;

        setBook({
          title: data.title,
          author: data.authors?.[0] || 'Unknown',
          genre: data.categories?.[0] || 'General',
          thumbnail: data.imageLinks?.thumbnail || '',
          description: data.description || 'No description available.',
          rating: data.averageRating || '0',
          ratingCount: data.ratingsCount || 0,
          mrp: Math.floor(Math.random() * 500) + 499,
          price: Math.floor(Math.random() * 300) + 199,
        });
      } catch (err) {
        console.error('Error fetching book details:', err);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) return <div className="loading">Loading book details...</div>;

  return (
    <div className="book-details-container">
        <h1>{book.title}</h1>
      <div className="book-details-card">
        {book.thumbnail && <img src={book.thumbnail} alt={book.title} className="book-image" />}
        <div className="book-info">
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <div className="rating">
            <StarRating
              rating={book.rating}
              ratingCount={book.ratingCount}
            />
          </div>
          <p className="price">
            ₹{book.price}
            <span className="mrp"> ₹{book.mrp}</span>
            <span className="discount"> ({Math.floor(((book.mrp - book.price) / book.mrp) * 100)}% off)</span>
          </p>
          <p className="description">{book.description}</p>

          <div className="action-buttons">
            <button className="buy-now">Buy Now</button>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
