import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_DATABASE } from './productData';
import Footer from '../Footer/Footer';
import Header from '../Header';

const CATEGORY_ID = 'rcf-series';

export default function RcfSeries() {
  const categoryData = PRODUCT_DATABASE[CATEGORY_ID];
  const [selectedSize, setSelectedSize] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sizeFilters = ['All', ...categoryData.items.map(item => {
    if (item.size.includes('170mm')) return '170mm';
    if (item.size.includes('210mm')) return '210mm';
    if (item.size.includes('255mm')) return '255mm';
    if (item.size.includes('320mm')) return '320mm';
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
        if (selectedSize === '255mm') return item.size.includes('255mm');
        if (selectedSize === '320mm') return item.size.includes('320mm');
        return item.size.toLowerCase().includes(selectedSize.toLowerCase());
      });

  const RELATED_CATEGORIES = [
    { id: '4-axis', title: '4 Axis Rotary Tables', img: '/images/products_detron/4th_axis.png' },
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
        .aishmo-filter-btn {
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
        .aishmo-filter-btn.active, .aishmo-filter-btn:hover {
          background: #E30613;
          color: #ffffff;
          border-color: #E30613;
          box-shadow: 0 4px 12px rgba(227, 6, 19, 0.25);
        }
        .aishmo-card {
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
        .aishmo-card::after {
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
        .aishmo-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(227, 6, 19, 0.28);
          border-color: #E30613;
        }
        .aishmo-card:hover::after {
          height: 100%;
        }
        .aishmo-card-img-wrapper {
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
        .aishmo-card-img {
          width: auto;
          max-width: 85%;
          height: auto;
          max-height: 80%;
          object-fit: contain;
          transition: transform 0.4s ease;
          padding: 16px;
        }
        .aishmo-card:hover .aishmo-card-img {
          transform: scale(1.07);
        }
        .aishmo-card-content {
          position: relative;
          z-index: 3;
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          text-align: left;
        }
        .aishmo-card-title {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px 0;
          transition: color 0.3s ease;
        }
        .aishmo-card-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: #E30613;
          background: #fef2f2;
          border: 1px solid #fecaca;
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 14px;
          align-self: flex-start;
          transition: all 0.3s ease;
        }
        .aishmo-card-desc {
          font-size: 13px;
          line-height: 1.6;
          color: #475569;
          margin: 0 0 16px 0;
          transition: color 0.3s ease;
          flex-grow: 1;
        }
        .aishmo-card-specs {
          border-top: 1px solid #f1f5f9;
          padding-top: 12px;
          margin-bottom: 20px;
          transition: border-color 0.3s ease;
        }
        .aishmo-spec-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 6px;
        }
        .aishmo-spec-key {
          color: #64748b;
          transition: color 0.3s ease;
        }
        .aishmo-spec-val {
          font-weight: 700;
          color: #0f172a;
          transition: color 0.3s ease;
        }
        .aishmo-btn-group {
          display: flex;
          gap: 12px;
          margin-top: auto;
        }
        .aishmo-btn-view {
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
        .aishmo-btn-view:hover {
          background: #b9050f;
          border-color: #b9050f;
        }
        .aishmo-btn-video {
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
        .aishmo-btn-video:hover {
          background: #f8fafc;
          border-color: #94a3b8;
          color: #0f172a;
        }
        .aishmo-card:hover .aishmo-card-title {
          color: #ffffff;
        }
        .aishmo-card:hover .aishmo-group-tag {
          color: #ffffff !important;
        }
        .aishmo-card:hover .aishmo-card-badge {
          color: #ffffff;
          background: rgba(0, 0, 0, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
        }
        .aishmo-card:hover .aishmo-card-desc {
          color: #ffffff;
        }
        .aishmo-card:hover .aishmo-card-specs {
          border-color: rgba(255, 255, 255, 0.25);
        }
        .aishmo-card:hover .aishmo-spec-key {
          color: rgba(255, 255, 255, 0.85);
        }
        .aishmo-card:hover .aishmo-spec-val {
          color: #ffffff;
        }
        .aishmo-card:hover .aishmo-btn-view {
          background: #ffffff;
          color: #E30613;
          border-color: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
        }
        .aishmo-card:hover .aishmo-btn-view:hover {
          background: #f1f5f9;
          color: #b9050f;
          border-color: #f1f5f9;
        }
        .aishmo-card:hover .aishmo-btn-video {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.6);
          background: rgba(0, 0, 0, 0.2);
        }
        .aishmo-card:hover .aishmo-btn-video:hover {
          background: rgba(0, 0, 0, 0.4);
          border-color: #ffffff;
        }
        .aishmo-group-tag {
          font-size: 11px;
          font-weight: 800;
          color: #E30613;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
          transition: color 0.3s ease;
        }
        .aishmo-related-card {
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
        .aishmo-related-card:hover {
          transform: translateY(-4px);
          border-color: #E30613;
          box-shadow: 0 12px 24px rgba(227, 6, 19, 0.15);
        }
        .aishmo-related-img {
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          padding: 12px;
        }
        .aishmo-related-title {
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          text-align: center;
          border-top: 1px solid #f1f5f9;
        }
        .aishmo-related-card:hover .aishmo-related-title {
          color: #E30613;
        }
      `}</style>

      <Header />

      {/* HERO SECTION */}
      <section style={styles.heroSection}>
        <div style={styles.heroContainer}>
          <div style={styles.heroBadge}>DETRON ZERO-BACKLASH SERIES</div>
          <h1 style={styles.heroTitle}>RCF / RFX Series Rotary Tables</h1>
          <p style={styles.heroSubtitle}>
            Zero-backlash roller gear cam drive tilting rotary tables engineered for high-precision 5-face indexing, ultra-rigid machining, and compact machine envelopes.
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
          <span style={styles.breadCurrent}>RCF Series</span>
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
                className={`aishmo-filter-btn ${selectedSize === size ? 'active' : ''}`}
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
                <div key={`${gIdx}-${pIdx}`} className="aishmo-card">
                  <div className="aishmo-card-img-wrapper">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="aishmo-card-img"
                    />
                  </div>
                  <div className="aishmo-card-content">
                    <div className="aishmo-group-tag">{group.size}</div>
                    <h3 className="aishmo-card-title">{product.name}</h3>
                    {product.badge && <span className="aishmo-card-badge">{product.badge}</span>}
                    <p className="aishmo-card-desc">{product.description}</p>
                    
                    {product.specs && (
                      <div className="aishmo-card-specs">
                        {Object.entries(product.specs).slice(0, 4).map(([key, val], sIdx) => (
                          <div key={sIdx} className="aishmo-spec-row">
                            <span className="aishmo-spec-key">{key}:</span>
                            <span className="aishmo-spec-val">{val}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="aishmo-btn-group">
                      <Link 
                        to={`/products/detron/${CATEGORY_ID}/${encodeURIComponent(product.name)}`} 
                        className="aishmo-btn-view"
                      >
                        Model Details & Inquiry
                      </Link>
                      <Link 
                        to={`/products/detron/${CATEGORY_ID}`} 
                        className="aishmo-btn-video"
                      >
                        Explore Series
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* DETAILED OVERVIEW SECTION */}
        <div style={styles.overviewSection}>
          <div style={styles.overviewBadge}>TECHNOLOGY EXCELLENCE</div>
          <h2 style={styles.overviewTitle}>Roller Gear Cam Advantage for Modern CNC Machining</h2>
          <div style={styles.overviewText}>
            <p>
              The <strong>Detron RCF / RFX Series</strong> integrates patented zero-backlash roller gear cam drive mechanisms with high-torque hydraulic or pneumatic clamping. Designed specifically for modern machine tools with compact envelopes, the rear-motor and flanged layout maximizes machining clearances while delivering unmatched structural rigidity.
            </p>
            <p>
              With indexing accuracy within 20 arc-seconds, smooth continuous positioning, and high allowable tilt cutting torques up to 1600 N.m, the RCF series provides aerospace, medical, automotive, and high-precision mold manufacturers with unyielding repeatability and spindle throughput.
            </p>
          </div>
        </div>

        {/* RELATED CATEGORIES */}
        <div style={styles.relatedSection}>
          <h3 style={styles.relatedHeading}>Explore Other Detron Product Categories</h3>
          <div style={styles.relatedGrid}>
            {RELATED_CATEGORIES.map((cat, idx) => (
              <Link key={idx} to={`/products/detron/${cat.id}`} className="aishmo-related-card">
                <div className="aishmo-related-img">
                  <img src={cat.img} alt={cat.title} style={{ maxHeight: '100px', maxWidth: '80%', objectFit: 'contain' }} />
                </div>
                <div className="aishmo-related-title">{cat.title}</div>
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
    gap: '16px',
    margin: '20px 0 32px 0',
    flexWrap: 'wrap'
  },
  filterTitle: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#0f172a',
    textTransform: 'uppercase'
  },
  filterButtonGroup: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '28px',
    marginBottom: '60px'
  },
  overviewSection: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
    marginBottom: '60px',
    textAlign: 'left'
  },
  overviewBadge: {
    fontSize: '11px',
    fontWeight: '800',
    color: '#E30613',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '8px'
  },
  overviewTitle: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 16px 0'
  },
  overviewText: {
    fontSize: '14.5px',
    color: '#475569',
    lineHeight: '1.8'
  },
  relatedSection: {
    marginBottom: '60px',
    textAlign: 'left'
  },
  relatedHeading: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '20px'
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '16px'
  }
};
