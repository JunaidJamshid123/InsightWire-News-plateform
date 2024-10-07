import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [profilePicture, setProfilePicture] = useState(null);

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Set the uploaded picture as profile picture
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-section">
        <div className="profile-picture-wrapper">
          <img
            src={profilePicture || process.env.PUBLIC_URL + '/profile.png'}  // Use 'demo' directly without template literals
            alt="User Profile"
            className="profile-picture"
          />
          <label htmlFor="upload-button" className="upload-button">+</label>
          <input
            type="file"
            id="upload-button"
            onChange={handlePictureUpload}
            style={{ display: 'none' }} // Hide default upload button
          />
        </div>
        <h2 className="username">Junaid Jamshid</h2> {/* Example name */}
      </div>

      <div className="details-section">
        <h3>User Details</h3>
        <div className="user-details">
          <p><strong>Email:</strong> junaid@example.com</p>
          <p><strong>Username:</strong> junaidjamshid</p>
          <p><strong>Country:</strong> Pakistan</p>
          <p><strong>Province:</strong> Punjab</p>
          <p><strong>City:</strong> Lahore</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
