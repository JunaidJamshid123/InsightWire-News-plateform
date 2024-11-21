import React from 'react';
import './Login.css'; // Styling will be updated below

const Login = () => {
  return (
    <div className="login-container">
      <h2 className="login-heading">Log In</h2>
      <p className="login-subheading">Welcome back! Please log in to your account.</p>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">
            Enter Email Address<span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password<span className="required">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      <p className="signup-text">
        Don’t have an account? <a href="/signup">Sign Up Here</a>
      </p>
    </div>
  );
};

export default Login;
