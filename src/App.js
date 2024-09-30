import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/HeaderSection';
//import NewsSection from './components/NewsSection';
import Login from './components/login/Login';
import './App.css'; // If you want to style

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Login/>
    </div>
  );
}

export default App;
