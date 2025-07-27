import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/AddBook.css';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publishedDate: '',
    thumbnail: '',
    price: '',
    currency: 'INR',
    language: 'en',
    pageCount: '',
    publisher: '',
    previewLink: '',
    isbn10: '',
    isbn13: '',
    averageRating: '',
    ratingsCount: '',
    discountPercentage: '',
    genres: [],
    userEmail: localStorage.getItem('email')
  });

  const genreOptions = [
    'Fiction', 'Mystery', 'Fantasy', 'Science',
    'Romance', 'Thriller', 'Biography', 'Philosophy',
    'Adventure', 'History', 'Self-help', 'Horror',
    'Poetry', 'Drama', 'Comics', 'Children',
    'Travel', 'Cooking', 'Health', 'Technology','Others'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const genres = checked
        ? [...prev.genres, value]
        : prev.genres.filter((g) => g !== value);
      return { ...prev, genres };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:1919/api/books', formData);
      alert('Book added successfully!');
      // Reset form
      setFormData({
        title: '',
        author: '',
        description: '',
        publishedDate: '',
        thumbnail: '',
        price: '',
        currency: 'INR',
        language: 'en',
        pageCount: '',
        publisher: '',
        previewLink: '',
        isbn10: '',
        isbn13: '',
        averageRating: '',
        ratingsCount: '',
        discountPercentage: '',
        genres: [],
        userEmail: localStorage.getItem('email')
      });
    } catch (err) {
      console.error(err);
      alert('Something went wrong while adding the book.');
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <label>Title*</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Author*</label>
        <input type="text" name="author" value={formData.author} onChange={handleChange} required />

        <label>Description*</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Published Date*</label>
        <input type="date" name="publishedDate" value={formData.publishedDate} onChange={handleChange} required />

        <label>Thumbnail URL*</label>
        <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} required />

        <label>Price* (in ₹)</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Currency*</label>
        <input type="text" name="currency" value={formData.currency} onChange={handleChange} required />

        <label>Language*</label>
        <input type="text" name="language" value={formData.language} onChange={handleChange} required />

        {/* ✅ Optional Fields */}
        <label>Page Count</label>
        <input type="number" name="pageCount" value={formData.pageCount} onChange={handleChange} />

        <label>Publisher</label>
        <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} />

        <label>Preview Link</label>
        <input type="text" name="previewLink" value={formData.previewLink} onChange={handleChange} />

        <label>ISBN-10</label>
        <input type="text" name="isbn10" value={formData.isbn10} onChange={handleChange} />

        <label>ISBN-13</label>
        <input type="text" name="isbn13" value={formData.isbn13} onChange={handleChange} />

        <label>Average Rating</label>
        <input type="number" step="0.1" name="averageRating" value={formData.averageRating} onChange={handleChange} />

        <label>Ratings Count</label>
        <input type="number" name="ratingsCount" value={formData.ratingsCount} onChange={handleChange} />

        <label>Discount (%)</label>
        <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} />

        {/* ✅ Genres as Checkboxes */}
        <label>Genres*</label>
        <div className="genre-checkboxes">
          {genreOptions.map((genre) => (
            <label key={genre} className="checkbox-label">
              <input
                type="checkbox"
                value={genre}
                checked={formData.genres.includes(genre)}
                onChange={handleGenreChange}
              />
              {genre}
            </label>
          ))}
        </div>

        <button type="submit">Submit Book</button>
      </form>
    </div>
  );
};

export default AddBook;
