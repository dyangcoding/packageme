import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './home/header';
import Footer from './home/footer';
import { Toasts } from './ui/toasts';

function App() {
  return (
    <Router>
      <Header />
      <Footer />
      <Toasts />
    </Router>
  );
}

export default App;
