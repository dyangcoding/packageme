import React, { Fragment } from 'react';
import './App.css';
import { Header } from './home/header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Footer from './home/footer';
import About from './pages/about';

function App() {
  return (
    <Fragment>
      <Header />
      <Footer />
    </Fragment>
  );
}

export default App;
