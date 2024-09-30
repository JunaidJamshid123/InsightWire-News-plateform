import React from 'react';
import './HeaderSection.css'; // You'll create the CSS file for styling this component

const HeaderSection = () => {
  return (
    <div className="header-section">
      <div className="logo">
        <img src="logo.png" alt="InsightWire" className="logo-img" />
        <h1>InsightWire</h1>
        <p>Don't be fooled by media bias & misinformation.</p>
      </div>
      <div className="auth-buttons">
        <button className="btn btn-primary">Sign Up</button>
        <button className="btn btn-dark">Log In</button>
      </div>
    </div>
  );
};

export default HeaderSection;
