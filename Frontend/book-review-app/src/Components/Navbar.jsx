import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faGear,
  faRightFromBracket,
  faMagnifyingGlass,
  faBookOpen
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('email');
  const userName = localStorage.getItem('name');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSectionScroll = (section) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('scrollToSection', { detail: section }));
      }, 100);
    } else {
      window.dispatchEvent(new CustomEvent('scrollToSection', { detail: section }));
    }
  };

  const handleSearchKey = (e) => {
    if (e.key === 'Enter' && searchText.trim()) {
      navigate(`/search?q=${searchText}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">📚 Book Reviews</Link>
      </div>

      <div className="navbar-center">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search books, authors, genres..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearchKey}
        />
      </div>

      <div className="navbar-right">
        {!token ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/signup" className="nav-btn">Signup</Link>
          </>
        ) : (
          <>
            <div className="nav-links">
              <Link onClick={() => handleSectionScroll('home')} to="/">Home</Link>
              <Link onClick={() => handleSectionScroll('features')}>Features</Link>
              <Link onClick={() => handleSectionScroll('books')}>Books</Link>
              <Link onClick={() => handleSectionScroll('about')}>About</Link>
            </div>
            <Link to="/add-book" className="nav-btn filled">Add Book</Link>
            <Link to="/add-review" className="nav-btn filled">Add Review</Link>

            <div className="dropdown-container" ref={dropdownRef}>
              <button className="profile-btn" onClick={toggleDropdown}>
                {userName?.[0]?.toUpperCase() || 'U'}
              </button>

              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="profile-avatar">
                    {userName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="profile-info">
                    <strong>{userName || 'User'}</strong>
                    <p>{userEmail}</p>
                  </div>

                  <button
                    className="view-profile-btn"
                    onClick={() => {
                      navigate('/profile');
                      setShowDropdown(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faUser} className="icon" /> View Profile
                  </button>

                  <div className="profile-links">
                    <Link to="/my-books" onClick={() => setShowDropdown(false)}>
                      <FontAwesomeIcon icon={faBookOpen} className="icon" /> My Books
                    </Link>
                    <Link to="/my-reviews" onClick={() => setShowDropdown(false)}>
                      <FontAwesomeIcon icon={faBookOpen} className="icon" /> My Reviews
                    </Link>
                      <Link to="/settings" onClick={() => setShowDropdown(false)}>
                      <FontAwesomeIcon icon={faGear} className="icon" /> Settings
                    </Link>
                    <button onClick={handleLogout}>
                      <FontAwesomeIcon icon={faRightFromBracket} className="icon" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
