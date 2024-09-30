import React from 'react';
import './Navbar.css'; // Ensure the CSS file styles the components appropriately
import newsLogo from './Images/news_logo.png'; // Correct image import
import searchIcon from './Images/search.png'; // Correct image import

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <img src={newsLogo} alt="InsightWire Logo" />
      </div>
      
      {/* Navigation Links */}
      <ul className="nav-links">
        {['News', 'Blog', 'Topics', 'Media Bias', 'Misinformation', 'Schools', 'Services', 'Invest'].map((link, index) => (
          <li key={index}>{link}</li>
        ))}
      </ul>
      
      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Balanced Search" />
        <button>
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
