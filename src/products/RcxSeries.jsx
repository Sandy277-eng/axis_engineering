import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_DATABASE } from './productData';
import Footer from '../Footer/Footer';
import Header from '../Header';

const CATEGORY_ID = 'rcx-series';

export default function RcxSeries() {
  const categoryData = PRODUCT_DATABASE[CATEGORY_ID];
  const [selectedSize, setSelectedSize] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sizeFilters = ['All', ...categoryData.items.map(item => {
    if (item.size.includes('170mm')) return '170mm';
    if (item.size.includes('210mm')) return '210mm';
    if (item.size.includes('250mm') || item.size.includes('255mm')) return '250/255mm';
    if (item.size.includes('320mm')) return '320mm';
    if (item.size.includes('400mm')) return '400mm';
    if (item.size.includes('500mm')) return '500mm';
    return item.size;
  })];

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const filteredItems = selectedSize === 'All' 
    ? categoryData.items 
    : categoryData.items.filter(item => {
        if (selectedSize === '170mm') return item.size.includes('170mm');
        if (selectedSize === '210mm') return item.size.includes('210mm');
        if (selectedSize === '250/255mm') return item.size.includes('250mm') || item.size.includes('255mm');
        if (selectedSize === '320mm') return item.size.includes('320mm');
        if (selectedSize === '400mm') return item.size.includes('400mm');
        if (selectedSize === '500mm') return item.size.includes('500mm');
        return item.size.toLowerCase().includes(selectedSize.toLowerCase());
      });

  const RELATED_CATEGORIES = [
    { id: '4-axis', title: '4 Axis Rotary Tables', img: '/images/products_detron/4th_axis.png' },
    { id: 'rcf-series', title: 'RCF Series (5-Axis Tilting Cam)', img: '/images/products_detron/5th_axis.png' },
    { id: '5-axis', title: '5 Axis Tilt Rotary Tables', img: '/images/products_detron/5th_axis.png' },
    { id: 'auto-pallet-changer', title: 'Auto Pallet Changers', img: '/images/products_detron/Auto-Pallet-changer.png' },
    { id: 'special-application', title: 'Special Applications', img: '/images/products_detron/Special-Application.png' },
    { id: 'accessories', title: 'Detron Accessories', img: '/images/products_detron/Accessories.png' },
    { id: 'intelligent-control', title: 'Intelligent Control System', img: '/images/products_detron/Intelligent-control.png' }
  ];

  return (
    <div style={styles.container}>
      {/* CSS STYLES FOR PREMIUM RED ACCENT TRANSITIONS & WHITE/LIGHT THEME */}
      <style>{`
        .rcx-filter-btn {
          background: #f8fafc;
          color: #334155;
          border: 1px solid #e2e8f0;
          padding: 10px 20px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .rcx-filter-btn.active, .rcx-filter-btn:hover {
          background: #E30613;
          color: #ffffff;
          border-color: #E30613;
          box-shadow: 0 4px 12px rgba(227, 6, 19, 0.25);
        }
        .rcx-card {
          position: relative;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          width: 100%;
        }
        .rcx-card::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0%;
          width: 100%;
          background: linear-gradient(180deg, #E30613 0%, #a8000a 100%);
          transition: height 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
          z-index: 1;
        }
        .rcx-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(227, 6, 19, 0.28);
          border-color: #E30613;
        }
        .rcx-card:hover::after {
          height: 100%;
        }
        .rcx-card-img-wrapper {
          position: relative;
          height: 240px;
          background: #f8fafc;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          border-bottom: 1px solid #f1f5f9;
        }
        .rcx-card-img {
          width: auto;
          max-width: 85%;
          height: auto;
          max-height: 80%;
          object-fit: contain;
          transition: transform 0.4s ease;
          padding: 16px;
        }
        .rcx-card:hover .rcx-card-img {
          transform: scale(1.08);
        }
        .rcx-card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
          z-index: 2;
        }
        .rcx-card-title {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px 0;
          transition: color 0.3s ease;
        }
        .rcx-card-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: #E30613;
          background: #fef2f2;
          border: 1px solid #fecaca;
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 12px;
          align-self: flex-start;
          transition: all 0.3s ease;
        }
        .rcx-card-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 16px;
          flex-grow: 1;
          transition: color 0.3s ease;
        }
        .rcx-card-specs {
          border-top: 1px solid #f1f5f9;
          padding-top: 14px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: border-color 0.3s ease;
        }
        .rcx-spec-row {
          display: flex;
          justify-content: space-between;
          font-size: 12.5px;
        }
        .rcx-spec-key {
          color: #64748b;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .rcx-spec-val {
          color: #0f172a;
          font-weight: 700;
          transition: color 0.3s ease;
        }
        .rcx-card-actions {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }
        .rcx-btn-view {
          flex: 1;
          display: block;
          text-align: center;
          background: #E30613;
          color: #ffffff;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid #E30613;
          box-shadow: 0 2px 8px rgba(227, 6, 19, 0.25);
        }
        .rcx-btn-view:hover {
          background: #b9050f;
          border-color: #b9050f;
        }
        .rcx-btn-video {
          flex: 1;
          display: block;
          text-align: center;
          background: #ffffff;
          color: #0f172a;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid #cbd5e1;
        }
        .rcx-btn-video:hover {
          background: #f8fafc;
          border-color: #94a3b8;
          color: #0f172a;
        }
        .rcx-card:hover .rcx-card-title {
          color: #ffffff;
        }
        .rcx-card:hover .rcx-group-tag {
          color: #ffffff !important;
        }
        .rcx-card:hover .rcx-card-badge {
          color: #ffffff;
          background: rgba(0, 0, 0, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
        }
        .rcx-card:hover .rcx-card-desc {
          color: #ffffff;
        }
        .rcx-card:hover .rcx-card-specs {
          border-color: rgba(255, 255, 255, 0.25);
        }
        .rcx-card:hover .rcx-spec-key {
          color: rgba(255, 255, 255, 0.85);
        }
        .rcx-card:hover .rcx-spec-val {
          color: #ffffff;
        }
        .rcx-card:hover .rcx-btn-view {
          background: #ffffff;
          color: #E30613;
          border-color: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
        }
        .rcx-card:hover .rcx-btn-view:hover {
          background: #f1f5f9;
          color: #b9050f;
          border-color: #f1f5f9;
        }
        .rcx-card:hover .rcx-btn-video {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.6);
          background: rgba(0, 0, 0, 0.2);
        }
        .rcx-card:hover .rcx-btn-video:hover {
          background: rgba(0, 0, 0, 0.4);
          border-color: #ffffff;
        }
        .rcx-group-tag {
          font-size: 11px;
          font-weight: 800;
          color: #E30613;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
          transition: color 0.3s ease;
        }
        .rcx-related-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .rcx-related-card:hover {
          transform: translateY(-4px);
          border-color: #E30613;
          box-shadow: 0 12px 24px rgba(227, 6, 19, 0.15);
        }
        .rcx-related-img {
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          padding: 12px;
        }
        .rcx-related-title {
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          text-align: center;
          border-top: 1px solid #f1f5f9;
        }
        .rcx-related-card:hover .rcx-related-title {
          color: #E30613;
        }
      `}</style>

      {/* FIXED HEADER WITH PROPER ACTIVE PAGE */}
      <Header activePage="detron" />

      {/* HEADER SPACER TO PREVENT ANY OVERLAPPING */}
      <div style={{ height: '140px' }} />

      {/* HERO SECTION */}
      <section style={styles.heroSection}>
        <div style={styles.heroContainer}>
          <div style={styles.heroBadge}>DETRON ZERO-BACKLASH 4TH AXIS SERIES</div>
          <h1 style={styles.heroTitle}>RCX Series Roller Gear Cam Rotary Tables</h1>
          <p style={styles.heroSubtitle}>
            Zero-backlash roller gear cam drive 4th axis rotary tables delivering ultra-fast indexing up to 83.3 RPM, high cutting rigidity, and permanent maintenance-free accuracy.
          </p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div style={styles.breadcrumbBar}>
        <div style={styles.contentContainer}>
          <Link to="/" style={styles.breadLink}>Home</Link>
          <span style={styles.breadSep}>/</span>
          <Link to="/products/detron" style={styles.breadLink}>Detron Products</Link>
          <span style={styles.breadSep}>/</span>
          <span style={styles.breadCurrent}>RCX Series</span>
        </div>
      </div>

      {/* MAIN CATALOGUE CONTENT */}
      <div style={styles.contentContainer}>
        {/* FILTER BAR */}
        <div style={styles.filterSection}>
          <div style={styles.filterTitle}>Filter by Size:</div>
          <div style={styles.filterButtonGroup}>
            {sizeFilters.map((size, idx) => (
              <button
                key={idx}
                className={`rcx-filter-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div style={styles.gridContainer}>
          {filteredItems.map((group, gIdx) => (
            <React.Fragment key={gIdx}>
              {group.products.map((product, pIdx) => (
                <div key={`${gIdx}-${pIdx}`} className="rcx-card">
                  <div className="rcx-card-img-wrapper">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="rcx-card-img"
                    />
                  </div>
                  <div className="rcx-card-content">
                    <div className="rcx-group-tag">{group.size}</div>
                    <h3 className="rcx-card-title">{product.name}</h3>
                    {product.badge && <span className="rcx-card-badge">{product.badge}</span>}
                    <p className="rcx-card-desc">{product.description}</p>
                    
                    {product.specs && (
                      <div className="rcx-card-specs">
                        {Object.entries(product.specs).slice(0, 4).map(([key, val], sIdx) => (
                          <div key={sIdx} className="rcx-spec-row">
                            <span className="rcx-spec-key">{key}:</span>
                            <span className="rcx-spec-val">{val}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="rcx-card-actions">
                      <Link 
                        to={`/products/detron/rcx-series/${encodeURIComponent(product.name)}`}
                        className="rcx-btn-view"
                      >
                        VIEW FULL SPECS &gt;
                      </Link>
                      <Link 
                        to={`/contact?product=${encodeURIComponent(product.name)}`}
                        className="rcx-btn-video"
                      >
                        ENQUIRE NOW
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* DETRON ENGINEERING HIGHLIGHTS */}
        <div style={styles.techSection}>
          <div style={styles.techBadge}>ROLLER GEAR CAM TECHNOLOGY</div>
          <h2 style={styles.techTitle}>Why Choose Detron RCX Series Roller Gear Cam Tables?</h2>
          <div style={styles.techGrid}>
            <div style={styles.techCard}>
              <div style={styles.techIconBox}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E30613" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 style={styles.techCardTitle}>High Speed Indexing (Up to 83.3 RPM)</h3>
              <p style={styles.techCardDesc}>
                Roller gear cam drive provides high transmission efficiency (&gt;80%) enabling rapid indexing speeds up to 83.3 RPM, significantly reducing non-cut cycle times.
              </p>
            </div>
            <div style={styles.techCard}>
              <div style={styles.techIconBox}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E30613" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 style={styles.techCardTitle}>Zero Backlash &amp; Preload Adjustment</h3>
              <p style={styles.techCardDesc}>
                Dual lead cam design with preloaded roller contact completely eliminates backlash without gear wear, maintaining ultra-high indexing precision over long service life.
              </p>
            </div>
            <div style={styles.techCard}>
              <div style={styles.techIconBox}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E30613" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <h3 style={styles.techCardTitle}>High Clamping Torque up to 3600 N.m</h3>
              <p style={styles.techCardDesc}>
                Consolidated large-diameter YRT bearings and hydraulic high-pressure brake rings deliver massive clamping rigidity for heavy cutting and steel component milling.
              </p>
            </div>
          </div>
        </div>

        {/* RELATED CATEGORIES */}
        <div style={styles.relatedSection}>
          <div style={styles.relatedHeader}>
            <h2 style={styles.relatedTitle}>Explore Other Detron Product Categories</h2>
            <Link to="/products/detron" style={styles.viewAllLink}>VIEW ALL CATEGORIES &gt;</Link>
          </div>
          <div style={styles.relatedGrid}>
            {RELATED_CATEGORIES.map((cat, idx) => (
              <Link 
                key={idx} 
                to={`/products/detron/${cat.id}`}
                className="rcx-related-card"
              >
                <div className="rcx-related-img">
                  <img src={cat.img} alt={cat.title} style={{ maxHeight: '100px', maxWidth: '85%', objectFit: 'contain' }} />
                </div>
                <div className="rcx-related-title">{cat.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
  },
  heroSection: {
    backgroundColor: '#0a0e17',
    padding: '70px 24px 60px 24px',
    textAlign: 'center',
    color: '#ffffff',
    borderBottom: '1px solid #1e293b'
  },
  heroContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  heroBadge: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: '800',
    color: '#E30613',
    backgroundColor: 'rgba(227, 6, 19, 0.1)',
    border: '1px solid rgba(227, 6, 19, 0.3)',
    padding: '5px 14px',
    borderRadius: '20px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '16px'
  },
  heroTitle: {
    fontSize: '36px',
    fontWeight: '900',
    letterSpacing: '-0.5px',
    margin: '0 0 16px 0',
    color: '#ffffff'
  },
  heroSubtitle: {
    fontSize: '16px',
    color: '#94a3b8',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  breadcrumbBar: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '12px 24px'
  },
  contentContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '24px',
    width: '100%',
    boxSizing: 'border-box'
  },
  breadLink: {
    color: '#64748b',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '500'
  },
  breadSep: {
    margin: '0 10px',
    color: '#cbd5e1',
    fontSize: '13px'
  },
  breadCurrent: {
    color: '#0f172a',
    fontSize: '13px',
    fontWeight: '700'
  },
  filterSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '32px',
    flexWrap: 'wrap'
  },
  filterTitle: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  filterButtonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '30px',
    marginBottom: '60px'
  },
  techSection: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '40px 32px',
    marginBottom: '60px',
    textAlign: 'center'
  },
  techBadge: {
    fontSize: '11px',
    fontWeight: '800',
    color: '#E30613',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '8px'
  },
  techTitle: {
    fontSize: '26px',
    fontWeight: '900',
    color: '#0f172a',
    margin: '0 0 32px 0'
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    textAlign: 'left'
  },
  techCard: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  techIconBox: {
    width: '44px',
    height: '44px',
    borderRadius: '8px',
    backgroundColor: '#fee2e2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  techCardTitle: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0
  },
  techCardDesc: {
    fontSize: '13.5px',
    color: '#475569',
    lineHeight: '1.6',
    margin: 0
  },
  relatedSection: {
    borderTop: '1px solid #e2e8f0',
    paddingTop: '40px',
    marginBottom: '40px'
  },
  relatedHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  relatedTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#0f172a',
    margin: 0
  },
  viewAllLink: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#E30613',
    textDecoration: 'none'
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '20px'
  }
};
