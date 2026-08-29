import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header';
import ProgressiveImage from '../components/ProgressiveImage';

const PRODUCTS = [
  {
    num: '01',
    id: '4-axis',
    titleTop: 'Rotary Table',
    titleBottom: '4 Axis',
    desc: 'The 4-axis rotary tables feature dual-lead worm gear, roller cam, and DDM technologies with 125–800 mm faceplates.',
    img: '/images/products_detron/4th_axis.png',
    features: [
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          </svg>
        ),
        title: 'High Precision',
        sub: 'Superior accuracy & repeatability'
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        title: 'High Rigidity',
        sub: 'Robust build for heavy machining'
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 12l3-3"/><path d="M12 6v2"/><path d="M18 12h-2"/><path d="M6 12H4"/>
          </svg>
        ),
        title: 'Wide Range',
        sub: '125mm to 800mm faceplates'
      }
    ]
  },
  {
    num: '02',
    id: '5-axis',
    titleTop: 'Rotary Table',
    titleBottom: '5 Axis',
    desc: 'The 5 Axis Barrel Cam mechanism delivers smooth indexing, high rigidity, and precise positioning for CNC rotary tables.',
    img: '/images/products_detron/5th_axis.png',
    features: [
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          </svg>
        ),
        title: '5-Face Indexing',
        sub: 'Complex multi-sided machining'
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        title: 'High Clamping',
        sub: 'Rock-solid tilt stability'
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 12l3-3"/><path d="M12 6v2"/><path d="M18 12h-2"/><path d="M6 12H4"/>
          </svg>
        ),
        title: 'Multi-Drive',
        sub: 'Worm, Roller Cam & DDM'
      }
    ]
  },
  {
    num: '03',
    id: 'auto-pallet-changer',
    titleTop: 'Automatic Pallet',
    titleBottom: 'Changer (APC)',
    desc: 'Fast, reliable pallet changers minimizing spindle downtime and maximizing production run efficiency for vertical machines.',
    img: '/images/products_detron/Auto-Pallet-changer.png',
    features: [
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          </svg>
        ),
        title: 'Max Productivity',
        sub: 'Zero non-cutting idle time'
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        title: 'Fast Exchange',
        sub: 'Rapid 3.5s pallet swaps'
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 12l3-3"/><path d="M12 6v2"/><path d="M18 12h-2"/><path d="M6 12H4"/>
          </svg>
        ),
        title: 'High Payload',
        sub: 'Up to 300 kg capacity'
      }
    ]
  },
  {
    num: '04',
    id: 'accessories',
    titleTop: 'System Accessories',
    titleBottom: 'Detron Range',
    desc: 'Genuine sub-plates, tailstocks, manual/pneumatic chucks, and rotary joints to optimize setup versatility.',
    img: '/images/products_detron/Accessories.png',
    features: [
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          </svg>
        ),
        title: 'Genuine Parts',
        sub: 'Tailstocks, sub-plates & chucks'
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        title: 'High Accuracy',
        sub: 'Seamless CNC integration'
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 12l3-3"/><path d="M12 6v2"/><path d="M18 12h-2"/><path d="M6 12H4"/>
          </svg>
        ),
        title: 'Versatile Setup',
        sub: 'Pneumatic & manual options'
      }
    ]
  },
  {
    num: '05',
    id: 'intelligent-control',
    titleTop: 'Intelligent Control',
    titleBottom: 'Smart Equipment',
    desc: "Equipped with detron perception and computing, detron's Smart Control and AIoT solutions empower rotary tables to drive factory digital transformation.",
    img: '/images/products_detron/Intelligent-control.png',
    features: [
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          </svg>
        ),
        title: 'AIoT Smart',
        sub: 'Real-time digital monitoring'
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        title: 'High Stability',
        sub: 'Precision CNC tuning'
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 12l3-3"/><path d="M12 6v2"/><path d="M18 12h-2"/><path d="M6 12H4"/>
          </svg>
        ),
        title: 'Multi-Controller',
        sub: 'FANUC, Siemens & Mitsubishi'
      }
    ]
  },
  {
    num: '06',
    id: 'special-application',
    titleTop: 'Bespoke Solutions',
    titleBottom: 'Special Applications',
    desc: 'detron offers bespoke Special Application Services for complex machining conditions tailored to your specific workpiece geometry and automation needs.',
    img: '/images/products_detron/Special-Application.png',
    features: [
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          </svg>
        ),
        title: 'Custom Workholding',
        sub: 'Bespoke swing & base designs'
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        title: 'Turnkey Line',
        sub: 'Full fixture & cell automation'
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 12l3-3"/><path d="M12 6v2"/><path d="M18 12h-2"/><path d="M6 12H4"/>
          </svg>
        ),
        title: 'High Rigidity',
        sub: 'CAPTO/BT50 spindle collets'
      }
    ]
  }
];

