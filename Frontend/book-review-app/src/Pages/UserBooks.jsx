import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/UserBooks.css';

const UserBooks = () => {
  const [books, setBooks] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:1919/api/books/user/${email}`);
        setBooks(res.data);
      } catch (err) {
        console.error('Error fetching user books:', err);
      }
    };

    fetchBooks();
  }, [email]);

  return (
    <div className="user-books-container">
      <h2>My Added Books</h2> 
      <div className="user-books-grid">
        {books.length === 0 ? (
          <p>You haven’t added any books yet.</p>
        ) : (
          books.map((book) => (
            <div key={book.id} className="user-book-card">
              <img src={book.thumbnail} alt={book.title} />
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genres:</strong> {book.genre?.join(', ')}</p>
              <p><strong>Price:</strong> ₹{book.price}</p>
              <p><strong>Rating:</strong> {book.averageRating || 0} ⭐</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserBooks;
