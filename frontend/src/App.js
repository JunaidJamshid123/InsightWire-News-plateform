import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Top_News from './components/Top_News';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer/Footer'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Top_News />
        <NewsSection/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
