import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCT_DATABASE } from './products/productData';

export default function Header({ activePage, scrollToProducts }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Flatten all products for searching
  const allProductsList = useMemo(() => {
    const list = [];
    const seenProds = new Set();
    Object.entries(PRODUCT_DATABASE).forEach(([catId, catObj]) => {
      if (catId === 'special-applications') return; // skip alias
      catObj.items.forEach(sizeItem => {
        sizeItem.products.forEach(prod => {
          const uniqueKey = `${catId}_${prod.name}`;
          if (!seenProds.has(uniqueKey)) {
            seenProds.add(uniqueKey);
            list.push({
              name: prod.name,
              badge: prod.badge || '',
              description: prod.description || '',
              size: sizeItem.size || '',
              categoryId: catId,
              categoryTitle: catObj.title,
              image: prod.image
            });
          }
        });
      });
    });
    return list;
  }, []);

  const filteredSuggestions = useMemo(() => {
    const rawQuery = searchQuery.trim().toLowerCase();
    if (!rawQuery) return [];
    
    // Alphanumeric query without special chars
    const cleanQuery = rawQuery.replace(/[^a-z0-9]/g, '');

    return allProductsList.filter(prod => {
      const nameLower = prod.name.toLowerCase();
      const badgeLower = prod.badge.toLowerCase();
      const descLower = prod.description.toLowerCase();
      const sizeLower = prod.size.toLowerCase();
      const catLower = prod.categoryTitle.toLowerCase();
      
      const cleanName = nameLower.replace(/[^a-z0-9]/g, '');
      const cleanBadge = badgeLower.replace(/[^a-z0-9]/g, '');

      return (
        nameLower.includes(rawQuery) ||
        badgeLower.includes(rawQuery) ||
        descLower.includes(rawQuery) ||
        sizeLower.includes(rawQuery) ||
        catLower.includes(rawQuery) ||
        (cleanQuery.length > 1 && cleanName.includes(cleanQuery)) ||
        (cleanQuery.length > 1 && cleanBadge.includes(cleanQuery))
      );
    }).slice(0, 10);
  }, [searchQuery, allProductsList]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchQuery('');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const MEGA_MENU_ITEMS = [
    { title: '4TH AXIS', image: '/images/products_detron/4th_axis.png', link: '/products/detron/4-axis' },
    { title: '4TH / 5TH AXIS', image: '/images/products_detron/5th_axis.png', link: '/products/detron/5-axis' },
    { title: 'PALLET CHANGERS', image: '/images/products_detron/Auto-Pallet-changer.png', link: '/products/detron/auto-pallet-changer' },
    { title: 'SPECIAL APPLICATIONS', image: '/images/products_detron/Special-Application.png', link: '/products/detron/special-application' },
    { title: 'ACCESSORIES', image: '/images/products_detron/Accessories.png', link: '/products/detron/accessories' },
    { title: 'INTELLIGENT CONTROL', image: '/images/products_detron/Intelligent-control.png', link: '/products/detron/intelligent-control' }
  ];

  return (
    <div style={styles.fixedHeaderGroup} onMouseLeave={() => setShowMegaMenu(false)}>
      <div style={styles.topBar}>
        <div style={styles.topBarLeft}>
          <span style={styles.contactItem}>🕿 <strong>+91 98849 12279</strong></span>
          <span style={styles.contactItem}>
            🌐 <Link to="/contact" style={styles.topContactLink} onMouseEnter={() => setShowMegaMenu(false)}>CONTACT US</Link>
          </span>
        </div>
        <div style={styles.topBarRight}>
          <Link to="/about" style={styles.topAboutLink} onMouseEnter={() => setShowMegaMenu(false)}>ABOUT</Link>
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <div style={styles.searchBox} onMouseEnter={() => setShowMegaMenu(false)}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
              <button style={styles.searchBtn}>🛒</button>
            </div>

            {filteredSuggestions.length > 0 && (
              <div style={styles.suggestionDropdown}>
                <style>{`
                  .search-suggestion-item {
                    transition: background-color 0.2s;
                  }
                  .search-suggestion-item:hover {
                    background-color: #E30613 !important;
                  }
                  .search-suggestion-item:hover span {
                    color: #ffffff !important;
                  }
                `}</style>
                {filteredSuggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      navigate(`/products/detron/${suggestion.categoryId}/${encodeURIComponent(suggestion.name)}`);
                      setSearchQuery('');
                      setShowMegaMenu(false);
                    }}
                    className="search-suggestion-item"
                    style={styles.suggestionItem}
                  >
                    <img
                      src={suggestion.image}
                      alt={suggestion.name}
                      style={styles.suggestionImg}
                      onError={(e) => { e.target.src = '/images/detron.jpeg'; }}
                    />
                    <div style={styles.suggestionDetails}>
                      <span style={styles.suggestionName}>{suggestion.name}</span>
                      <span style={styles.suggestionCat}>{suggestion.categoryTitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <header style={styles.mainHeader}>
        <div style={styles.dualLogoGroup} onMouseEnter={() => setShowMegaMenu(false)}>
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
          {activePage === 'home' ? (
            <>
              <button 
                onClick={scrollToProducts} 
                style={styles.navLinkBtn}
                onMouseEnter={() => setShowMegaMenu(false)}
              >
                DISCOVER AXIS
              </button>
              <div
                onMouseEnter={() => setShowMegaMenu(true)}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Link 
                  to="/products/detron" 
                  style={showMegaMenu ? styles.navLinkOpenTab : styles.navLink}
                >
                  PRODUCT RANGE {showMegaMenu && <span style={styles.closeIcon}>×</span>}
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/" 
                style={styles.navLink}
                onMouseEnter={() => setShowMegaMenu(false)}
              >
                HOME
              </Link>
              <div
                onMouseEnter={() => setShowMegaMenu(true)}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Link 
                  to="/products/detron" 
                  style={showMegaMenu ? styles.navLinkOpenTab : (activePage === 'detron' ? styles.navLinkActive : styles.navLink)}
                >
                  DETRON PRODUCTS {showMegaMenu && <span style={styles.closeIcon}>×</span>}
                </Link>
              </div>
            </>
          )}
          <Link 
            to="/products/fixtures" 
            style={activePage === 'fixtures' ? styles.navLinkActive : styles.navLink}
            onMouseEnter={() => setShowMegaMenu(false)}
          >
            CUSTOM FIXTURES
          </Link>
          <Link 
            to="/contact" 
            style={styles.contactHeaderBtn}
            onMouseEnter={() => setShowMegaMenu(false)}
          >
            CONTACT PANEL &gt;
          </Link>
        </nav>
      </header>

      {/* MEGA MENU DROPDOWN DRAWER */}
      <div 
        onMouseEnter={() => setShowMegaMenu(true)}
        onMouseLeave={() => setShowMegaMenu(false)}
        style={{
          ...styles.megaMenuDropdown,
          opacity: showMegaMenu ? 1 : 0,
          transform: showMegaMenu ? 'translateY(0)' : 'translateY(-15px)',
          visibility: showMegaMenu ? 'visible' : 'hidden',
          pointerEvents: showMegaMenu ? 'auto' : 'none',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s'
        }}
      >
        <style>{`
          .mega-menu-card {
            transition: border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .mega-menu-card:hover {
            border-color: #E30613 !important;
          }
          .mega-menu-card-img {
            transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .mega-menu-card:hover .mega-menu-card-img {
            transform: scale(1.08);
          }
        `}</style>
        <div style={styles.megaMenuContainer}>
          {MEGA_MENU_ITEMS.map((item, idx) => (
            <Link 
              key={idx} 
              to={item.link} 
              style={styles.megaMenuCard}
              className="mega-menu-card"
              onClick={() => setShowMegaMenu(false)}
            >
              <div style={styles.cardHeader}>
                <span style={styles.cardArrow}>&gt;</span> {item.title}
              </div>
              <div style={styles.cardImgWrapper}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={styles.cardImg}
                  className="mega-menu-card-img"
                  onError={(e) => { e.target.src = '/images/detron.jpeg'; }}
                />
              </div>
              <div style={styles.cardRedLine} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
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
    padding: '6px 28px',
    fontSize: '11px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1c1c1c'
  },
  topBarLeft: { display: 'flex', gap: '18px', alignItems: 'center' },
  topBarRight: { display: 'flex', gap: '16px', alignItems: 'center' },
  contactItem: { color: '#f8fafc' },
  topContactLink: { color: '#ffffff', fontWeight: '700', fontSize: '11px', textDecoration: 'underline' },
  topAboutLink: { color: '#ffffff', textDecoration: 'none', fontWeight: '700', fontSize: '11px', letterSpacing: '0.5px', cursor: 'pointer' },
  searchBox: { display: 'flex', alignItems: 'center', backgroundColor: '#171717', padding: '3px 6px', borderRadius: '2px', border: '1px solid #333' },
  searchInput: { background: 'none', border: 'none', color: '#fff', fontSize: '11px', outline: 'none', width: '110px' },
  searchBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#fff' },
  mainHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 28px', backgroundColor: 'rgba(255, 255, 255, 0.98)', boxShadow: '0 2px 10px rgba(0,0,0,0.15)', position: 'relative', zIndex: 10001 },
  
  dualLogoGroup: { display: 'flex', alignItems: 'center', gap: '16px' },
  logoLink: { display: 'flex', alignItems: 'center' },
  logoImage: { height: '32px', width: 'auto', objectFit: 'contain' },
  logoImageDetron: { height: '28px', width: 'auto', objectFit: 'contain' },
  logoDivider: { height: '24px', width: '1px', backgroundColor: '#cbd5e1' },

  navMenu: { display: 'flex', alignItems: 'center', gap: '22px' },
  navLink: { textDecoration: 'none', color: '#0f172a', fontWeight: '700', fontSize: '12px', letterSpacing: '0.3px', transition: 'all 0.2s', padding: '6px 12px', border: '1px solid transparent' },
  navLinkActive: { textDecoration: 'none', color: '#E30613', fontWeight: '800', fontSize: '12px', letterSpacing: '0.3px', padding: '6px 12px', border: '1px solid transparent' },
  navLinkBtn: { background: 'none', border: 'none', color: '#0f172a', fontWeight: '700', fontSize: '12px', letterSpacing: '0.3px', cursor: 'pointer', padding: '6px 12px', fontFamily: 'inherit' },
  contactHeaderBtn: { backgroundColor: '#000000', color: '#ffffff', textDecoration: 'none', border: 'none', padding: '6px 14px', borderRadius: '2px', cursor: 'pointer', fontWeight: '700', fontSize: '11px' },
  
  navLinkOpenTab: {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '6px 16px',
    borderRadius: '4px 4px 0 0',
    textDecoration: 'none',
    fontWeight: '800',
    fontSize: '12px',
    letterSpacing: '0.3px',
    border: '1px solid #222222',
    borderBottom: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    position: 'relative',
    zIndex: 10002
  },
  closeIcon: {
    color: '#E30613',
    fontWeight: '900',
    fontSize: '14px',
    lineHeight: 1
  },

  suggestionDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '6px',
    width: '280px',
    backgroundColor: '#0a0a0a',
    border: '1px solid #222222',
    borderRadius: '4px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    zIndex: 1000,
    maxHeight: '320px',
    overflowY: 'auto'
  },
  suggestionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 14px',
    borderBottom: '1px solid #1a1a1a',
    cursor: 'pointer',
    textAlign: 'left',
    backgroundColor: 'transparent'
  },
  suggestionImg: {
    width: '36px',
    height: '36px',
    objectFit: 'contain',
    backgroundColor: '#111111',
    borderRadius: '4px',
    padding: '2px'
  },
  suggestionDetails: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  suggestionName: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#ffffff'
  },
  suggestionCat: {
    fontSize: '10px',
    color: '#E30613',
    fontWeight: '600',
    margin: '2px 0 0 0'
  },

  /* MEGA DROPDOWN MENU */
  megaMenuDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#000000',
    borderTop: '2px solid #E30613',
    borderBottom: '1px solid #222222',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)',
    padding: '30px 48px',
    boxSizing: 'border-box',
    zIndex: 10000
  },
  megaMenuContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '20px'
  },
  megaMenuCard: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0f0f0f',
    border: '1px solid #222222',
    borderRadius: '6px',
    overflow: 'hidden',
    textDecoration: 'none'
  },
  cardHeader: {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '12px 16px',
    fontSize: '10.5px',
    fontWeight: '800',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    letterSpacing: '0.5px'
  },
  cardArrow: {
    color: '#E30613',
    fontWeight: '900'
  },
  cardImgWrapper: {
    height: '130px',
    backgroundColor: '#161616',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '10px'
  },
  cardImg: {
    width: 'auto',
    maxWidth: '85%',
    height: 'auto',
    maxHeight: '85%',
    objectFit: 'contain'
  },
  cardRedLine: {
    height: '3px',
    backgroundColor: '#E30613',
    width: '100%'
  }
};
