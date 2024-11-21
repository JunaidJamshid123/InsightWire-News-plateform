import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [profilePicture, setProfilePicture] = useState(null);

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture-wrapper">
          <img
            src={profilePicture || process.env.PUBLIC_URL + '/profile.png'}
            alt="User Profile"
            className="profile-picture"
          />
          <label htmlFor="upload-button" className="upload-button">+</label>
          <input
            type="file"
            id="upload-button"
            onChange={handlePictureUpload}
            style={{ display: 'none' }}
          />
        </div>
        <h2 className="username">Junaid Jamshid</h2>
      </div>

      <div className="details-section">
        <h3>Profile Details</h3>
        <div className="user-details">
          <p><strong>Email:</strong> junaid@example.com</p>
          <p><strong>Username:</strong> junaidjamshid</p>
          <p><strong>Mobile:</strong> +92 300 1234567</p>
          <p><strong>Country:</strong> Pakistan</p>
      
        </div>
      </div>
    </div>
  );
}

export default Profile;
