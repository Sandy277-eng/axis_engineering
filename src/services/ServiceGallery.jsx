import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer/Footer';

// ─── WORKSHOP GALLERY IMAGES ──────────────────────────────────────────────────
const GALLERY_IMAGES = [
  'WhatsApp Image 2026-10-10 at 11.39.45.jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.46 (1).jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.46.jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.47 (1).jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.47.jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.48 (1).jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.48.jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.49 (1).jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.49.jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.50 (1).jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.50.jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.51 (1).jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.51.jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.52 (1).jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.52.jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.53 (1).jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.53.jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.54 (1).jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.54.jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.55 (1).jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.55.jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.56 (1).jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.56.jpeg',
  'WhatsApp Image 2026-10-10 at 11.39.57.jpeg'
];

// ─── PROFESSIONAL VECTOR ICONS (NO EMOJIS) ────────────────────────────────────
const SvgIcon = ({ name, size = 20, color = 'currentColor', style = {} }) => {
  const icons = {
    gauge: (
      <>
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
        <path d="M12 12l3.5-3.5" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    wrench: (
      <>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </>
    ),
    cpu: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </>
    ),
    layers: (
      <>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
    zap: (
      <>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </>
    ),
    check: (
      <>
        <polyline points="20 6 9 17 4 12" />
      </>
    ),
    zoomIn: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </>
    ),
    zoomOut: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </>
    ),
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    chevronLeft: (
      <>
        <polyline points="15 18 9 12 15 6" />
      </>
    ),
    chevronRight: (
      <>
        <polyline points="9 18 15 12 9 6" />
      </>
    ),
    phone: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </>
    ),
    mapPin: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    )
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    >
      {icons[name] || null}
    </svg>
  );
};

