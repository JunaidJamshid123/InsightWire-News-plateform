import React from 'react';
import './Navbar.css'; // Ensure the CSS file styles the components appropriately
import newsLogo from './Images/news_logo.png'; // Correct image import
import searchIcon from './Images/search.png'; // Correct image import

const Navbar = ({ onNavClick }) => {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <img src={newsLogo} alt="InsightWire Logo" />
      </div>
      
      {/* Navigation Links */}
      <ul className="nav-links">
        {['News', 'Blog', 'Topics', 'Media Bias', 'Misinformation', 'Schools', 'Services', 'Invest'].map((link, index) => (
          <li 
            key={index}
            onClick={() => {
              // Trigger navigation based on the link clicked
              if (link === 'News') {
                onNavClick('news');
              } else if (link === 'Blog') {
                onNavClick('blog');
              } else if (link === 'Topics') {
                onNavClick('topics');
              } else if (link === 'Media Bias') {
                onNavClick('media-bias');
              } else if (link === 'Misinformation') {
                onNavClick('misinformation');
              } else if (link === 'Schools') {
                onNavClick('schools');
              } else if (link === 'Services') {
                onNavClick('services');
              } else if (link === 'Invest') {
                onNavClick('invest');
              }
            }}
            className={link === 'News' ? 'clickable-link' : ''}
          >
            {link}
          </li>
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
