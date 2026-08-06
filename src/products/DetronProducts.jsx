import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header';
import ScrollCanvas from '../animation/ScrollCanvas';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: '4-axis',
    tag: 'HIGH ACCURACY',
    title: '4 Axis Standard Indexers',
    desc: 'Premium series designed for rigid, high-performance workpiece indexing on standard CNC milling centers.',
    img: '/images/products_detron/4th_axis.jpg'
  },
  {
    id: '5-axis',
    tag: 'MULTI-FACE INDEXING',
    title: '5 Axis Tilt Rotary Tables',
    desc: 'Sophisticated 2-axis tilting systems enabling single-setup multi-face component machining for high complexity.',
    img: '/images/products_detron/5th_axis.jpg'
  },
  {
    id: 'auto-pallet-changer',
    tag: 'MAXIMUM PRODUCTIVITY',
    title: 'Auto Pallet Changers',
    desc: 'Fast, reliable pallet changers minimizing spindle downtime and maximizing production run efficiency.',
    img: '/images/products_detron/Auto-Pallet-changer.jpg'
  },
  {
    id: 'special-application',
    tag: 'BESPOKE INTEGRATION',
    title: 'Special Applications',
    desc: 'Bespoke indexing and clamping configurations tailored specifically for unique production line requirements.',
    img: '/images/products_detron/Special-Application.jpg'
  },
  {
    id: 'accessories',
    tag: 'SYSTEM ACCESSORIES',
    title: 'Detron Accessories',
    desc: 'Genuine sub-plates, tailstocks, manual/pneumatic chucks, and rotary joints to optimize setup versatility.',
    img: '/images/products_detron/Accessories.jpg'
  },
  {
    id: 'intelligent-control',
    tag: 'INTELLIGENT INTEGRATION',
    title: 'Intelligent Control System',
    desc: 'Advanced control systems and software integration for real-time monitoring, diagnostics and precision tuning.',
    img: '/images/products_detron/Intelligent-control.jpg'
  }
];

const BEST_PRACTICES = [
  { icon: '\u25B3', label: 'Latest Designs' },
  { icon: '\u24D8', label: 'Modern Technology' },
  { icon: '\u2751', label: 'Project On-Time' },
  { icon: '\u2699', label: 'Improved Machine and Manufacturing Process' }
];

