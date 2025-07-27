// ...your existing imports
import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/AddReview.css';

const AddReview = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const userEmail = localStorage.getItem('email');

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`
      );
      const books = res.data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.[0] || 'Unknown',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
        genre: item.volumeInfo.categories?.[0] || 'Unknown',
      }));
      setResults(books);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const handleSelect = (book) => {
    setSelectedBook(book);
    setResults([]); // hide search results after selection
  };

  const handleSubmit = async () => {
    if (!selectedBook || !selectedRating  || !reviewText) {
      alert('Please fill all required fields!');
      return;
    }

    const reviewPayload = {
      bookId: selectedBook.id,
      title: selectedBook.title,
      author: selectedBook.author,
      genre: selectedGenres.join(', '), // Sending as comma-separated string
      rating: selectedRating,
      reviewText,
      userEmail,
    };

    try {
      await axios.post('http://localhost:1919/api/reviews', reviewPayload);
      // Optionally: reset state here
      alert('Review submitted successfully!');
    } catch (err) {
      alert('Something went wrong. Please try again.'+err);
    }
  };

  return (
    <div className="add-review-container">
      <h2>Add a Review</h2>

      {!selectedBook ? (
        <>
          <div className="search-section">
            <input
              type="text"
              placeholder="Search book by title, author, or genre"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className="search-results">
            {results.map((book) => (
              <div className="book-result" key={book.id}>
                {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
                <div>
                  <h4>{book.title}</h4>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Genre:</strong> {book.genre}</p>
                  <button onClick={() => handleSelect(book)}>Select</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="selected-book-summary">
          <h3>Selected Book:</h3>
          <img src={selectedBook.thumbnail} alt={selectedBook.title} />
          <h4>{selectedBook.title}</h4>
          <p><strong>Author:</strong> {selectedBook.author}</p>
          <p><strong>Genre:</strong> {selectedBook.genre}</p>

          {/* ✅ Review Form Starts Here */}
          <form onSubmit={handleSubmit} className="review-form">
            <label>Rating:</label>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={star <= selectedRating ? 'filled' : ''}
                        onClick={() => setSelectedRating(star)}
                    >
                        ★
                    </span>
                    ))}
                </div>

                <label>Write your review:</label>
                <textarea
                    rows="5"
                    placeholder="What did you think about the book?"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />

                <label>Tags / Genres:</label>
                <div className="genre-checkboxes">
                {[
                    'Fiction', 'Mystery', 'Biography', 'Fantasy',
                    'Science', 'Romance', 'Thriller', 'Philosophy'
                ].map((genre) => (
                    <label key={genre} className="checkbox-label">
                    <input
                        type="checkbox"
                        value={genre}
                        checked={selectedGenres.includes(genre)}
                        onChange={(e) => {
                        if (e.target.checked) {
                            setSelectedGenres([...selectedGenres, genre]);
                        } else {
                            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
                        }
                        }}
                    />
                    {genre}
                    </label>
                ))}
                </div>

            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddReview;
