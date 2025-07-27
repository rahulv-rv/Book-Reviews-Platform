import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/SearchResults.css'; 

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (query) {
      fetchBooks(query);
    }
  }, [query]);

  const fetchBooks = async (query) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=30`
      );
      const items = res.data.items || [];
      const formatted = items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.[0] || 'Unknown',
        genre: item.volumeInfo.categories?.[0] || 'N/A',
        rating: item.volumeInfo.averageRating || 0,
        ratingsCount: item.volumeInfo.ratingsCount || 0,
        image: item.volumeInfo.imageLinks?.thumbnail || '',
      }));
      setBooks(formatted);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const goToDetails = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="search-results-container">
      <h2>Search Results for "{query}"</h2>
      <div className="book-list">
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          books.map((book) => (
            <div className="book-card" key={book.id} onClick={() => goToDetails(book.id)}>
              <img src={book.image} alt={book.title} />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Rating:</strong> {book.rating} ({book.ratingsCount} reviews)</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;