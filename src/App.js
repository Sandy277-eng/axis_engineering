import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import HomePage from './Home/HomePage';
import ContactPage from './Contact/Contact';
import DetronProducts from './products/DetronProducts';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products/detron" element={<DetronProducts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;