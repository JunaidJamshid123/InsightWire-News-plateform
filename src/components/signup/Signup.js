import React from 'react';
import './Signup.css'; // Keep using this CSS file

const Signup = () => {
  return (
    <div className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <p className="signup-subheading">Welcome ! Please Register your new account.</p>
      <form className="signup-form">
        <div className="form-group">
          <input type="text" id="first-name" name="first-name" placeholder="First Name" required />
        </div>
        <div className="form-group">
          <input type="text" id="last-name" name="last-name" placeholder="Last Name" required />
        </div>
        <div className="form-group">
          <input type="email" id="email" name="email" placeholder="Email" required />
        </div>
        <div className="form-group">
          <input type="date" id="birth-date" name="birth-date" placeholder="Birth Date" required />
        </div>
        <div className="form-group">
          <input type="tel" id="phone" name="phone" placeholder="Phone Number" required />
        </div>
        <div className="form-group">
          <input type="text" id="country" name="country" placeholder="country" required />
        </div>
        <div className="form-group">
          <input type="password" id="password" name="password" placeholder="Password" required />
        </div>
        <div className="form-group">
          <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" required />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="login-text">
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
};

export default Signup;
