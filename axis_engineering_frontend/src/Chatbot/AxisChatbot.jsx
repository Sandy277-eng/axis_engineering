import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_DATABASE } from '../products/productData';

export default function AxisChatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: "Hello! I am **Axis**, your digital assistant for Axis Engineering Solutions. How can I help you today?",
        type: 'text',
        options: [
          { label: '🔍 Search/Browse Products', value: 'browse_products' },
          { label: '📍 Location & Address', value: 'location_info' },
          { label: '📞 Contact Details', value: 'contact_info' },
          { label: '⏰ Business Hours', value: 'hours_info' },
          { label: '💬 FAQs & Services', value: 'faq_info' }
        ]
      }
    ]);
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Main menu options handler
  const handleOptionClick = (value, labelText) => {
    // Add user's choice to chat log
    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: labelText,
      type: 'text'
    };

    setMessages(prev => [...prev, newUserMsg]);

    // Simulate small thinking delay for natural feel
    setTimeout(() => {
      let botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        type: 'text'
      };

      switch (value) {
        case 'main_menu':
          botResponse.text = "Here is the main menu. Select an option or type a specific model or keyword:";
          botResponse.options = [
            { label: '🔍 Search/Browse Products', value: 'browse_products' },
            { label: '📍 Location & Address', value: 'location_info' },
            { label: '📞 Contact Details', value: 'contact_info' },
            { label: '⏰ Business Hours', value: 'hours_info' },
            { label: '💬 FAQs & Services', value: 'faq_info' }
          ];
          break;

        case 'browse_products':
          botResponse.text = "Please select a product category to browse, or type a search query (e.g. 'GXA', 'RCX', 'Direct Drive'):";
          botResponse.options = [
            { label: '⚙️ 4-Axis Rotary Tables', value: 'cat_4axis' },
            { label: '⚙️ 5-Axis Rotary Tables', value: 'cat_5axis' },
            { label: '🛠️ Custom Clamping Fixtures', value: 'cat_fixtures' },
            { label: '🔌 Intelligent Control & Access', value: 'cat_access' },
            { label: '🔙 Main Menu', value: 'main_menu' }
          ];
          break;

        case 'cat_4axis':
          botResponse.text = "Our 4-Axis Detron rotary tables are built for high accuracy indexing. Popular models include:";
          botResponse.options = [
            { label: 'Model GXA-125S (Small CNC)', value: 'prod_GXA-125S' },
            { label: 'Model GXA-170S (Pneumatic)', value: 'prod_GXA-170S' },
            { label: 'Model GXA-210S (Medium Size)', value: 'prod_GXA-210S' },
            { label: 'Model GXA-255H (Large Bore)', value: 'prod_GXA-255H' },
            { label: 'Model RCX-170S (Roller Gear Cam)', value: 'prod_RCX-170S' },
            { label: 'Model DV-170P (Direct Drive)', value: 'prod_DV-170P' },
            { label: '🔙 Back to Categories', value: 'browse_products' }
          ];
          break;

        case 'cat_5axis':
          botResponse.text = "Our 5-Axis Detron tilting rotary tables offer high flexibility for multi-sided machining. Popular models:";
          botResponse.options = [
            { label: 'Model GXA-170S-2W (Double Spindle)', value: 'prod_GXA-170S-2W-250' },
            { label: 'Model GXA-210S (Standard 5-Axis)', value: 'prod_GXA-210S' },
            { label: 'Browse 5-Axis Catalog', value: 'go_5axis_page' },
            { label: '🔙 Back to Categories', value: 'browse_products' }
          ];
          break;

        case 'cat_fixtures':
          botResponse.text = "We engineer bespoke workholding jigs, hydraulic, and pneumatic clamping fixtures customized precisely to your component lines at our Chennai facility.";
          botResponse.options = [
            { label: '🛠️ View Fixtures Page', value: 'go_fixtures_page' },
            { label: '🔙 Back to Categories', value: 'browse_products' }
          ];
          break;

        case 'cat_access':
          botResponse.text = "We offer intelligent control systems, auto pallet changers, and genuine accessories for rotary tables.";
          botResponse.options = [
            { label: '🔌 View Accessories', value: 'go_accessories_page' },
            { label: '🔙 Back to Categories', value: 'browse_products' }
          ];
          break;

        // Redirect handlers
        case 'go_5axis_page':
          setIsOpen(false);
          navigate('/products/detron/5-axis');
          return;
        case 'go_fixtures_page':
          setIsOpen(false);
          navigate('/products/fixtures');
          return;
        case 'go_accessories_page':
          setIsOpen(false);
          navigate('/products/detron/accessories');
          return;
        case 'contact_form':
          setIsOpen(false);
          navigate('/contact');
          return;
        case 'view_map':
          window.open('https://maps.app.goo.gl/4hB7DMjNiiiabTDWA', '_blank');
          return;

        case 'location_info':
          botResponse.text = "📍 **Main Office & Design Facility**:\n\nAxis Engineering Solutions\nNo. 78-B, 1st Floor, Geason Housing Colony,\nAyanambakkam, Chennai - 600095,\nTamil Nadu, India.";
          botResponse.options = [
            { label: '🚗 Open in Google Maps', value: 'view_map' },
            { label: '🔙 Main Menu', value: 'main_menu' }
          ];
          break;

        case 'contact_info':
          botResponse.text = "📞 **Sales & Support Channels**:\n\n• Mobile: +91 98849 12279 / +91 98849 12280\n• Tel/Fax: 044 - 4746 8749\n• Email: info@axisengineeringsolutions.in";
          botResponse.options = [
            { label: '✉️ Send Inquiry Form', value: 'contact_form' },
            { label: '🔙 Main Menu', value: 'main_menu' }
          ];
          break;

        case 'hours_info':
          botResponse.text = "⏰ **Business Operations Hours**:\n\n• Monday – Saturday: 9:00 AM – 6:30 PM (IST)\n• Sunday: Closed";
          botResponse.options = [
            { label: '🔙 Main Menu', value: 'main_menu' }
          ];
          break;

        case 'faq_info':
          botResponse.text = "Frequently Asked Questions:";
          botResponse.options = [
            { label: '🤝 Who is Detron Taiwan?', value: 'faq_detron' },
            { label: '💰 How to request a Quote?', value: 'faq_quote' },
            { label: '🛠️ Service & Installation?', value: 'faq_service' },
            { label: '🔙 Main Menu', value: 'main_menu' }
          ];
          break;

        case 'faq_detron':
          botResponse.text = "🤝 **Partnership**:\nAxis Engineering Solutions is the **Authorized Distributor & Technical Partner of Detron Machinery Co., Ltd. (Taiwan)**, the world's largest professional Rotary Table Manufacturer. We sell, integrate, and service Detron tables in India.";
          botResponse.options = [
            { label: '🔍 Browse Detron Range', value: 'browse_products' },
            { label: '🔙 FAQs', value: 'faq_info' }
          ];
          break;

        case 'faq_quote':
          botResponse.text = "💰 **Quotations**:\nWe provide technical specs and price quotes within 24 hours. Click below to fill in details about your machine controller interface (FANUC, Mitsubishi, etc.) and product model.";
          botResponse.options = [
            { label: '✉️ Fill Inquiry Form', value: 'contact_form' },
            { label: '🔙 FAQs', value: 'faq_info' }
          ];
          break;

        case 'faq_service':
          botResponse.text = "🛠️ **Service & Maintenance**:\nWe have a Chennai-based engineering team specialized in mechanical, electrical, electronics, and mechatronics. We offer on-site commissioning, installation, integration, and warranty support across India.";
          botResponse.options = [
            { label: '📞 Contact Support', value: 'contact_info' },
            { label: '🔙 FAQs', value: 'faq_info' }
          ];
          break;

        default:
          // Check if it's a specific product lookup
          if (value.startsWith('prod_')) {
            const modelName = value.replace('prod_', '');
            const product = findProductDetails(modelName);
            if (product) {
              botResponse.text = `**${product.name}**\n*${product.badge || ''}*\n\n${product.description}\n\n⚙️ **Key Specs**:\n` + 
                Object.entries(product.specs || {}).slice(0, 5).map(([k, v]) => `• ${k}: ${v}`).join('\n');
              botResponse.options = [
                { label: `🌐 View Full Page`, value: `goto_prod_${product.categoryKey}_${product.name}` },
                { label: '🔙 Back to categories', value: 'browse_products' }
              ];
            } else {
              botResponse.text = `Product ${modelName} details not found. Please browse catalog.`;
              botResponse.options = [{ label: '🔙 Browse Products', value: 'browse_products' }];
            }
          } else if (value.startsWith('goto_prod_')) {
            const parts = value.replace('goto_prod_', '').split('_');
            const categoryKey = parts[0];
            const modelName = parts.slice(1).join('_');
            setIsOpen(false);
            navigate(`/products/detron/${categoryKey}/${modelName}`);
            return;
          }
          break;
      }

      setMessages(prev => [...prev, botResponse]);
    }, 450);
  };

  // Helper: Find product details from database
  const findProductDetails = (modelName) => {
    for (const [catKey, category] of Object.entries(PRODUCT_DATABASE)) {
      if (category.items) {
        for (const item of category.items) {
          if (item.products) {
            const found = item.products.find(p => p.name === modelName);
            if (found) {
              return {
                ...found,
                categoryKey: catKey
              };
            }
          }
        }
      }
    }
    return null;
  };

  // Handle typing submissions
  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');

    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      type: 'text'
    };

    setMessages(prev => [...prev, newUserMsg]);

    setTimeout(() => {
      const response = processKeywordSearch(userText);
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        type: 'text',
        options: response.options,
        products: response.products
      };
      setMessages(prev => [...prev, botResponse]);
    }, 450);
  };

  // Client-side rule search logic
  const processKeywordSearch = (text) => {
    const query = text.toLowerCase().trim();

    if (query.includes('address') || query.includes('location') || query.includes('where') || query.includes('office') || query.includes('map') || query.includes('chennai') || query.includes('locate')) {
      return {
        text: "📍 **Main Office & Design Facility**:\n\nAxis Engineering Solutions\nNo. 78-B, 1st Floor, Geason Housing Colony, Ayanambakkam, Chennai - 600095, Tamil Nadu, India.",
        options: [
          { label: '🚗 Open in Google Maps', value: 'view_map' },
          { label: '🔙 Main Menu', value: 'main_menu' }
        ]
      };
    }

    if (query.includes('phone') || query.includes('mobile') || query.includes('email') || query.includes('mail') || query.includes('contact') || query.includes('sales') || query.includes('call') || query.includes('number')) {
      return {
        text: "📞 **Contact Details**:\n\n• Mobile: +91 98849 12279 / +91 98849 12280\n• Tel/Fax: 044 - 4746 8749\n• Email: info@axisengineeringsolutions.in\n\nWe respond to quotes within 24 hours.",
        options: [
          { label: '✉️ Send Inquiry Form', value: 'contact_form' },
          { label: '🔙 Main Menu', value: 'main_menu' }
        ]
      };
    }

    if (query.includes('hours') || query.includes('time') || query.includes('open') || query.includes('saturday') || query.includes('sunday') || query.includes('close')) {
      return {
        text: "⏰ **Business Operations Hours**:\n\n• Monday – Saturday: 9:00 AM – 6:30 PM (IST)\n• Sunday: Closed",
        options: [{ label: '🔙 Main Menu', value: 'main_menu' }]
      };
    }

    if (query.includes('quote') || query.includes('price') || query.includes('pricing') || query.includes('cost') || query.includes('quotation') || query.includes('buy') || query.includes('purchase')) {
      return {
        text: "💰 **How to Get a Quote**:\nTo request a price or tech quote, please send us details about your CNC machine controller interface (e.g. Fanuc, Mitsubishi) and required rotary table diameter.\n\nFill in our contact form or contact sales at +91 98849 12279.",
        options: [
          { label: '✉️ Fill Contact Form', value: 'contact_form' },
          { label: '🔙 Main Menu', value: 'main_menu' }
        ]
      };
    }

    if (query.includes('detron') || query.includes('taiwan') || query.includes('partner') || query.includes('distributor') || query.includes('relationship')) {
      return {
        text: "🤝 **Detron Partnership**:\nAxis Engineering Solutions is the **Authorized Distributor & Technical Partner of Detron Machinery Co., Ltd. (Taiwan)**, the world's largest Rotary Table manufacturer. We provide sales, mechanical/electrical installation, and after-sales support across India.",
        options: [
          { label: '🔍 Browse Products', value: 'browse_products' },
          { label: '🔙 Main Menu', value: 'main_menu' }
        ]
      };
    }

    if (query.includes('warranty') || query.includes('service') || query.includes('support') || query.includes('maintenance') || query.includes('installation') || query.includes('commissioning') || query.includes('repair')) {
      return {
        text: "🛠️ **Service & Technical Support**:\nWe provide pan-India technical support for Detron products:\n\n• Mechanical & electrical integration on your machine tools.\n• Genuine manufacturer warranty service.\n• Rapid on-site trouble troubleshooting.",
        options: [
          { label: '📞 Request Service Support', value: 'contact_info' },
          { label: '🔙 Main Menu', value: 'main_menu' }
        ]
      };
    }

    if (query.includes('fixture') || query.includes('workholding') || query.includes('clamping') || query.includes('jig')) {
      return {
        text: "🛠️ **Custom Workholding Fixtures**:\nWe design and build bespoke hydraulic & pneumatic clamping fixtures at our Ambattur, Chennai facility to match specific customer manufacturing components.",
        options: [
          { label: '🛠️ View Fixtures Page', value: 'go_fixtures_page' },
          { label: '🔙 Main Menu', value: 'main_menu' }
        ]
      };
    }

    // Keyword Product Database Search
    const foundProducts = [];
    const searchTerms = query.split(/\s+/);

    for (const [catKey, category] of Object.entries(PRODUCT_DATABASE)) {
      if (category.items) {
        for (const item of category.items) {
          if (item.products) {
            for (const prod of item.products) {
              let match = false;
              if (prod.name.toLowerCase().includes(query)) {
                match = true;
              } else {
                let allTermsMatch = true;
                for (const term of searchTerms) {
                  if (term.length > 1) {
                    if (!prod.name.toLowerCase().includes(term) &&
                        !prod.description.toLowerCase().includes(term) &&
                        !(prod.badge && prod.badge.toLowerCase().includes(term))) {
                      allTermsMatch = false;
                      break;
                    }
                  }
                }
                if (allTermsMatch && searchTerms.some(t => t.length > 1)) {
                  match = true;
                }
              }
              if (match) {
                foundProducts.push({
                  ...prod,
                  categoryKey: catKey,
                  categoryTitle: category.title
                });
              }
            }
          }
        }
      }
    }

    if (foundProducts.length > 0) {
      const results = foundProducts.slice(0, 4);
      return {
        text: `🔍 I found **${foundProducts.length}** matching product${foundProducts.length > 1 ? 's' : ''} in our database. Here are the top results:`,
        products: results,
        options: [
          { label: '🔍 Search More', value: 'browse_products' },
          { label: '🔙 Main Menu', value: 'main_menu' }
        ]
      };
    }

    return {
      text: "I couldn't find a direct match for your keyword. Try searching for model abbreviations like `'GXA'`, `'RCX'`, `'DV'`, `'170'`, or write `'quote'`, `'hours'`, or `'address'`. Or choose from the options below:",
      options: [
        { label: '🔍 Browse Product Categories', value: 'browse_products' },
        { label: '📞 Contact Support', value: 'contact_info' },
        { label: '🔙 Main Menu', value: 'main_menu' }
      ]
    };
  };

  // Helper to format bold markdown bold syntax **text** in render
  const formatMessageText = (text) => {
    if (!text) return '';
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      // Handle simple newlines
      const subparts = part.split('\n');
      return subparts.map((sp, sIdx) => (
        <span key={`${index}-${sIdx}`}>
          {sp}
          {sIdx < subparts.length - 1 && <br />}
        </span>
      ));
    });
  };

  return (
    <>
      {/* FLOATING ACTION TRIGGER BUTTON */}
      <button
        style={{
          ...styles.floatingBtn,
          ...(isOpen ? styles.floatingBtnActive : {})
        }}
        onClick={() => setIsOpen(!isOpen)}
        title="Axis Assistant Chat"
      >
        {isOpen ? (
          <span style={styles.closeIcon}>✕</span>
        ) : (
          <div style={styles.chatIconGroup}>
            <svg style={styles.chatIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
            </svg>
            <span style={styles.pulseDot} />
          </div>
        )}
      </button>

      {/* CHAT WINDOW INTERFACE */}
      {isOpen && (
        <div style={styles.chatWindow}>
          {/* HEADER */}
          <div style={styles.chatHeader}>
            <div style={styles.headerInfo}>
              <div style={styles.avatarCircle}>A</div>
              <div>
                <h4 style={styles.headerTitle}>Axis Support Assistant</h4>
                <div style={styles.statusIndicator}>
                  <span style={styles.onlineDot} />
                  <span style={styles.statusText}>Support Online</span>
                </div>
              </div>
            </div>
            <button style={styles.headerCloseBtn} onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* MESSAGES CONTAINER */}
          <div style={styles.messagesContainer}>
            {messages.map((msg) => (
              <div key={msg.id} style={styles.messageWrapper}>
                <div
                  style={{
                    ...styles.messageBubble,
                    ...(msg.sender === 'user' ? styles.userBubble : styles.botBubble)
                  }}
                >
                  {formatMessageText(msg.text)}

                  {/* If product results are attached, render product cards */}
                  {msg.products && msg.products.length > 0 && (
                    <div style={styles.productsGrid}>
                      {msg.products.map((p, idx) => (
                        <div key={idx} style={styles.productCard}>
                          <div style={styles.productCardTitle}>{p.name}</div>
                          <div style={styles.productCardBadge}>{p.badge}</div>
                          <div style={styles.productCardDesc}>{p.description?.slice(0, 80)}...</div>
                          <button
                            style={styles.productCardBtn}
                            onClick={() => {
                              setIsOpen(false);
                              navigate(`/products/detron/${p.categoryKey || '4-axis'}/${p.name}`);
                            }}
                          >
                            View Product specs &gt;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* If options exist, render pill options */}
                {msg.sender === 'bot' && msg.options && msg.options.length > 0 && (
                  <div style={styles.optionsContainer}>
                    {msg.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        style={styles.optionPill}
                        onClick={() => handleOptionClick(opt.value, opt.label)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* INPUT FORM */}
          <form onSubmit={handleSend} style={styles.inputForm}>
            <input
              type="text"
              placeholder="Ask me something (e.g. GXA-170S, address)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={styles.textInput}
            />
            <button type="submit" style={styles.sendButton} disabled={!inputValue.trim()}>
              <svg style={styles.sendIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

const styles = {
  floatingBtn: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#E30613',
    color: '#ffffff',
    border: 'none',
    boxShadow: '0 8px 24px rgba(227, 6, 19, 0.4)',
    cursor: 'pointer',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    outline: 'none'
  },
  floatingBtnActive: {
    transform: 'rotate(90deg)',
    backgroundColor: '#0a0a0a',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
  },
  chatIconGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chatIcon: {
    width: '28px',
    height: '28px'
  },
  pulseDot: {
    position: 'absolute',
    top: '-3px',
    right: '-3px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    border: '2px solid #E30613',
    animation: 'pulse 2s infinite'
  },
  closeIcon: {
    fontSize: '22px',
    fontWeight: '800'
  },
  chatWindow: {
    position: 'fixed',
    bottom: '96px',
    right: '24px',
    width: '380px',
    height: '560px',
    maxHeight: 'calc(100vh - 120px)',
    maxWidth: 'calc(100vw - 48px)',
    backgroundColor: '#181818',
    borderRadius: '12px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
    border: '1px solid #2e2e2e',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 9998,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  chatHeader: {
    backgroundColor: '#0a0a0a',
    padding: '14px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #E30613'
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  avatarCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#E30613',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '16px'
  },
  headerTitle: {
    color: '#ffffff',
    margin: 0,
    fontSize: '14px',
    fontWeight: '700'
  },
  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginTop: '2px'
  },
  onlineDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#22c55e'
  },
  statusText: {
    fontSize: '11px',
    color: '#a1a1aa'
  },
  headerCloseBtn: {
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '4px'
  },
  messagesContainer: {
    flexGrow: 1,
    padding: '16px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: '#121212'
  },
  messageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  messageBubble: {
    maxWidth: '85%',
    padding: '12px 14px',
    borderRadius: '10px',
    fontSize: '13px',
    lineHeight: '1.5',
    boxSizing: 'border-box'
  },
  userBubble: {
    backgroundColor: '#E30613',
    color: '#ffffff',
    alignSelf: 'flex-end',
    borderBottomRightRadius: '2px'
  },
  botBubble: {
    backgroundColor: '#262626',
    color: '#e4e4e7',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: '2px',
    border: '1px solid #333333'
  },
  optionsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '4px',
    paddingLeft: '2px'
  },
  optionPill: {
    backgroundColor: 'transparent',
    border: '1px solid #E30613',
    color: '#ffffff',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '11.5px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  productsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '12px',
    width: '100%'
  },
  productCard: {
    backgroundColor: '#181818',
    border: '1px solid #333333',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'left'
  },
  productCardTitle: {
    fontSize: '13px',
    fontWeight: '800',
    color: '#ffffff'
  },
  productCardBadge: {
    fontSize: '10px',
    color: '#E30613',
    fontWeight: '700',
    marginTop: '2px'
  },
  productCardDesc: {
    fontSize: '11.5px',
    color: '#a1a1aa',
    marginTop: '6px',
    lineHeight: '1.4'
  },
  productCardBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#E30613',
    fontSize: '11px',
    fontWeight: '800',
    cursor: 'pointer',
    padding: '6px 0 0 0',
    display: 'block'
  },
  inputForm: {
    backgroundColor: '#0a0a0a',
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderTop: '1px solid #2e2e2e'
  },
  textInput: {
    flexGrow: 1,
    backgroundColor: '#262626',
    border: '1px solid #333333',
    borderRadius: '6px',
    padding: '10px 12px',
    color: '#ffffff',
    fontSize: '12.5px',
    outline: 'none'
  },
  sendButton: {
    backgroundColor: '#E30613',
    color: '#ffffff',
    border: 'none',
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s ease'
  },
  sendIcon: {
    width: '18px',
    height: '18px'
  }
};
