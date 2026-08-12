import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export default function ContactPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const leftContentRef = useRef(null);
  const imageRef = useRef(null);
  const highlightsRef = useRef(null);

  const searchParams = new URLSearchParams(location.search);
  const initialProduct = searchParams.get('product') || '';

  const [countryCode, setCountryCode] = useState('+91');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productInterest: initialProduct ? `Detron ${initialProduct}` : 'Detron Rotary Tables',
    message: initialProduct ? `Hi, I am interested in Detron ${initialProduct}. Please share technical catalog, price quotation and delivery lead time.` : ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const tl = gsap.timeline();
    tl.fromTo(
      leftContentRef.current,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        imageRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        highlightsRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your inquiry has been sent successfully.`);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={styles.pageContainer}>
      {/* HEADER NAV (WITH DUAL LOGOS) */}
      <header style={styles.header}>
        <div style={styles.dualLogoGroup} onClick={handleBack}>
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
        <button onClick={handleBack} style={styles.backBtn}>
          &larr; BACK TO HOME
        </button>
      </header>

      {/* MAIN TWO-HALF SPLIT VIEW (EQUAL HEIGHT ALIGNMENT) */}
      <div style={styles.splitWrapper}>
        
        {/* ================= LEFT HALF: WHITE SHOWCASE & MAP ================= */}
        <div style={styles.leftHalf}>
          <div ref={leftContentRef} style={styles.leftContentWrapper}>
            
            <div style={styles.leftTopBlock}>
              {/* FEATURED IMAGE CONTAINER (SLIDES FROM LEFT) */}
              <div ref={imageRef} style={styles.imageCard}>
                <img
                  src="/logo_axis/axis_industry image.png"
                  alt="Axis Engineering Solutions Industry Showcase"
                  style={styles.featuredImage}
                />
                <div style={styles.imageOverlayGradient} />
                <div style={styles.imageTag}>
                  <span>AUTHORIZED DETRON PARTNER</span>
                </div>
              </div>

              {/* DESCRIPTION & HIGHLIGHTS (SLIDES FROM LEFT) */}
              <div ref={highlightsRef} style={styles.aboutTextContainer}>
                <h2 style={styles.leftTitle}>Axis Engineering Solutions</h2>
                <p style={styles.leftSubtitle}>
                  Pioneering Precision Engineering & Industrial Workholding Solutions
                </p>

                <p style={styles.descriptionParagraph}>
                  With deep domain expertise spanning Electrical, Mechatronics, and Mechanical Engineering, Axis Engineering Solutions provides end-to-end support—from initial component conceptualization and detailed CAD design to turnkey manufacturing integration and sourcing.
                </p>

                <p style={styles.descriptionParagraph}>
                  As the authorized distributor and technical partner for <strong>Detron Machinery Co., Ltd.</strong> in India, we deliver world-class 4th & 5th axis CNC rotary tables, bespoke hydraulic/pneumatic clamping fixtures, and reliable after-sales technical service.
                </p>

                {/* HIGHLIGHT BADGES */}
                <div style={styles.highlightsGrid}>
                  <div style={styles.highlightCard}>
                    <span style={styles.highlightTitle}>Turnkey Engineering</span>
                    <span style={styles.highlightSub}>Concept to Commissioning</span>
                  </div>
                  <div style={styles.highlightCard}>
                    <span style={styles.highlightTitle}>Precision Testing</span>
                    <span style={styles.highlightSub}>Strict In-House Standards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MAP SATELLITE VIEW (ALIGNED TO BOTTOM) */}
            <div style={styles.mapContainer}>
              <div style={styles.mapHeader}>
                <span style={styles.mapTitle}>FACILITY SATELLITE VIEW</span>
                <a
                  href="https://maps.app.goo.gl/4hB7DMjNiiiabTDWA"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.mapLinkBtn}
                >
                  Open in Maps ↗
                </a>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.899318854406!2d80.16193407507767!3d13.047686087274474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526100732f1693%3A0x664ea1fc5b72f2c2!2sAxis%20Engineering%20Solutions!5e1!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={styles.mapIframe}
                title="Axis Engineering Solutions Location Satellite View"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>

        {/* ================= RIGHT HALF: DARK INQUIRY & FOOTER ================= */}
        <div style={styles.rightHalf}>
          <div style={styles.rightContentWrapper}>
            
            <div style={styles.rightTopBlock}>
              {/* TOP CONTACT INFO (EXACT TEMPLATE STYLE FROM REFERENCE IMAGE 1) */}
              <div style={styles.refInfoSection}>
                <div style={styles.refGrid}>
                  
                  {/* 1. OUR MAIN OFFICE */}
                  <div style={styles.refItem}>
                    <div style={styles.refIconWrapper}>
                      <svg style={styles.refIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <h4 style={styles.refHeading}>OUR MAIN OFFICE</h4>
                    <p style={styles.refText}>
                      No. 78-B, 1st Floor, Geason Housing Colony,<br />
                      Ayanambakkam, Chennai - 600095, TN, India
                    </p>
                  </div>

                  {/* 2. PHONE NUMBER */}
                  <div style={styles.refItem}>
                    <div style={styles.refIconWrapper}>
                      <svg style={styles.refIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 3.99c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-.99-1.11z" />
                      </svg>
                    </div>
                    <h4 style={styles.refHeading}>PHONE NUMBER</h4>
                    <p style={styles.refText}>
                      +91 98849 12279<br />
                      +91 98849 12280
                    </p>
                  </div>

                  {/* 3. FAX / TEL */}
                  <div style={styles.refItem}>
                    <div style={styles.refIconWrapper}>
                      <svg style={styles.refIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 14H8v-4h8v4zm2-4v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" />
                        <circle cx="18" cy="11.5" r="1" />
                      </svg>
                    </div>
                    <h4 style={styles.refHeading}>FAX / TEL</h4>
                    <p style={styles.refText}>
                      044 - 4746 8749<br />
                      Mon - Sat (9am - 6pm)
                    </p>
                  </div>

                  {/* 4. MAIL */}
                  <div style={styles.refItem}>
                    <div style={styles.refIconWrapper}>
                      <svg style={styles.refIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <h4 style={styles.refHeading}>MAIL</h4>
                    <p style={styles.refText}>
                      info@axisengineeringsolutions.in
                    </p>
                  </div>

                </div>
              </div>

              {/* DIVIDER */}
              <div style={styles.sectionDivider} />

              {/* FORM HEADER */}
              <div style={styles.formHeader}>
                <h3 style={styles.rightTitle}>Send Us a Message</h3>
                <p style={styles.rightSubtitle}>
                  Fill out the inquiry form below for rapid quotations and engineering consultation.
                </p>
              </div>

              {/* INQUIRY FORM */}
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formRow}>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      required
                      style={styles.input}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Email Address *</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      required
                      style={styles.input}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Phone Number *</label>
                    <div style={styles.phoneInputWrapper}>
                      <div style={styles.countryDropdown}>
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          style={styles.countrySelect}
                        >
                          <option value="+91">🇮🇳 IN +91</option>
                          <option value="+44">🇬🇧 UK +44</option>
                          <option value="+1">🇺🇸 US +1</option>
                          <option value="+49">🇩🇪 DE +49</option>
                        </select>
                        <span style={styles.dropdownArrow}>▼</span>
                      </div>
                      <input
                        type="tel"
                        placeholder="00000 00000"
                        required
                        style={styles.phoneInput}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Company Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Axis Tools Ltd"
                      style={styles.input}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Inquiry Type *</label>
                  <div style={styles.selectWrapper}>
                    <select
                      style={styles.select}
                      value={formData.productInterest}
                      onChange={(e) => setFormData({ ...formData, productInterest: e.target.value})}
                    >
                      <option value="Detron Rotary Tables">Inquiry Type: Detron CNC Rotary Tables</option>
                      <option value="Custom Workholding Fixtures">Inquiry Type: Custom Workholding Fixtures</option>
                      <option value="Service & Maintenance">Inquiry Type: Service & Warranty Support</option>
                    </select>
                    <span style={styles.dropdownArrow}>▼</span>
                  </div>
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Technical Requirements *</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us about your machinery, component specs, or custom requirements..."
                    required
                    style={styles.textarea}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" style={styles.submitBtn}>
                  Submit Inquiry &gt;
                </button>
              </form>
            </div>

            {/* CLEAN BOTTOM FOOTER (ALIGNED TO FINISH AT EXACT SAME BOTTOM LINE) */}
            <div style={styles.richFooterBox}>
              {/* SERVICE HIGHLIGHTS (CLEAN WITHOUT EMOJI ICONS) */}
              <div style={styles.serviceHighlightsRow}>
                <div style={styles.serviceMiniCard}>
                  <h5 style={styles.serviceCardTitle}>BUSINESS HOURS</h5>
                  <p style={styles.serviceCardDesc}>Mon – Sat: 9:00 AM – 6:30 PM (IST)</p>
                </div>

                <div style={styles.serviceMiniCard}>
                  <h5 style={styles.serviceCardTitle}>RAPID RESPONSE</h5>
                  <p style={styles.serviceCardDesc}>Technical quote within 24 hours</p>
                </div>

                <div style={styles.serviceMiniCard}>
                  <h5 style={styles.serviceCardTitle}>SERVICE SUPPORT</h5>
                  <p style={styles.serviceCardDesc}>Pan-India on-site commissioning</p>
                </div>
              </div>

              {/* QUICK NAVIGATION & CORE SOLUTIONS */}
              <div style={styles.footerCapabilitiesSection}>
                <div style={styles.footerCol}>
                  <h6 style={styles.footerColTitle}>CORE SOLUTIONS</h6>
                  <ul style={styles.footerList}>
                    <li>4th & 5th Axis CNC Rotary Tables</li>
                    <li>Direct Drive (DDR) Integration</li>
                    <li>Hydraulic & Pneumatic Fixtures</li>
                    <li>Custom CNC Workholding & Jigs</li>
                  </ul>
                </div>

                <div style={styles.footerCol}>
                  <h6 style={styles.footerColTitle}>QUICK NAVIGATION</h6>
                  <ul style={styles.footerList}>
                    <li><Link to="/" style={styles.footerNavlink}>Home</Link></li>
                    <li><Link to="/products/detron" style={styles.footerNavlink}>Detron Products Catalog</Link></li>
                    <li><Link to="/about" style={styles.footerNavlink}>About Axis Engineering</Link></li>
                    <li><Link to="/contact" style={styles.footerNavlink}>Contact Us</Link></li>
                  </ul>
                </div>
              </div>

              {/* BOTTOM COPYRIGHT */}
              <div style={styles.footerBottomBar}>
                <p style={styles.footerCopyright}>
                  © {new Date().getFullYear()} <strong>Axis Engineering Solutions</strong>. Authorized Distributor & Technical Partner of Detron Machinery Co., Ltd. (Taiwan). All rights reserved.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

const ACCENT_COLOR = '#E30613';

const styles = {
  pageContainer: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#0a0a0a',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 32px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderBottom: `3px solid ${ACCENT_COLOR}`,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  logoImage: { height: '32px', width: 'auto', display: 'block', objectFit: 'contain' },
  logoImageDetron: { height: '28px', width: 'auto', display: 'block', objectFit: 'contain' },
  logoDivider: { height: '24px', width: '1px', backgroundColor: '#cbd5e1', margin: '0 8px' },
  dualLogoGroup: { display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' },
  logoLink: { display: 'flex', alignItems: 'center' },
  backBtn: {
    backgroundColor: ACCENT_COLOR,
    color: '#ffffff',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '12px',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease'
  },
  splitWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    alignItems: 'stretch',
    minHeight: 'calc(100vh - 60px)'
  },

  /* ================= LEFT HALF ================= */
  leftHalf: {
    flex: '1 1 520px',
    position: 'relative',
    backgroundColor: '#ffffff',
    color: '#1e293b',
    padding: '40px 36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRight: '1px solid #e2e8f0',
    boxSizing: 'border-box'
  },
  leftContentWrapper: {
    maxWidth: '580px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '0 auto',
    textAlign: 'left'
  },
  leftTopBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '22px'
  },
  imageCard: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)'
  },
  featuredImage: {
    width: '100%',
    height: '260px',
    objectFit: 'cover',
    display: 'block'
  },
  imageOverlayGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(255,255,255,0) 45%, rgba(0,0,0,0.65) 100%)'
  },
  imageTag: {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    backgroundColor: ACCENT_COLOR,
    color: '#ffffff',
    padding: '6px 14px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '1px'
  },
  aboutTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '24px',
    backgroundColor: '#f8fafc',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
  },
  leftTitle: { fontSize: '28px', fontWeight: '900', margin: 0, color: '#0f172a', letterSpacing: '-0.5px' },
  leftSubtitle: { fontSize: '13.5px', color: ACCENT_COLOR, fontWeight: '700', marginBottom: '4px' },
  descriptionParagraph: { fontSize: '13px', color: '#334155', lineHeight: '1.6', margin: 0 },
  highlightsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' },
  highlightCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderLeft: `4px solid ${ACCENT_COLOR}`,
    padding: '10px 12px',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column'
  },
  highlightTitle: { fontSize: '12.5px', fontWeight: '800', color: '#0f172a' },
  highlightSub: { fontSize: '11px', color: '#64748b', marginTop: '2px' },
  mapContainer: {
    marginTop: '22px',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1px solid #cbd5e1',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    backgroundColor: '#ffffff'
  },
  mapHeader: {
    padding: '10px 14px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mapTitle: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '0.8px',
    color: '#ffffff'
  },
  mapLinkBtn: {
    color: '#38bdf8',
    fontSize: '11px',
    fontWeight: '700',
    textDecoration: 'none'
  },
  mapIframe: { border: 0, width: '100%', height: '320px', display: 'block' },

  /* ================= RIGHT HALF ================= */
  rightHalf: {
    flex: '1 1 520px',
    backgroundColor: '#0d0d0d',
    padding: '40px 36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 10,
    boxSizing: 'border-box'
  },
  rightContentWrapper: {
    maxWidth: '640px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '0 auto',
    textAlign: 'left'
  },
  rightTopBlock: {
    display: 'flex',
    flexDirection: 'column'
  },

  /* REFERENCE TEMPLATE CONTACT HEADER (IMAGE 1 STYLE) */
  refInfoSection: {
    backgroundColor: '#141414',
    border: '1px solid #222222',
    borderRadius: '12px',
    padding: '24px 18px',
    marginBottom: '22px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
  },
  refGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(125px, 1fr))',
    gap: '16px',
    textAlign: 'center'
  },
  refItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  refIconWrapper: {
    width: '46px',
    height: '46px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    color: '#9ca3af'
  },
  refIcon: {
    width: '34px',
    height: '34px'
  },
  refHeading: {
    fontSize: '12px',
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: '0.6px',
    margin: '0 0 6px 0',
    textTransform: 'uppercase'
  },
  refText: {
    fontSize: '11px',
    color: '#a1a1aa',
    lineHeight: '1.45',
    margin: 0,
    fontWeight: '500'
  },

  sectionDivider: {
    height: '1px',
    backgroundColor: '#222222',
    marginBottom: '20px'
  },

  formHeader: { marginBottom: '18px', textAlign: 'left' },
  rightTitle: { fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.3px' },
  rightSubtitle: { fontSize: '12.5px', color: '#9ca3af', marginTop: '4px' },

  form: { display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' },
  formRow: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  fieldGroup: { flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' },
  label: { fontSize: '11.5px', fontWeight: '700', color: '#e4e4e7', textAlign: 'left' },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #2e2e2e',
    backgroundColor: '#171717',
    color: '#ffffff',
    fontSize: '12.5px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  phoneInputWrapper: {
    display: 'flex',
    border: '1px solid #2e2e2e',
    borderRadius: '6px',
    backgroundColor: '#171717',
    overflow: 'hidden'
  },
  countryDropdown: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #cbd5e1',
    display: 'flex',
    alignItems: 'center',
    paddingRight: '6px'
  },
  countrySelect: {
    appearance: 'none',
    backgroundColor: '#ffffff',
    border: 'none',
    padding: '10px 18px 10px 8px',
    fontSize: '11.5px',
    fontWeight: '700',
    color: '#000000',
    outline: 'none',
    cursor: 'pointer'
  },
  dropdownArrow: {
    position: 'absolute',
    right: '6px',
    fontSize: '8px',
    color: '#333333',
    pointerEvents: 'none'
  },
  phoneInput: {
    flex: 1,
    border: 'none',
    padding: '10px 12px',
    fontSize: '12.5px',
    outline: 'none',
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  selectWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  select: {
    width: '100%',
    appearance: 'none',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #2e2e2e',
    fontSize: '12.5px',
    backgroundColor: '#171717',
    color: '#ffffff',
    outline: 'none',
    cursor: 'pointer'
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #2e2e2e',
    backgroundColor: '#171717',
    color: '#ffffff',
    fontSize: '12.5px',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  submitBtn: {
    backgroundColor: ACCENT_COLOR,
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    fontWeight: '800',
    fontSize: '13px',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    marginTop: '4px',
    boxShadow: '0 4px 14px rgba(227, 6, 19, 0.3)',
    transition: 'background-color 0.2s ease'
  },

  /* CLEAN BOTTOM FOOTER (MATCHING HEIGHT OF LEFT SIDE) */
  richFooterBox: {
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: '1px solid #222222',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  serviceHighlightsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '10px'
  },
  serviceMiniCard: {
    backgroundColor: '#141414',
    border: '1px solid #222222',
    borderRadius: '8px',
    padding: '10px 12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  serviceCardTitle: {
    fontSize: '10.5px',
    fontWeight: '800',
    color: '#ffffff',
    margin: 0,
    letterSpacing: '0.4px'
  },
  serviceCardDesc: {
    fontSize: '10px',
    color: '#a1a1aa',
    margin: '2px 0 0 0',
    lineHeight: '1.3'
  },
  footerCapabilitiesSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    padding: '14px',
    backgroundColor: '#111111',
    borderRadius: '8px',
    border: '1px solid #1f1f1f'
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  footerColTitle: {
    fontSize: '10.5px',
    fontWeight: '800',
    color: ACCENT_COLOR,
    letterSpacing: '0.6px',
    margin: 0,
    textTransform: 'uppercase'
  },
  footerList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    fontSize: '11px',
    color: '#9ca3af'
  },
  footerNavlink: {
    color: '#d4d4d8',
    textDecoration: 'none',
    fontSize: '11px'
  },
  footerBottomBar: {
    paddingTop: '10px',
    borderTop: '1px solid #1a1a1a',
    textAlign: 'center'
  },
  footerCopyright: {
    color: '#71717a',
    fontSize: '10.5px',
    lineHeight: '1.45',
    margin: 0
  }
};