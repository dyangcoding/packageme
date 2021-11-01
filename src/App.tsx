import React from 'react';
import Header from './home/header';
import ImageToText from './home/imageToText';
import Footer from './home/footer';
import ParcelList from './parcel/parcels';
import './App.css';

function App() {
  return (
    <div className="">
      <div className="">
        <Header />
      </div>
      <div className="bg-gray-100">
        <ImageToText />
      </div>
      <div className="bg-white">
        <ParcelList />
      </div>
      <div className="bg-indigo-600">
        <Footer />
      </div>
    </div>
  );
}

export default App;
