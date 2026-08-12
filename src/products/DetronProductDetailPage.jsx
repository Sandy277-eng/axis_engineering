import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCT_DATABASE } from './productData';
import Footer from '../Footer/Footer';
import Header from '../Header';

export default function DetronProductDetailPage() {
  const { productId } = useParams();

  const getVideoUrl = (id) => {
    const mapping = {
      '4-axis': '/videos/4th_axis.mp4',
      '5-axis': '/videos/5th_axis.mp4',
      'auto-pallet-changer': '/videos/auto_pallet_changer.mp4',
      'special-application': '/videos/special_applications.mp4',
      'special-applications': '/videos/special_applications.mp4',
      'accessories': '/videos/accessories.mp4',
      'intelligent-control': '/videos/intelligent_control.mp4'
    };
    return mapping[id] || '/videos/4th_axis.mp4';
  };

  const productData = PRODUCT_DATABASE[productId] || PRODUCT_DATABASE['4-axis'];

  // Check screen width for responsive rendering
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // Expanded accordion drawer states
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);

    // Initialize accordion states so the first model in each size is open by default
    const initial = {};
    productData.items.forEach((item) => {
      if (item.products && item.products.length > 0) {
        initial[`${item.size}-${item.products[0].name}`] = true;
      }
    });
    setExpanded(initial);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [productId, productData]);

  const toggleProduct = (size, productName) => {
    const key = `${size}-${productName}`;
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div style={styles.container}>

      <Header activePage="detron" />

      {/* HEADER SPACER */}
      <div style={{ height: '140px' }} />

      {/* SPLIT COLUMN DETAILS & ANIMATION PANEL */}
      <div style={{
        ...styles.splitWrapper,
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        
        {/* LEFT COLUMN: STICKY 3D VIDEO PREVIEW */}
        <div style={isMobile ? styles.leftStickyColMobile : styles.leftFixedColDesktop}>
          <video
            key={productId}
            src={getVideoUrl(productId)}
            autoPlay
            loop
            muted
            playsInline
            style={styles.detailVideo}
          />
          <div style={styles.canvasGradOverlay} />
          <div style={styles.canvasLabelOverlay}>
            <span style={styles.canvasLabelIcon}>◈</span>
            <span>CINEMATIC 3D ROTATION PREVIEW</span>
          </div>
        </div>

        {/* RIGHT COLUMN: SCROLLING DETAILS LIST */}
        <div style={isMobile ? styles.rightScrollColMobile : styles.rightScrollColDesktop}>
          {/* CATEGORY HERO SECTION */}
          <section style={styles.heroSection}>
            <div style={styles.heroContent}>
              <span style={styles.heroBadge}>DETRON INDUSTRIAL RANGE</span>
              <h1 style={styles.heroTitle}>{productData.title}</h1>
              <p style={styles.heroDescription}>{productData.description}</p>
              <div style={styles.heroDivider} />
            </div>
          </section>

          <h3 style={styles.specificationsHeading}>Product Lineup & Technical Configurations</h3>
          
          <div style={styles.lineupList}>
            {productData.items.map((item, idx) => (
              <div key={idx} style={styles.modelCard}>
                <div style={styles.modelHeader}>
                  <div style={styles.modelIndex}>0{idx + 1}</div>
                  <h4 style={styles.modelSizeTitle}>{item.size}</h4>
                </div>

                <div style={styles.modelBody}>
                  {item.products.map((prod) => {
                    const isExpanded = !!expanded[`${item.size}-${prod.name}`];
                    return (
                      <div key={prod.name} style={styles.accordionContainer}>
                        {/* ACCORDION HEADER TOGGLE */}
                        <div
                          style={isExpanded ? styles.accordionHeaderActive : styles.accordionHeader}
                          onClick={() => toggleProduct(item.size, prod.name)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <h5 style={styles.accordionTitle}>{prod.name}</h5>
                            <span style={styles.accordionBadge}>{prod.badge}</span>
                          </div>
                          <span style={styles.accordionIndicator}>
                            {isExpanded ? '▲ CLAMP' : '▼ VIEW DETAILS'}
                          </span>
                        </div>

                        {/* ACCORDION EXPANSION DRAWER */}
                        {isExpanded && (
                          <div style={styles.accordionContent}>
                            {/* Left Specs Side */}
                            <div style={styles.modelDetailsHalf}>
                              <p style={styles.modelText}>{prod.description}</p>
                              
                              <table style={styles.specTable}>
                                <tbody>
                                  {Object.entries(prod.specs).map(([key, val]) => (
                                    <tr key={key} style={styles.specRow}>
                                      <td style={styles.specKey}>{key}</td>
                                      <td style={styles.specVal}>{val}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>

                              <Link to="/contact" style={styles.enquireButton}>
                                ENQUIRE ABOUT {prod.name} &gt;
                              </Link>
                            </div>

                            {/* Right Image Side */}
                            <div style={styles.modelImageHalf}>
                              <div style={styles.productImageWrapper}>
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  style={styles.productImage}
                                  onError={(e) => {
                                    e.target.src = '/images/detron.jpeg';
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Render Footer at bottom of right scroll column for desktop, or below it on mobile */}
          {!isMobile && <div style={{ marginTop: '56px' }}><Footer /></div>}
        </div>

      </div>

      {/* FOOTER FOR MOBILE (Spans full screen width) */}
      {isMobile && <Footer />}

    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    overflowX: 'hidden'
  },

  /* FIXED HEADER WRAPPERS */
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
  topContactLink: {
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
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
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
  navLinkActive: {
    textDecoration: 'none',
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

  /* CATEGORY HERO */
  heroSection: {
    padding: '24px 0',
    textAlign: 'left',
    borderBottom: 'none'
  },
  heroContent: {
    maxWidth: '100%',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px'
  },
  heroBadge: {
    fontSize: '10px',
    fontWeight: '900',
    letterSpacing: '1.5px',
    color: '#E30613',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    padding: '6px 14px',
    borderRadius: '30px'
  },
  heroTitle: {
    fontSize: '44px',
    fontWeight: '900',
    letterSpacing: '0.5px',
    margin: 0,
    color: '#0f172a'
  },
  heroDescription: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#475569',
    maxWidth: '650px',
    margin: '8px auto 0 auto'
  },
  heroDivider: {
    width: '60px',
    height: '3px',
    backgroundColor: '#E30613',
    borderRadius: '1.5px',
    marginTop: '16px'
  },

  /* SPLIT LAYOUT */
  splitWrapper: {
    display: 'flex',
    width: '100%',
    position: 'relative'
  },
  
  /* LEFT STATIC ANIMATOR (DESKTOP) */
  leftFixedColDesktop: {
    width: '45vw',
    position: 'fixed',
    top: '140px',
    left: 0,
    height: 'calc(100vh - 140px)',
    overflow: 'hidden',
    borderRight: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  },

  /* LEFT STATIC ANIMATOR (MOBILE) */
  leftStickyColMobile: {
    width: '100%',
    position: 'relative',
    height: '45vh',
    overflow: 'hidden',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none'
  },

  canvasGradOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.2) 100%)',
    pointerEvents: 'none'
  },
  canvasLabelOverlay: {
    position: 'absolute',
    bottom: '32px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    border: '1px solid #e2e8f0',
    backdropFilter: 'blur(8px)',
    color: '#0f172a',
    padding: '8px 16px',
    borderRadius: '30px',
    fontSize: '10px',
    fontWeight: '800',
    letterSpacing: '1.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    pointerEvents: 'none',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
  },
  canvasLabelIcon: {
    color: '#E30613',
    fontSize: '12px'
  },

  /* RIGHT SCROLL PANEL (DESKTOP) */
  rightScrollColDesktop: {
    marginLeft: '45vw', // prevents overlay under fixed panel
    width: '55vw',
    padding: '56px 48px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
    backgroundColor: '#ffffff',
    minHeight: 'calc(100vh - 140px)'
  },

  /* RIGHT SCROLL PANEL (MOBILE) */
  rightScrollColMobile: {
    width: '100%',
    padding: '32px 16px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    backgroundColor: '#ffffff'
  },

  specificationsHeading: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0,
    textAlign: 'left',
    letterSpacing: '0.5px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '16px'
  },
  lineupList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },

  /* MODEL CARD */
  modelCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '24px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    textAlign: 'left',
    boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
  },
  modelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    borderBottom: '1px solid #f1f5f9',
    paddingBottom: '12px'
  },
  modelIndex: {
    fontSize: '14px',
    fontWeight: '900',
    color: '#E30613',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modelSizeTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0
  },
  modelBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },

  /* ACCORDION DESIGNS */
  accordionContainer: {
    width: '100%'
  },
  accordionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  accordionHeaderActive: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    backgroundColor: '#f1f5f9',
    border: '1px solid #E30613',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  accordionTitle: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0,
    letterSpacing: '0.5px'
  },
  accordionBadge: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '600'
  },
  accordionIndicator: {
    fontSize: '11px',
    color: '#E30613',
    fontWeight: '800',
    letterSpacing: '1px'
  },
  accordionContent: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderTop: 'none',
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '28px',
    boxSizing: 'border-box'
  },

  modelDetailsHalf: {
    flex: '1 1 260px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'left'
  },
  modelText: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#475569',
    margin: 0
  },
  enquireButton: {
    backgroundColor: '#E30613',
    border: 'none',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '11px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(227,6,19,0.2)'
  },
  modelImageHalf: {
    flex: '1 1 200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  productImageWrapper: {
    width: '100%',
    maxWidth: '280px',
    height: '180px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '12px',
    boxSizing: 'border-box'
  },

  /* SPECIFICATIONS TABLE */
  specTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '8px',
    marginBottom: '8px',
    fontSize: '12px'
  },
  specRow: {
    borderBottom: '1px solid #e2e8f0'
  },
  specKey: {
    padding: '6px 12px 6px 0',
    color: '#64748b',
    fontWeight: '500',
    width: '50%',
    textAlign: 'left'
  },
  specVal: {
    padding: '6px 0 6px 12px',
    color: '#0f172a',
    fontWeight: '700',
    textAlign: 'right'
  }
};
