import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCT_DATABASE } from './products/productData';

export default function Header({ activePage, scrollToProducts }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Flatten all products for searching
  const allProductsList = useMemo(() => {
    const list = [];
    Object.entries(PRODUCT_DATABASE).forEach(([catId, catObj]) => {
      catObj.items.forEach(sizeItem => {
        sizeItem.products.forEach(prod => {
          list.push({
            name: prod.name,
            categoryId: catId,
            categoryTitle: catObj.title,
            image: prod.image
          });
        });
      });
    });
    return list;
  }, []);

  const filteredSuggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return allProductsList.filter(prod => 
      prod.name.toLowerCase().includes(query) ||
      prod.categoryTitle.toLowerCase().includes(query)
    ).slice(0, 8);
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

  return (
    <div style={styles.fixedHeaderGroup}>
      <div style={styles.topBar}>
        <div style={styles.topBarLeft}>
          <span style={styles.contactItem}>🕿 <strong>+91 98849 12279</strong></span>
          <span style={styles.contactItem}>
            🌐 <Link to="/contact" style={styles.topContactLink}>CONTACT US</Link>
          </span>
        </div>
        <div style={styles.topBarRight}>
          <Link to="/about" style={styles.topAboutLink}>ABOUT</Link>
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
              <button style={styles.searchBtn}>🔍</button>
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
                      navigate(`/products/detron/${suggestion.categoryId}/${suggestion.name}`);
                      setSearchQuery('');
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
          {activePage === 'home' ? (
            <>
              <button onClick={scrollToProducts} style={styles.navLinkBtn}>DISCOVER AXIS</button>
              <Link to="/products/detron" style={styles.navLink}>PRODUCT RANGE</Link>
            </>
          ) : (
            <>
              <Link to="/" style={styles.navLink}>HOME</Link>
              <Link 
                to="/products/detron" 
                style={activePage === 'detron' ? styles.navLinkActive : styles.navLink}
              >
                DETRON PRODUCTS
              </Link>
            </>
          )}
          <Link 
            to="/products/fixtures" 
            style={activePage === 'fixtures' ? styles.navLinkActive : styles.navLink}
          >
            CUSTOM FIXTURES
          </Link>
          <Link to="/contact" style={styles.contactHeaderBtn}>CONTACT PANEL &gt;</Link>
        </nav>
      </header>
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
  mainHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 28px', backgroundColor: 'rgba(255, 255, 255, 0.98)', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' },
  
  dualLogoGroup: { display: 'flex', alignItems: 'center', gap: '16px' },
  logoLink: { display: 'flex', alignItems: 'center' },
  logoImage: { height: '32px', width: 'auto', objectFit: 'contain' },
  logoImageDetron: { height: '28px', width: 'auto', objectFit: 'contain' },
  logoDivider: { height: '24px', width: '1px', backgroundColor: '#cbd5e1' },

  navMenu: { display: 'flex', alignItems: 'center', gap: '22px' },
  navLink: { textDecoration: 'none', color: '#0f172a', fontWeight: '700', fontSize: '11px', letterSpacing: '0.3px' },
  navLinkActive: { textDecoration: 'none', color: '#E30613', fontWeight: '800', fontSize: '11px', letterSpacing: '0.3px' },
  navLinkBtn: { background: 'none', border: 'none', color: '#0f172a', fontWeight: '700', fontSize: '11px', letterSpacing: '0.3px', cursor: 'pointer', padding: 0, fontFamily: 'inherit' },
  contactHeaderBtn: { backgroundColor: '#000000', color: '#ffffff', textDecoration: 'none', border: 'none', padding: '6px 14px', borderRadius: '2px', cursor: 'pointer', fontWeight: '700', fontSize: '11px' },
  
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
  }
};
