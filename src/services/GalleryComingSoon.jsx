import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer/Footer';

// Inline Vector Icons (No emojis)
const SvgIcon = ({ name, size = 20, color = 'currentColor', style = {} }) => {
  const icons = {
    presentation: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="8" r="6" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    mapPin: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    checkCircle: (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </>
    ),
    arrowRight: (
      <>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </>
    ),
    cpu: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
      </>
    ),
    wrench: (
      <>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
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

export default function GalleryComingSoon({ type: propType }) {
  const location = useLocation();
  const isSeminar = propType === 'seminar' || location.pathname.includes('seminar');

  const content = isSeminar
    ? {
        badgeText: 'TECHNICAL SEMINAR',
        heroTag: 'AXIS ENGINEERING SOLUTIONS • KNOWLEDGE SHARING',
        title: 'CNC Precision Engineering & Rotary Integration Seminar',
        subhead: 'Masterclasses & Hands-On Engineering Workshops',
        description:
          'Axis Engineering Solutions is preparing a comprehensive technical seminar series covering 4th and 5th axis CNC rotary table integration, backlash zeroing on dual-lead worms, sub-micron metrology on granite surface plates, and custom hydraulic workholding optimization.',
        highlights: [
          {
            icon: 'cpu',
            title: '4th & 5th Axis Machine Interfacing',
            desc: 'Electrical interfacing with FANUC, Siemens, Mitsubishi, and Heidenhain CNC controllers.'
          },
          {
            icon: 'wrench',
            title: 'Backlash & Servo Tuning',
            desc: 'Practical demonstration of dual-lead worm gear adjustment and laser interferometer calibration.'
          },
          {
            icon: 'presentation',
            title: 'Custom Fixture Engineering',
            desc: 'Principles of hydraulic, pneumatic, and multi-part clamping for cycle time reduction.'
          },
          {
            icon: 'calendar',
            title: 'Sessions Across Industrial Hubs',
            desc: 'Interactive workshops scheduled across Chennai, Coimbatore, Bengaluru, and Pune.'
          }
        ],
        contactPrompt: 'Interested in attending our upcoming Technical Seminar?',
        inquirySubject: 'Technical Seminar Registration'
      }
    : {
        badgeText: 'EXHIBITIONS',
        heroTag: 'AXIS ENGINEERING SOLUTIONS • INDUSTRIAL SHOWCASE',
        title: 'Manufacturing & Machine Tool Exhibitions 2026',
        subhead: 'Live Rotary Table Demos & Cutting Showcases',
        description:
          'Experience Detron high-precision NC Rotary Tables, roller cam 4th & 5th axis tables, and custom-engineered fixture solutions live in action at premier manufacturing expos across India. Meet our technical integration engineers for personalized machine tool consultations.',
        highlights: [
          {
            icon: 'award',
            title: 'IMTEX — Bengaluru',
            desc: 'Live cutting demonstrations on 4th & 5th axis rotary tables at the Bangalore International Exhibition Centre.'
          },
          {
            icon: 'mapPin',
            title: 'ENGIMACH & AMTEX',
            desc: 'Showcasing high-payload rotary indexers, pneumatic brake systems, and direct drive rotary tables.'
          },
          {
            icon: 'wrench',
            title: 'Live CNC Machine Integration',
            desc: 'Witness real-time synchronization between machine tool spindles and Detron rotary tables.'
          },
          {
            icon: 'calendar',
            title: 'Exclusive Booth Passes',
            desc: 'VIP entry passes and pre-booked technical consultations for plant heads and manufacturing leaders.'
          }
        ],
        contactPrompt: 'Want VIP passes or exhibition booth meeting schedules?',
        inquirySubject: 'Exhibitions & Trade Expo Meeting'
      };

  useEffect(() => {
    document.title = `${content.badgeText} | Axis Engineering Solutions`;
    window.scrollTo(0, 0);
  }, [content.badgeText]);

  return (
    <div style={styles.page}>
      <Header activePage="gallery" />

      {/* HEADER SPACER */}
      <div style={{ height: '140px' }} />

      <style>{`
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.85);
          }
        }
        .coming-soon-card {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .coming-soon-card:hover {
          transform: translateY(-4px);
          border-color: #E30613 !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      {/* ─── 1. HERO BANNER ─── */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <div style={styles.tagPill}>
            <span style={styles.tagPulse} />
            <span style={styles.tagText}>{content.heroTag}</span>
          </div>
          <h1 style={styles.heroTitle}>{content.title}</h1>
          <p style={styles.heroSubhead}>{content.subhead}</p>
        </div>
      </section>

      {/* ─── 2. BRAND BADGE OVERLAP ─── */}
      <div style={styles.brandButtonContainer}>
        <div style={styles.brandButton}>{content.badgeText}</div>
      </div>

      {/* ─── 3. COMING SOON STATUS & HIGHLIGHTS ─── */}
      <section style={styles.contentSection}>
        <div style={styles.container}>
          {/* Status Alert Banner */}
          <div style={styles.statusBanner}>
            <div style={styles.statusDot} />
            <div>
              <span style={styles.statusTitle}>SCHEDULE IN PREPARATION &bull; COMING SOON</span>
              <p style={styles.statusMessage}>
                We are finalizing the official dates, agenda, and guest registrations for this event. 
                Complete schedules and photo archives will be published right here.
              </p>
            </div>
          </div>

          {/* Overview text */}
          <div style={styles.leadTextWrap}>
            <p style={styles.leadText}>{content.description}</p>
          </div>

          {/* Highlights Grid */}
          <div style={styles.grid}>
            {content.highlights.map((item, idx) => (
              <div key={idx} className="coming-soon-card" style={styles.card}>
                <div style={styles.cardIconBox}>
                  <SvgIcon name={item.icon} size={22} color="#E30613" />
                </div>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Call to Action Box */}
          <div style={styles.ctaCard}>
            <div style={styles.ctaTextWrap}>
              <span style={styles.ctaEyebrow}>STAY INFORMED</span>
              <h2 style={styles.ctaTitle}>{content.contactPrompt}</h2>
              <p style={styles.ctaSub}>
                Leave your inquiry or contact our team to be among the first to receive dates, booth locations, and VIP invitations.
              </p>
            </div>
            <div style={styles.ctaActions}>
              <Link to={`/contact?interest=${encodeURIComponent(content.inquirySubject)}`} style={styles.ctaPrimaryBtn}>
                <SvgIcon name="bell" size={16} color="#ffffff" style={{ marginRight: '8px' }} />
                <span>Contact for Details</span>
              </Link>
              <Link to="/gallery/service-gallery-2026" style={styles.ctaSecondaryBtn}>
                <span>Explore Service Gallery (2026)</span>
                <SvgIcon name="arrowRight" size={14} color="#0f172a" style={{ marginLeft: '6px' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    fontFamily: "var(--font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
    minHeight: '100vh',
    overflowX: 'hidden'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    boxSizing: 'border-box'
  },
  heroSection: {
    position: 'relative',
    height: '320px',
    backgroundImage: 'url("/images/detron.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff'
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(10, 13, 20, 0.78)'
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '900px',
    padding: '0 20px'
  },
  tagPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '24px',
    padding: '5px 16px',
    marginBottom: '14px'
  },
  tagPulse: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#E30613',
    animation: 'pulseGlow 2s infinite'
  },
  tagText: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '1.5px',
    color: '#e2e8f0',
    textTransform: 'uppercase'
  },
  heroTitle: {
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: '900',
    letterSpacing: '-0.5px',
    lineHeight: 1.2,
    margin: '0 0 10px 0',
    color: '#ffffff'
  },
  heroSubhead: {
    fontSize: 'clamp(14px, 1.6vw, 17px)',
    color: '#cbd5e1',
    fontWeight: '500',
    margin: 0
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
  contentSection: {
    padding: '60px 0 90px',
    backgroundColor: '#ffffff'
  },
  statusBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    backgroundColor: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: '8px',
    padding: '18px 24px',
    marginBottom: '40px'
  },
  statusDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#d97706',
    flexShrink: 0,
    marginTop: '4px',
    animation: 'pulseGlow 1.8s infinite'
  },
  statusTitle: {
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '1.2px',
    color: '#92400e',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '4px'
  },
  statusMessage: {
    fontSize: '14.5px',
    lineHeight: '1.6',
    color: '#78350f',
    margin: 0
  },
  leadTextWrap: {
    maxWidth: '850px',
    margin: '0 auto 50px',
    textAlign: 'center'
  },
  leadText: {
    fontSize: '16.5px',
    lineHeight: '1.7',
    color: '#334155'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
    marginBottom: '60px'
  },
  card: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderTop: '3px solid #0f172a',
    borderRadius: '8px',
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column'
  },
  cardIconBox: {
    width: '46px',
    height: '46px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  cardTitle: {
    fontSize: '17px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 10px 0',
    lineHeight: 1.3
  },
  cardDesc: {
    fontSize: '14px',
    color: '#64748b',
    lineHeight: 1.6,
    margin: 0
  },
  ctaCard: {
    backgroundColor: '#0a0d14',
    borderRadius: '12px',
    padding: '48px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '30px',
    color: '#ffffff',
    boxShadow: '0 20px 45px rgba(0,0,0,0.15)'
  },
  ctaTextWrap: {
    maxWidth: '600px'
  },
  ctaEyebrow: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '2px',
    color: '#E30613',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px'
  },
  ctaTitle: {
    fontSize: '24px',
    fontWeight: '800',
    margin: '0 0 10px 0',
    color: '#ffffff'
  },
  ctaSub: {
    fontSize: '14.5px',
    lineHeight: 1.6,
    color: '#94a3b8',
    margin: 0
  },
  ctaActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  },
  ctaPrimaryBtn: {
    backgroundColor: '#E30613',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '13px 26px',
    borderRadius: '4px',
    fontWeight: '800',
    fontSize: '13px',
    letterSpacing: '0.5px',
    display: 'inline-flex',
    alignItems: 'center',
    boxShadow: '0 4px 14px rgba(227, 6, 19, 0.4)',
    transition: 'all 0.2s ease'
  },
  ctaSecondaryBtn: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    textDecoration: 'none',
    padding: '13px 22px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '13px',
    display: 'inline-flex',
    alignItems: 'center',
    border: '1px solid #cbd5e1',
    transition: 'all 0.2s ease'
  }
};
