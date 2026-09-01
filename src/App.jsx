import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Reviews from './components/Reviews';

function App() {
  return (
    <div className="min-h-screen bg-nude text-noir-mat selection:bg-terracotta selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <Reviews />
      <Footer />
    </div>
  );
}

export default App;