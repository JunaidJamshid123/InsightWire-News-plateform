import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/HeaderSection';
import NewsSection from './components/NewsSection';
import './App.css'; // If you want to style

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <NewsSection />
    </div>
  );
}

export default App;
