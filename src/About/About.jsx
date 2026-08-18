import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const navigate = useNavigate();
  const mainContentRef = useRef(null);
  const coreIntroRef = useRef(null);
  const profileRef = useRef(null);
  const directoryRef = useRef(null);

  // Zoom track state for lower explorer cards
  const [detronZoom, setDetronZoom] = useState({ scale: 1, x: 50, y: 50 });
  const [fixtureZoom, setFixtureZoom] = useState({ scale: 1, x: 50, y: 50 });

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero Text Fade-In
      gsap.fromTo(
        '.about-hero-text',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }
      );

      // Core intro section slides smoothly from Left
      gsap.fromTo(
        coreIntroRef.current,
        { x: '-40vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: coreIntroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Profile cards slide up gracefully from Bottom with stagger
      gsap.fromTo(
        '.profile-card',
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.35,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: profileRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Directory cards slide in from Right
      gsap.fromTo(
        directoryRef.current,
        { x: '40vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: directoryRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e, setZoomState) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomState({ scale: 1.18, x, y });
  };

  const handleMouseLeave = (setZoomState) => {
    setZoomState({ scale: 1, x: 50, y: 50 });
  };

  return (
    <div style={styles.container}>
      {/* FIXED FULL-SCREEN BACKGROUND VIDEO WITH LOW OPACITY */}
      <div style={styles.bgVideoWrapper}>
        <video
          src="/videos/detron_home_page_animation03.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={styles.bgVideo}
        />
        <div style={styles.bgVideoOverlay} />
      </div>

      {/* COMPACT & PROFESSIONAL FIXED HEADER */}
      <div style={styles.fixedHeaderGroup}>
        <div style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <span style={styles.contactItem}>🕿 <strong>+91 98849 12279</strong></span>
            <span style={styles.contactItem}>
              🌐 <Link to="/contact" style={styles.topContactLink}>CONTACT US</Link>
            </span>
          </div>
          <div style={styles.topBarRight}>
            <Link to="/about" style={styles.activeTopLink}>ABOUT US</Link>
          </div>
        </div>

        <header style={styles.mainHeader}>
          <div style={styles.dualLogoGroup}>
            <Link to="/" style={styles.logoLink}>
              <img src="/logo_axis/logo%20axis.jpg.jpeg" alt="Axis Logo" style={styles.logoImage} />
            </Link>
            <div style={styles.logoDivider} />
            <Link to="/products/detron" style={styles.logoLink}>
              <img src="/logo_axis/logo_detron.jpg.png" alt="Detron Logo" style={styles.logoImageDetron} />
            </Link>
          </div>

          <nav style={styles.navMenu}>
            <Link to="/" style={styles.navLink}>HOME</Link>
            <Link to="/products/detron" style={styles.navLink}>PRODUCT RANGE</Link>
            <Link to="/products/fixtures" style={styles.navLink}>CUSTOM FIXTURES</Link>
            <Link to="/contact" style={styles.contactHeaderBtn}>CONTACT PANEL &gt;</Link>
          </nav>
        </header>
      </div>

      {/* MAIN SCROLLABLE BODY CONTENT - CENTERED & EXPANDED */}
      <div style={styles.scrollableContent} ref={mainContentRef}>
        <div style={{ height: '110px' }} />

        {/* HERO SECTION */}
        <section style={styles.heroSection}>
          <div className="about-hero-text" style={styles.heroContent}>
            <span style={styles.heroBadge}>ESTABLISHED 2014</span>
            <h1 style={styles.heroTitle}>
              ABOUT <span style={styles.redHighlight}>AXIS ENGINEERING</span>
            </h1>
            <p style={styles.heroSub}>
              A decade committed to absolute industrial engineering excellence, precision machining workflows, and direct customer satisfaction.
            </p>
          </div>
        </section>

        {/* CORE INTRO STATEMENT */}
        <section ref={coreIntroRef} style={styles.bodyGrid}>
          <div style={styles.textBlock}>
            <span style={styles.sectionTag}>OUR FOUNDATION</span>
            <h2 style={styles.blockTitle}>Welcome to AXIS ENGINEERING SOLUTIONS</h2>
            <p style={styles.missionText}>
              "Our mission is providing cutting edge technology to all at affordable price with world class service."
            </p>
            <p style={styles.bodyParagraph}>
              The success and growth of AXIS ENGINEERING SOLUTIONS is attributed directly to customer satisfaction. We are certain that our unparalleled expertise in the machine tools industry helps clients select the right product for the right application setup dynamically.
            </p>
          </div>
        </section>

        {/* PROFILE CARDS SECTION */}
        <section ref={profileRef} style={styles.profileSection}>
          <div className="profile-card" style={styles.infoCard}>
            <div style={styles.cardImageContainer}>
              <img 
                src="/images/detron.jpeg" 
                alt="Detron Technology NC Rotary Table Reference Profile" 
                style={styles.cardContextImage} 
              />
            </div>
            <span style={styles.cardBadge}>GLOBAL ALLIANCE</span>
            <h3 style={styles.cardTitle}>Detron Machinery Partnership</h3>
            <p style={styles.bodyParagraph}>
              We are proudly associated with the world's largest professional Rotary Table Manufacturer, <strong>Detron Machinery Co. Ltd., Taiwan</strong>. Detron is committed to designing and engineering the highest quality NC rotary table products through the innovation of their International R&D team. Strict quality control ensures elements built completely in-house provide optimum performance.
            </p>
          </div>

          <div className="profile-card" style={styles.infoCard}>
            <div style={styles.cardImageContainer}>
              <img 
                src="/images/fixture.jpeg" 
                alt="Axis Custom Workholding Fixture System Profile" 
                style={styles.cardContextImage} 
              />
            </div>
            <span style={styles.cardBadge}>DESIGN & INFRASTRUCTURE</span>
            <h3 style={styles.cardTitle}>Capability & Infrastructure</h3>
            <p style={styles.bodyParagraph}>
              Located at Ambattur Industrial Estate, Chennai, we maintain stock of fast-selling models to meet urgent demands. Backed by a team highly qualified in Electrical, Electronics, Mechatronics, and Mechanical engineering, we offer an exact point solution for your automation workflows alongside SKT Rotary Joints and custom fixtures.
            </p>
          </div>
        </section>

        {/* PRODUCTS REDIRECTION DIRECTORY PANEL */}
        <section ref={directoryRef} style={styles.directorySection}>
          <div style={styles.directoryHeader}>
            <span style={styles.sectionTag}>PRODUCT PORTFOLIO</span>
            <h2 style={styles.dirMainTitle}>EXPLORE COMPONENT PROFILE</h2>
          </div>
          
          <div style={styles.dirGrid}>
            {/* DETRON CATALOGUE EXPLORER CARD */}
            <div 
              style={styles.dirCard} 
              onClick={() => navigate('/products/detron')}
              onMouseMove={(e) => handleMouseMove(e, setDetronZoom)}
              onMouseLeave={() => handleMouseLeave(setDetronZoom)}
            >
              <div style={styles.imageWrapper}>
                <img 
                  src="/images/detron.jpeg" 
                  alt="Detron Technology Background" 
                  style={{
                    ...styles.zoomableImage,
                    transform: `scale(${detronZoom.scale})`,
                    transformOrigin: `${detronZoom.x}% ${detronZoom.y}%`
                  }}
                />
              </div>
              <div style={styles.dirCardContentOverlay}>
                <span style={styles.dirTag}>NC ROTARY INDEXING</span>
                <h4 style={styles.dirCardTitle}>DETRON NC ROTARY TABLES</h4>
                <p style={styles.dirCardDesc}>
                  4th & 5th Axis indexing tables, Tilting mechanisms, Support tables and Genuine Accessories.
                </p>
                <span style={styles.dirLink}>VIEW DETRON CATALOGUE &gt;</span>
              </div>
            </div>

            {/* CUSTOM FIXTURES EXPLORER CARD */}
            <div 
              style={styles.dirCard} 
              onClick={() => navigate('/products/fixtures')}
              onMouseMove={(e) => handleMouseMove(e, setFixtureZoom)}
              onMouseLeave={() => handleMouseLeave(setFixtureZoom)}
            >
              <div style={styles.imageWrapper}>
                <img 
                  src="/images/fixture.jpeg" 
                  alt="Custom Fixtures Background" 
                  style={{
                    ...styles.zoomableImage,
                    transform: `scale(${fixtureZoom.scale})`,
                    transformOrigin: `${fixtureZoom.x}% ${fixtureZoom.y}%`
                  }}
                />
              </div>
              <div style={styles.dirCardContentOverlay}>
                <span style={styles.dirTag}>WORKHOLDING SOLUTIONS</span>
                <h4 style={styles.dirCardTitle}>CUSTOM WORKHOLDING FIXTURES</h4>
                <p style={styles.dirCardDesc}>
                  Bespoke clamping configurations engineered precisely to boost production lines.
                </p>
                <span style={styles.dirLink}>EXPLORE FIXTURE RANGE &gt;</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  container: { position: 'relative', backgroundColor: '#000000', color: '#ffffff', fontFamily: 'Segoe UI, Arial, sans-serif', minHeight: '220vh', overflowX: 'hidden' },
  
  bgVideoWrapper: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, overflow: 'hidden', pointerEvents: 'none' },
  bgVideo: { width: '100%', height: '100%', objectFit: 'cover', opacity: 0.50 }, 
  bgVideoOverlay: { position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.9) 100%)' },

  /* COMPACT FIXED HEADER STYLES */
  fixedHeaderGroup: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 },
  topBar: { backgroundColor: '#0a0a0a', padding: '6px 28px', fontSize: '11px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1c1c1c' },
  topBarLeft: { display: 'flex', gap: '18px', alignItems: 'center' },
  topBarRight: { display: 'flex', alignItems: 'center' },
  topContactLink: { color: '#ffffff', textDecoration: 'underline', fontWeight: '700' },
  activeTopLink: { color: '#E30613', fontWeight: '800', textDecoration: 'none' },
  mainHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 28px', backgroundColor: 'rgba(255, 255, 255, 0.98)', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' },
  
  /* DUAL LOGO HEADER LAYOUT */
  dualLogoGroup: { display: 'flex', alignItems: 'center', gap: '16px' },
  logoLink: { display: 'flex', alignItems: 'center' },
  logoImage: { height: '32px', width: 'auto', objectFit: 'contain' },
  logoImageDetron: { height: '28px', width: 'auto', objectFit: 'contain' },
  logoDivider: { height: '24px', width: '1px', backgroundColor: '#cbd5e1' },
  
  navMenu: { display: 'flex', alignItems: 'center', gap: '22px' },
  navLink: { textDecoration: 'none', color: '#0f172a', fontWeight: '700', fontSize: '11px', letterSpacing: '0.3px' },
  contactHeaderBtn: { backgroundColor: '#000000', color: '#ffffff', textDecoration: 'none', padding: '6px 14px', borderRadius: '2px', fontWeight: '700', fontSize: '11px' },
  
  scrollableContent: { position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', paddingBottom: '120px' },
  heroSection: { padding: '80px 24px 50px 24px', textAlign: 'center' },
  heroContent: { maxWidth: '800px', margin: '0 auto' },
  heroBadge: { fontSize: '10px', color: '#E30613', letterSpacing: '2.5px', fontWeight: '900', backgroundColor: 'rgba(0,0,0,0.6)', padding: '5px 12px', borderRadius: '2px', border: '1px solid rgba(227,6,19,0.3)' },
  heroTitle: { fontSize: '42px', fontWeight: '900', marginTop: '14px', letterSpacing: '1px', lineHeight: '1.2' },
  redHighlight: { color: '#E30613' },
  heroSub: { color: '#e2e8f0', maxWidth: '650px', margin: '18px auto 0 auto', fontSize: '15px', lineHeight: '1.7' },
  
  bodyGrid: { padding: '50px 24px', display: 'flex', justifyContent: 'center' },
  textBlock: { maxWidth: '900px', width: '100%', lineHeight: '1.8', fontSize: '15px', color: '#e2e8f0', backgroundColor: 'rgba(10, 10, 10, 0.85)', padding: '40px', borderRadius: '8px', border: '1px solid #222', backdropFilter: 'blur(8px)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' },
  sectionTag: { fontSize: '10px', color: '#E30613', fontWeight: '900', letterSpacing: '2px' },
  blockTitle: { fontSize: '26px', fontWeight: '900', color: '#ffffff', margin: '8px 0 16px 0' },
  missionText: { fontSize: '19px', color: '#E30613', fontWeight: '700', fontStyle: 'italic', margin: '20px 0', lineHeight: '1.5' },
  bodyParagraph: { fontSize: '14px', color: '#cbd5e1', lineHeight: '1.8' },
  
  profileSection: { display: 'flex', flexWrap: 'wrap', gap: '32px', padding: '50px 24px', justifyContent: 'center' },
  infoCard: { flex: '1 1 450px', maxWidth: '500px', backgroundColor: 'rgba(15, 15, 15, 0.88)', padding: '28px', borderRadius: '8px', borderLeft: '4px solid #E30613', borderTop: '1px solid #222', borderRight: '1px solid #222', borderBottom: '1px solid #222', backdropFilter: 'blur(10px)', boxShadow: '0 20px 45px rgba(0,0,0,0.7)' },
  cardImageContainer: { width: '100%', height: '220px', overflow: 'hidden', borderRadius: '6px', marginBottom: '20px', border: '1px solid #333' },
  cardContextImage: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  cardBadge: { fontSize: '10px', color: '#E30613', fontWeight: '800', letterSpacing: '1.5px' },
  cardTitle: { fontSize: '20px', fontWeight: '900', color: '#ffffff', margin: '6px 0 14px 0' },

  directorySection: { padding: '70px 24px 40px 24px' },
  directoryHeader: { textAlign: 'center', marginBottom: '40px' },
  dirMainTitle: { fontSize: '28px', fontWeight: '900', color: '#ffffff', marginTop: '8px' },
  dirGrid: { display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' },
  dirCard: { position: 'relative', flex: '1 1 450px', maxWidth: '500px', borderTop: '4px solid #E30613', overflow: 'hidden', borderRadius: '8px', cursor: 'pointer', minHeight: '320px', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' },
  imageWrapper: { position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', backgroundColor: '#000000' },
  zoomableImage: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' },
  dirCardContentOverlay: { position: 'relative', zIndex: 10, flexGrow: 1, background: 'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.9) 100%)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' },
  dirTag: { fontSize: '10px', color: '#E30613', fontWeight: '800', letterSpacing: '1.5px' },
  dirCardTitle: { fontSize: '20px', fontWeight: '900', color: '#ffffff', margin: '8px 0 10px 0' },
  dirCardDesc: { fontSize: '13px', color: '#e2e8f0', lineHeight: '1.6' },
  dirLink: { display: 'inline-block', marginTop: '20px', color: '#E30613', fontWeight: '800', fontSize: '12px', letterSpacing: '0.5px' }
};