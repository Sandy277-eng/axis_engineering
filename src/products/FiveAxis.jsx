import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_DATABASE } from './productData';
import Footer from '../Footer/Footer';
import Header from '../Header';

const CATEGORY_ID = '5-axis';

export default function FiveAxis() {
  const categoryData = PRODUCT_DATABASE[CATEGORY_ID];
  const [selectedSize, setSelectedSize] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Extract size labels for filters
  const sizeFilters = ['All', ...categoryData.items.map(item => {
    if (item.size.includes('100mm')) return '100mm';
    if (item.size.includes('125mm')) return '125mm';
    if (item.size.includes('170mm')) return '170mm';
    if (item.size.includes('210mm')) return '210mm';
    if (item.size.includes('255mm')) return '255mm';
    if (item.size.includes('320mm')) return '320mm';
    if (item.size.includes('410mm')) return '410mm';
    if (item.size.includes('500mm')) return '500mm';
    if (item.size.includes('650') || item.size.includes('720')) return '650-720mm';
    if (item.size.includes('800')) return '800mm';
    if (item.size.includes('Compact Type, Multi-Spindle')) return 'Compact Multi-Spindle';
    if (item.size.includes('GTFA Trunnion Type, Multi-Spindle')) return 'Trunnion Multi-Spindle';
    if (item.size.includes('RCF') || item.size.includes('RFX')) return 'RCF Series';
    if (item.size.includes('RCTFE')) return 'RCTFE Series';
    return item.size;
  })];

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const filteredItems = selectedSize === 'All' 
    ? categoryData.items 
    : categoryData.items.filter(item => {
        if (selectedSize === '100mm') return item.size.includes('100mm');
        if (selectedSize === '125mm') return item.size.includes('125mm');
        if (selectedSize === '170mm') return item.size.includes('170mm');
        if (selectedSize === '210mm') return item.size.includes('210mm');
        if (selectedSize === '255mm') return item.size.includes('255mm');
        if (selectedSize === '320mm') return item.size.includes('320mm');
        if (selectedSize === '410mm') return item.size.includes('410mm');
        if (selectedSize === '500mm') return item.size.includes('500mm');
        if (selectedSize === '650-720mm') return item.size.includes('650') || item.size.includes('720');
        if (selectedSize === '800mm') return item.size.includes('800');
        if (selectedSize === 'Compact Multi-Spindle') return item.size.includes('Compact');
        if (selectedSize === 'Trunnion Multi-Spindle') return item.size.includes('GTFA Trunnion');
        if (selectedSize === 'RCF Series') return item.size.includes('RCF') || item.size.includes('RFX');
        if (selectedSize === 'RCTFE Series') return item.size.includes('RCTFE');
        return item.size.toLowerCase().includes(selectedSize.toLowerCase());
      });

  const RELATED_CATEGORIES = [
    { id: '4-axis', title: '4 Axis Standard Indexers', img: '/images/products_detron/4th_axis.png' },
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
          box-shadow: 0 4px 12px rgba(29, 78, 216, 0.25);
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
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          transition: height 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
          z-index: 1;
        }
        .aishmo-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25);
          border-color: #334155;
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
          background: #eff6ff;
          border: 1px solid #bfdbfe;
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
          color: #cbd5e1 !important;
        }
        .aishmo-card:hover .aishmo-card-badge {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
        }
        .aishmo-card:hover .aishmo-card-desc {
          color: #cbd5e1;
        }
        .aishmo-card:hover .aishmo-card-specs {
          border-color: rgba(255, 255, 255, 0.15);
        }
        .aishmo-card:hover .aishmo-spec-key {
          color: #94a3b8;
        }
        .aishmo-card:hover .aishmo-spec-val {
          color: #ffffff;
        }
        .aishmo-card:hover .aishmo-btn-view {
          background: #E30613;
          color: #ffffff;
          border-color: #E30613;
          box-shadow: 0 4px 14px rgba(227, 6, 19, 0.45);
        }
        .aishmo-card:hover .aishmo-btn-view:hover {
          background: #b9050f;
          border-color: #b9050f;
        }
        .aishmo-card:hover .aishmo-btn-video {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.08);
        }
        .aishmo-card:hover .aishmo-btn-video:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: #ffffff;
          color: #ffffff;
        }

        /* RELATED PRODUCT CARDS */
        .related-card {
          position: relative;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
        }
        .related-card-img-wrapper {
          position: relative;
          height: 180px;
          background: #ffffff;
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
        .related-card-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: #E30613;
          color: #ffffff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          box-shadow: 0 2px 6px rgba(29, 78, 216, 0.3);
        }
        .related-card-bottom {
          background: #f8fafc;
          padding: 16px;
          text-align: center;
          border-top: 1px solid #f1f5f9;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .related-card-title {
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          transition: color 0.3s ease;
          text-transform: uppercase;
        }
        .related-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.15);
        }
        .related-card:hover .related-card-img {
          transform: scale(1.07);
        }
        .related-card:hover .related-card-bottom {
          background: #0f172a;
        }
        .related-card:hover .related-card-title {
          color: #ffffff;
        }

        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        .glowing-left-down-btn:hover {
          transform: scale(1.12);
          background-color: #cc0010 !important;
          box-shadow: 0 0 0 8px rgba(227, 6, 19, 0.3), 0 6px 25px rgba(227, 6, 19, 0.75) !important;
        }
      `}</style>

      {/* HEADER SECTION (WITH DUAL LOGOS) */}
      <Header activePage="detron" />

      {/* HEADER SPACER */}
      <div style={{ height: '140px' }} />

      {/* HERO BANNER */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <div style={styles.breadcrumb}>
            <Link to="/" style={styles.breadLink}>Home</Link> &raquo; 
            <Link to="/products/detron" style={styles.breadLink}> Detron Products</Link> &raquo; 
            <span style={styles.breadActive}> 5 Axis Tilt Rotary Tables</span>
          </div>
          <h1 style={styles.heroTitle}>{categoryData.title}</h1>
          <p style={styles.heroSub}>{categoryData.description}</p>
        </div>
      </section>

      {/* DETRON BRAND HEADER BUTTON */}
      <div style={styles.brandButtonContainer}>
        <div style={styles.brandButton}>DETRON</div>
      </div>

      {/* DETRON 5-AXIS OVERVIEW & TECHNOLOGY SECTION */}
      <section style={{ backgroundColor: '#ffffff', padding: '48px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>
          <span style={{ fontSize: '12px', fontWeight: '900', color: '#E30613', letterSpacing: '2px', textTransform: 'uppercase' }}>
            PRECISION CORE & ADVANCED MULTI-FACE MACHINING
          </span>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '8px 0 20px 0', lineHeight: '1.3' }}>
            Precision Core for Complex Geometries: detron 5-Axis Rotary Tables by Axis Engineering
          </h2>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#E30613', marginBottom: '24px', borderRadius: '2px' }} />
          
          {/* CONTENT LAYOUT WITH VERTICAL GLOWING LEFT SIDEBAR TIMELINE */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }}>
            {/* VERTICAL GLOWING TIMELINE SIDEBAR ON THE LEFT */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', flexShrink: 0, width: '48px' }}>
              {/* TOP GLOWING DOWN ARROW BUTTON */}
              <button
                onClick={() => {
                  const section = document.getElementById('products-grid-section');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
                title="Click to view products below"
                className="glowing-left-down-btn"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#E30613',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 5px rgba(227, 6, 19, 0.22), 0 4px 20px rgba(227, 6, 19, 0.6)',
                  transition: 'all 0.3s ease',
                  zIndex: 2
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'bounceDown 1.5s infinite' }}>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <polyline points="7 5 12 10 17 5" opacity="0.6"></polyline>
                </svg>
              </button>

              {/* VERTICAL LINE WITH DOT NODES */}
              <div style={{ flex: 1, width: '3px', backgroundColor: '#E30613', margin: '10px 0', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 0 8px rgba(227, 6, 19, 0.4)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E30613', boxShadow: '0 0 8px rgba(227, 6, 19, 0.9)' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E30613', boxShadow: '0 0 8px rgba(227, 6, 19, 0.9)' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E30613', boxShadow: '0 0 8px rgba(227, 6, 19, 0.9)' }} />
              </div>

              {/* BOTTOM DIAMOND BADGE */}
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#E30613',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 5px rgba(227, 6, 19, 0.18), 0 4px 16px rgba(227, 6, 19, 0.5)',
                zIndex: 2
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 9l10 13 10-13-10-7zm0 3.8L18.6 9 12 17.6 5.4 9 12 5.8z"/>
                </svg>
              </div>
            </div>

            {/* TWO PARAGRAPH CARDS GRID */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '28px', fontSize: '15px', lineHeight: '1.75', color: '#334155' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #E30613', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <p style={{ margin: '0 0 16px 0' }}>
                  When manufacturing complex aerospace impellers, medical implants, automotive components, and die-molds, <strong>Axis Engineering</strong> provides Detron’s 5-axis tilt-rotary tables as the definitive competitive key. With faceplate diameters ranging from <strong>Ø100 mm to Ø800 mm</strong>, our 5-axis systems transform standard 3-axis CNC machines into advanced 5-face machining centers, unlocking continuous multi-sided capability.
                </p>
                <p style={{ margin: 0 }}>
                  Engineered with advanced drive options—including <strong>Dual-Lead Worm Drives</strong> for high-rigidity heavy cutting, zero-backlash <strong>Roller Cams</strong> for smooth contouring paths, and <strong>Direct Drive Motors (DDM)</strong> for high-frequency 3C indexing—our 5-axis systems maintain immense clamping torque even at extreme tilt angles, guaranteeing structural stability.
                </p>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #E30613', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <p style={{ margin: '0 0 16px 0' }}>
                  Adopting Axis Engineering’s 5-axis solutions enables "single-setup, omnidirectional machining," eliminating cumulative clamping errors and boosting expected production capacity by over 30%. Fully verified under <strong>ISO 230-2 accuracy standards</strong>, our units guarantee exceptionally stable geometric tolerances even in continuous high-load production environments.
                </p>
                <p style={{ margin: 0 }}>
                  Compatible with major international CNC controllers (FANUC, Siemens, Mitsubishi, Heidenhain) and supporting AIoT smart monitoring, Axis Engineering provides turnkey integration, technical training, and predictive maintenance support to help your facility scale technological heights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIZE FILTER TABS */}
      <div id="products-grid-section" style={styles.filterSection}>
        <h3 style={styles.filterHeading}>Filter by Size / Spindle Pitch:</h3>
        <div style={styles.filterButtonGroup}>
          {sizeFilters.map(size => (
            <button
              key={size}
              className={`aishmo-filter-btn ${selectedSize === size ? 'active' : ''}`}
              onClick={() => handleSizeClick(size)}
            >
              {size === 'All' ? 'All Sizes' : size}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT LIST SECTION */}
      <section style={styles.productSection}>
        <div style={styles.productWrapper}>
          {selectedSize === 'All' ? (
            <div style={styles.cardGrid}>
              {categoryData.items.flatMap(group => 
                group.products.map(prod => ({ ...prod, groupSize: group.size }))
              ).map((prod, prodIdx) => (
                <div key={prodIdx} className="aishmo-card">
                  <Link to={`/products/detron/${CATEGORY_ID}/${encodeURIComponent(prod.name)}`} className="aishmo-card-img-wrapper" style={{ display: 'block' }}>
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="aishmo-card-img" 
                      onError={(e) => { e.target.src = '/images/detron.jpeg'; }} 
                    />
                  </Link>
                  <div className="aishmo-card-content">
                    <span className="aishmo-group-tag" style={{ color: '#E30613', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                      {prod.groupSize.split('(')[0].trim()}
                    </span>
                    <h4 className="aishmo-card-title">
                      <Link to={`/products/detron/${CATEGORY_ID}/${encodeURIComponent(prod.name)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {prod.name}
                      </Link>
                    </h4>
                    <span className="aishmo-card-badge">{prod.badge}</span>
                    <p className="aishmo-card-desc">{prod.description}</p>
                    
                    <div className="aishmo-card-specs">
                      <div className="aishmo-spec-row">
                        <span className="aishmo-spec-key">Table Diameter</span>
                        <span className="aishmo-spec-val">{prod.specs['Worktable Diameter'] || prod.specs['Table Diameter'] || 'N/A'}</span>
                      </div>
                      <div className="aishmo-spec-row">
                        <span className="aishmo-spec-key">Tilt Range</span>
                        <span className="aishmo-spec-val">{prod.specs['Tilting Angle Range'] || prod.specs['Tilt Range'] || 'N/A'}</span>
                      </div>
                      <div className="aishmo-spec-row">
                        <span className="aishmo-spec-key">Braking Torque</span>
                        <span className="aishmo-spec-val">{prod.specs['Clamping Torque (Rotary / Tilt)'] || prod.specs['Clamping Torque (Rot / Tilt)'] || prod.specs['Clamping Torque (Rot/Tilt)'] || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="aishmo-btn-group">
                      <Link 
                        to={`/products/detron/${CATEGORY_ID}/${encodeURIComponent(prod.name)}`} 
                        className="aishmo-btn-view"
                      >
                        View Product
                      </Link>
                      <Link 
                        to={`/contact?product=${encodeURIComponent(prod.name)}`} 
                        className="aishmo-btn-video"
                      >
                        Enquire Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            filteredItems.map((group, groupIdx) => (
              <div key={groupIdx} style={{ marginBottom: '50px', width: '100%' }}>
                <div style={styles.groupHeader}>
                  <h2 style={styles.groupHeading}>{group.size}</h2>
                  <div style={styles.groupLine} />
                </div>

                <div style={styles.cardGrid}>
                  {group.products.map((prod, prodIdx) => (
                    <div key={prodIdx} className="aishmo-card">
                      <Link to={`/products/detron/${CATEGORY_ID}/${encodeURIComponent(prod.name)}`} className="aishmo-card-img-wrapper" style={{ display: 'block' }}>
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="aishmo-card-img" 
                          onError={(e) => { e.target.src = '/images/detron.jpeg'; }} 
                        />
                      </Link>
                      <div className="aishmo-card-content">
                        <h4 className="aishmo-card-title">
                          <Link to={`/products/detron/${CATEGORY_ID}/${encodeURIComponent(prod.name)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {prod.name}
                          </Link>
                        </h4>
                        <span className="aishmo-card-badge">{prod.badge}</span>
                        <p className="aishmo-card-desc">{prod.description}</p>
                        
                        <div className="aishmo-card-specs">
                          <div className="aishmo-spec-row">
                            <span className="aishmo-spec-key">Table Diameter</span>
                            <span className="aishmo-spec-val">{prod.specs['Worktable Diameter'] || prod.specs['Table Diameter'] || 'N/A'}</span>
                          </div>
                          <div className="aishmo-spec-row">
                            <span className="aishmo-spec-key">Tilt Range</span>
                            <span className="aishmo-spec-val">{prod.specs['Tilting Angle Range'] || prod.specs['Tilt Range'] || 'N/A'}</span>
                          </div>
                          <div className="aishmo-spec-row">
                            <span className="aishmo-spec-key">Braking Torque</span>
                            <span className="aishmo-spec-val">{prod.specs['Clamping Torque (Rotary / Tilt)'] || prod.specs['Clamping Torque (Rot / Tilt)'] || prod.specs['Clamping Torque (Rot/Tilt)'] || 'N/A'}</span>
                          </div>
                        </div>

                        <div className="aishmo-btn-group">
                          <Link 
                            to={`/products/detron/${CATEGORY_ID}/${encodeURIComponent(prod.name)}`} 
                            className="aishmo-btn-view"
                          >
                            View Product
                          </Link>
                          <Link 
                            to={`/contact?product=${encodeURIComponent(prod.name)}`} 
                            className="aishmo-btn-video"
                          >
                            Enquire Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section style={styles.relatedSection}>
        <div style={styles.relatedWrapper}>
          <h2 style={styles.relatedHeading}>Related Products</h2>
          <div style={styles.relatedDivider} />
          
          <div style={styles.relatedGrid}>
            {RELATED_CATEGORIES.map(rel => (
              <Link 
                key={rel.id} 
                to={`/products/detron/${rel.id}`} 
                className="related-card"
              >
                <div className="related-card-img-wrapper">
                  <img 
                    src={rel.img} 
                    alt={rel.title} 
                    className="related-card-img" 
                    onError={(e) => { e.target.src = '/images/detron.jpeg'; }} 
                  />
                  <div className="related-card-badge">◈</div>
                </div>
                <div className="related-card-bottom">
                  <h4 className="related-card-title">{rel.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    backgroundColor: '#ffffff',
    color: '#0f172a',
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
  heroSection: {
    position: 'relative',
    height: '280px',
    backgroundImage: 'url("/images/detron.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    textAlign: 'center'
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    padding: '0 20px'
  },
  breadcrumb: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#cbd5e1',
    marginBottom: '16px'
  },
  breadLink: {
    color: '#cbd5e1',
    textDecoration: 'none',
    transition: 'color 0.2s'
  },
  breadActive: {
    color: '#E30613',
    fontWeight: '700'
  },
  heroTitle: {
    fontSize: '38px',
    fontWeight: '900',
    margin: '0 0 10px 0',
    letterSpacing: '1px'
  },
  heroSub: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#cbd5e1',
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
    boxShadow: '0 4px 15px rgba(227, 6, 19, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  filterSection: {
    maxWidth: '1200px',
    margin: '50px auto 30px auto',
    padding: '0 24px',
    textAlign: 'center'
  },
  filterHeading: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '16px'
  },
  filterButtonGroup: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '12px'
  },
  productSection: {
    width: '100%',
    padding: '20px 0 50px 0'
  },
  productWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  groupHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '30px'
  },
  groupHeading: {
    fontSize: '22px',
    fontWeight: '900',
    color: '#0f172a',
    margin: 0,
    whiteSpace: 'nowrap'
  },
  groupLine: {
    flexGrow: 1,
    height: '2px',
    backgroundColor: '#e2e8f0'
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '30px',
    width: '100%'
  },
  relatedSection: {
    width: '100%',
    backgroundColor: '#f8fafc',
    padding: '60px 0 80px 0',
    borderTop: '1px solid #e2e8f0'
  },
  relatedWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center'
  },
  relatedHeading: {
    fontSize: '28px',
    fontWeight: '900',
    color: '#0f172a',
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
  }
};
