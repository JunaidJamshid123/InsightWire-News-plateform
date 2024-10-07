import React from 'react';
import './HeaderSection.css'; 
import image1 from './Images/OFF_logo.png';


const HeaderSection = ({ onButtonClick }) => {
  return (
    <div className="header-section">
      <div className="logo">
        <img src={image1} alt="InsightWire" className="logo-img" />
        <p>Insightful News, Unbiased Views</p>
      </div>
      
      <div className="auth-buttons">
        <button className="btn btn-primary" onClick={() => onButtonClick('signup')}>Sign Up</button>
        <button className="btn btn-dark" onClick={() => onButtonClick('login')}>Log In</button>
        
        {/* User Profile Icon */}
        <div className="profile-icon-wrapper" onClick={() => onButtonClick('profile')}>
          <img src= {process.env.PUBLIC_URL + '/profile.png'} alt="User Profile" className="profile-icon" />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
