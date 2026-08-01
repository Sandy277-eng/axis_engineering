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
  const aboutSectionRef = useRef(null); // Ref for the sliding "About / Our Products" section
  const cardsContainerRef = useRef(null); // Ref for the sliding cards section

  const scrollToProducts = (e) => {
    if (e) e.preventDefault();
    cardsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // States for interactive cursor zoom tracking
  const [detronZoom, setDetronZoom] = useState({ scale: 1, x: 50, y: 50 });
  const [fixtureZoom, setFixtureZoom] = useState({ scale: 1, x: 50, y: 50 });

  useEffect(() => {
    // Start at the top every time HomePage mounts (e.g. navigating back from /contact)
    window.scrollTo(0, 0);

    // 1. SLIDE FROM RIGHT ENTRANCE ANIMATION FOR THE ABOUT/PRODUCTS INTRO SECTION
    const aboutCtx = gsap.context(() => {
      gsap.fromTo(
        aboutSectionRef.current,
        {
          x: '100vw',
          opacity: 0
        },
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

    // 2. SLIDE FROM RIGHT ENTRANCE ANIMATION FOR CARDS
    // Grabs all child divs (.slide-card) and animates them when container enters viewport
    const slideCtx = gsap.context(() => {
      gsap.fromTo(".slide-card",
        {
          x: '100vw', // Start completely off-screen to the right
          opacity: 0
        },
        {
          x: 0, // Slide to original layout position
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.25, // Delays the second card slightly for a premium sequence effect
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 85%", // Starts animation when the section top reaches 85% of viewport height
            toggleActions: "play none none none" // Plays once when scrolling down
          }
        }
      );
    }, cardsContainerRef);

    // Recalculate all trigger start/end positions once layout has settled.
    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      aboutCtx.revert();
      slideCtx.revert(); // Clean up GSAP animations on unmount
    };
  }, []);

  // Handler to calculate focal point based on cursor position over the card
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

      {/* FIXED HEADER WRAPPER */}
      <div style={styles.fixedHeaderGroup}>
        {/* TOP UTILITY HEADER */}
        <div style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <span style={styles.contactItem}>🕿 <strong>+91 98849 12279</strong></span>
            <span style={styles.contactItem}>
              🌐 <Link to="/contact" style={styles.topContactLink}>CONTACT US</Link>
            </span>
          </div>

          <div style={styles.topBarRight}>
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
            <a href="#resource-centre" style={styles.utilityLink}>RESOURCE CENTRE</a>
            <Link to="/contact" style={styles.warrantyBtn}>REGISTER WARRANTY 📝</Link>
          </div>
        </div>

        {/* MAIN NAVIGATION BAR */}
        <header style={styles.mainHeader}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={styles.logoGroup}>
              <img
                src="/logo_axis/logo%20axis.jpg.jpeg"
                alt="Axis Engineering Solutions Logo"
                style={styles.logoImage}
              />
            </div>
          </Link>

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
      {/* Sits between the pinned hero animation and the Detron/Fixtures cards below. */}
      {/* Slides in from the right the first time it scrolls into view. */}
      <div style={styles.aboutWrapperClip}>
        <section ref={aboutSectionRef} style={styles.aboutSection}>
          <div style={styles.aboutImageCol}>
            {/* TODO: confirm exact filename inside /images/axis/ */}
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
      {/* Attached cardsContainerRef and overflow hidden wrapper to handle sliding clean */}
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
                  Premium 4th & 5th axis CNC rotary tables built for ultra-rigid, high-accuracy indexing and heavy-duty machining efficiency.
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
  topContactLink: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '11px',
    textDecoration: 'underline'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#171717',
    padding: '4px 8px',
    borderRadius: '2px',
    border: '1px solid #333'
  },
  searchInput: { background: 'none', border: 'none', color: '#fff', fontSize: '11px', outline: 'none', width: '110px' },
  searchBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px' },
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
  logoGroup: { cursor: 'pointer', display: 'flex', alignItems: 'center' },
  logoImage: { height: '48px', width: 'auto', display: 'block', objectFit: 'contain' },
  navMenu: { display: 'flex', alignItems: 'center', gap: '28px' },
  navLink: { textDecoration: 'none', color: '#0f172a', fontWeight: '700', fontSize: '12px', letterSpacing: '0.5px' },
  navLinkBtn: {
    background: 'none',
    border: 'none',
    color: '#0f172a',
    fontWeight: '700',
    fontSize: '12px',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    padding: 0,
    fontFamily: 'inherit'
  },
  contactHeaderBtn: {
    backgroundColor: '#000000',
    color: '#ffffff',
    textDecoration: 'none',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '2px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '12px'
  },
  pinnedHeroWrapper: {
    position: 'relative',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingTop: '100px'
  },
  heroVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
    zIndex: 0
  },
  heroVideoOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.85) 100%)',
    zIndex: 1
  },
  heroTextOverlay: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '850px',
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
  heroTitle: { fontSize: '42px', fontWeight: '900', color: '#ffffff', margin: '20px 0 12px 0', lineHeight: '1.2' },
  heroRedHighlight: { color: '#E30613' },
  heroDescription: { fontSize: '15px', color: '#e2e8f0', lineHeight: '1.6', maxWidth: '650px', margin: '0 auto' },
  heroButtonContainer: { marginTop: '28px', display: 'flex', gap: '16px', justifyContent: 'center' },
  btnRedPrimary: {
    backgroundColor: '#E30613',
    color: '#ffffff',
    padding: '12px 28px',
    borderRadius: '25px',
    textDecoration: 'none',
    fontWeight: '800',
    fontSize: '12px'
  },
  btnOutline: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
    padding: '12px 28px',
    borderRadius: '25px',
    fontWeight: '800',
    fontSize: '12px',
    border: '2px solid #ffffff',
    cursor: 'pointer'
  },

  /* Clips sideways overflow while the About section slides in from the right */
  aboutWrapperClip: {
    width: '100%',
    overflowX: 'hidden',
    backgroundColor: '#ffffff'
  },
  aboutSection: {
    position: 'relative',
    zIndex: 20,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '56px',
    padding: '80px 48px',
    backgroundColor: '#ffffff',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  aboutImageCol: {
    flex: '1 1 340px',
    minWidth: '300px'
  },
  aboutImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '6px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.18)',
    display: 'block'
  },
  aboutTextCol: {
    flex: '1 1 380px',
    minWidth: '300px',
    color: '#0f172a'
  },
  aboutLogoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '18px'
  },
  aboutLogoIcon: {
    color: '#E30613',
    fontSize: '26px',
    fontWeight: '900'
  },
  aboutLogoTitle: {
    fontSize: '22px',
    fontWeight: '900'
  },
  aboutLogoAxis: {
    color: '#E30613'
  },
  aboutLogoRest: {
    color: '#334155'
  },
  aboutDescription: {
    fontSize: '15px',
    color: '#334155',
    lineHeight: '1.8',
    marginBottom: '28px'
  },
  aboutKnowMoreBtn: {
    backgroundColor: '#E30613',
    color: '#ffffff',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '2px',
    fontWeight: '800',
    fontSize: '12px',
    letterSpacing: '0.5px',
    cursor: 'pointer'
  },

  /* Clips sideways scroll overflow when cards slide from off-screen */
  scrollWrapperClip: {
    width: '100%',
    overflowX: 'hidden'
  },
  categorySection: {
    position: 'relative',
    zIndex: 20,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '32px',
    padding: '60px 32px',
    backgroundColor: '#000000',
    borderTop: '1px solid #222'
  },
  categoryCard: {
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
  cardTitle: { fontSize: '26px', fontWeight: '900', color: '#ffffff', margin: '8px 0 12px 0', textShadow: '0 2px 8px rgba(0,0,0,0.9)' },
  cardText: { fontSize: '14px', color: '#f1f5f9', lineHeight: '1.6', textShadow: '0 1px 5px rgba(0,0,0,0.9)', maxWidth: '90%' },
  cardRedButton: { color: '#E30613', fontWeight: '800', fontSize: '13px', textDecoration: 'none', display: 'inline-block', marginTop: '20px', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }
};