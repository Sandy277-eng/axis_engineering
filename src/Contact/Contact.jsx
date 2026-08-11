import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export default function ContactPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const leftContentRef = useRef(null);

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

    // Entrance transition for the left column content
    gsap.fromTo(
      leftContentRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }
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

      {/* MAIN TWO-HALF SPLIT VIEW */}
      <div style={styles.splitWrapper}>
        
        {/* ================= LEFT HALF: WHITE BACKGROUND CONTENT ================= */}
        <div style={styles.leftHalf}>
          <div ref={leftContentRef} style={styles.leftContentWrapper}>
            
            {/* FEATURED IMAGE CONTAINER WITH ENHANCED SHADOW */}
            <div style={styles.imageCard}>
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

            {/* DESCRIPTION CONTENT (WITH CONTAINER BORDER) */}
            <div style={styles.aboutTextContainer}>
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
        </div>

        {/* ================= RIGHT HALF: DARK INQUIRY PANEL & CONTACT CARDS ================= */}
        <div style={styles.rightHalf}>
          <div style={styles.rightContentWrapper}>
            
            <div style={styles.formHeader}>
              <h2 style={styles.rightTitle}>Get in Touch</h2>
              <p style={styles.rightSubtitle}>
                Fill out the inquiry form below or connect directly with our engineering team.
              </p>
            </div>

            {/* CONTACT CARDS */}
            <div style={styles.contactCardsContainer}>
              <div style={styles.contactCard}>
                <div style={styles.cardIconBox}>🗺️</div>
                <div style={styles.cardDetail}>
                  <span style={styles.cardLabel}>OUR OFFICE LOCATION</span>
                  <span style={styles.cardText}>
                    No. 78-B, 1st Floor, Geason Housing Colony, Ayanambakkam, Chennai - 600095, TN, India
                  </span>
                </div>
              </div>

              <div style={styles.contactCard}>
                <div style={styles.cardIconBox}>🕿</div>
                <div style={styles.cardDetail}>
                  <span style={styles.cardLabel}>PHONE & WHATSAPP</span>
                  <span style={styles.cardText}>
                    +91 98849 12279 &nbsp;|&nbsp; +91 98849 12280 &nbsp;|&nbsp; 044 - 4746 8749
                  </span>
                </div>
              </div>

              <div style={styles.contactCard}>
                <div style={styles.cardIconBox}>🌐</div>
                <div style={styles.cardDetail}>
                  <span style={styles.cardLabel}>OFFICIAL EMAIL</span>
                  <span style={styles.cardText}>
                    info@axisengineeringsolutions.in
                  </span>
                </div>
              </div>
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
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Inquiry Type *</label>
                <div style={styles.selectWrapper}>
                  <select 
                    style={styles.select}
                    value={formData.productInterest}
                    onChange={(e) => setFormData({...formData, productInterest: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button type="submit" style={styles.submitBtn}>
                Submit Inquiry &gt;
              </button>

            </form>

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
    backgroundColor: '#050505',
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
    zIndex: 100
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
    cursor: 'pointer'
  },
  splitWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    minHeight: 'calc(100vh - 60px)'
  },
  
  /* LEFT HALF (WHITE BACKGROUND SHOWCASE) */
  leftHalf: {
    flex: '1 1 500px',
    position: 'relative',
    backgroundColor: '#ffffff',
    color: '#1e293b',
    padding: '60px 48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid #e2e8f0',
    overflow: 'hidden'
  },
  leftContentWrapper: {
    maxWidth: '560px',
    width: '100%',
    textAlign: 'left'
  },

  /* IMAGE CONTAINER WITH ENHANCED SHADOW */
  imageCard: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    marginBottom: '28px',
  },
  featuredImage: {
    width: '100%',
    height: '280px',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.5s ease'
  },
  imageOverlayGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(0,0,0,0.6) 100%)'
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

  /* DETAILS CONTAINER WITH BORDER & BACKGROUND */
  aboutTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '24px',
    backgroundColor: '#f8fafc',
    border: '4px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
  },
  leftTitle: { 
    fontSize: '32px', 
    fontWeight: '900', 
    margin: 0, 
    color: '#0f172a',
    letterSpacing: '-0.5px'
  },
  leftSubtitle: { 
    fontSize: '15px', 
    color: ACCENT_COLOR, 
    fontWeight: '700',
    marginBottom: '8px'
  },
  descriptionParagraph: {
    fontSize: '14px',
    color: '#334155',
    lineHeight: '1.7',
    margin: 0
  },
  highlightsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginTop: '16px'
  },
  highlightCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderLeft: `4px solid ${ACCENT_COLOR}`,
    padding: '14px 16px',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column'
  },
  highlightTitle: {
    fontSize: '13px',
    fontWeight: '800',
    color: '#0f172a'
  },
  highlightSub: {
    fontSize: '11px',
    color: '#64748b',
    marginTop: '2px'
  },

  /* RIGHT HALF (DARK INQUIRY PANEL) */
  rightHalf: {
    flex: '1 1 520px',
    backgroundColor: '#050505',
    padding: '60px 48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10
  },
  rightContentWrapper: {
    maxWidth: '580px',
    width: '100%',
    textAlign: 'left'
  },
  formHeader: { marginBottom: '28px', textAlign: 'left' },
  rightTitle: { fontSize: '30px', fontWeight: '800', color: '#ffffff', margin: 0 },
  rightSubtitle: { fontSize: '14px', color: '#cbd5e1', marginTop: '6px' },

  contactCardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '32px',
    width: '100%'
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: '#0a0a0a',
    padding: '16px 20px',
    borderRadius: '8px',
    border: '1px solid #1a1a1a',
    textAlign: 'left'
  },
  cardIconBox: {
    fontSize: '18px',
    backgroundColor: '#161616',
    width: '42px',
    height: '42px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  cardDetail: { 
    display: 'flex', 
    flexDirection: 'column',
    textAlign: 'left',
    wordBreak: 'break-word',
    flex: 1
  },
  cardLabel: { fontSize: '10px', fontWeight: '800', color: ACCENT_COLOR, letterSpacing: '0.8px' },
  cardText: { fontSize: '13px', color: '#e2e8f0', fontWeight: '600', marginTop: '4px', lineHeight: '1.4', textAlign: 'left' },

  form: { display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'left' },
  formRow: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  fieldGroup: { flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' },
  label: { fontSize: '12px', fontWeight: '700', color: '#cbd5e1', textAlign: 'left' },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '6px',
    border: '1px solid #333333',
    backgroundColor: '#121212',
    color: '#ffffff',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  phoneInputWrapper: {
    display: 'flex',
    border: '1px solid #333333',
    borderRadius: '6px',
    backgroundColor: '#121212',
    overflow: 'hidden'
  },
  countryDropdown: {
    position: 'relative',
    backgroundColor: '#ffffff', // Set background to clean white
    borderRight: '1px solid #cbd5e1',
    display: 'flex',
    alignItems: 'center',
    paddingRight: '6px'
  },
  countrySelect: {
    appearance: 'none',
    backgroundColor: '#ffffff', // Set select element background to white
    border: 'none',
    padding: '11px 20px 11px 10px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#000000', // Crisp black text
    outline: 'none',
    cursor: 'pointer'
  },
  dropdownArrow: {
    position: 'absolute',
    right: '8px',
    fontSize: '8px',
    color: '#333333', // Dark arrow icon for contrast on white
    pointerEvents: 'none'
  },
  phoneInput: {
    flex: 1,
    border: 'none',
    padding: '11px 14px',
    fontSize: '13px',
    outline: 'none',
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  selectWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  select: {
    width: '100%',
    appearance: 'none',
    padding: '11px 14px',
    borderRadius: '6px',
    border: '1px solid #333333',
    fontSize: '13px',
    backgroundColor: '#121212',
    color: '#ffffff',
    outline: 'none',
    cursor: 'pointer'
  },
  textarea: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '6px',
    border: '1px solid #333333',
    backgroundColor: '#121212',
    color: '#ffffff',
    fontSize: '13px',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  submitBtn: {
    backgroundColor: ACCENT_COLOR,
    color: '#ffffff',
    border: 'none',
    padding: '13px',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '13px',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    marginTop: '6px',
    boxShadow: '0 4px 12px rgba(227, 6, 19, 0.25)'
  }
};