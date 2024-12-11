import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
  });

  // Fetch logged-in user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found, user is not logged in.');
          return;
        }

        const response = await fetch('http://localhost:5000/api/user/profile', {
          
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('Error:', error.message);
        } else {
          const data = await response.json();
          console.log(data);
          setUserDetails({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            country: data.country,
          });
          setProfilePicture(data.profilePicture || process.env.PUBLIC_URL + '/profile.png');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
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
            src={profilePicture}
            alt="User Profile"
            className="profile-picture"
          />
          <label htmlFor="upload-button" className="upload-button">
            +
          </label>
          <input
            type="file"
            id="upload-button"
            onChange={handlePictureUpload}
            style={{ display: 'none' }}
          />
        </div>
        <h2 className="username">{`${userDetails.firstName} ${userDetails.lastName}`}</h2>
        <p className="user-country">{userDetails.country}</p>
      </div>

      <div className="details-section">
        <h3>Profile Details</h3>
        <div className="user-details">
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails.phone}
          </p>
          <p>
            <strong>Country:</strong> {userDetails.country}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;