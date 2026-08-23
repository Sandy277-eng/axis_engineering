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
            <span style={styles.icon}>🏠︎</span>
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

          {/* WhatsApp */}
          <div style={styles.contactItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <a href="https://wa.me/919003224117" target="_blank" rel="noopener noreferrer" style={styles.whatsappLink}>
              WhatsApp: +91 90032 24117
            </a>
          </div>

          <div style={styles.contactItem}>
            <span style={styles.icon}>🖂</span>
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
          <a
            href="https://wa.me/919003224117"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.whatsappBottomBtn}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366" style={{ marginRight: 5 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            WhatsApp Us: +91 90032 24117
          </a>
          <div style={styles.legalLinks}>
            <a 
              href="https://maps.app.goo.gl/4hB7DMjNiiiabTDWA" 
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
  },
  whatsappLink: {
    color: '#25D366',
    fontWeight: '700',
    textDecoration: 'none',
    fontSize: '12px'
  },
  whatsappBottomBtn: {
    display: 'flex',
    alignItems: 'center',
    color: '#25D366',
    fontWeight: '700',
    textDecoration: 'none',
    fontSize: '12px',
    backgroundColor: '#0d1a10',
    border: '1px solid #166534',
    borderRadius: '5px',
    padding: '5px 10px',
  }
};