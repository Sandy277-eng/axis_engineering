import React from 'react';
import Header from '../Header';
import Footer from '../Footer/Footer';

export default function ServerErrorPage({ error, onRetry }) {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#ffffff', fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif' }}>
      <Header />
      <div style={{ height: '82px' }} />

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px 100px 24px', textAlign: 'center' }}>
        {/* HIGH-TECH SERVER ERROR VECTOR */}
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(239, 68, 68, 0.25)'
            }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
              <line x1="6" y1="6" x2="6.01" y2="6"/>
              <line x1="6" y1="18" x2="6.01" y2="18"/>
              <line x1="10" y1="6" x2="10.01" y2="6"/>
              <line x1="10" y1="18" x2="10.01" y2="18"/>
            </svg>
          </div>
        </div>

        <div style={{ fontSize: '14px', fontWeight: '900', color: '#ef4444', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>
          ERROR CODE: 500
        </div>

        <h1 style={{ fontSize: '42px', fontWeight: '900', margin: '0 0 16px 0', letterSpacing: '-0.5px', color: '#ffffff' }}>
          Server Processing Error
        </h1>

        <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '580px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
          An unexpected application error occurred while communicating with the server. Our technical monitoring system has logged this incident.
        </p>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '50px' }}>
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
            <span>Reload Application</span>
          </button>

          <a
            href="/contact"
            style={{
              backgroundColor: '#1e293b',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '12px 28px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: '1px solid #334155',
              transition: 'all 0.2s ease'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>Contact Support</span>
          </a>
        </div>

        {/* ERROR STACKTRACE (ONLY IN DEVELOPMENT) */}
        {error && (
          <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '20px', border: '1px solid #334155', textAlign: 'left', marginTop: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#ef4444', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Diagnostic Error Output:
            </div>
            <pre style={{ margin: 0, fontSize: '12px', color: '#cbd5e1', overflowX: 'auto', fontFamily: 'monospace' }}>
              {error.toString()}
            </pre>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
