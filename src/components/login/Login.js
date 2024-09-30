import React from 'react';
import './Login.css'; // You can use this CSS for styling the component

const Login = () => {
  return (
    <div className="login-container">
      <h2 className="login-heading">Log In</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Enter Email Address<span className="span">*</span></label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password<span className="span">*</span></label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="signup-text">
        Don't have an account? <a href="/signup">Signup Here</a>
      </p>
    </div>
  );
};

export default Login;
