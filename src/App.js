import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeaderSection from './components/HeaderSection';
import NewsSection from './components/NewsSection';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  // State to manage which section to display
  const [currentPage, setCurrentPage] = useState('news'); // Default is 'news'

  // Function to change page based on button clicked
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Navbar onNavClick={handlePageChange} /> {/* Passing the function */}
      <HeaderSection onButtonClick={handlePageChange} /> {/* Passing the function */}
      
      {currentPage === 'news' && <NewsSection />}
      {currentPage === 'signup' && <Signup />}
      {currentPage === 'login' && <Login />}
      
      <Footer />
    </div>
  );
}

export default App;
