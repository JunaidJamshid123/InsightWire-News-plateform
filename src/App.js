import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeaderSection from './components/HeaderSection';
import Top_News from './components/Top_News';
import NewsSection from './components/NewsSection';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Footer from './components/Footer/Footer';
import Details from './components/Detail/Detail';
import Profile from './components/Profile/Profile';
import Chatbot from './components/chatbot/chatbot';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('/');

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page === 'signup') {
      window.location.href = '/signup';
    } else if (page === 'login') {
      window.location.href = '/login';
    } else if (page === 'profile') {
      window.location.href = '/profile';
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar onNavClick={handlePageChange} />
        {/* Pass handlePageChange to HeaderSection */}
        <HeaderSection onButtonClick={handlePageChange} />
        
        <Routes>
          <Route path="/" element={<><Top_News /><NewsSection /></>} />
          <Route path="/news" element={<><Top_News /><NewsSection /></>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/article/:id" element={<Details />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        
        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
