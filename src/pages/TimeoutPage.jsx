import React from 'react';
import Header from '../Header';
import Footer from '../Footer/Footer';

export default function TimeoutPage({ onRetry }) {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#ffffff', fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif' }}>
      <Header />
      <div style={{ height: '82px' }} />

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px 100px 24px', textAlign: 'center' }}>
        {/* CONNECTION TIMEOUT VECTOR */}
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: 'rgba(234, 179, 8, 0.1)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(234, 179, 8, 0.25)'
            }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
        </div>

        <div style={{ fontSize: '14px', fontWeight: '900', color: '#eab308', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>
          STATUS: CONNECTION TIMEOUT
        </div>

        <h1 style={{ fontSize: '42px', fontWeight: '900', margin: '0 0 16px 0', letterSpacing: '-0.5px', color: '#ffffff' }}>
          Request Time Limit Exceeded
        </h1>

        <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '580px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
          The connection to Axis Engineering servers took longer than expected to respond. This can occur during temporary network latency or heavy server processing.
        </p>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onRetry || (() => window.location.reload())}
            style={{
              backgroundColor: '#E30613',
              color: '#ffffff',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 20px rgba(227, 6, 19, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            <span>Retry Connection</span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