export default function ServiceGallery() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const marqueeTrackRef = useRef(null);

  // Randomly select one image from GALLERY_IMAGES on component mount for top hero banner
  const [heroBgImage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * GALLERY_IMAGES.length);
    return GALLERY_IMAGES[randomIndex];
  });

  useEffect(() => {
    document.title = "Service | Axis Engineering Solutions — Detron Technical Center";
    window.scrollTo(0, 0);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activePhoto) return;
      if (e.key === 'Escape') {
        setActivePhoto(null);
        setZoomScale(1);
      } else if (e.key === 'ArrowRight') {
        const curIdx = GALLERY_IMAGES.indexOf(activePhoto);
        const nextIdx = (curIdx + 1) % GALLERY_IMAGES.length;
        setActivePhoto(GALLERY_IMAGES[nextIdx]);
        setZoomScale(1);
      } else if (e.key === 'ArrowLeft') {
        const curIdx = GALLERY_IMAGES.indexOf(activePhoto);
        const prevIdx = (curIdx - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
        setActivePhoto(GALLERY_IMAGES[prevIdx]);
        setZoomScale(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  const handleOpenPhoto = (file) => {
    setActivePhoto(file);
    setZoomScale(1);
  };

  const handleNextPhoto = (e) => {
    if (e) e.stopPropagation();
    const curIdx = GALLERY_IMAGES.indexOf(activePhoto);
    const nextIdx = (curIdx + 1) % GALLERY_IMAGES.length;
    setActivePhoto(GALLERY_IMAGES[nextIdx]);
    setZoomScale(1);
  };

  const handlePrevPhoto = (e) => {
    if (e) e.stopPropagation();
    const curIdx = GALLERY_IMAGES.indexOf(activePhoto);
    const prevIdx = (curIdx - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    setActivePhoto(GALLERY_IMAGES[prevIdx]);
    setZoomScale(1);
  };

  return (
    <div style={styles.page}>
      <Header activePage="services" />

      {/* HEADER SPACER */}
      <div style={{ height: '140px' }} />

      {/* ─── PROFESSIONAL STYLES: LEFT-TO-RIGHT TRANSITIONS & ZOOM EFFECTS ─── */}
      <style>{`
        @keyframes slideInLeftToRight {
          0% {
            opacity: 0;
            transform: translateX(-40px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .gallery-item-card {
          animation: slideInLeftToRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
        }

        .gallery-item-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12), 0 0 20px rgba(227, 6, 19, 0.15);
          border-color: #E30613 !important;
        }

        .gallery-item-img {
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .gallery-item-card:hover .gallery-item-img {
          transform: scale(1.08);
        }

        .gallery-hover-overlay {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item-card:hover .gallery-hover-overlay {
          opacity: 1;
        }

        /* Continuous Left to Right Marquee Strip */
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 16px;
          animation: marqueeScroll 45s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-thumb {
          width: 240px;
          height: 160px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          cursor: pointer;
          border: 1.5px solid #e2e8f0;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .marquee-thumb:hover {
          transform: scale(1.04);
          border-color: #E30613;
        }

        .service-feature-card {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .service-feature-card:hover {
          transform: translateY(-4px);
          border-color: #E30613 !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
        }
      `}</style>

      {/* ─── 1. TOP HERO BANNER (RANDOM GALLERY IMAGE + OVERLAY) ─── */}
      <section
        style={{
          ...styles.heroSection,
          backgroundImage: `url("/gallery/${encodeURIComponent(heroBgImage)}")`
        }}
      >
        <div style={styles.heroOverlay} />
      </section>

      {/* ─── MIDDLE TOP SERVICE BRAND BADGE ─── */}
      <div style={styles.brandButtonContainer}>
        <div style={styles.brandButton}>SERVICE</div>
      </div>

      {/* ─── 2. AXIS ENGINEERING DETAILS & SERVICE CAPABILITIES ─── */}
      <section style={styles.aboutServiceSection}>
        <div style={styles.container}>
          {/* Section Heading */}
          <div style={styles.sectionHeader}>
            <span style={styles.sectionEyebrow}>PRECISION ENGINEERING CAPABILITIES</span>
            <h2 style={styles.sectionMainTitle}>
              AXIS ENGINEERING SOLUTIONS — SERVICE DIVISION
            </h2>
            <div style={styles.titleDivider} />
            <p style={styles.sectionLeadText}>
              Established in 2014, Axis Engineering Solutions is the Authorized Distributor &amp; Technical Integration Partner of Detron Machinery Co., Ltd. (Taiwan) — the world&apos;s leading manufacturer of high-precision NC Rotary Tables. Our certified engineers provide end-to-end technical lifecycle support from initial machine tool interfacing to preventative maintenance and complete overhaul.
            </p>
          </div>

          {/* Key Capability Cards Grid */}
          <div style={styles.capabilitiesGrid}>
            <div style={styles.featureCard} className="service-feature-card">
              <div style={styles.iconCircle}>
                <SvgIcon name="wrench" size={24} color="#E30613" />
              </div>
              <h3 style={styles.featureTitle}>Rotary Table Reconditioning</h3>
              <p style={styles.featureText}>
                Complete mechanical overhaul, chemical degreasing, ultrasonic cleaning, dual-lead worm backlash zeroing, and radial needle bearing preload optimization to restore factory accuracy.
              </p>
              <div style={styles.featureFooter}>
                <SvgIcon name="check" size={14} color="#E30613" />
                <span>Zero-Backlash Tuning</span>
              </div>
            </div>

            <div style={styles.featureCard} className="service-feature-card">
              <div style={styles.iconCircle}>
                <SvgIcon name="gauge" size={24} color="#E30613" />
              </div>
              <h3 style={styles.featureTitle}>Sub-Micron Metrology &amp; Runout</h3>
              <p style={styles.featureText}>
                Calibrated Class-00 granite surface plate inspections, radial and axial runout verification within 0.003 mm, perpendicularity validation with granite master squares, and ISO test reporting.
              </p>
              <div style={styles.featureFooter}>
                <SvgIcon name="check" size={14} color="#E30613" />
                <span>Tolerance &le; 0.003 mm</span>
              </div>
            </div>

            <div style={styles.featureCard} className="service-feature-card">
              <div style={styles.iconCircle}>
                <SvgIcon name="cpu" size={24} color="#E30613" />
              </div>
              <h3 style={styles.featureTitle}>CNC Interfacing &amp; Integration</h3>
              <p style={styles.featureText}>
                Turnkey electrical and mechanical integration with Fanuc, Siemens Sinumerik, Mitsubishi, and Heidenhain controllers, including drive tuning, optical encoder alignment, and PLC M-code programming.
              </p>
              <div style={styles.featureFooter}>
                <SvgIcon name="check" size={14} color="#E30613" />
                <span>Multi-Controller Support</span>
              </div>
            </div>

            <div style={styles.featureCard} className="service-feature-card">
              <div style={styles.iconCircle}>
                <SvgIcon name="layers" size={24} color="#E30613" />
              </div>
              <h3 style={styles.featureTitle}>Custom Workholding Fixtures</h3>
              <p style={styles.featureText}>
                Design and manufacture of bespoke hydraulic, pneumatic, and manual clamping fixtures, support tailstocks, and trunnion assemblies engineered around component geometry at our Chennai plant.
              </p>
              <div style={styles.featureFooter}>
                <SvgIcon name="check" size={14} color="#E30613" />
                <span>Bespoke Part Clamping</span>
              </div>
            </div>

            <div style={styles.featureCard} className="service-feature-card">
              <div style={styles.iconCircle}>
                <SvgIcon name="shield" size={24} color="#E30613" />
              </div>
              <h3 style={styles.featureTitle}>Genuine Detron OEM Spares</h3>
              <p style={styles.featureText}>
                Comprehensive inventory of 100% genuine Detron factory spare parts, phosphor bronze worm wheels, dual-lead worm shafts, rotary union seals, brake discs, and high-precision bearings.
              </p>
              <div style={styles.featureFooter}>
                <SvgIcon name="check" size={14} color="#E30613" />
                <span>Direct Factory Spares</span>
              </div>
            </div>

            <div style={styles.featureCard} className="service-feature-card">
              <div style={styles.iconCircle}>
                <SvgIcon name="zap" size={24} color="#E30613" />
              </div>
              <h3 style={styles.featureTitle}>Pan-India Field Support</h3>
              <p style={styles.featureText}>
                Rapid-response on-site service engineers stationed across India for emergency breakdown assistance, scheduled preventive maintenance contracts (AMC), and operator technical training.
              </p>
              <div style={styles.featureFooter}>
                <SvgIcon name="check" size={14} color="#E30613" />
                <span>24/7 Breakdown Dispatch</span>
              </div>
            </div>
          </div>

          {/* Facility Highlights Bar */}
          <div style={styles.facilityInfoBar}>
            <div style={styles.facilityCol}>
              <span style={styles.facilityLabel}>HEAD OFFICE &amp; DESIGN FACILITY</span>
              <span style={styles.facilityValue}>Ayanambakkam, Chennai, Tamil Nadu</span>
            </div>
            <div style={styles.facilityDivider} />
            <div style={styles.facilityCol}>
              <span style={styles.facilityLabel}>CENTRAL SERVICE &amp; METROLOGY HUB</span>
              <span style={styles.facilityValue}>Peelamedu, Coimbatore, Tamil Nadu</span>
            </div>
            <div style={styles.facilityDivider} />
            <div style={styles.facilityCol}>
              <span style={styles.facilityLabel}>FACTORY ALLIANCE</span>
              <span style={styles.facilityValue}>Detron Machinery Co., Ltd., Taiwan</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. CONTINUOUS LEFT-TO-RIGHT HORIZONTAL PREVIEW ─── */}
      <section style={styles.marqueeSection}>
        <div style={styles.container}>
          <div style={styles.marqueeHeadingRow}>
            <div>
              <span style={styles.sectionEyebrow}>WORKSHOP ACTIVITY</span>
              <h3 style={styles.marqueeTitle}>TECHNICAL SERVICE PREVIEW</h3>
            </div>
            <span style={styles.marqueeHint}>SLIDING LEFT TO RIGHT &bull; CLICK ANY IMAGE TO ENLARGE</span>
          </div>
        </div>

        <div style={styles.marqueeOuter}>
          <div className="marquee-track" ref={marqueeTrackRef}>
            {/* Duplicated list to create infinite smooth left-to-right flow */}
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((file, idx) => (
              <div
                key={idx}
                className="marquee-thumb"
                onClick={() => handleOpenPhoto(file)}
              >
                <img
                  src={`/gallery/${encodeURIComponent(file)}`}
                  alt="Axis Engineering Workshop Operation"
                  style={styles.marqueeImg}
                  loading="lazy"
                  onError={(e) => { e.target.src = '/images/detron.jpeg'; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. COMPLETE PHOTO GALLERY (CLEAN IMAGES ONLY, NO TEXT DETAILS) ─── */}
      <section style={styles.galleryGridSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionEyebrow}>WORKSHOP ARCHIVE</span>
            <h2 style={styles.sectionMainTitle}>SERVICE GALLERY</h2>
            <div style={styles.titleDivider} />
            <p style={styles.sectionLeadText}>
              Visual documentation from our precision workshop and on-site client integration projects.
              Click any photograph to open the high-resolution inspection viewer with zoom controls.
            </p>
          </div>

          {/* Clean Image Grid */}
          <div style={styles.imageGrid}>
            {GALLERY_IMAGES.map((file, index) => (
              <div
                key={index}
                className="gallery-item-card"
                style={{
                  ...styles.galleryCard,
                  animationDelay: `${(index % 8) * 0.06}s`
                }}
                onClick={() => handleOpenPhoto(file)}
              >
                <img
                  src={`/gallery/${encodeURIComponent(file)}`}
                  alt="Axis Engineering Workshop"
                  className="gallery-item-img"
                  style={styles.cardImage}
                  loading="lazy"
                  onError={(e) => { e.target.src = '/images/detron.jpeg'; }}
                />

                {/* Subtle Hover Action Overlay */}
                <div style={styles.cardHoverOverlay} className="gallery-hover-overlay">
                  <div style={styles.zoomButton}>
                    <SvgIcon name="zoomIn" size={20} color="#ffffff" />
                    <span style={styles.zoomButtonText}>EXPAND</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. CONTACT & SERVICE ENQUIRY CALLOUT ─── */}
      <section style={styles.enquirySection}>
        <div style={styles.container}>
          <div style={styles.enquiryBox}>
            <div style={styles.enquiryTextCol}>
              <span style={styles.enquiryEyebrow}>NEED ASSISTANCE?</span>
              <h3 style={styles.enquiryHeading}>
                SCHEDULE A SERVICE VISIT OR TECHNICAL AUDIT
              </h3>
              <p style={styles.enquiryDesc}>
                Whether you need on-site troubleshooting, rotary table accuracy calibration, 
                or preventive maintenance contracts, our engineering team is ready to assist.
              </p>
            </div>
            <div style={styles.enquiryBtnCol}>
              <Link to="/contact" style={styles.primaryBtn}>
                SUBMIT SERVICE ENQUIRY &gt;
              </Link>
              <a href="tel:+919840925769" style={styles.secondaryBtn}>
                <SvgIcon name="phone" size={16} color="#ffffff" />
                <span>+91 98409 25769</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. LIGHTBOX & ZOOM MODAL ─── */}
      {activePhoto && (
        <div style={styles.lightboxBackdrop} onClick={() => { setActivePhoto(null); setZoomScale(1); }}>
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            {/* Top Toolbar */}
            <div style={styles.lightboxBar}>
              <span style={styles.lightboxTitle}>WORKSHOP PHOTOGRAPH</span>

              <div style={styles.lightboxControls}>
                {/* Zoom Controls */}
                <button
                  onClick={() => setZoomScale(prev => Math.max(1, prev - 0.4))}
                  style={styles.toolBtn}
                  title="Zoom Out"
                >
                  <SvgIcon name="zoomOut" size={16} color="#0f172a" />
                </button>
                <span style={styles.toolScaleText}>{Math.round(zoomScale * 100)}%</span>
                <button
                  onClick={() => setZoomScale(prev => Math.min(3, prev + 0.4))}
                  style={styles.toolBtn}
                  title="Zoom In"
                >
                  <SvgIcon name="zoomIn" size={16} color="#0f172a" />
                </button>
                <button
                  onClick={() => setZoomScale(1)}
                  style={styles.resetBtn}
                  title="Reset Scale"
                >
                  Reset
                </button>

                {/* Close Button */}
                <button
                  onClick={() => { setActivePhoto(null); setZoomScale(1); }}
                  style={styles.closeBtn}
                  title="Close (Esc)"
                >
                  <SvgIcon name="close" size={20} color="#ffffff" />
                </button>
              </div>
            </div>

            {/* Viewport */}
            <div style={styles.lightboxViewport}>
              <button
                onClick={handlePrevPhoto}
                style={styles.navArrowLeft}
                title="Previous (Left Arrow)"
              >
                <SvgIcon name="chevronLeft" size={24} color="#ffffff" />
              </button>

              <div
                style={{
                  ...styles.lightboxImageContainer,
                  cursor: zoomScale > 1 ? 'grab' : 'zoom-in'
                }}
                onClick={() => setZoomScale(prev => (prev === 1 ? 1.8 : 1))}
              >
                <img
                  src={`/gallery/${encodeURIComponent(activePhoto)}`}
                  alt="Enlarged Workshop View"
                  style={{
                    ...styles.lightboxImg,
                    transform: `scale(${zoomScale})`,
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>

              <button
                onClick={handleNextPhoto}
                style={styles.navArrowRight}
                title="Next (Right Arrow)"
              >
                <SvgIcon name="chevronRight" size={24} color="#ffffff" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

// ─── STYLES OBJECT (PROFESSIONAL INDUSTRIAL PALETTE) ─────────────────────────
const styles = {
  page: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    minHeight: '100vh',
    overflowX: 'hidden'
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    boxSizing: 'border-box'
  },

  // 1. TOP HERO BANNER & BRAND BUTTON
  heroSection: {
    position: 'relative',
    height: '280px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  },
  brandButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-24px',
    position: 'relative',
    zIndex: 10
  },
  brandButton: {
    backgroundColor: '#E30613',
    color: '#ffffff',
    padding: '12px 36px',
    fontWeight: '800',
    fontSize: '15px',
    borderRadius: '4px',
    boxShadow: '0 4px 15px rgba(227, 6, 19, 0.35)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },

  // 2. ABOUT AXIS ENGINEERING DETAILS SECTION
  aboutServiceSection: {
    padding: '90px 0 70px',
    backgroundColor: '#ffffff'
  },
  sectionHeader: {
    textAlign: 'center',
    maxWidth: '850px',
    margin: '0 auto 50px'
  },
  sectionEyebrow: {
    fontSize: '11.5px',
    fontWeight: '800',
    letterSpacing: '2px',
    color: '#E30613',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px'
  },
  sectionMainTitle: {
    fontSize: 'clamp(24px, 3.2vw, 34px)',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 14px 0',
    letterSpacing: '0.5px'
  },
  titleDivider: {
    width: '60px',
    height: '3px',
    backgroundColor: '#E30613',
    margin: '0 auto 18px',
    borderRadius: '2px'
  },
  sectionLeadText: {
    fontSize: '15px',
    lineHeight: 1.7,
    color: '#475569',
    margin: 0
  },

  capabilitiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '24px',
    marginBottom: '50px'
  },
  featureCard: {
    backgroundColor: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    padding: '30px 24px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  iconCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '18px'
  },
  featureTitle: {
    fontSize: '17px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 10px 0'
  },
  featureText: {
    fontSize: '13.5px',
    lineHeight: 1.6,
    color: '#64748b',
    margin: '0 0 20px 0',
    flex: 1
  },
  featureFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12.5px',
    fontWeight: '700',
    color: '#0f172a',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '12px'
  },

  facilityInfoBar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0a0d14',
    color: '#ffffff',
    borderRadius: '10px',
    padding: '24px 36px',
    gap: '20px'
  },
  facilityCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: '1 1 240px'
  },
  facilityLabel: {
    fontSize: '10.5px',
    fontWeight: '800',
    letterSpacing: '1px',
    color: '#E30613',
    textTransform: 'uppercase'
  },
  facilityValue: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#f1f5f9'
  },
  facilityDivider: {
    width: '1px',
    height: '36px',
    backgroundColor: 'rgba(255, 255, 255, 0.12)'
  },

  // 3. CONTINUOUS PREVIEW STRIP
  marqueeSection: {
    backgroundColor: '#f8fafc',
    padding: '60px 0',
    borderTop: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0',
    overflow: 'hidden'
  },
  marqueeHeadingRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '24px',
    gap: '12px'
  },
  marqueeTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0
  },
  marqueeHint: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: '0.5px'
  },
  marqueeOuter: {
    width: '100%',
    overflow: 'hidden',
    padding: '10px 0'
  },
  marqueeImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  },

  // 4. CLEAN GALLERY GRID (NO TEXT DESCRIPTIONS UNDER PHOTOS)
  galleryGridSection: {
    padding: '90px 0',
    backgroundColor: '#ffffff'
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  galleryCard: {
    position: 'relative',
    height: '240px',
    backgroundColor: '#0a0d14',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1.5px solid #e2e8f0',
    cursor: 'pointer'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  },
  cardHoverOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(10, 13, 20, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  zoomButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#E30613',
    color: '#ffffff',
    padding: '8px 18px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '1px',
    boxShadow: '0 4px 12px rgba(227, 6, 19, 0.4)'
  },
  zoomButtonText: {
    color: '#ffffff'
  },

  // 5. ENQUIRY CALLOUT
  enquirySection: {
    backgroundColor: '#0a0d14',
    color: '#ffffff',
    padding: '60px 0',
    borderTop: '3px solid #E30613'
  },
  enquiryBox: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '30px'
  },
  enquiryTextCol: {
    flex: '1 1 500px'
  },
  enquiryEyebrow: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '1.5px',
    color: '#E30613',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '6px'
  },
  enquiryHeading: {
    fontSize: 'clamp(20px, 2.5vw, 26px)',
    fontWeight: '800',
    color: '#ffffff',
    margin: '0 0 10px 0'
  },
  enquiryDesc: {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: 1.6,
    margin: 0
  },
  enquiryBtnCol: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '14px',
    alignItems: 'center'
  },
  primaryBtn: {
    backgroundColor: '#E30613',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '4px',
    fontWeight: '800',
    fontSize: '12.5px',
    letterSpacing: '0.5px',
    textDecoration: 'none',
    boxShadow: '0 4px 12px rgba(227, 6, 19, 0.35)'
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '1.5px solid rgba(255, 255, 255, 0.25)',
    padding: '10px 20px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '12.5px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  },

  // 6. LIGHTBOX MODAL
  lightboxBackdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(5, 7, 10, 0.92)',
    backdropFilter: 'blur(6px)',
    zIndex: 25000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    boxSizing: 'border-box'
  },
  lightboxContent: {
    backgroundColor: '#0a0d14',
    borderRadius: '10px',
    border: '1px solid #1e293b',
    width: '100%',
    maxWidth: '1100px',
    maxHeight: '94vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
  },
  lightboxBar: {
    padding: '12px 20px',
    borderBottom: '1px solid #1e293b',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0e1320'
  },
  lightboxTitle: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '1px',
    color: '#94a3b8',
    textTransform: 'uppercase'
  },
  lightboxControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  toolBtn: {
    backgroundColor: '#ffffff',
    border: 'none',
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  toolScaleText: {
    fontSize: '11.5px',
    fontWeight: '700',
    color: '#cbd5e1',
    minWidth: '38px',
    textAlign: 'center'
  },
  resetBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #334155',
    color: '#cbd5e1',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer'
  },
  closeBtn: {
    backgroundColor: '#E30613',
    border: 'none',
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  lightboxViewport: {
    position: 'relative',
    height: '75vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    overflow: 'hidden'
  },
  lightboxImageContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    boxSizing: 'border-box'
  },
  lightboxImg: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    userSelect: 'none',
    display: 'block'
  },
  navArrowLeft: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10
  },
  navArrowRight: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10
  }
};
