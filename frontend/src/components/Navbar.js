'use client'

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Logo from './Images/news_logo.png'
import Login from './login/Login';
import Signup from "./signup/Signup"
import { Bell, User, LogIn, UserPlus, Menu, Search, X } from 'lucide-react';

const Navbar = ({ onNavClick }) => {
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { name: 'News', path: '/' },
    { name: 'Media Bias', path: '/media-bias' },
    { name: 'Story Comparison', path: '/story-comparison' },
    { name: 'Personalized Feed', path: '/personalized-feed' },
    { name: 'News Analytics', path: '/news-analytics' }
    
  ];
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const openLogin = () => setIsLoginOpen(true)
  const closeLogin = () => setIsLoginOpen(false)
  const openSignup = () => setIsSignupOpen(true)
  const closeSignup = () => setIsSignupOpen(false)

  const handleMobileNavClick = () => {
    setMobileNavOpen(!mobileNavOpen);
    setMenuOpen(false);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    setMobileNavOpen(false);
  };

  const handleNavigation = (path, sectionId) => {
    navigate(path);
    if (onNavClick) {
      onNavClick(sectionId);
    }
    setMobileNavOpen(false);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link to="/">
              <img src={Logo || "/placeholder.svg"} alt="InsightWire Logo" className="logo" />
            </Link>
          </div>
          
          <div className="navbar-links">
            <ul>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    onClick={() => handleNavigation(
                      link.path, 
                      link.name.toLowerCase().replace(' ', '-')
                    )}
                    className={link.name === 'News' ? 'active' : ''}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-right">
            <div className="navbar-search">
              <input type="text" placeholder="Balanced Search" />
              <button className="search-button">
                <Search size={18} />
              </button>
            </div>

            <button className="menu-button" onClick={handleMenuClick}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="navbar-mobile-toggle">
            <button onClick={handleMobileNavClick}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown */}
      <div className={`menu-dropdown ${menuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <div className="menu-header">
            <button className="menu-action-btn">
              <User size={18} />
              <span>Profile</span>
            </button>
          </div>
          <div className="menu-actions">
           
            <button onClick={openLogin} className="menu-action-btn login-btn">
              <LogIn size={18} />
              <span>Login</span>
            </button>
            <button onClick={openSignup} className="menu-action-btn signup-btn">
              <UserPlus size={18} />
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${mobileNavOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                onClick={() => handleNavigation(
                  link.path, 
                  link.name.toLowerCase().replace(' ', '-')
                )}
                className={link.name === 'News' ? 'active' : ''}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="navbar-search-mobile">
          <input type="text" placeholder="Balanced Search" />
          <button className="search-button">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Overlay for clicking outside to close menus */}
      {(menuOpen || mobileNavOpen) && (
        <div 
          className="menu-overlay" 
          onClick={() => {
            setMenuOpen(false);
            setMobileNavOpen(false);
          }}
        />
      )}
      <Login isOpen={isLoginOpen} onClose={closeLogin} />
      <Signup isOpen={isSignupOpen} onClose={closeSignup} /> 

    </nav>
  );
};

export default Navbar;