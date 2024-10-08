import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeaderSection from './components/HeaderSection';
import NewsSection from './components/NewsSection';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Footer from './components/Footer/Footer';
import Details from './components/Detail/Detail';
import Profile from './components/Profile/Profile';
import Chatbot from './components/chatbot/chatbot'; // Corrected the import
import './App.css';

function App() {
  // State to manage which section to display
  const [currentPage, setCurrentPage] = useState('details'); // Default is 'news'

  // Function to change page based on button clicked
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Navbar onNavClick={handlePageChange} /> {/* Passing the function */}
      <HeaderSection onButtonClick={handlePageChange} /> {/* Passing the function */}
      
      {/* Render sections based on the currentPage state */}
      {currentPage === 'news' && <NewsSection />}
      {currentPage === 'signup' && <Signup />}
      {currentPage === 'login' && <Login />}
      {currentPage === 'details' && <Details />}
      {currentPage === 'profile' && <Profile />}

      {/* Render the chatbot component on all pages */}
      <Chatbot /> {/* Chatbot will be present across all pages */}
      
      <Footer />
    </div>
  );
}

export default App;