const BEST_PRACTICES = [
  { icon: '▲', label: 'Latest Designs' },
  { icon: 'ⓘ', label: 'Modern Technology' },
  { icon: '❏', label: 'Project On-Time' },
  { icon: '⚙', label: 'Improved Machine and Manufacturing Process' }
];

export default function DetronProducts() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif', color: '#0f172a' }}>
      {/* HEADER SECTION */}
      <Header activePage="detron" />

      {/* HEADER SPACER */}
      <div style={{ height: '82px' }} />

      {/* HERO / BRAND TITLE BANNER WITH DETRON BACKGROUND IMAGE */}
      <section 
        style={{ 
          position: 'relative',
          backgroundImage: 'url(/images/detron.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '70px 24px 65px 24px', 
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.8) 100%)',
            zIndex: 1 
          }} 
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(255, 255, 255, 0.12)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.25)', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', padding: '6px 16px', borderRadius: '20px', marginBottom: '16px', textTransform: 'uppercase', backdropFilter: 'blur(4px)' }}>
            AXIS ENGINEERING & DETRON PARTNERSHIP
          </div>
          <h1 style={{ fontSize: '38px', fontWeight: '900', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.5px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            DETRON <span style={{ color: '#38bdf8' }}>PRODUCTS RANGE</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#e2e8f0', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6', textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>
            Explore Axis Engineering's premier lineup of Detron 4 & 5 Axis rotary tables, high-speed pallet changers, smart equipment, and bespoke workholding solutions across India.
          </p>
        </div>
      </section>

      {/* PRODUCTS CARDS GRID SECTION */}
      <section style={{ maxWidth: '1320px', margin: '0 auto', padding: '48px 24px 60px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(560px, 1fr))', gap: '32px' }}>
          {PRODUCTS.map((product) => {
            const isHovered = activeCard === product.id;
            return (
              <div
                key={product.id}
                onMouseEnter={() => setActiveCard(product.id)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  padding: '28px',
                  boxShadow: isHovered ? '0 16px 40px rgba(15, 23, 42, 0.12)' : '0 6px 24px rgba(0, 0, 0, 0.04)',
                  border: isHovered ? '1.5px solid #0f172a' : '1.5px solid #e2e8f0',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  position: 'relative'
                }}
              >
                {/* TOP HEADER ROW: NUMBER BADGE WITH GRADIENT LINE + TOP-RIGHT ARROW LINK */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* LEFT: DARK NAVY NUMBER BADGE + HORIZONTAL GRADIENT LINE */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                    <div
                      style={{
                        padding: '4px 10px',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '900',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {product.num}
                    </div>
                    <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, #0f172a 0%, rgba(15, 23, 42, 0) 100%)', borderRadius: '1px' }} />
                  </div>

                  {/* RIGHT: TOP-RIGHT ROUND ARROW LINK BUTTON */}
                  <button
                    onClick={() => navigate(`/products/detron/${product.id}`)}
                    title="View details"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: isHovered ? '#0f172a' : '#f1f5f9',
                      color: isHovered ? '#ffffff' : '#0f172a',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"/>
                      <polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </button>
                </div>

                {/* MIDDLE CONTENT ROW: TITLE & DESC (LEFT), IMAGE (RIGHT) */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* LEFT: TWO-LINE TITLE & DESCRIPTION */}
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: '0 0 2px 0', lineHeight: '1.2' }}>
                      {product.titleTop}
                    </h2>
                    <h3 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '0 0 12px 0', lineHeight: '1.2' }}>
                      {product.titleBottom}
                    </h3>
                    <div style={{ width: '40px', height: '3px', backgroundColor: '#0f172a', marginBottom: '14px', borderRadius: '2px' }} />
                    <p style={{ fontSize: '13.5px', lineHeight: '1.65', color: '#64748b', margin: 0 }}>
                      {product.desc}
                    </p>
                  </div>

                  {/* RIGHT: PRODUCT IMAGE WITH SKELETON LOADING */}
                  <div style={{ width: '220px', height: '180px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px' }}>
                    <ProgressiveImage
                      src={product.img}
                      alt={`${product.titleTop} ${product.titleBottom}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.08))',
                        transition: 'transform 0.3s ease',
                        transform: isHovered ? 'scale(1.06)' : 'scale(1)'
                      }}
                    />
                  </div>
                </div>

                {/* FEATURE HIGHLIGHTS BAR (PREMIUM COOL SLATE ROW — REPLACING PINK) */}
                <div 
                  style={{ 
                    backgroundColor: '#f1f5f9', 
                    borderRadius: '14px', 
                    padding: '14px 16px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                    alignItems: 'center',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  {product.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                      <div 
                        style={{ 
                          width: '36px', 
                          height: '36px', 
                          borderRadius: '10px', 
                          backgroundColor: '#ffffff', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          boxShadow: '0 2px 6px rgba(15, 23, 42, 0.06)',
                          flexShrink: 0 
                        }}
                      >
                        {feat.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>
                          {feat.title}
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#64748b', lineHeight: '1.25', marginTop: '2px' }}>
                          {feat.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* BOTTOM ACTION BUTTONS */}
                <div style={{ display: 'flex', gap: '14px' }}>
                  {/* DARK MIDNIGHT EXPLORE MORE BUTTON */}
                  <button
                    onClick={() => navigate(`/products/detron/${product.id}`)}
                    style={{
                      flex: 1,
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0f172a'; }}
                  >
                    <span>Explore more</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>

                  {/* WHITE CUSTOM CONFIGURATION BUTTON */}
                  <button
                    onClick={() => navigate(`/products/detron/${product.id}`)}
                    style={{
                      flex: 1,
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      border: '1.5px solid #cbd5e1',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#0f172a';
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#cbd5e1';
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                  >
                    <span>Custom Configuration</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* APPRAISAL / BEST PRACTICES PANEL */}
      <section style={{ display: 'flex', flexWrap: 'wrap', width: '100%', minHeight: '280px', borderTop: '1px solid #e2e8f0' }}>
        {/* LEFT SIDE: ADVANCED APPLICATION TECHNOLOGY */}
        <div style={{ position: 'relative', flex: '1 1 500px', minHeight: '280px', overflow: 'hidden', backgroundColor: '#0f172a' }}>
          <img
            src="/images/detron.jpeg"
            alt="Advanced Application Technology"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.5) 100%)' }} />
          <div style={{ position: 'relative', zIndex: 5, padding: '40px 48px', textAlign: 'left', color: '#ffffff' }}>
            <h3 style={{ fontSize: '26px', fontWeight: '900', margin: '0 0 12px 0', lineHeight: '1.25', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
              Advanced Application<br />Technology
            </h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', margin: '0 0 20px 0', maxWidth: '480px' }}>
              State-of-the-art 4th & 5th axis rotary table integration engineered for precision aerospace, automotive, medical, and die-mold applications.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                <span style={{ color: '#38bdf8', fontWeight: '900', fontSize: '15px' }}>✓</span>
                <span>Dual-Lead Worm & Zero-Backlash Roller Cam Drives</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                <span style={{ color: '#38bdf8', fontWeight: '900', fontSize: '15px' }}>✓</span>
                <span>Full FANUC, Mitsubishi, Siemens & Heidenhain Support</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                <span style={{ color: '#38bdf8', fontWeight: '900', fontSize: '15px' }}>✓</span>
                <span>High Clamping Torque & Sub-Second Indexing Speeds</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: PREMIUM MIDNIGHT BEST PRACTICES PANEL */}
        <div style={{ position: 'relative', flex: '1 1 450px', minHeight: '280px', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', overflow: 'hidden', padding: '40px 48px', borderLeft: '1px solid #1e293b' }}>
          {/* WATERMARK TEXT */}
          <div style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', fontSize: '72px', fontWeight: '900', color: 'rgba(255,255,255,0.06)', whiteSpace: 'nowrap', letterSpacing: '2px', pointerEvents: 'none' }}>
            AXIS ENGINEERING
          </div>
          
          <div style={{ position: 'relative', zIndex: 5, textAlign: 'left', color: '#ffffff' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 20px 0', letterSpacing: '0.5px' }}>
              We Follow Best Practices
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {BEST_PRACTICES.map((item) => (
                <li key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '700', color: '#e2e8f0' }}>
                  <span style={{ fontSize: '16px', color: '#38bdf8' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}