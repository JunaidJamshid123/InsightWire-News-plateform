import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    phone: '',
    country: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Signup successful!');
      } else {
        alert(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during signup.');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <p className="signup-subheading">Welcome! Please Register your new account.</p>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="date" name="birthDate" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name="country" placeholder="Country" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
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
