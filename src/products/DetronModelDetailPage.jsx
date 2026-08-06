import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCT_DATABASE } from './productData';
import Footer from '../Footer/Footer';

export default function DetronModelDetailPage() {
  const { productId, modelName } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: `Hi, I am interested in the Detron ${modelName}. Please send details and pricing.`
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId, modelName]);

  // Find the product in our database
  const categoryData = PRODUCT_DATABASE[productId];
  if (!categoryData) {
    return (
      <div style={styles.errorContainer}>
        <h2>Category Not Found</h2>
        <Link to="/products/detron" style={styles.errorBtn}>Back to Products</Link>
      </div>
    );
  }

  let product = null;
  let sizeGroup = null;

  for (const item of categoryData.items) {
    const found = item.products.find(p => p.name === modelName);
    if (found) {
      product = found;
      sizeGroup = item.size;
      break;
    }
  }

  if (!product) {
    if (categoryData.items.length > 0 && categoryData.items[0].products.length > 0) {
      product = categoryData.items[0].products[0];
      sizeGroup = categoryData.items[0].size;
    } else {
      return (
        <div style={styles.errorContainer}>
          <h2>Product Not Found</h2>
          <Link to="/products/detron" style={styles.errorBtn}>Back to Products</Link>
        </div>
      );
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const relatedModels = [];
  for (const item of categoryData.items) {
    for (const p of item.products) {
      if (p.name !== product.name && relatedModels.length < 4) {
        relatedModels.push({
          name: p.name,
          badge: p.badge,
          image: p.image,
          specs: p.specs
        });
      }
    }
  }

  return (
    <div style={styles.container}>
      <style>{`
        .specs-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          border-radius: 8px;
          overflow: hidden;
          background-color: #0a0a0a;
          border: 1px solid #1a1a1a;
        }
        .specs-table th {
          background-color: #E30613;
          color: white;
          padding: 14px 20px;
          font-weight: 700;
          text-align: left;
          font-size: 14px;
        }
        .specs-table td {
          padding: 14px 20px;
          border-bottom: 1px solid #1a1a1a;
          font-size: 13px;
          color: #cbd5e1;
        }
        .specs-table tr:nth-of-type(even) {
          background-color: #121212;
        }
        .specs-table tr:hover {
          background-color: #1a1a1a;
        }
        .enquiry-form-input {
          width: 100%;
          border: 1px solid #333333;
          background-color: #121212;
          color: #ffffff;
          padding: 12px;
          font-size: 13px;
          border-radius: 4px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .enquiry-form-input:focus {
          border-color: #E30613;
        }
        
        /* RELATED PRODUCT CARDS styling */
        .related-card {
          position: relative;
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
        }
        .related-card-img-wrapper {
          position: relative;
          height: 180px;
          background: #111111;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .related-card-img {
          width: auto;
          max-width: 80%;
          height: auto;
          max-height: 80%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .related-card-bottom {
          background: #0a0a0a;
          padding: 16px;
          text-align: center;
          border-top: 1px solid #1a1a1a;
          transition: background-color 0.3s ease;
        }
        .related-card-title {
          font-size: 14px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          transition: color 0.3s ease;
          text-transform: uppercase;
        }
        .related-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
        }
        .related-card:hover .related-card-img {
          transform: scale(1.07);
        }
        .related-card:hover .related-card-bottom {
          background: #E30613;
        }
        .related-card:hover .related-card-title {
          color: #ffffff;
        }
      `}</style>

      {/* HEADER SECTION (WITH DUAL LOGOS) */}
      <div style={styles.fixedHeaderGroup}>
        <div style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <span style={styles.contactItem}>🕿 <strong>+91 98849 12279</strong></span>
            <span style={styles.contactItem}>
              🌐 <Link to="/contact" style={styles.topContactLink}>CONTACT US</Link>
            </span>
          </div>
          <div style={styles.topBarRight}>
            <a href="#resource-centre" style={styles.utilityLink}>RESOURCE CENTRE</a>
            <Link to="/contact" style={styles.warrantyBtn}>REGISTER WARRANTY 🛡️</Link>
          </div>
        </div>

        <header style={styles.mainHeader}>
          {/* DUAL LOGO GROUP */}
          <div style={styles.dualLogoGroup}>
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

          <nav style={styles.navMenu}>
            <Link to="/" style={styles.navLink}>HOME</Link>
            <Link to="/products/detron" style={styles.navLinkActive}>DETRON PRODUCTS</Link>
            <Link to="/products/fixtures" style={styles.navLink}>CUSTOM FIXTURES</Link>
            <Link to="/contact" style={styles.contactHeaderBtn}>CONTACT PANEL &gt;</Link>
          </nav>
        </header>
      </div>

      {/* HEADER SPACER */}
      <div style={{ height: '140px' }} />

      {/* BREADCRUMBS */}
      <div style={styles.breadcrumbWrapper}>
        <div style={styles.breadcrumb}>
          <Link to="/" style={styles.breadLink}>Home</Link> &raquo; 
          <Link to="/products/detron" style={styles.breadLink}> Detron Products</Link> &raquo; 
          <Link to={`/products/detron/${productId}`} style={styles.breadLink}> {categoryData.title}</Link> &raquo; 
          <span style={styles.breadActive}> {product.name} Details</span>
        </div>
      </div>

      {/* PRODUCT DISPLAY & ENQUIRY GRID */}
      <section style={styles.mainSection}>
        <div style={styles.gridWrapper}>
          
          {/* LEFT SIDE: PRODUCT IMAGE */}
          <div style={styles.leftCol}>
            <div style={styles.mainImageCard}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={styles.mainImage}
                onError={(e) => { e.target.src = '/images/detron.jpeg'; }}
              />
            </div>
            <div style={styles.referenceText}>
              ◈ TECHNICAL REFERENCE DESIGN - 100% SPEC COMPLIANT
            </div>
          </div>

          {/* RIGHT SIDE: INFO & ENQUIRY */}
          <div style={styles.rightCol}>
            <span style={styles.productBadge}>{product.badge}</span>
            <h1 style={styles.productTitle}>{product.name}</h1>
            <h4 style={styles.sizeGroupLabel}>Category Group: {sizeGroup}</h4>
            <p style={styles.productDescription}>{product.description}</p>

            {/* ENQUIRY CARD */}
            <div style={styles.enquiryCard}>
              <h3 style={styles.enquiryHeading}>Request Quote / Technical Specs</h3>
              {submitted ? (
                <div style={styles.successBox}>
                  <h4>Thank You!</h4>
                  <p>Your enquiry for {product.name} has been sent. Our team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={styles.formGroup}>
                  <div style={styles.formRow}>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Your Name *" 
                      required 
                      className="enquiry-form-input" 
                      value={form.name} 
                      onChange={handleInputChange} 
                    />
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email Address *" 
                      required 
                      className="enquiry-form-input" 
                      value={form.email} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div style={styles.formRow}>
                    <input 
                      type="text" 
                      name="phone" 
                      placeholder="Phone Number" 
                      className="enquiry-form-input" 
                      value={form.phone} 
                      onChange={handleInputChange} 
                    />
                    <input 
                      type="text" 
                      name="company" 
                      placeholder="Company Name" 
                      className="enquiry-form-input" 
                      value={form.company} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <textarea 
                    name="message" 
                    rows="3" 
                    placeholder="Enquiry Details" 
                    className="enquiry-form-input" 
                    style={{ resize: 'none' }}
                    value={form.message} 
                    onChange={handleInputChange} 
                  />
                  <button type="submit" style={styles.submitBtn}>
                    SUBMIT ENQUIRY
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* TECHNICAL DATA SHEET (SPECIFICATIONS) */}
      <section style={styles.specsSection}>
        <div style={styles.specsWrapper}>
          <h2 style={styles.specsHeading}>Technical Configurations & Dimensions</h2>
          <div style={styles.specsDivider} />
          
          <table className="specs-table">
            <thead>
              <tr>
                <th>Parameters</th>
                <th style={{ textAlign: 'right' }}>Specification Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(product.specs).map(([key, val]) => (
                <tr key={key}>
                  <td style={{ fontWeight: '600' }}>{key}</td>
                  <td style={{ textAlign: 'right', fontWeight: '700', color: '#E30613' }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* RELATED MODELS */}
      {relatedModels.length > 0 && (
        <section style={styles.relatedSection}>
          <div style={styles.relatedWrapper}>
            <h2 style={styles.relatedHeading}>Other Models in this Category</h2>
            <div style={styles.relatedDivider} />
            
            <div style={styles.relatedGrid}>
              {relatedModels.map(rel => (
                <Link 
                  key={rel.name} 
                  to={`/products/detron/${productId}/${rel.name}`} 
                  className="related-card"
                >
                  <div className="related-card-img-wrapper">
                    <img 
                      src={rel.image} 
                      alt={rel.name} 
                      className="related-card-img" 
                      onError={(e) => { e.target.src = '/images/detron.jpeg'; }} 
                    />
                  </div>
                  <div className="related-card-bottom">
                    <h4 className="related-card-title">{rel.name}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    backgroundColor: '#050505',
    color: '#ffffff',
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    overflowX: 'hidden'
  },
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
  logoImage: { height: '32px', width: 'auto', display: 'block', objectFit: 'contain' },
  logoImageDetron: { height: '28px', width: 'auto', display: 'block', objectFit: 'contain' },
  logoDivider: { height: '24px', width: '1px', backgroundColor: '#cbd5e1', margin: '0 8px' },
  dualLogoGroup: { display: 'flex', alignItems: 'center', gap: '16px' },
  logoLink: { display: 'flex', alignItems: 'center' },
  navMenu: { display: 'flex', alignItems: 'center', gap: '28px' },
  navLink: {
    textDecoration: 'none',
    color: '#0f172a',
    fontWeight: '700',
    fontSize: '11px',
    letterSpacing: '0.3px'
  },
  navLinkActive: {
    textDecoration: 'none',
    color: '#E30613',
    fontWeight: '800',
    fontSize: '11px',
    letterSpacing: '0.3px'
  },
  contactHeaderBtn: {
    backgroundColor: '#000000',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '2px',
    fontWeight: '700',
    fontSize: '11px'
  },
  breadcrumbWrapper: {
    maxWidth: '1200px',
    margin: '30px auto 10px auto',
    padding: '0 24px'
  },
  breadcrumb: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#64748b'
  },
  breadLink: {
    color: '#64748b',
    textDecoration: 'none',
    transition: 'color 0.2s'
  },
  breadActive: {
    color: '#E30613',
    fontWeight: '700'
  },
  mainSection: {
    width: '100%',
    padding: '20px 0 50px 0'
  },
  gridWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: '40px'
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  mainImageCard: {
    backgroundColor: '#111111',
    border: '1px solid #1a1a1a',
    borderRadius: '12px',
    height: '420px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
  },
  mainImage: {
    width: 'auto',
    maxWidth: '85%',
    height: 'auto',
    maxHeight: '85%',
    objectFit: 'contain'
  },
  referenceText: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '800',
    letterSpacing: '1px',
    textAlign: 'center'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  productBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(227, 6, 19, 0.1)',
    color: '#E30613',
    padding: '6px 14px',
    borderRadius: '30px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    marginBottom: '16px'
  },
  productTitle: {
    fontSize: '36px',
    fontWeight: '900',
    margin: '0 0 6px 0',
    color: '#ffffff'
  },
  sizeGroupLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#94a3b8',
    margin: '0 0 16px 0'
  },
  productDescription: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#cbd5e1',
    margin: '0 0 24px 0'
  },
  enquiryCard: {
    backgroundColor: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  },
  enquiryHeading: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#ffffff',
    margin: '0 0 20px 0',
    borderBottom: '1px solid #1a1a1a',
    paddingBottom: '10px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formRow: {
    display: 'flex',
    gap: '16px'
  },
  submitBtn: {
    backgroundColor: '#E30613',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    fontWeight: '800',
    fontSize: '13px',
    borderRadius: '4px',
    cursor: 'pointer',
    letterSpacing: '1px',
    transition: 'background-color 0.2s',
    boxShadow: '0 4px 10px rgba(227,6,19,0.25)'
  },
  successBox: {
    backgroundColor: '#064e3b',
    border: '1px solid #047857',
    color: '#34d399',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center'
  },
  specsSection: {
    width: '100%',
    padding: '40px 0 60px 0',
    backgroundColor: '#050505',
    borderTop: '1px solid #1a1a1a',
    borderBottom: '1px solid #1a1a1a'
  },
  specsWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px'
  },
  specsHeading: {
    fontSize: '24px',
    fontWeight: '900',
    color: '#ffffff',
    margin: '0 0 10px 0',
    textAlign: 'left'
  },
  specsDivider: {
    width: '60px',
    height: '4px',
    backgroundColor: '#E30613',
    borderRadius: '2px',
    marginBottom: '20px'
  },
  relatedSection: {
    width: '100%',
    backgroundColor: '#0a0a0a',
    padding: '60px 0 80px 0',
    borderTop: '1px solid #1a1a1a'
  },
  relatedWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center'
  },
  relatedHeading: {
    fontSize: '24px',
    fontWeight: '900',
    color: '#ffffff',
    margin: '0 0 10px 0'
  },
  relatedDivider: {
    width: '60px',
    height: '4px',
    backgroundColor: '#E30613',
    margin: '0 auto 40px auto',
    borderRadius: '2px'
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '24px',
    width: '100%'
  },
  errorContainer: {
    padding: '100px 20px',
    textAlign: 'center'
  },
  errorBtn: {
    backgroundColor: '#E30613',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: '700',
    display: 'inline-block',
    marginTop: '20px'
  }
};
