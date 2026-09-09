import React from 'react';
import { Link } from 'react-router-dom';
import { downloadBrochure } from '../utils/downloadBrochure';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#05070a', color: '#e2e8f0', fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif', width: '100%', boxSizing: 'border-box', borderTop: '1px solid #1e293b' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '56px 32px 40px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.95fr 1.1fr 1.15fr', gap: '36px', alignItems: 'start' }}>
          
          {/* COLUMN 1: LOGO & OVERVIEW */}
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            {/* COMPANY NAME ONLY — NO ICON LOGO */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 18px 0', minHeight: '26px' }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '900', color: '#E30613', letterSpacing: '1px', lineHeight: '1' }}>
                  AXIS
                </div>
                <div style={{ fontSize: '9.5px', fontWeight: '800', color: '#ffffff', letterSpacing: '2px', marginTop: '2px' }}>
                  ENGINEERING SOLUTIONS
                </div>
              </div>
            </div>

            <p style={{ fontSize: '12.5px', color: '#cbd5e1', lineHeight: '1.6', margin: '0 0 14px 0' }}>
              Proudly associated with <strong style={{ color: '#ffffff' }}>Detron Machinery Co. Ltd., Taiwan</strong>— the world's largest professional Rotary Table Manufacturer.
            </p>

            <div style={{ width: '36px', height: '2px', backgroundColor: '#E30613', marginBottom: '14px', borderRadius: '1px' }} />

            <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '1.6', margin: '0 0 18px 0' }}>
              Established in 2014, <strong style={{ color: '#ffffff' }}>Axis Engineering Solutions</strong> delivers total turnkey integration, 4th & 5th axis interfacing, DDR integration, and custom hydraulic/jig control systems.
            </p>

            {/* PARTNER BADGE */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                backgroundColor: '#0f172a', 
                border: '1px solid #1e293b', 
                padding: '7px 12px', 
                borderRadius: '6px', 
                marginBottom: '18px',
                fontSize: '11.5px',
                fontWeight: '700',
                color: '#ffffff',
                alignSelf: 'flex-start'
              }}
            >
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#E30613', boxShadow: '0 0 6px #E30613' }} />
              <span>Official Partner for Detron CNC Products</span>
            </div>

            {/* META COMPANY STATS BOX */}
            <div 
              style={{ 
                backgroundColor: '#0a0e17', 
                border: '1px solid #1e293b', 
                borderRadius: '8px', 
                padding: '10px 14px', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                color: '#94a3b8'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                </svg>
                <div>
                  <div style={{ fontSize: '8.5px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Industry</div>
                  <div style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '10px' }}>Automation Machinery</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <div>
                  <div style={{ fontSize: '8.5px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Founded</div>
                  <div style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '10px' }}>2014</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <div>
                  <div style={{ fontSize: '8.5px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Employees</div>
                  <div style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '10px' }}>11-50</div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: QUICK NAVIGATION */}
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <h4 style={{ fontSize: '12.5px', fontWeight: '900', color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 0 0', height: '26px', display: 'flex', alignItems: 'center' }}>
              QUICK NAVIGATION
            </h4>
            <div style={{ width: '36px', height: '2px', backgroundColor: '#E30613', margin: '8px 0 16px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Link 
                to="/" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '9px 0', 
                  color: '#cbd5e1', 
                  textDecoration: 'none', 
                  fontSize: '12.5px', 
                  fontWeight: '500', 
                  borderBottom: '1px solid #1e293b',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
              >
                <span>Home</span>
                <span style={{ color: '#64748b', fontSize: '13px' }}>›</span>
              </Link>

              <Link 
                to="/products/detron" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '9px 0', 
                  color: '#cbd5e1', 
                  textDecoration: 'none', 
                  fontSize: '12.5px', 
                  fontWeight: '500', 
                  borderBottom: '1px solid #1e293b',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
              >
                <span>Detron Rotary Tables</span>
                <span style={{ color: '#64748b', fontSize: '13px' }}>›</span>
              </Link>

              <Link 
                to="/products/fixtures" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '9px 0', 
                  color: '#cbd5e1', 
                  textDecoration: 'none', 
                  fontSize: '12.5px', 
                  fontWeight: '500', 
                  borderBottom: '1px solid #1e293b',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
              >
                <span>Custom Fixtures</span>
                <span style={{ color: '#64748b', fontSize: '13px' }}>›</span>
              </Link>

              <Link 
                to="/about" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '9px 0', 
                  color: '#cbd5e1', 
                  textDecoration: 'none', 
                  fontSize: '12.5px', 
                  fontWeight: '500', 
                  borderBottom: '1px solid #1e293b',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
              >
                <span>About Axis Engineering</span>
                <span style={{ color: '#64748b', fontSize: '13px' }}>›</span>
              </Link>

              <Link 
                to="/contact" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '9px 0', 
                  color: '#cbd5e1', 
                  textDecoration: 'none', 
                  fontSize: '12.5px', 
                  fontWeight: '500', 
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
              >
                <span>Contact Us</span>
                <span style={{ color: '#64748b', fontSize: '13px' }}>›</span>
              </Link>
            </div>

            {/* DOWNLOAD BROCHURE BUTTON */}
            <button
              onClick={(e) => {
                e.preventDefault();
                downloadBrochure();
              }}
              style={{
                marginTop: '22px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid #334155',
                padding: '10px 16px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Download Brochure</span>
            </button>
          </div>

          {/* COLUMN 3: ENGINEERING SPECIALTIES */}
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <h4 style={{ fontSize: '12.5px', fontWeight: '900', color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 0 0', height: '26px', display: 'flex', alignItems: 'center' }}>
              ENGINEERING SPECIALTIES
            </h4>
            <div style={{ width: '36px', height: '2px', backgroundColor: '#E30613', margin: '8px 0 16px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12.5px', color: '#cbd5e1', minHeight: '26px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                </svg>
                <span>4th & 5th Axis CNC Interfacing</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12.5px', color: '#cbd5e1', minHeight: '26px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                </svg>
                <span>Fanuc, Mitsubishi, Siemens, Heidenhain Controls</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12.5px', color: '#cbd5e1', minHeight: '26px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect x="4" y="4" width="16" height="16" rx="2"/>
                  <rect x="9" y="9" width="6" height="6"/>
                  <line x1="9" y1="1" x2="9" y2="4"/>
                  <line x1="15" y1="1" x2="15" y2="4"/>
                  <line x1="9" y1="20" x2="9" y2="23"/>
                  <line x1="15" y1="20" x2="15" y2="23"/>
                  <line x1="20" y1="9" x2="23" y2="9"/>
                  <line x1="20" y1="15" x2="23" y2="15"/>
                  <line x1="1" y1="9" x2="4" y2="9"/>
                  <line x1="1" y1="15" x2="4" y2="15"/>
                </svg>
                <span>Direct Drive (DDR) Integration</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12.5px', color: '#cbd5e1', minHeight: '26px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                </svg>
                <span>Hydraulic Fixture & Rotary Systems</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12.5px', color: '#cbd5e1', minHeight: '26px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Jig Control Logic & Safety Interlocks</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12.5px', color: '#cbd5e1', minHeight: '26px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                <span>Servo Tuning & Cable Management</span>
              </div>
            </div>
          </div>

          {/* COLUMN 4: CONTACT & HEADQUARTERS */}
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <h4 style={{ fontSize: '12.5px', fontWeight: '900', color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 0 0', height: '26px', display: 'flex', alignItems: 'center' }}>
              CONTACT & HEADQUARTERS
            </h4>
            <div style={{ width: '36px', height: '2px', backgroundColor: '#E30613', margin: '8px 0 16px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* ADDRESS */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '12.5px', color: '#cbd5e1', lineHeight: '1.5' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <strong style={{ color: '#ffffff', fontSize: '13px' }}>Axis Engineering Solutions</strong><br />
                  78-B, First Floor, Geason Housing Colony,<br />
                  1st Main Road, Ayanambakkam,<br />
                  Chennai, Tamil Nadu 600095, India
                </div>
              </div>

              {/* PHONE */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '12.5px', color: '#cbd5e1', lineHeight: '1.5' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <div>
                  +91 98849 12279 / +91 98849 12280<br />
                  044 - 4746 8749
                </div>
              </div>

              {/* WHATSAPP */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12.5px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                <a href="https://wa.me/919003224117" target="_blank" rel="noopener noreferrer" style={{ color: '#22c55e', fontWeight: '800', textDecoration: 'none' }}>
                  Contact Us: +91 90032 24117
                </a>
              </div>

              {/* EMAIL */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12.5px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:info@axisengineeringsolutions.in" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '600' }}>
                  info@axisengineeringsolutions.in
                </a>
              </div>

              {/* WEBSITE */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12.5px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <a href="http://www.axisengineeringsolutions.in" target="_blank" rel="noopener noreferrer" style={{ color: '#E30613', fontWeight: '800', textDecoration: 'none' }}>
                  www.axisengineeringsolutions.in
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM COPYRIGHT BAR */}
      <div style={{ backgroundColor: '#020406', borderTop: '1px solid #1e293b', padding: '16px 28px' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#64748b' }}>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} <strong style={{ color: '#94a3b8' }}>Axis Engineering Solutions</strong>. All Rights Reserved.
          </p>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <a href="https://maps.app.goo.gl/4hB7DMjNiiiabTDWA" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none' }}>
              Get Directions
            </a>
            <span>|</span>
            <a href="#privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
            <span>|</span>
            <a href="#terms" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}