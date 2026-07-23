import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';

import HomePage from './Home/HomePage';
import ContactPage from './Contact/Contact';
import DetronProducts from './products/DetronProducts';
import FixtureProducts from './products/FixtureProducts';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
          <Route path="/products/fixtures" element={<FixtureProducts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;