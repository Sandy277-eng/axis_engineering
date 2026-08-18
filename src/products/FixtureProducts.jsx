import React, { useState, useRef, useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FIXTURE_IMAGES = [
  '/images/products_fixture/fixture1.jpg',
  '/images/products_fixture/fixture2.jpg',
  '/images/products_fixture/fixture3.jpg'
];

const BEST_PRACTICES = [
  { icon: '▲', label: 'Latest Designs' },
  { icon: 'ⓘ', label: 'Modern Technology' },
  { icon: '❑', label: 'Project On-Time' },
  { icon: '⚙', label: 'Improved Machine and Manufacturing Process' }
];

export default function FixtureProducts() {
  const pageContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const appraisalRef = useRef(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Cinematic entrance for hero text
      gsap.fromTo(
        '.fixture-hero-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );

      // Staggered entrance for all content cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      });

      // Appraisal panel entrance
      if (appraisalRef.current) {
        gsap.fromTo(
          appraisalRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: appraisalRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={pageContainerRef} style={styles.container}>

      {/* FULL-PAGE FIXED BACKDROP (BACKGROUND VIDEO) */}
      <div style={styles.fixedBgWrapper}>
        <video
          src="/videos/detron_home_page_animation02.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={styles.bgVideo}
        />
        <div style={styles.darkOverlay} />
      </div>

      {/* SCROLLABLE LAYOUT OVERLAY */}
      <div style={styles.scrollableContent}>

        {/* FIXED HEADER WRAPPER */}
        <Header activePage="fixtures" />

        {/* Spacer for Header */}
        <div style={{ height: '140px' }} />

        {/* 1. HERO TITLE BLOCK */}
        <section style={styles.heroSection}>
          <div className="fixture-hero-content" style={styles.heroTextContent}>
            <span style={styles.heroBadge}>BESPOKE DESIGN SOLUTIONS</span>
            <h1 style={styles.heroTitle}>CUSTOM FIXTURES</h1>
            <div style={styles.accentLine} />
          </div>
        </section>

        {/* MAIN CARDS TRACK */}
        <div style={styles.cardsContainer}>

          {/* 5. THUMBNAIL SELECTOR BAR */}
          <div ref={addToCardsRef} style={styles.galleryCard}>
            <p style={styles.galleryIntro}>Select a model below to preview custom workholding configurations:</p>
            <div style={styles.galleryRow}>
              {FIXTURE_IMAGES.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    ...styles.thumbnailWrapper,
                    border: activeImageIndex === idx ? '3px solid #E30613' : '3px solid rgba(255, 255, 255, 0.1)',
                    transform: activeImageIndex === idx ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <img
                    src={imgUrl}
                    alt={`Fixture Model Thumbnail ${idx + 1}`}
                    style={styles.thumbnailImg}
                  />
                  <div style={styles.thumbnailLabel}>FIXTURE MODEL {idx + 1}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. TECHNICAL SHOWCASE CARD */}
          <div ref={addToCardsRef} style={styles.glassCardWide}>
            <div style={styles.splitRow}>
              {/* Left side: Large Interactive Image */}
              <div style={styles.imageCol}>
                <div style={styles.mainImageWrapper}>
                  <img
                    src={FIXTURE_IMAGES[activeImageIndex]}
                    alt={`Custom Fixture ${activeImageIndex + 1}`}
                    style={styles.mainImage}
                  />
                </div>
              </div>

              {/* Right side: Detailed Description */}
              <div style={styles.infoCol}>
                <h2 style={styles.cardHeading}>
                  Improved & Increased Machining Efficiency Through Innovative Fixture Technology
                </h2>
                <div style={styles.headingDivider} />
                <p style={styles.cardParagraph}>
                  AES -Design and Manufacturer of Machining center Fixtures & Jigs,. We specialized in hydraulic and manual fixtures for prismatic work-holding applications in both high and low volume production environments.
                </p>
                <p style={styles.cardParagraph}>
                  Focusing on reducing your dependency on skilled labor AES Work holding designs "Smart" fixtures with special options like part seating confirmation, part present sensing, datum wash, hydraulic integration to machine tool, and the ability to employ robotic loading and unloading.
                </p>
              </div>
            </div>
          </div>

          {/* 3. BENTO GRID - CAPABILITIES & NARRATIVE */}
          <div style={styles.bentoRow}>
            {/* Cell A: Target Industries */}
            <div ref={addToCardsRef} style={styles.bentoCellHalf}>
              <div style={styles.bentoIcon}>✦</div>
              <h3 style={styles.bentoCellTitle}>Target Industries</h3>
              <p style={styles.bentoCellText}>
                We engineer and deliver workholding fixtures designed to support operations across high-precision fields including:
              </p>
              <div style={styles.industriesGrid}>
                {['Automotive', 'Mining', 'Construction', 'Energy / Power', 'Military / Aerospace', 'Electronics'].map((ind) => (
                  <span key={ind} style={styles.industryTag}>{ind}</span>
                ))}
              </div>
            </div>

            {/* Cell B: Design Philosophy */}
            <div ref={addToCardsRef} style={styles.bentoCellHalf}>
              <div style={styles.bentoIcon}>⚙</div>
              <h3 style={styles.bentoCellTitle}>In-House Manufacturing</h3>
              <p style={styles.bentoCellText}>
                From the largest assemblies to the smallest custom workholding parts, every customer's project is designed, verified, and built in-house to guarantee the highest level of Quality, Price competitiveness, and prompt Delivery.
              </p>
              <p style={{ ...styles.bentoCellText, fontWeight: '700', color: '#ffffff' }}>
                AES Work holding is truly a global leader in providing your custom fixturing and work holding needs.
              </p>
            </div>
          </div>

          {/* 4. INTEGRATION BANNER */}
          <div ref={addToCardsRef} style={styles.glassCardBanner}>
            <div style={styles.bannerContent}>
              <h3 style={styles.bannerHeading}>
                AES Work holding can help you save time and money. We understand how to do that, because we face the same challenges every day.
              </h3>
              <p style={styles.bannerHighlight}>
                Our work holding solutions integrate directly with your machining center
              </p>
            </div>
          </div>

        </div>

        {/* 6. APPRAISAL / BEST PRACTICES (TRANSITION SLIDERS) */}
        <section ref={appraisalRef} style={styles.appraisalSection}>
          {/* Left panel: Transparent dark card with background image blurred */}
          <div style={styles.appraisalLeft}>
            <img
              src="/images/products_fixture/fixture1.jpg"
              alt="Advanced Application Technology"
              style={styles.appraisalImage}
            />
            <div style={styles.appraisalLeftGlass} />
            <div style={styles.appraisalLeftContent}>
              <h3 style={styles.appraisalLeftText}>
                Advanced Application<br />Technology
              </h3>
              <p style={styles.appraisalLeftDesc}>
                Turnkey custom hydraulic & pneumatic workholding fixture engineering tailored for complex automotive, aerospace, and high-volume machining components.
              </p>
              <div style={styles.appraisalBadgeList}>
                <div style={styles.appraisalBadgeItem}>
                  <span style={styles.appraisalBadgeDot}>✓</span>
                  <span>Turnkey Fixture Design & FEA Cutting Force Analysis</span>
                </div>
                <div style={styles.appraisalBadgeItem}>
                  <span style={styles.appraisalBadgeDot}>✓</span>
                  <span>Direct 4th & 5th Axis CNC Rotary Table Interfacing</span>
                </div>
                <div style={styles.appraisalBadgeItem}>
                  <span style={styles.appraisalBadgeDot}>✓</span>
                  <span>Zero-Point Clamping & Cycle-Time Optimization</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Glassmorphism red card */}
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
    padding: 0,
    minHeight: '100vh',
    overflowX: 'hidden'
  },

  fixedBgWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 0,
    pointerEvents: 'none'
  },
  bgVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  darkOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.9) 100%)',
    zIndex: 1
  },

  /* SCROLLABLE INTERFACE OVERLAY */
  scrollableContent: {
    position: 'relative',
    zIndex: 10,
    width: '100%'
  },

  /* FIXED HEADER (matches site brand visual languages) */
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
  logoGroup: { cursor: 'pointer', display: 'flex', alignItems: 'center' },
  logoImage: { height: '48px', width: 'auto', display: 'block', objectFit: 'contain' },
  navMenu: { display: 'flex', alignItems: 'center', gap: '28px' },
  navLink: {
    textDecoration: 'none',
    color: '#0f172a',
    fontWeight: '700',
    fontSize: '12px',
    letterSpacing: '0.5px'
  },
  topContactLink: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '11px',
    textDecoration: 'underline'
  },
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
  navLinkActive: {
    color: '#E30613',
    fontWeight: '800',
    fontSize: '12px',
    letterSpacing: '0.5px'
  },
  contactHeaderBtn: {
    backgroundColor: '#000000',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '2px',
    fontWeight: '700',
    fontSize: '12px'
  },

  /* HERO SECTION */
  heroSection: {
    minHeight: '260px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px 20px 20px',
    textAlign: 'center'
  },
  heroTextContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  heroBadge: {
    fontSize: '11px',
    fontWeight: '900',
    letterSpacing: '1.5px',
    color: '#E30613',
    backgroundColor: 'rgba(227, 6, 19, 0.15)',
    border: '1px solid rgba(227, 6, 19, 0.3)',
    padding: '6px 16px',
    borderRadius: '30px',
    display: 'inline-block'
  },
  heroTitle: {
    fontSize: '52px',
    fontWeight: '950',
    color: '#ffffff',
    margin: 0,
    letterSpacing: '4px',
    textShadow: '0 4px 15px rgba(0,0,0,0.8)'
  },
  accentLine: {
    width: '80px',
    height: '4px',
    backgroundColor: '#E30613',
    borderRadius: '2px',
    marginTop: '4px'
  },

  /* CARDS LIST CONTAINER */
  cardsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px 60px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '36px'
  },

  /* GLASSMOPHIC CARDS STYLING */
  glassCardWide: {
    backgroundColor: 'rgba(10, 10, 10, 0.72)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
    padding: '48px',
    transition: 'border-color 0.3s ease'
  },
  splitRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '48px',
    alignItems: 'center'
  },
  imageCol: {
    flex: '1 1 450px',
    display: 'flex',
    justifyContent: 'center'
  },
  mainImageWrapper: {
    width: '100%',
    maxWidth: '540px',
    height: '340px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  infoCol: {
    flex: '1 1 450px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    textAlign: 'left'
  },
  cardHeading: {
    fontSize: '28px',
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: '1.3',
    margin: 0,
    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
  },
  headingDivider: {
    width: '60px',
    height: '3px',
    backgroundColor: '#E30613',
    borderRadius: '1.5px'
  },
  cardParagraph: {
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#cbd5e1',
    margin: 0
  },

  /* BENTO GRID ROW */
  bentoRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '36px'
  },
  bentoCellHalf: {
    flex: '1 1 500px',
    backgroundColor: 'rgba(10, 10, 10, 0.72)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
    padding: '40px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  bentoIcon: {
    fontSize: '24px',
    color: '#E30613',
    fontWeight: '800'
  },
  bentoCellTitle: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#ffffff',
    margin: 0
  },
  bentoCellText: {
    fontSize: '14.5px',
    lineHeight: '1.7',
    color: '#94a3b8',
    margin: 0
  },
  industriesGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '8px'
  },
  industryTag: {
    fontSize: '12px',
    fontWeight: '700',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#cbd5e1',
    padding: '8px 16px',
    borderRadius: '4px',
    border: '1px solid rgba(255, 255, 255, 0.08)'
  },

  /* INTEGRATION BANNER */
  glassCardBanner: {
    backgroundColor: 'rgba(10, 10, 10, 0.75)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
    padding: '48px',
    textAlign: 'center'
  },
  bannerContent: {
    maxWidth: '850px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  bannerHeading: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: '1.6',
    margin: 0
  },
  bannerHighlight: {
    fontSize: '18px',
    fontWeight: '900',
    color: '#E30613',
    margin: 0,
    letterSpacing: '0.5px'
  },

  /* THUMBNAIL SELECTOR CARD */
  galleryCard: {
    backgroundColor: 'rgba(10, 10, 10, 0.72)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
    padding: '40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  galleryIntro: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: 0,
    fontWeight: '600',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  },
  galleryRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '28px',
    flexWrap: 'wrap'
  },
  thumbnailWrapper: {
    position: 'relative',
    width: '220px',
    height: '140px',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  thumbnailLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    color: '#ffffff',
    fontSize: '10px',
    fontWeight: '800',
    padding: '8px 0',
    textAlign: 'center',
    letterSpacing: '1px'
  },

  /* APPRAISAL / BEST PRACTICES SECTION (GLASS REDESIGN) */
  appraisalSection: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '280px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(5, 5, 5, 0.8)'
  },
  appraisalLeft: {
    position: 'relative',
    flex: '1 1 450px',
    minHeight: '280px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center'
  },
  appraisalImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.35) blur(1px)'
  },
  appraisalLeftGlass: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(90deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 100%)',
    backdropFilter: 'blur(4px)'
  },
  appraisalLeftContent: {
    position: 'relative',
    zIndex: 5,
    padding: '36px 40px',
    maxWidth: '520px',
    textAlign: 'left'
  },
  appraisalLeftText: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '900',
    lineHeight: '1.25',
    margin: '0 0 10px 0',
    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
    letterSpacing: '0.5px'
  },
  appraisalLeftDesc: {
    color: '#cbd5e1',
    fontSize: '13px',
    lineHeight: '1.55',
    margin: '0 0 16px 0',
    textShadow: '0 1px 4px rgba(0,0,0,0.9)'
  },
  appraisalBadgeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  appraisalBadgeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#f8fafc',
    fontSize: '12px',
    fontWeight: '600'
  },
  appraisalBadgeDot: {
    color: '#E30613',
    fontWeight: '900',
    fontSize: '13px'
  },
  appraisalRight: {
    position: 'relative',
    flex: '1 1 450px',
    minHeight: '280px',
    backgroundColor: 'rgba(227, 6, 19, 0.72)',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    borderLeft: '1px solid rgba(255,255,255,0.1)'
  },
  appraisalWatermark: {
    position: 'absolute',
    right: '-10px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '64px',
    fontWeight: '900',
    color: 'rgba(255,255,255,0.06)',
    whiteSpace: 'nowrap',
    letterSpacing: '2px',
    pointerEvents: 'none'
  },
  appraisalRightContent: {
    position: 'relative',
    zIndex: 5,
    padding: '48px',
    textAlign: 'left'
  },
  appraisalHeading: {
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: '900',
    marginBottom: '20px',
    letterSpacing: '0.5px'
  },
  appraisalList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  appraisalListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#ffffff',
    fontSize: '13.5px',
    fontWeight: '600'
  },
  appraisalIcon: {
    fontSize: '15px',
    color: '#ffffff'
  }
};
