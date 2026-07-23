import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={styles.footerContainer}>
      {/* TOP RED ACCENT LINE */}
      <div style={styles.topAccentBar} />

      <div style={styles.footerContent}>
        {/* COLUMN 1: BRAND & ABOUT */}
        <div style={styles.column}>
          <div style={styles.brandTitle}>
            AXIS <span style={{ color: '#E30613' }}>ENGINEERING</span>
          </div>
          <p style={styles.brandSubtitle}>SOLUTIONS PRIVATE LIMITED</p>
          <p style={styles.descriptionText}>
            Leading supplier of high-precision CNC rotary tables, 4th & 5th axis indexers, and bespoke workholding fixtures engineered for complex manufacturing environments.
          </p>
          <div style={styles.tagline}>
            <span style={styles.tagDot}></span> Official Partner for Detron CNC Products
          </div>
        </div>

        {/* COLUMN 2: QUICK LINKS */}
        <div style={styles.column}>
          <h4 style={styles.columnHeader}>QUICK NAVIGATION</h4>
          <ul style={styles.linkList}>
            <li><Link to="/" style={styles.footerLink}>Home</Link></li>
            <li><Link to="/products/detron" style={styles.footerLink}>Detron Rotary Tables</Link></li>
            <li><Link to="/products/fixtures" style={styles.footerLink}>Custom Fixtures</Link></li>
            <li><Link to="/" style={styles.footerLink}>About Axis Engineering</Link></li>
            <li><Link to="/contact" style={styles.footerLink}>Contact Us</Link></li>
          </ul>
        </div>

        {/* COLUMN 3: PRODUCTS & SOLUTIONS */}
        <div style={styles.column}>
          <h4 style={styles.columnHeader}>PRODUCT CATEGORIES</h4>
          <ul style={styles.linkList}>
            <li><Link to="/products/detron/5th-axis" style={styles.footerLink}>CNC Tilting Rotary Tables</Link></li>
            <li><Link to="/products/detron/4th-axis" style={styles.footerLink}>4th Axis Standard Indexers</Link></li>
            <li><Link to="/products/detron/5th-axis" style={styles.footerLink}>5th Axis High-Speed Tables</Link></li>
            <li><Link to="/products/fixtures" style={styles.footerLink}>Hydraulic & Pneumatic Fixtures</Link></li>
            <li><Link to="/products/detron/auto-pallet-changer" style={styles.footerLink}>Auto Pallet Changers & Tailstock</Link></li>
          </ul>
        </div>

        {/* COLUMN 4: OFFICIAL CONTACT INFO */}
        <div style={styles.column}>
          <h4 style={styles.columnHeader}>CONTACT DETAILS</h4>
          <div style={styles.contactItem}>
            <span style={styles.icon}>🌐</span>
            <span>
              No. 78-B, 1st Floor, Geason Housing Colony,<br />
              1st Main Road, Ayanambakkam,<br />
              Chennai - 600095, Tamil Nadu, India
            </span>
          </div>

          <div style={styles.contactItem}>
            <span style={styles.icon}>🕿</span>
            <span>
              +91 98849 12279 / +91 98849 12280<br />
              044 - 4746 8749
            </span>
          </div>

          <div style={styles.contactItem}>
            <span style={styles.icon}>✉️</span>
            <a href="mailto:info@axisengineeringsolutions.in" style={styles.emailLink}>
              info@axisengineeringsolutions.in
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT BAR */}
      <div style={styles.bottomBar}>
        <div style={styles.bottomContent}>
          <p style={styles.copyrightText}>
            © {new Date().getFullYear()} <strong>Axis Engineering Solutions</strong>. All Rights Reserved.
          </p>
          <div style={styles.legalLinks}>
            <a href="#privacy" style={styles.legalLink}>Privacy Policy</a>
            <span>|</span>
            <a href="#terms" style={styles.legalLink}>Terms of Service</a>
            <span>|</span>
            <a href="#sitemap" style={styles.legalLink}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footerContainer: {
    backgroundColor: '#0a0a0a', // Detron deep dark theme
    color: '#e2e8f0',
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box'
  },
  topAccentBar: {
    height: '4px',
    backgroundColor: '#E30613', // Detron signature primary red
    width: '100%'
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '32px',
    padding: '48px 32px',
    maxWidth: '1280px',
    margin: '0 auto'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  brandTitle: {
    fontSize: '22px',
    fontWeight: '900',
    letterSpacing: '1px',
    color: '#ffffff'
  },
  brandSubtitle: {
    fontSize: '9px',
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: '2px',
    margin: '4px 0 16px 0'
  },
  descriptionText: {
    fontSize: '13px',
    color: '#94a3b8',
    lineHeight: '1.6',
    marginBottom: '16px'
  },
  tagline: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#171717',
    padding: '8px 12px',
    borderRadius: '4px',
    borderLeft: '3px solid #E30613'
  },
  tagDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#E30613',
    display: 'inline-block'
  },
  columnHeader: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '1px',
    marginBottom: '20px',
    position: 'relative',
    borderBottom: '2px solid #E30613',
    paddingBottom: '8px',
    display: 'inline-block',
    alignSelf: 'flex-start'
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  footerLink: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'color 0.2s ease'
  },
  contactItem: {
    display: 'flex',
    gap: '12px',
    fontSize: '13px',
    color: '#cbd5e1',
    marginBottom: '16px',
    lineHeight: '1.5'
  },
  icon: {
    fontSize: '14px',
    flexShrink: 0
  },
  emailLink: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontWeight: '600'
  },
  bottomBar: {
    backgroundColor: '#000000',
    borderTop: '1px solid #1f2937',
    padding: '16px 32px'
  },
  bottomContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    fontSize: '12px',
    color: '#64748b'
  },
  copyrightText: {
    margin: 0
  },
  legalLinks: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  legalLink: {
    color: '#94a3b8',
    textDecoration: 'none'
  }
};