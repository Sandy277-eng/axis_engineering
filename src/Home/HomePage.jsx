import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const heroSectionRef = useRef(null);
  const aboutSectionRef = useRef(null); 
  const cardsContainerRef = useRef(null); 
  const homeAboutPanelRef = useRef(null);

  const scrollToProducts = (e) => {
    if (e) e.preventDefault();
    cardsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [detronZoom, setDetronZoom] = useState({ scale: 1, x: 50, y: 50 });
  const [fixtureZoom, setFixtureZoom] = useState({ scale: 1, x: 50, y: 50 });

  useEffect(() => {
    window.scrollTo(0, 0);

    const aboutCtx = gsap.context(() => {
      gsap.fromTo(
        aboutSectionRef.current,
        { x: '100vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    const slideCtx = gsap.context(() => {
      gsap.fromTo(".slide-card",
        { x: '100vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.25,
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, cardsContainerRef);

    const detailedAboutCtx = gsap.context(() => {
      gsap.fromTo(
        '.about-panel-pop',
        { x: -120, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: homeAboutPanelRef.current,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1
          }
        }
      );
    });

    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      aboutCtx.revert();
      slideCtx.revert();
      detailedAboutCtx.revert();
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
      {/* COMPACT & PROFESSIONAL FIXED HEADER WRAPPER */}
      <div style={styles.fixedHeaderGroup}>
        <div style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <span style={styles.contactItem}>🕿 <strong>+91 98849 12279</strong></span>
            <span style={styles.contactItem}>
              🌐 <Link to="/contact" style={styles.topContactLink}>CONTACT US</Link>
            </span>
          </div>

          <div style={styles.topBarRight}>
            <Link to="/about" style={styles.topAboutLink}>ABOUT</Link>
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
              <button style={styles.searchBtn}>🛒</button>
            </div>
          </div>
        </div>

        <header style={styles.mainHeader}>
          <div style={styles.dualLogoGroup}>
            <Link to="/" style={styles.logoLink}>
              <img
                src="/logo_axis/logo%20axis.jpg.jpeg"
                alt="Axis Engineering Solutions Logo"
                style={styles.logoImage}
              />
            </Link>
            <div style={styles.logoDivider} />
            <Link to="/products/detron" style={styles.logoLink}>
              <img
                src="/logo_axis/logo_detron.jpg.png"
                alt="Detron Logo"
                style={styles.logoImageDetron}
              />
            </Link>
          </div>

          <nav style={styles.navMenu}>
            <button onClick={scrollToProducts} style={styles.navLinkBtn}>DISCOVER AXIS</button>
            <Link to="/products/detron" style={styles.navLink}>PRODUCT RANGE</Link>
            <Link to="/products/fixtures" style={styles.navLink}>CUSTOM FIXTURES</Link>
            <Link to="/contact" style={styles.contactHeaderBtn}>CONTACT PANEL &gt;</Link>
          </nav>
        </header>
      </div>

      {/* VIDEO HERO SECTION */}
      <div ref={heroSectionRef} style={styles.pinnedHeroWrapper}>
        <video
          src="/videos/detron_home_page_animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={styles.heroVideo}
        />
        <div style={styles.heroVideoOverlay} />

        <div style={styles.heroTextOverlay}>
          <span style={styles.heroBadge}>THE WORLD'S LEADING CNC ROTARY TABLE SOLUTIONS</span>
          <h1 style={styles.heroTitle}>
            PRECISION SYSTEMS FOR <br />
            <span style={styles.heroRedHighlight}>INDUSTRIAL EXCELLENCE</span>
          </h1>
          <p style={styles.heroDescription}>
            All Detron products and custom workholding fixtures are engineered, assembled, tested, and verified to achieve ultimate machining precision.
          </p>

          <div style={styles.heroButtonContainer}>
            <button onClick={() => navigate('/products/detron')} style={styles.btnRedPrimary}>DETRON PRODUCTS &gt;</button>
            <button onClick={() => navigate('/products/fixtures')} style={styles.btnOutline}>CUSTOM FIXTURES &gt;</button>
          </div>
        </div>
      </div>

      {/* ABOUT / OUR PRODUCTS INTRO SECTION */}
      <div style={styles.aboutWrapperClip}>
        <section ref={aboutSectionRef} style={styles.aboutSection}>
          <div style={styles.aboutImageCol}>
            <img
              src="/images/axis.jpg"
              alt="Axis Engineering CNC Machine"
              style={styles.aboutImage}
            />
          </div>

          <div style={styles.aboutTextCol}>
            <div style={styles.aboutLogoRow}>
              <span style={styles.aboutLogoIcon}>✛</span>
              <span style={styles.aboutLogoTitle}>
                <span style={styles.aboutLogoAxis}>AXIS</span>{' '}
                <span style={styles.aboutLogoRest}>ENGINEERING SOLUTIONS</span>
              </span>
            </div>

            <p style={styles.aboutDescription}>
              Our strong capabilities in Electrical, Mechatronics and Mechanical engineering, together with domain understanding and product knowledge, enable us to provide solutions from concept and detailed design through manufacturing and sourcing support. Over the years, we have supported our customers.
            </p>

            <button onClick={scrollToProducts} style={styles.aboutKnowMoreBtn}>
              DISCOVER RANGE &gt;
            </button>
          </div>
        </section>
      </div>

      {/* LOWER CONTENT SOLUTIONS & CATEGORY TRACK */}
      <div style={styles.scrollWrapperClip}>
        <section ref={cardsContainerRef} style={styles.categorySection}>
          {/* DETRON PRODUCT CARD */}
          <Link
            to="/products/detron"
            className="slide-card"
            style={{ ...styles.categoryCard, textDecoration: 'none' }}
            onMouseMove={(e) => handleMouseMove(e, setDetronZoom)}
            onMouseLeave={() => handleMouseLeave(setDetronZoom)}
          >
            <div style={styles.imageWrapper}>
              <img
                src="/images/detron.jpeg"
                alt="Detron Technology CNC Rotary Table"
                style={{
                  ...styles.zoomableImage,
                  transform: `scale(${detronZoom.scale})`,
                  transformOrigin: `${detronZoom.x}% ${detronZoom.y}%`
                }}
              />
            </div>

            <div style={styles.cardContentOverlay}>
              <div>
                <span style={styles.cardTag}>BRAND PARTNER</span>
                <h2 style={styles.cardTitle}>Detron Technology</h2>
                <p style={styles.cardText}>
                  Premium 4 & 5 axis CNC rotary tables built for ultra-rigid, high-accuracy indexing and heavy-duty machining efficiency.
                </p>
              </div>
              <span style={styles.cardRedButton}>
                DISCOVER DETRON RANGE &gt;
              </span>
            </div>
          </Link>

          {/* CUSTOM FIXTURES CARD */}
          <Link
            to="/products/fixtures"
            className="slide-card"
            style={{ ...styles.categoryCard, textDecoration: 'none' }}
            onMouseMove={(e) => handleMouseMove(e, setFixtureZoom)}
            onMouseLeave={() => handleMouseLeave(setFixtureZoom)}
          >
            <div style={styles.imageWrapper}>
              <img
                src="/images/fixture.jpeg"
                alt="Axis Engineering Custom Workholding Fixture"
                style={{
                  ...styles.zoomableImage,
                  transform: `scale(${fixtureZoom.scale})`,
                  transformOrigin: `${fixtureZoom.x}% ${fixtureZoom.y}%`
                }}
              />
            </div>

            <div style={styles.cardContentOverlay}>
              <div>
                <span style={styles.cardTag}>BESPOKE DESIGN</span>
                <h2 style={styles.cardTitle}>Custom Fixtures</h2>
                <p style={styles.cardText}>
                  Tailored high-precision clamping and workholding fixtures designed specifically to match complex component geometries and increase productivity.
                </p>
              </div>
              <span style={styles.cardRedButton}>
                EXPLORE FIXTURE SOLUTIONS &gt;
              </span>
            </div>
          </Link>
        </section>
      </div>

      {/* DETAILED SCRUB POPUP ABOUT PANEL */}
      <div style={styles.scrollWrapperClip} ref={homeAboutPanelRef}>
        <section style={styles.homeAboutPanel} className="about-panel-pop">
          <div style={styles.panelBlock}>
            <span style={styles.panelBadge}>COMPANY PROFILE</span>
            <h2 style={styles.panelHeading}>About Us</h2>
            <h3 style={styles.panelSubheading}>Welcome to AXIS ENGINEERING SOLUTIONS</h3>
            <p style={styles.panelParagraph}>
              Our mission is <strong>“Cutting edge technology to all at affordable price with world class service”</strong>. The success & growth of AXIS ENGINEERING SOLUTIONS is attributed to customer satisfaction. We are certain that with our unparalleled expertise in machine tools industry which helps the customer to select right product for Right application.
            </p>
            <p style={styles.panelParagraph}>
              We are proudly associated with the world Largest Professional Rotary Table Manufacturer, detron Machinery Co. Ltd., Taiwan. detron employs strict quality control at all stages of manufacture, processing elements completely in house to verify absolute standard quality output.
            </p>
            <div style={styles.panelButtonContainer}>
              <button onClick={() => navigate('/about')} style={styles.btnRedPrimary}>READ FULL ACCOUNT &gt;</button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  container: { position: 'relative', width: '100%', fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif', backgroundColor: '#000000', color: '#ffffff', margin: 0, padding: 0 },
  
  /* COMPACT FIXED HEADER STYLES */
  fixedHeaderGroup: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, width: '100%' },
  topBar: { backgroundColor: '#0a0a0a', color: '#ffffff', padding: '6px 28px', fontSize: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1c1c1c' },
  topBarLeft: { display: 'flex', gap: '18px', alignItems: 'center' },
  topBarRight: { display: 'flex', gap: '16px', alignItems: 'center' },
  contactItem: { color: '#f8fafc' },
  topContactLink: { color: '#ffffff', fontWeight: '700', fontSize: '11px', textDecoration: 'underline' },
  topAboutLink: { color: '#ffffff', textDecoration: 'none', fontWeight: '700', fontSize: '11px', letterSpacing: '0.5px', cursor: 'pointer', transition: 'color 0.2s' },
  searchBox: { display: 'flex', alignItems: 'center', backgroundColor: '#171717', padding: '3px 6px', borderRadius: '2px', border: '1px solid #333' },
  searchInput: { background: 'none', border: 'none', color: '#fff', fontSize: '11px', outline: 'none', width: '110px' },
  searchBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px' },
  mainHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 28px', backgroundColor: 'rgba(255, 255, 255, 0.98)', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' },
  
  /* DUAL LOGO HEADER LAYOUT */
  dualLogoGroup: { display: 'flex', alignItems: 'center', gap: '16px' },
  logoLink: { display: 'flex', alignItems: 'center' },
  logoImage: { height: '32px', width: 'auto', objectFit: 'contain' },
  logoImageDetron: { height: '28px', width: 'auto', objectFit: 'contain' },
  logoDivider: { height: '24px', width: '1px', backgroundColor: '#cbd5e1' },

  navMenu: { display: 'flex', alignItems: 'center', gap: '22px' },
  navLink: { textDecoration: 'none', color: '#0f172a', fontWeight: '700', fontSize: '11px', letterSpacing: '0.3px' },
  navLinkBtn: { background: 'none', border: 'none', color: '#0f172a', fontWeight: '700', fontSize: '11px', letterSpacing: '0.3px', cursor: 'pointer', padding: 0, fontFamily: 'inherit' },
  contactHeaderBtn: { backgroundColor: '#000000', color: '#ffffff', textDecoration: 'none', border: 'none', padding: '6px 14px', borderRadius: '2px', cursor: 'pointer', fontWeight: '700', fontSize: '11px' },
  
  pinnedHeroWrapper: { position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000', paddingTop: '80px' },
  heroVideo: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', zIndex: 0 },
  heroVideoOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.85) 100%)', zIndex: 1 },
  heroTextOverlay: { position: 'relative', zIndex: 10, maxWidth: '850px', textAlign: 'center', padding: '20px', textShadow: '0 2px 10px rgba(0,0,0,0.9)' },
  heroBadge: { fontSize: '11px', fontWeight: '900', letterSpacing: '1.5px', color: '#E30613', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '6px 12px', borderRadius: '2px', display: 'inline-block' },
  heroTitle: { fontSize: '42px', fontWeight: '900', color: '#ffffff', margin: '20px 0 12px 0', lineHeight: '1.2' },
  heroRedHighlight: { color: '#E30613' },
  heroDescription: { fontSize: '15px', color: '#e2e8f0', lineHeight: '1.6', maxWidth: '650px', margin: '0 auto' },
  heroButtonContainer: { marginTop: '28px', display: 'flex', gap: '16px', justifyContent: 'center' },
  btnRedPrimary: { backgroundColor: '#E30613', color: '#ffffff', padding: '12px 28px', border: 'none', borderRadius: '25px', cursor: 'pointer', textDecoration: 'none', fontWeight: '800', fontSize: '12px' },
  btnOutline: { backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#ffffff', padding: '12px 28px', borderRadius: '25px', fontWeight: '800', fontSize: '12px', border: '2px solid #ffffff', cursor: 'pointer' },
  aboutWrapperClip: { width: '100%', overflowX: 'hidden', backgroundColor: '#ffffff' },
  aboutSection: { position: 'relative', zIndex: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '56px', padding: '80px 48px', backgroundColor: '#ffffff', maxWidth: '1200px', margin: '0 auto' },
  aboutImageCol: { flex: '1 1 340px', minWidth: '300px' },
  aboutImage: { width: '100%', height: 'auto', borderRadius: '6px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.18)', display: 'block' },
  aboutTextCol: { flex: '1 1 380px', minWidth: '300px', color: '#0f172a' },
  aboutLogoRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' },
  aboutLogoIcon: { color: '#E30613', fontSize: '26px', fontWeight: '900' },
  aboutLogoTitle: { fontSize: '22px', fontWeight: '900' },
  aboutLogoAxis: { color: '#E30613' },
  aboutLogoRest: { color: '#334155' },
  aboutDescription: { fontSize: '15px', color: '#334155', lineHeight: '1.8', marginBottom: '28px' },
  aboutKnowMoreBtn: { backgroundColor: '#E30613', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '2px', fontWeight: '800', fontSize: '12px', letterSpacing: '0.5px', cursor: 'pointer' },
  scrollWrapperClip: { width: '100%', overflowX: 'hidden' },
  categorySection: { position: 'relative', zIndex: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', padding: '60px 32px', backgroundColor: '#000000', borderTop: '1px solid #222' },
  categoryCard: { position: 'relative', borderRadius: '6px', borderTop: '4px solid #E30613', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)', overflow: 'hidden', minHeight: '380px', display: 'flex', flexDirection: 'column', cursor: 'pointer' },
  imageWrapper: { position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', backgroundColor: '#000000' },
  zoomableImage: { width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'crisp-edges', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' },
  cardContentOverlay: { position: 'relative', zIndex: 10, flexGrow: 1, background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.7) 100%)', padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' },
  cardTag: { fontSize: '10px', fontWeight: '800', color: '#E30613', letterSpacing: '1px', textShadow: '0 1px 4px rgba(0,0,0,0.9)' },
  cardTitle: { fontSize: '26px', fontWeight: '900', color: '#ffffff', margin: '8px 0 12px 0', textShadow: '0 2px 8px rgba(0,0,0,0.9)' },
  cardText: { fontSize: '14px', color: '#f1f5f9', lineHeight: '1.6', textShadow: '0 1px 5px rgba(0,0,0,0.9)', maxWidth: '90%' },
  cardRedButton: { color: '#E30613', fontWeight: '800', fontSize: '13px', textDecoration: 'none', display: 'inline-block', marginTop: '20px', textShadow: '0 1px 4px rgba(0,0,0,0.9)' },
  homeAboutPanel: { padding: '80px 32px', backgroundColor: '#0a0a0a', borderTop: '1px solid #222', display: 'flex', justifyContent: 'center' },
  panelBlock: { maxWidth: '900px', width: '100%' },
  panelBadge: { fontSize: '11px', color: '#E30613', fontWeight: '900', letterSpacing: '1.5px' },
  panelHeading: { fontSize: '36px', fontWeight: '900', margin: '10px 0 5px 0', color: '#ffffff' },
  panelSubheading: { fontSize: '18px', fontWeight: '700', color: '#cccccc', marginBottom: '20px' },
  panelParagraph: { fontSize: '14px', color: '#e2e8f0', lineHeight: '1.7', marginBottom: '16px' },
  panelButtonContainer: { marginTop: '24px' }
};