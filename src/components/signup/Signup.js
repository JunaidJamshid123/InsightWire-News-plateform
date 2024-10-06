import React from 'react';
import './Signup.css'; // You can use this CSS for styling the component

const Signup = () => {
  return (
    <div className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <form className="signup-form">
        <div className="form-group">
          <label htmlFor="username">User Name<span className="span">*</span></label>
          <input type="text" id="username" name="username" placeholder="Enter your user name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address<span className="span">*</span></label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password<span className="span">*</span></label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password<span className="span">*</span></label>
          <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password" required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" placeholder="Enter your location" />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="login-text">
        Already have an account? <a href="/login">Log In Here</a>
      </p>
    </div>
  );
};

export default Signup;
