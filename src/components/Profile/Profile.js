import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userDetails, setUserDetails] = useState({
    email: '',
    username: '',
    mobile: '',
    country: ''
  });

  // Fetch logged-in user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get the token from localStorage or wherever you store it
        const token = localStorage.getItem('token');  // Example of getting the token from localStorage
        
        if (!token) {
          console.error("No token found, user is not logged in.");
          return;
        }

        const response = await fetch('http://localhost:5000/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Send the token in the Authorization header
          },
        });

        if (!response.ok) {
          const error = await response.json();
          console.error("Error:", error.message);
        } else {
          const data = await response.json();
          console.log("User profile:", data);

          // Set the user details in state
          setUserDetails({
            email: data.email,
            username: data.username,
            mobile: data.mobile,
            country: data.country
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

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
        <h2 className="username">{userDetails.username}</h2>
      </div>

      <div className="details-section">
        <h3>Profile Details</h3>
        <div className="user-details">
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Mobile:</strong> {userDetails.mobile}</p>
          <p><strong>Country:</strong> {userDetails.country}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
