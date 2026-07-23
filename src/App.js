import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';

import './App.css';

import HomePage from './Home/HomePage';
import ContactPage from './Contact/Contact';
import DetronProducts from './products/DetronProducts';
import FixtureProducts from './products/FixtureProducts';
import DetronProductDetailPage from './products/DetronProductDetailPage';

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
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products/detron" element={<DetronProducts />} />
          <Route path="/products/detron/:productId" element={<DetronProductDetailPage />} />
          <Route path="/products/fixtures" element={<FixtureProducts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;