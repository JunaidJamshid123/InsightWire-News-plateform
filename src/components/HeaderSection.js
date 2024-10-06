import React from 'react';
import './HeaderSection.css'; 
import image1 from './Images/OFF_logo.png';

const HeaderSection = ({ onButtonClick }) => { // Receiving the function as a prop
  return (
    <div className="header-section">
      <div className="logo">
        <img src={image1} alt="InsightWire" className="logo-img" />
        <p>Insightful News, Unbiased Views</p>
      </div>
      <div className="auth-buttons">
        <button className="btn btn-primary" onClick={() => onButtonClick('signup')}>Sign Up</button> {/* Trigger signup */}
        <button className="btn btn-dark" onClick={() => onButtonClick('login')}>Log In</button> {/* Trigger login */}
      </div>
    </div>
  );
};

export default HeaderSection;
