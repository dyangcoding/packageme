import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './home/header';
import Footer from './home/footer';

function App() {
  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
}

export default App;