export default function DetronProducts() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const appraisalRef = useRef(null);

  const [zoomStates, setZoomStates] = useState(
    PRODUCTS.map(() => ({ scale: 1, x: 50, y: 50 }))
  );

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStates((prev) => {
      const next = [...prev];
      next[index] = { scale: 1.18, x, y };
      return next;
    });
  };

  const handleMouseLeave = (index) => {
    setZoomStates((prev) => {
      const next = [...prev];
      next[index] = { scale: 1, x: 50, y: 50 };
      return next;
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Cinematic hero fade/scale-in
      gsap.fromTo(
        '.detron-hero-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 1.2 }
      );

      // Slow Ken Burns drift on the hero background
      gsap.fromTo(
        '.detron-hero-bg',
        { scale: 1.08 },
        { scale: 1, duration: 8, ease: 'none'}
      );

      // Left-side product cards: slide in from left
      gsap.fromTo(
        '.card-left',
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Right-side product cards: slide in from right
      gsap.fromTo(
        '.card-right',
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 2.0,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Appraisal / best-practices panel slides up on scroll
      gsap.fromTo(
        appraisalRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: appraisalRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={styles.container}>
      {/* FULL FIXED BACKGROUND FOR 3D CANVAS */}
      <div style={styles.fixedBackgroundWrapper}>
        <ScrollCanvas
          totalFrames={240}
          folderPath="/detron_products_page"
          digits={5}
          startIndex={1}
        />
        <div style={styles.backgroundOverlay} />
      </div>

      <Header activePage="detron" />

      {/* SCROLLABLE LAYOUT CONTENT */}
      <div style={styles.scrollableContent}>
        {/* Spacer for Fixed Header */}
        <div style={{ height: '80px' }} />

        {/* CINEMATIC HERO */}
        <div ref={heroRef} style={styles.heroWrapper}>
          <div className="detron-hero-content" style={styles.heroContent}>
            <span style={styles.heroBadge}>BRAND PARTNER</span>
            <h1 style={styles.heroTitle}>
              DETRON <span style={styles.heroRedHighlight}>PRODUCT RANGE</span>
            </h1>
            <p style={styles.heroDescription}>
              Premium 4 & 5 axis CNC rotary tables, automation, and control systems engineered for
              ultra-rigid, high-accuracy indexing and heavy-duty machining efficiency.
            </p>
          </div>
        </div>

        {/* PRODUCT GRID — 2 columns x 3 rows */}
        <section ref={gridRef} style={styles.productsGrid}>
          {PRODUCTS.map((product, index) => (
            <Link
              key={product.id}
              to={`/products/detron/${product.id}`}
              className={`detron-product-card ${index % 2 === 0 ? 'card-left' : 'card-right'}`}
              style={{ ...styles.productCard, textDecoration: 'none' }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div style={styles.imageWrapper}>
                <img
                  src={product.img}
                  alt={product.title}
                  style={{
                    ...styles.zoomableImage,
                    transform: `scale(${zoomStates[index].scale})`,
                    transformOrigin: `${zoomStates[index].x}% ${zoomStates[index].y}%`
                  }}
                />
              </div>

              <div style={styles.cardContentOverlay}>
                <div>
                  <span style={styles.cardTag}>{product.tag}</span>
                  <h2 style={styles.cardTitle}>{product.title}</h2>
                  <p style={styles.cardText}>{product.desc}</p>
                </div>
                <span style={styles.cardRedButton}>
                  DISCOVER RANGE &gt;
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>

      {/* APPRAISAL / BEST PRACTICES PANEL */}
      <section ref={appraisalRef} style={styles.appraisalSection}>
        <div style={styles.appraisalLeft}>
          <img
            src="/images/products_detron/4th_axis.jpg"
            alt="Advanced Application Technology"
            style={styles.appraisalImage}
          />
          <div style={styles.appraisalLeftOverlay} />
          <h3 style={styles.appraisalLeftText}>
            Advanced Application<br />Technology
          </h3>
        </div>

        <div style={styles.appraisalRight}>
          <span style={styles.appraisalWatermark}>AXIS ENGINEERING</span>
          <div style={styles.appraisalRightContent}>
            <h3 style={styles.appraisalHeading}>We Follow Best Practices</h3>
            <ul style={styles.appraisalList}>
              {BEST_PRACTICES.map((item) => (
                <li key={item.label} style={styles.appraisalListItem}>
                  <span style={styles.appraisalIcon}>{item.icon}</span>
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

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    backgroundColor: '#000000',
    color: '#ffffff',
    margin: 0,
    padding: 0
  },

  /* HEADER STYLES (MATCHES HOMEPAGE ACCURATELY) */
  fixedHeaderGroup: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    width: '100%'
  },
  topBar: {
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    padding: '6px 28px',
    fontSize: '11px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1c1c1c'
  },
  topBarLeft: { display: 'flex', gap: '18px', alignItems: 'center' },
  topBarRight: { display: 'flex', gap: '16px', alignItems: 'center' },
  contactItem: { color: '#f8fafc' },
  utilityLink: { color: '#e2e8f0', textDecoration: 'none', fontWeight: '600' },
  warrantyBtn: {
    backgroundColor: '#E30613',
    color: '#ffffff',
    padding: '6px 12px',
    borderRadius: '2px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '11px'
  },
  mainHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 28px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
  },
  dualLogoGroup: { display: 'flex', alignItems: 'center', gap: '16px' },
  logoLink: { display: 'flex', alignItems: 'center' },
  logoImage: { height: '32px', width: 'auto', objectFit: 'contain' },
  logoImageDetron: { height: '28px', width: 'auto', objectFit: 'contain' },
  logoDivider: { height: '24px', width: '1px', backgroundColor: '#cbd5e1' },
  navMenu: { display: 'flex', alignItems: 'center', gap: '22px' },
  navLink: {
    textDecoration: 'none',
    color: '#0f172a',
    fontWeight: '700',
    fontSize: '11px',
    letterSpacing: '0.3px'
  },
  topContactLink: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '11px',
    textDecoration: 'underline'
  },
  navLinkActive: {
    color: '#E30613',
    fontWeight: '800',
    fontSize: '11px',
    letterSpacing: '0.3px'
  },
  contactHeaderBtn: {
    backgroundColor: '#000000',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '6px 14px',
    borderRadius: '2px',
    fontWeight: '700',
    fontSize: '11px'
  },

  /* SCROLLABLE CONTENT WRAPPER */
  scrollableContent: {
    position: 'relative',
    zIndex: 10,
    width: '100%'
  },

  /* FIXED BACKGROUND WRAPPER */
  fixedBackgroundWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 0,
    pointerEvents: 'none',
    opacity: 0.22,
    backgroundColor: '#000000'
  },
  backgroundOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at center, transparent 35%, #000000 90%)'
  },

  /* CINEMATIC HERO */
  heroWrapper: {
    position: 'relative',
    height: '55vh',
    minHeight: '380px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '820px',
    textAlign: 'center',
    padding: '20px',
    textShadow: '0 2px 10px rgba(0,0,0,0.9)'
  },
  heroBadge: {
    fontSize: '11px',
    fontWeight: '900',
    letterSpacing: '1.5px',
    color: '#E30613',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '6px 12px',
    borderRadius: '2px',
    display: 'inline-block'
  },
  heroTitle: { fontSize: '44px', fontWeight: '900', color: '#ffffff', margin: '20px 0 12px 0', lineHeight: '1.2' },
  heroRedHighlight: { color: '#E30613' },
  heroDescription: { fontSize: '15px', color: '#e2e8f0', lineHeight: '1.6', maxWidth: '620px', margin: '0 auto' },

  /* PRODUCT GRID — fixed 2 columns, 3 rows */
  productsGrid: {
    position: 'relative',
    zIndex: 20,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    padding: '60px 32px',
    backgroundColor: 'transparent',
    borderTop: '1px solid #222'
  },
  productCard: {
    position: 'relative',
    borderRadius: '6px',
    borderTop: '4px solid #E30613',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
    overflow: 'hidden',
    minHeight: '380px',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer'
  },
  imageWrapper: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    overflow: 'hidden',
    backgroundColor: '#000000'
  },
  zoomableImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    imageRendering: 'crisp-edges',
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  cardContentOverlay: {
    position: 'relative',
    zIndex: 10,
    flexGrow: 1,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.7) 100%)',
    padding: '36px 32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'left'
  },
  cardTag: { fontSize: '10px', fontWeight: '800', color: '#E30613', letterSpacing: '1px', textShadow: '0 1px 4px rgba(0,0,0,0.9)' },
  cardTitle: { fontSize: '24px', fontWeight: '900', color: '#ffffff', margin: '8px 0 12px 0', textShadow: '0 2px 8px rgba(0,0,0,0.9)' },
  cardText: { fontSize: '14px', color: '#f1f5f9', lineHeight: '1.6', textShadow: '0 1px 5px rgba(0,0,0,0.9)', maxWidth: '95%' },
  cardRedButton: {
    color: '#E30613',
    fontWeight: '800',
    fontSize: '13px',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: 0,
    cursor: 'pointer',
    display: 'inline-block',
    marginTop: '20px',
    textShadow: '0 1px 4px rgba(0,0,0,0.9)'
  },

  /* APPRAISAL / BEST PRACTICES PANEL */
  appraisalSection: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '260px',
    borderTop: '1px solid #222'
  },
  appraisalLeft: {
    position: 'relative',
    flex: '1 1 400px',
    minHeight: '260px',
    overflow: 'hidden',
    backgroundColor: '#000000'
  },
  appraisalImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.5)'
  },
  appraisalLeftOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)'
  },
  appraisalLeftText: {
    position: 'relative',
    zIndex: 5,
    color: '#ffffff',
    fontSize: '26px',
    fontWeight: '900',
    lineHeight: '1.3',
    padding: '40px',
    maxWidth: '360px',
    textShadow: '0 2px 10px rgba(0,0,0,0.9)'
  },
  appraisalRight: {
    position: 'relative',
    flex: '1 1 400px',
    minHeight: '260px',
    backgroundColor: '#E30613',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden'
  },
  appraisalWatermark: {
    position: 'absolute',
    right: '-10px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '64px',
    fontWeight: '900',
    color: 'rgba(255,255,255,0.12)',
    whiteSpace: 'nowrap',
    letterSpacing: '2px',
    pointerEvents: 'none'
  },
  appraisalRightContent: {
    position: 'relative',
    zIndex: 5,
    padding: '40px'
  },
  appraisalHeading: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '900',
    marginBottom: '18px',
    letterSpacing: '0.5px'
  },
  appraisalList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  appraisalListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '600'
  },
  appraisalIcon: {
    fontSize: '14px',
    color: '#ffffff'
  }
};