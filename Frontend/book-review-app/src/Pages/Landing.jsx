import React, { useRef, useEffect } from 'react';
import BookList from './BookList';
import '../styles/Landing.css';

const Landing = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const bookListRef = useRef(null);
  const aboutRef = useRef(null);

  // Scroll handler for navbar
  useEffect(() => {
    const handleScrollToSection = (e) => {
      const section = e.detail;
      switch (section) {
        case 'home':
          heroRef.current?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'features':
          featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'books':
          bookListRef.current?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'about':
          aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
          break;
        default:
          break;
      }
    };

    window.addEventListener('scrollToSection', handleScrollToSection);
    return () => window.removeEventListener('scrollToSection', handleScrollToSection);
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section ref={heroRef} className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>Book Reviews</span></h1>
          <p>Discover, explore, and review your favorite books across genres — all in one place.</p>
          <button className="cta-btn" onClick={() => bookListRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            Start Exploring
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features">
        <h2 className="section-title">📖 What Can You Do Here?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🔍 Smart Search</h3>
            <p>Find books by title, author, or genre with real-time search.</p>
          </div>
          <div className="feature-card">
            <h3>⭐ Verified Ratings</h3>
            <p>View average ratings and real reviews from the Google Books API.</p>
          </div>
          <div className="feature-card">
            <h3>📚 Curated Collections</h3>
            <p>Explore themed collections from Fiction to Science and beyond.</p>
          </div>
          <div className="feature-card">
            <h3>✍️ Write Reviews</h3>
            <p>Share your thoughts with the community by posting reviews.</p>
          </div>
          <div className="feature-card">
            <h3>📖 Add Books</h3>
            <p>Add your own books to get public rating and visibility.</p>
          </div>
        </div>
      </section>

      {/* Book Section */}
      <section className="book-section" ref={bookListRef}>
        <h2 className="section-title">📚 Explore Books</h2>
        <BookList />
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="about-section">
        <h2>About Book Reviews</h2>
        <p>
          Book Reviews is a modern platform that bridges readers and stories. Our mission is to help
          readers discover great books, explore diverse genres, and express their opinions through meaningful reviews.
        </p>
        <p>
          Built with ❤️ using React and Spring Boot, this platform is powered by the Google Books API and
          crafted with a minimalist yet vibrant design. Join our community and elevate your reading journey!
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Book Reviews. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
