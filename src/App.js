import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';

import './App.css';

import HomePage from './Home/HomePage';
import ContactPage from './Contact/Contact';
import DetronProducts from './products/DetronProducts';
import FixtureProducts from './products/FixtureProducts';
import DetronProductDetailPage from './products/DetronProductDetailPage';
import AboutPage from './About/About';

// Import product files
import FourAxis from './products/FourAxis';
import FiveAxis from './products/FiveAxis';
import AutoPalletChanger from './products/AutoPalletChanger';
import SpecialApplications from './products/SpecialApplications';
import Accessories from './products/Accessories';
import IntelligentControl from './products/IntelligentControl';
import DetronModelDetailPage from './products/DetronModelDetailPage';
import IntroSplash from './IntroSplash';
import AxisChatbot from './Chatbot/AxisChatbot';

// Import new error handling, transition, and fallback components
import ErrorBoundary from './components/ErrorBoundary';
import OfflineNotifier from './components/OfflineNotifier';
import PageTransition from './components/PageTransition';
import NotFoundPage from './pages/NotFoundPage';
import ServerErrorPage from './pages/ServerErrorPage';
import TimeoutPage from './pages/TimeoutPage';

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
    const hasShown = sessionStorage.getItem('axis_splash_shown');
    return !hasShown;
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('axis_splash_shown', 'true');
    setShowSplash(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handleShowSplash = () => setShowSplash(true);
    window.addEventListener('showAxisSplash', handleShowSplash);
    return () => window.removeEventListener('showAxisSplash', handleShowSplash);
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        {showSplash && <IntroSplash onComplete={handleSplashComplete} />}
        <ScrollToTop />
        <OfflineNotifier />
        <AxisChatbot />
        <div className="App">
          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
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
              <Route path="/products/detron/:productId/:modelName/*" element={<DetronModelDetailPage />} />
              
              {/* Fallback details route */}
              <Route path="/products/detron/:productId" element={<DetronProductDetailPage />} />
              
              <Route path="/products/fixtures" element={<FixtureProducts />} />

              {/* Explicit Fallback & Testing Routes */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/500" element={<ServerErrorPage error={new Error("Simulated 500 API failure for demonstration")} />} />
              <Route path="/timeout" element={<TimeoutPage />} />
              
              {/* Catch-all 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PageTransition>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;