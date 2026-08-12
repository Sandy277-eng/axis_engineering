import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={styles.footerContainer}>
      {/* TOP RED ACCENT LINE */}
      <div style={styles.topAccentBar} />

      <div style={styles.footerContent}>
        {/* COLUMN 1: BRAND, OVERVIEW & SPECIALTIES */}
        <div style={styles.column}>
          <img
            src="/logo_axis/logo%20axis.jpg.jpeg"
            alt="Axis Engineering Solutions"
            style={styles.footerLogo}
          />
          <p style={styles.descriptionText}>
            Proudly associated with <strong>Detron Machinery Co. Ltd., Taiwan</strong>—the world's largest professional Rotary Table Manufacturer.<br /><br />
            Established in 2014,<br />
            <strong>Axis Engineering Solutions</strong> delivers total turnkey integration, 4th & 5th axis interfacing, DDR integration, and custom hydraulic/jig control systems.
          </p>
          <div style={styles.tagline}>
            <span style={styles.tagDot}></span> Official Partner for Detron CNC Products
          </div>
          <div style={styles.metaBadgeBox}>
            <span style={styles.metaBadge}>Industry: Automation Machinery</span>
            <span style={styles.metaBadge}>Founded: 2014</span>
            <span style={styles.metaBadge}>Employees: 11–50</span>
          </div>
        </div>

        {/* COLUMN 2: QUICK NAVIGATION */}
        <div style={styles.column}>
          <h4 style={styles.columnHeader}>QUICK NAVIGATION</h4>
          <ul style={styles.linkList}>
            <li><Link to="/" style={styles.footerLink}>Home</Link></li>
            <li><Link to="/products/detron" style={styles.footerLink}>Detron Rotary Tables</Link></li>
            <li><Link to="/products/fixtures" style={styles.footerLink}>Custom Fixtures</Link></li>
            <li><Link to="/about" style={styles.footerLink}>About Axis Engineering</Link></li>
            <li><Link to="/contact" style={styles.footerLink}>Contact Us</Link></li>
          </ul>
        </div>

        {/* COLUMN 3: TURNKEY SOLUTIONS & INTEGRATION */}
        <div style={styles.column}>
          <h4 style={styles.columnHeader}>ENGINEERING SPECIALTIES</h4>
          <ul style={styles.linkList}>
            <li><span style={styles.specItem}>4th & 5th Axis CNC Interfacing</span></li>
            <li><span style={styles.specItem}>Fanuc, Mitsubishi, Siemens, Heidenhain Controls</span></li>
            <li><span style={styles.specItem}>Direct Drive (DDR) Integration</span></li>
            <li><span style={styles.specItem}>Hydraulic Fixture & Rotary Systems</span></li>
            <li><span style={styles.specItem}>Jig Control Logic & Safety Interlocks</span></li>
            <li><span style={styles.specItem}>Servo Tuning & Cable Management</span></li>
          </ul>
        </div>

        {/* COLUMN 4: OFFICIAL CONTACT & LOCATION DETAILS */}
        <div style={styles.column}>
          <h4 style={styles.columnHeader}>CONTACT & HEADQUARTERS</h4>
          <div style={styles.contactItem}>
            <span style={styles.icon}>📍</span>
            <span>
              <strong>Axis Engineering Solutions</strong><br />
              78-B, First Floor, Geason Housing Colony,<br />
              1st Main Road, Ayanambakkam,<br />
              Chennai, Tamil Nadu 600095, India
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

          <div style={styles.contactItem}>
            <span style={styles.icon}>🌐</span>
            <a 
              href="http://www.axisengineeringsolutions.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.webLink}
            >
              www.axisengineeringsolutions.in
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
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.legalLink}
            >
              Get Directions
            </a>
            <span>|</span>
            <a href="#privacy" style={styles.legalLink}>Privacy Policy</a>
            <span>|</span>
            <a href="#terms" style={styles.legalLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footerContainer: {
    backgroundColor: '#0a0a0a',
    color: '#e2e8f0',
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box'
  },
  topAccentBar: {
    height: '4px',
    backgroundColor: '#E30613',
    width: '100%'
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '36px',
    padding: '48px 32px',
    maxWidth: '1280px',
    margin: '0 auto',
    alignItems: 'start'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  footerLogo: {
    height: '42px',
    maxWidth: '210px',
    width: '100%',
    display: 'block',
    objectFit: 'contain',
    marginBottom: '16px',
    alignSelf: 'flex-start'
  },
  descriptionText: {
    fontSize: '12px',
    color: '#94a3b8',
    lineHeight: '1.6',
    marginBottom: '16px',
    textAlign: 'left'
  },
  tagline: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#171717',
    padding: '8px 12px',
    borderRadius: '4px',
    borderLeft: '3px solid #E30613',
    marginBottom: '12px'
  },
  tagDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#E30613',
    display: 'inline-block'
  },
  metaBadgeBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '6px'
  },
  metaBadge: {
    fontSize: '10px',
    color: '#cbd5e1',
    backgroundColor: '#1c1c1c',
    padding: '4px 8px',
    borderRadius: '3px',
    border: '1px solid #282828'
  },
  columnHeader: {
    fontSize: '13px',
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
    fontSize: '12px',
    fontWeight: '500',
    transition: 'color 0.2s ease'
  },
  specItem: {
    color: '#94a3b8',
    fontSize: '12px',
    lineHeight: '1.5'
  },
  contactItem: {
    display: 'flex',
    gap: '12px',
    fontSize: '12px',
    color: '#cbd5e1',
    marginBottom: '14px',
    lineHeight: '1.5',
    textAlign: 'left'
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
  webLink: {
    color: '#E30613',
    textDecoration: 'none',
    fontWeight: '700'
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