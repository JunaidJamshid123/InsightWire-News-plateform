'use client'

import React, { useState } from 'react';
import './Navbar.css';
import Logo from './Images/news_logo.png'
import Login from './login/Login';
import Signup from "./signup/Signup" // Import the Signup component
import { Bell, User, LogIn, UserPlus, Menu, Search, X } from 'lucide-react';

const Navbar = ({ onNavClick }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ['News', 'Personalized Feed', 'News Analytics', 'Media Bias', 'Story Comparison'];
   const [isSignupOpen, setIsSignupOpen] = useState(false) // New state for Signup modal
   const [isLoginOpen, setIsLoginOpen] = useState(false)

  const openLogin = () => setIsLoginOpen(true)
  const closeLogin = () => setIsLoginOpen(false)
  const openSignup = () => setIsSignupOpen(true) // New handler to open Signup
  const closeSignup = () => setIsSignupOpen(false) // New handler to close Signup

  const handleMobileNavClick = () => {
    setMobileNavOpen(!mobileNavOpen);
    setMenuOpen(false);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    setMobileNavOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <img src={Logo || "/placeholder.svg"} alt="InsightWire Logo" className="logo" />
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
            <button  onClick={openSignup} className="menu-action-btn signup-btn">
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
