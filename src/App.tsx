import React from 'react';
import Introduction from './home/Introduction';
import ImageToText from './home/imageToText';
import Footer from './home/footer';
import { ParcelList } from './parcel/parcels';
import './App.css';
import { Header } from './home/header';

function App() {
  return (
    <div className="">
      <div className="">
        <Header />
      </div>
      <div>
        <Introduction />
      </div>
      <div className="bg-gray-100">
        <ImageToText />
      </div>
      <div className="bg-white">
        <ParcelList />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default App;
