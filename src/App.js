import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';

import './App.css';

import HomePage from './Home/HomePage';
import ContactPage from './Contact/Contact';
import DetronProducts from './products/DetronProducts';
import FixtureProducts from './products/FixtureProducts';
import DetronProductDetailPage from './products/DetronProductDetailPage';
import AboutPage from './About/About'; // <-- Add this import

// Import new 6 product files
import FourAxis from './products/FourAxis';
import FiveAxis from './products/FiveAxis';
import AutoPalletChanger from './products/AutoPalletChanger';
import SpecialApplications from './products/SpecialApplications';
import Accessories from './products/Accessories';
import IntelligentControl from './products/IntelligentControl';
import DetronModelDetailPage from './products/DetronModelDetailPage';
import IntroSplash from './IntroSplash';

function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType]);

  return null;
}

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Only show if it hasn't been shown in this browser session
    const hasShown = sessionStorage.getItem('axis_splash_shown');
    return !hasShown;
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('axis_splash_shown', 'true');
    setShowSplash(false);
  };

  return (
    <BrowserRouter>
      {showSplash && <IntroSplash onComplete={handleSplashComplete} />}
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} /> {/* <-- Add this route */}
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Main Detron category listing */}
          <Route path="/products/detron" element={<DetronProducts />} />
          
          {/* Specific product category routes */}
          <Route path="/products/detron/4-axis" element={<FourAxis />} />
          <Route path="/products/detron/5-axis" element={<FiveAxis />} />
          <Route path="/products/detron/auto-pallet-changer" element={<AutoPalletChanger />} />
          <Route path="/products/detron/special-application" element={<SpecialApplications />} />
          <Route path="/products/detron/special-applications" element={<SpecialApplications />} />
          <Route path="/products/detron/accessories" element={<Accessories />} />
          <Route path="/products/detron/intelligent-control" element={<IntelligentControl />} />
          
          {/* Specific model details route */}
          <Route path="/products/detron/:productId/:modelName" element={<DetronModelDetailPage />} />
          
          {/* Fallback details route */}
          <Route path="/products/detron/:productId" element={<DetronProductDetailPage />} />
          
          <Route path="/products/fixtures" element={<FixtureProducts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;