import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SubjectPage.css';
import StarRating from '../Components/StartRating';

function SubjectPage() {
  const { subject } = useParams();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=30`
        );
        const data = res.data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.[0] || 'Unknown',
        genre: item.volumeInfo.categories?.[0] || subject,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
        rating: item.volumeInfo.averageRating || '0',
        ratingCount: item.volumeInfo.ratingsCount || 0,
        mrp: Math.floor(Math.random() * 500) + 499,
        price: Math.floor(Math.random() * 300) + 199,
      }));
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch subject books:", error);
      }
    };

    fetchBooks();
  }, [subject]);

  return (
    <div className="subject-page">
      <h2>{subject.toUpperCase()} Books</h2>
      <div className="subject-book-list">
        {books.map((book) => (
          <div
            key={book.id}
            className="subject-book-card"
            onClick={() => navigate(`/book/${book.id}`)}
          >
            <img src={book.thumbnail} alt={book.title} className="book-img" />
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <p className="genre">{book.genre}</p>
              <div className="rating">
                <StarRating
                  rating={book.rating}
                  ratingCount={book.ratingCount}
                />
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <p className="price" style={{display:"inline-block"}}>
                  ₹{book.price}
                  <span className="mrp"> ₹{book.mrp}</span>
                  <span className="discount"> ({Math.floor(((book.mrp - book.price) / book.mrp) * 100)}% off)</span>
                </p>
                <Link className='view-details' to="/book/:id">View Details</Link>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubjectPage;
