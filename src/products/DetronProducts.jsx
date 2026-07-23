import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: '4th-axis',
    tag: 'PRECISION INDEXING',
    title: '4th Axis Rotary Tables',
    desc: 'Compact, ultra-rigid single-axis rotary tables engineered for high-accuracy indexing on 3-axis machining centres.',
    img: '/images/products_detron/4th_axis.jpg'
  },
  {
    id: '5th-axis',
    tag: 'MULTI-AXIS MACHINING',
    title: '5th Axis Rotary Tables',
    desc: 'Combined tilt & rotary units built for complex, multi-face component machining in a single setup.',
    img: '/images/products_detron/5th_axis.jpg'
  },
  {
    id: 'accessories',
    tag: 'SUPPORTING COMPONENTS',
    title: 'Accessories',
    desc: 'Clamping kits, tailstocks, chucks and workholding accessories that extend and complement the Detron range.',
    img: '/images/products_detron/Accessories.jpg'
  },
  {
    id: 'auto-pallet-changer',
    tag: 'AUTOMATED WORKFLOW',
    title: 'Auto Pallet Changer',
    desc: 'Automated pallet handling systems that cut idle spindle time and keep production running unattended.',
    img: '/images/products_detron/Auto-Pallet-changer.jpg'
  },
  {
    id: 'special-application',
    tag: 'CUSTOM ENGINEERED',
    title: 'Special Application',
    desc: 'Purpose-built rotary and indexing solutions engineered around a customer\u2019s specific component geometry.',
    img: '/images/products_detron/Special-Application.jpg'
  },
  {
    id: 'intelligent-control',
    tag: 'SMART SYSTEMS',
    title: 'Intelligent Control',
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
  const navigate = useNavigate();
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
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );

      // Slow Ken Burns drift on the hero background
      gsap.fromTo(
        '.detron-hero-bg',
        { scale: 1.08 },
        { scale: 1, duration: 8, ease: 'none' }
      );

      // Product cards: staggered fade + rise as the grid scrolls into view
      gsap.fromTo(
        '.detron-product-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
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

      // Appraisal / best-practices panel slides up on scroll
      gsap.fromTo(
        appraisalRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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

      {/* FIXED HEADER WRAPPER (matches homepage) */}
      <div style={styles.fixedHeaderGroup}>
        <div style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <span style={styles.contactItem}>\uD83D\uDD3F <strong>+91 98849 12279</strong></span>
            <span style={styles.contactItem}>
              \uD83C\uDF10 <button onClick={() => navigate('/contact')} style={styles.topContactBtn}>CONTACT US</button>
            </span>
          </div>
          <div style={styles.topBarRight}>
            <a href="#resource-centre" style={styles.utilityLink}>RESOURCE CENTRE</a>
            <a href="#register-warranty" style={styles.warrantyBtn}>REGISTER WARRANTY \uD83D\uDEE1\uFE0F</a>
          </div>
        </div>

        <header style={styles.mainHeader}>
          <div style={styles.logoGroup} onClick={() => navigate('/')}>
            <span style={styles.logoMain}>AXIS</span>
            <span style={styles.logoSub}>ENGINEERING SOLUTIONS</span>
          </div>

          <nav style={styles.navMenu}>
            <button onClick={() => navigate('/')} style={styles.navLinkBtn}>HOME</button>
            <span style={styles.navLinkActive}>DETRON PRODUCTS</span>
            <button onClick={() => navigate('/products/fixtures')} style={styles.navLinkBtn}>CUSTOM FIXTURES</button>
            <button onClick={() => navigate('/contact')} style={styles.contactHeaderBtn}>CONTACT PANEL &gt;</button>
          </nav>
        </header>
      </div>

      {/* CINEMATIC HERO */}
      <div ref={heroRef} style={styles.heroWrapper}>
        <div
          className="detron-hero-bg"
          style={{
            ...styles.heroBg,
            backgroundImage: `url(/images/DETRON_CNC_rotary_table_product_202607230950.jpeg)`
          }}
        />
        <div style={styles.heroGradient} />

        <div className="detron-hero-content" style={styles.heroContent}>
          <span style={styles.heroBadge}>BRAND PARTNER</span>
          <h1 style={styles.heroTitle}>
            DETRON <span style={styles.heroRedHighlight}>PRODUCT RANGE</span>
          </h1>
          <p style={styles.heroDescription}>
            Premium 4th & 5th axis CNC rotary tables, automation, and control systems engineered for
            ultra-rigid, high-accuracy indexing and heavy-duty machining efficiency.
          </p>
        </div>
      </div>

      {/* PRODUCT GRID — 2 columns x 3 rows */}
      <section ref={gridRef} style={styles.productsGrid}>
        {PRODUCTS.map((product, index) => (
          <div
            key={product.id}
            className="detron-product-card"
            style={styles.productCard}
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
              <button onClick={() => navigate('/contact')} style={styles.cardRedButton}>
                ENQUIRE NOW &gt;
              </button>
            </div>
          </div>
        ))}
      </section>

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

  /* HEADER (same visual language as HomePage) */
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
    padding: '8px 32px',
    fontSize: '11px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #222'
  },
  topBarLeft: { display: 'flex', gap: '20px', alignItems: 'center' },
  topBarRight: { display: 'flex', gap: '16px', alignItems: 'center' },
  contactItem: { color: '#f8fafc' },
  topContactBtn: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '11px',
    textDecoration: 'underline'
  },
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
    padding: '16px 32px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottom: '1px solid #e2e8f0'
  },
  logoGroup: { cursor: 'pointer', display: 'flex', flexDirection: 'column' },
  logoMain: { fontSize: '24px', fontWeight: '900', letterSpacing: '1.5px', color: '#000000' },
  logoSub: { fontSize: '9px', fontWeight: '800', letterSpacing: '1px', color: '#E30613' },
  navMenu: { display: 'flex', alignItems: 'center', gap: '28px' },
  navLinkBtn: {
    background: 'none',
    border: 'none',
    color: '#0f172a',
    fontWeight: '700',
    fontSize: '12px',
    letterSpacing: '0.5px',
    cursor: 'pointer'
  },
  navLinkActive: {
    color: '#E30613',
    fontWeight: '800',
    fontSize: '12px',
    letterSpacing: '0.5px'
  },
  contactHeaderBtn: {
    backgroundColor: '#000000',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '2px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '12px'
  },

  /* CINEMATIC HERO */
  heroWrapper: {
    position: 'relative',
    height: '70vh',
    minHeight: '480px',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingTop: '100px'
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.55) saturate(1.1)'
  },
  heroGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.85) 100%)'
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
    backgroundColor: '#000000',
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