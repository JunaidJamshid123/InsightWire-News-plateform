'use client';

import React, { useState } from 'react';
import { FaGoogle, FaTimes } from 'react-icons/fa';
import './Login.css';

const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = (e) => {
    e.preventDefault();
    console.log('Email login:', email, password);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  if (!isOpen) return null;

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Stay informed with the latest news</p>
        </div>
        <form onSubmit={handleEmailLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-group">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
        
            </div>
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <div className="separator">
          <span>or continue with</span>
        </div>
        <button onClick={handleGoogleLogin} className="google-login-button">
          <FaGoogle className="google-icon" />
          Sign in with Google
        </button>
        <div className="signup-link">
          Don't have an account? <a href="#sign-up">Sign up now</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
