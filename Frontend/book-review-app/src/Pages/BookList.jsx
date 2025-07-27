import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../Styles/BookList.css';
import { useNavigate } from 'react-router-dom';
import StarRating from '../Components/StartRating';

const subjects = ['fiction', 'science', 'drama', 'technology', 'fantasy'];

function BookList() {
  const [booksBySubject, setBooksBySubject] = useState({});
  const scrollRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetched = await Promise.all(
          subjects.map(async (subject) => {
            const res = await axios.get(
              `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=30`
            );
            const books = res.data.items.map((item) => ({
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
            return { [subject]: books };
          })
        );

        const booksObject = fetched.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setBooksBySubject(booksObject);
      } catch (err) {
        console.error("Error loading books:", err);
      }
    };

    fetchBooks();
  }, []);

  const scroll = (subject, direction) => {
    const container = scrollRefs.current[subject];
    const amount = 300; // px to scroll
    if (container) {
      container.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="book-list-container">
      <h1 className="hero-title">
        Discover Top-Rated <span>Books</span> You'll Love 📚
      </h1>


      {subjects.map((subject) => (
        <div key={subject} className="subject-section">
          <div className="subject-header">
            <h2>{subject.toUpperCase()} 📚</h2>
            <div className="subject-controls">
              <button onClick={() => scroll(subject, 'left')}>&lt;</button>
              <button onClick={() => scroll(subject, 'right')}>&gt;</button>
              <button onClick={() => navigate(`/subject/${subject}`)}>View All</button>
            </div>
          </div>

          <div
            className="book-carousel"
            ref={(el) => (scrollRefs.current[subject] = el)}
          >
            {(booksBySubject[subject] || []).slice(0, 7).map((book) => (
              <div className="book-card" key={book.id}>
                {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
                <h3>{book.title}</h3>
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
                <button onClick={() => navigate(`/book/${book.id}`)}>View Details</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
