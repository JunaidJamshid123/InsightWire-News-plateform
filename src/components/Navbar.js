import React, { useState } from 'react';
import './Navbar.css';
import Logo from './Images/news_logo.png'

const Navbar = ({ onNavClick }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navLinks = ['News', 'Blog', 'Topics', 'Media Bias', 'Misinformation', 'Schools', 'Services', 'Invest'];

  const handleMobileNavClick = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <img src={Logo} alt="InsightWire Logo" className="logo" />
          </div>
          <div className="navbar-links">
            <ul>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavClick(link.toLowerCase().replace(' ', '-'));
                    }}
                    className={link === 'News' ? 'active' : ''}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar-search">
            <input type="text" placeholder="Balanced Search" />
            <button className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          <div className="navbar-mobile-toggle">
            <button onClick={handleMobileNavClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`navbar-mobile-menu ${mobileNavOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(link.toLowerCase().replace(' ', '-'));
                  setMobileNavOpen(false);
                }}
                className={link === 'News' ? 'active' : ''}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar-search-mobile">
          <input type="text" placeholder="Balanced Search" />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
