import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ScrollCanvas from '../animation/ScrollCanvas'; // Adjust path if needed

export default function ContactPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [countryCode, setCountryCode] = useState('+91');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productInterest: 'Detron Rotary Tables',
    message: ''
  });

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
        {/* DUAL LOGO GROUP */}
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
        
        {/* ================= LEFT HALF: 3D CANVAS ANIMATION (SLOWER SPEED) ================= */}
        <div style={styles.leftHalf}>
          
          <ScrollCanvas 
            totalFrames={192} 
            folderPath="/contact-frames" 
            speed={0.015} 
          />

          {/* OVERLAY CONTENT */}
          <div style={styles.leftContentWrapper}>
            <div style={styles.badgeRow}>
              <span style={styles.badge}>FEATURED PRODUCT</span>
            </div>
            
            <h2 style={styles.leftTitle}>Detron GX-200 Series</h2>
            <p style={styles.leftSubtitle}>
              High-Precision 4 & 5 Axis CNC Rotary Tables
            </p>

            <div style={styles.specBox}>
              <h3 style={styles.specHeading}>Key Technical Specifications</h3>
              <div style={styles.specGrid}>
                <div style={styles.specItem}>
                  <span style={styles.specLabel}>Table Diameter</span>
                  <span style={styles.specValue}>200 mm</span>
                </div>
                <div style={styles.specItem}>
                  <span style={styles.specLabel}>Indexing Accuracy</span>
                  <span style={styles.specValue}>15 arc-sec</span>
                </div>
                <div style={styles.specItem}>
                  <span style={styles.specLabel}>Clamping Torque</span>
                  <span style={styles.specValue}>310 Nm</span>
                </div>
                <div style={styles.specItem}>
                  <span style={styles.specLabel}>Max Spindle Speed</span>
                  <span style={styles.specValue}>41.6 rpm</span>
                </div>
              </div>
              <div style={styles.specFooter}>
                <strong>Construction:</strong> Ultra-rigid hydraulic/pneumatic locking
              </div>
            </div>

            <p style={styles.brandCallout}>
              Axis Engineering Solutions is the official authorized partner for Detron products in India, providing complete integration, turnkey support, and bespoke fixture designs.
            </p>
          </div>
        </div>

        {/* ================= RIGHT HALF: INQUIRY PANEL & CONTACT CARDS ================= */}
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
  logoGroup: { cursor: 'pointer', display: 'flex', alignItems: 'center' },
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
  
  /* Left Half Styles */
  leftHalf: {
    flex: '1 1 500px',
    position: 'relative',
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '60px 48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid #1a1a1a',
    overflow: 'hidden'
  },
  leftContentWrapper: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '560px',
    width: '100%',
    textAlign: 'left'
  },
  badgeRow: { marginBottom: '16px' },
  badge: {
    backgroundColor: ACCENT_COLOR,
    color: '#ffffff',
    padding: '5px 12px',
    fontSize: '10px',
    fontWeight: '800',
    letterSpacing: '1.5px',
    borderRadius: '3px'
  },
  leftTitle: { 
    fontSize: '38px', 
    fontWeight: '900', 
    margin: '0 0 8px 0', 
    color: '#ffffff', 
    letterSpacing: '-0.5px',
    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
  },
  leftSubtitle: { 
    fontSize: '15px', 
    color: '#cbd5e1', 
    marginBottom: '32px', 
    fontWeight: '500',
    textShadow: '0 1px 5px rgba(0,0,0,0.5)'
  },
  specBox: {
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    backdropFilter: 'blur(8px)',
    borderLeft: `4px solid ${ACCENT_COLOR}`,
    padding: '24px',
    borderRadius: '6px',
    marginBottom: '28px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    border: '1px solid #222',
    borderLeftWidth: '4px'
  },
  specHeading: { fontSize: '13px', fontWeight: '800', color: '#ffffff', marginBottom: '16px', letterSpacing: '0.5px', textTransform: 'uppercase' },
  specGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '16px'
  },
  specItem: { display: 'flex', flexDirection: 'column' },
  specLabel: { fontSize: '11px', color: '#94a3b8', fontWeight: '600' },
  specValue: { fontSize: '14px', color: '#ffffff', fontWeight: '700', marginTop: '2px' },
  specFooter: { fontSize: '12px', color: '#cbd5e1' },
  brandCallout: { 
    fontSize: '13px', 
    color: '#cbd5e1', 
    lineHeight: '1.7',
    textShadow: '0 1px 3px rgba(0,0,0,0.5)'
  },
  
  /* Right Half Styles */
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
    boxShadow: 'none',
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
    backgroundColor: '#161616',
    borderRight: '1px solid #333333',
    display: 'flex',
    alignItems: 'center',
    paddingRight: '6px'
  },
  countrySelect: {
    appearance: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    padding: '11px 20px 11px 10px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#ffffff',
    outline: 'none',
    cursor: 'pointer'
  },
  dropdownArrow: {
    position: 'absolute',
    right: '8px',
    fontSize: '8px',
    color: '#94a3b8',
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