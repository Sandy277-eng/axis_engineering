import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer/Footer';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#ffffff', fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif' }}>
      <Header />
      <div style={{ height: '82px' }} />

      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px 100px 24px', textAlign: 'center' }}>
        {/* HIGH-TECH INDUSTRIAL 404 VECTOR GRAPHIC */}
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', position: 'relative' }}>
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: 'rgba(227, 6, 19, 0.1)',
              border: '1px solid rgba(227, 6, 19, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(227, 6, 19, 0.25)'
            }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#E30613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
        </div>

        {/* 404 ERROR CODE */}
        <div style={{ fontSize: '14px', fontWeight: '900', color: '#E30613', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>
          ERROR CODE: 404
        </div>
        
        <h1 style={{ fontSize: '42px', fontWeight: '900', margin: '0 0 16px 0', letterSpacing: '-0.5px', color: '#ffffff' }}>
          Page Not Found
        </h1>

        <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '580px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
          The requested URL does not exist or has been relocated within Axis Engineering's system. Please verify the web address or navigate using the direct links below.
        </p>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: '#1e293b',
              color: '#ffffff',
              border: '1px solid #334155',
              padding: '12px 28px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            <span>Go Back</span>
          </button>

          <Link
            to="/"
            style={{
              backgroundColor: '#E30613',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '12px 28px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 20px rgba(227, 6, 19, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Return to Homepage</span>
          </Link>
        </div>

        {/* HELPFUL DIRECT LINKS GRID */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '32px', border: '1px solid #334155', textAlign: 'left' }}>
          <div style={{ fontSize: '12px', fontWeight: '900', color: '#64748b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px' }}>
            Popular Destinations
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <Link to="/products/detron" style={{ textDecoration: 'none', color: '#f8fafc', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#E30613' }}>›</span> Detron Rotary Tables
            </Link>
            <Link to="/products/detron/4-axis" style={{ textDecoration: 'none', color: '#f8fafc', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#E30613' }}>›</span> 4-Axis Rotary Series
            </Link>
            <Link to="/products/detron/5-axis" style={{ textDecoration: 'none', color: '#f8fafc', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#E30613' }}>›</span> 5-Axis Tilt Tables
            </Link>
            <Link to="/products/fixtures" style={{ textDecoration: 'none', color: '#f8fafc', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#E30613' }}>›</span> Custom Fixtures
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none', color: '#f8fafc', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#E30613' }}>›</span> Technical Support & Contact
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
