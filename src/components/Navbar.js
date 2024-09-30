import React from 'react';
import './Navbar.css';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/news-platform/src/Images/news_logo.png" alt="InsightWire" />
      </div>
      <ul className="nav-links">
        <li>News</li>
        <li>Blog</li>
        <li>Topics</li>
        <li>Media Bias</li>
        <li>Misinformation</li>
        <li>Schools</li>
        <li>Services</li>
        <li>Invest</li>
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="Balanced Search" />
        <button>
          <img src="/news-platform/src/Images/search.png" alt="Search" className="search-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
