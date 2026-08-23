import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_DATABASE } from '../products/productData';

/* ─── Inline SVG Icon Library ─────────────────────────────────────── */
const Icon = ({ name, size = 14, color = 'currentColor', style = {} }) => {
  const paths = {
    search:    <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    location:  <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    phone:     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.07 3.38 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>,
    clock:     <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    chat:      <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    back:      <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    menu:      <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    mail:      <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    map:       <><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></>,
    tool:      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
    plug:      <><path d="M18 6L6 18"/><path d="M7 17l-5 5"/><path d="M17 7l5-5"/><rect x="10" y="3" width="4" height="6" rx="1"/><rect x="10" y="15" width="4" height="6" rx="1"/></>,
    users:     <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    filetext:  <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
    settings:  <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    check:     <><polyline points="20 6 9 17 4 12"/></>,
    send:      <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    close:     <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    msgcircle: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    external:  <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    product:   <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
    award:     <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    >
      {paths[name]}
    </svg>
  );
};

/* ─── Option button icon map ────────────────────────────────────────── */
const OPTION_ICON = {
  browse_products:    'search',
  location_info:      'location',
  contact_info:       'phone',
  hours_info:         'clock',
  faq_info:           'chat',
  main_menu:          'menu',
  contact_form:       'mail',
  whatsapp_chat:      'phone',
  view_map:           'map',
  cat_4axis:          'product',
  cat_5axis:          'product',
  cat_fixtures:       'tool',
  cat_access:         'plug',
  go_5axis_page:      'external',
  go_fixtures_page:   'external',
  go_accessories_page:'external',
  faq_detron:         'users',
  faq_quote:          'filetext',
  faq_service:        'settings',
};

export default function AxisChatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setMessages([{
      id: 1,
      sender: 'bot',
      text: "Welcome to **Axis Engineering Solutions**. I am **Axis**, your dedicated support assistant.\n\nHow may I assist you today?",
      options: [
        { label: 'Search / Browse Products',   value: 'browse_products' },
        { label: 'Office Location & Address',   value: 'location_info' },
        { label: 'Contact Information',         value: 'contact_info' },
        { label: 'Business Hours',             value: 'hours_info' },
        { label: 'FAQs & Support Services',    value: 'faq_info' },
      ]
    }]);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleOptionClick = (value, labelText) => {
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: labelText }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let bot = { id: Date.now() + 1, sender: 'bot' };

      switch (value) {
        case 'main_menu':
          bot.text = "Main Menu — please select a category below or type your query directly.";
          bot.options = [
            { label: 'Search / Browse Products',  value: 'browse_products' },
            { label: 'Office Location & Address',  value: 'location_info' },
            { label: 'Contact Information',        value: 'contact_info' },
            { label: 'Business Hours',            value: 'hours_info' },
            { label: 'FAQs & Support Services',   value: 'faq_info' },
          ];
          break;

        case 'browse_products':
          bot.text = "Please select a product category to explore, or type a model reference (e.g. GXA-170S, RCX, Direct Drive) to search our catalogue.";
          bot.options = [
            { label: '4-Axis Rotary Tables',             value: 'cat_4axis' },
            { label: '5-Axis Tilting Rotary Tables',     value: 'cat_5axis' },
            { label: 'Custom Workholding Fixtures',      value: 'cat_fixtures' },
            { label: 'Intelligent Control & Accessories',value: 'cat_access' },
            { label: 'Return to Main Menu',              value: 'main_menu' },
          ];
          break;

        case 'cat_4axis':
          bot.text = "**4-Axis Detron Rotary Tables** — Engineered for high-accuracy CNC indexing. Select a model to view technical specifications:";
          bot.options = [
            { label: 'GXA-125S  |  Pneumatic 140 N.m',           value: 'prod_GXA-125S' },
            { label: 'GXA-170S / GXA-170H  |  300 / 450 N.m',   value: 'prod_GXA-170S / GXA-170H' },
            { label: 'GXA-210S / GXA-210H  |  400 / 600 N.m',   value: 'prod_GXA-210S / GXA-210H' },
            { label: 'GXA-255H  |  Ultra Bore, 900 N.m',         value: 'prod_GXA-255H' },
            { label: 'RCX-170S  |  Roller Gear Cam, Zero Backlash', value: 'prod_RCX-170S / RCX-170H' },
            { label: 'DV-170P  |  Direct Drive, 250 RPM',        value: 'prod_DV-170P' },
            { label: 'Return to Categories',                      value: 'browse_products' },
          ];
          break;

        case 'cat_5axis':
          bot.text = "**5-Axis Detron Tilting Rotary Tables** — Designed for simultaneous multi-face and compound-angle machining operations.";
          bot.options = [
            { label: 'GXA-170S-2W  |  Dual Spindle, 250mm Pitch', value: 'prod_GXA-170S-2W-250' },
            { label: 'Browse Full 5-Axis Catalogue',               value: 'go_5axis_page' },
            { label: 'Return to Categories',                       value: 'browse_products' },
          ];
          break;

        case 'cat_fixtures':
          bot.text = "**Custom Workholding Fixtures** — Bespoke hydraulic and pneumatic clamping fixtures engineered to your component specifications at our Chennai manufacturing facility.";
          bot.options = [
            { label: 'View Fixtures Catalogue', value: 'go_fixtures_page' },
            { label: 'Return to Categories',    value: 'browse_products' },
          ];
          break;

        case 'cat_access':
          bot.text = "**Intelligent Control Systems & Accessories** — Genuine Detron control interfaces, auto pallet changers, rotary joints, and certified spare parts.";
          bot.options = [
            { label: 'View Accessories Catalogue', value: 'go_accessories_page' },
            { label: 'Return to Categories',       value: 'browse_products' },
          ];
          break;

        case 'go_5axis_page':       setIsOpen(false); navigate('/products/detron/5-axis');    return;
        case 'go_fixtures_page':    setIsOpen(false); navigate('/products/fixtures');          return;
        case 'go_accessories_page': setIsOpen(false); navigate('/products/detron/accessories'); return;
        case 'whatsapp_chat':
          window.open('https://wa.me/919003224117', '_blank');
          return;
        case 'contact_form':        setIsOpen(false); navigate('/contact');                    return;
        case 'view_map':
          window.open('https://maps.app.goo.gl/4hB7DMjNiiiabTDWA', '_blank');
          return;

        case 'location_info':
          bot.text = "**Principal Office & Design Facility**\n\nAxis Engineering Solutions\nNo. 78-B, 1st Floor, Geason Housing Colony,\nAyanambakkam, Chennai — 600095,\nTamil Nadu, India.";
          bot.options = [
            { label: 'Open in Google Maps', value: 'view_map' },
            { label: 'Return to Main Menu', value: 'main_menu' },
          ];
          break;

        case 'contact_info':
          bot.text = "**Sales & Technical Support Channels**\n\nMobile:   +91 98849 12279  |  +91 98849 12280\nTel / Fax:  044 – 4746 8749\nEmail:    info@axisengineeringsolutions.in\nWhatsApp:  +91 90032 24117  (wa.me/919003224117)\n\nOur team responds to all technical inquiries within 24 business hours.";
          bot.options = [
            { label: 'Chat on WhatsApp',        value: 'whatsapp_chat' },
            { label: 'Submit an Inquiry Form',   value: 'contact_form' },
            { label: 'Return to Main Menu',      value: 'main_menu' },
          ];
          break;

        case 'hours_info':
          bot.text = "**Business Operating Hours**\n\nMonday – Saturday:   9:00 AM – 6:30 PM (IST)\nSunday:   Closed\n\nFor urgent technical support, please contact us via email.";
          bot.options = [{ label: 'Return to Main Menu', value: 'main_menu' }];
          break;

        case 'faq_info':
          bot.text = "**Frequently Asked Questions** — Please select a topic:";
          bot.options = [
            { label: 'About our Detron Partnership',    value: 'faq_detron' },
            { label: 'Requesting a Price Quotation',    value: 'faq_quote' },
            { label: 'Service, Warranty & Installation', value: 'faq_service' },
            { label: 'Return to Main Menu',             value: 'main_menu' },
          ];
          break;

        case 'faq_detron':
          bot.text = "**Detron Machinery — Global Alliance**\n\nAxis Engineering Solutions is the **Authorised Distributor & Technical Integration Partner of Detron Machinery Co., Ltd. (Taiwan)** — the world's largest professional NC Rotary Table manufacturer.\n\nDetron products are designed by an international R&D team and manufactured entirely in-house under strict quality control standards.";
          bot.options = [
            { label: 'Browse Detron Product Range', value: 'browse_products' },
            { label: 'Return to FAQs',             value: 'faq_info' },
          ];
          break;

        case 'faq_quote':
          bot.text = "**Requesting a Technical Quotation**\n\nTo receive an accurate price quotation, kindly provide the following details via our inquiry form:\n\n• CNC machine controller interface (e.g. FANUC, Mitsubishi, Siemens)\n• Required rotary table diameter & clamping specification\n• Application or workpiece details\n\nQuotations are issued within 24 business hours.";
          bot.options = [
            { label: 'Submit Inquiry Form', value: 'contact_form' },
            { label: 'Return to FAQs',      value: 'faq_info' },
          ];
          break;

        case 'faq_service':
          bot.text = "**Technical Service & After-Sales Support**\n\nOur Chennai-based engineering team — qualified in Mechanical, Electrical, Electronics, and Mechatronics — provides:\n\n• On-site commissioning and CNC integration\n• Genuine manufacturer warranty administration\n• Preventive maintenance scheduling\n• Pan-India field service deployment";
          bot.options = [
            { label: 'Contact Technical Support', value: 'contact_info' },
            { label: 'Return to FAQs',            value: 'faq_info' },
          ];
          break;

        default:
          if (value.startsWith('prod_')) {
            const modelName = value.replace('prod_', '');
            const product = findProductDetails(modelName);
            if (product) {
              const specLines = Object.entries(product.specs || {}).slice(0, 6).map(([k, v]) => `${k}: ${v}`).join('\n');
              bot.text = `**${product.name}**\n${product.badge || ''}\n\n${product.description}\n\n— Key Technical Specifications —\n${specLines}`;
              bot.options = [
                { label: 'View Full Specification Page', value: `goto_prod_${product.categoryKey}_${product.name}` },
                { label: 'Return to Categories',         value: 'browse_products' },
              ];
            } else {
              bot.text = `The model "${modelName}" was not located in our catalogue. Please browse the full product range below.`;
              bot.options = [{ label: 'Browse Products', value: 'browse_products' }];
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

      setMessages(prev => [...prev, bot]);
    }, 500);
  };

  const findProductDetails = (modelName) => {
    for (const [catKey, category] of Object.entries(PRODUCT_DATABASE)) {
      if (category.items) {
        for (const item of category.items) {
          if (item.products) {
            const found = item.products.find(p => p.name === modelName);
            if (found) return { ...found, categoryKey: catKey };
          }
        }
      }
    }
    return null;
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = processKeywordSearch(userText);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', ...response }]);
    }, 500);
  };

  const processKeywordSearch = (text) => {
    const q = text.toLowerCase().trim();

    // Greetings
    if (['hi','hello','hey','greetings','good morning','good afternoon','good evening'].some(g => q === g || q.startsWith(g))) {
      return {
        text: "Good day. I am **Axis**, the official digital support assistant for Axis Engineering Solutions. How may I assist you?",
        options: [
          { label: 'Search / Browse Products',  value: 'browse_products' },
          { label: 'Office Location & Address',  value: 'location_info' },
          { label: 'Contact Information',        value: 'contact_info' },
          { label: 'Business Hours',            value: 'hours_info' },
          { label: 'FAQs & Support Services',   value: 'faq_info' },
        ]
      };
    }

    // Gratitude
    if (q.includes('thank') || q.includes('thx') || ['ok','okay','great','perfect','awesome','noted','understood'].includes(q)) {
      return {
        text: "You are most welcome. It has been a pleasure assisting you. Should you require any further information regarding our products or services, please do not hesitate to reach out.",
        options: [
          { label: 'Browse Products', value: 'browse_products' },
          { label: 'Main Menu',       value: 'main_menu' },
        ]
      };
    }

    // Identity
    if (q.includes('who are you') || q.includes('your name') || q.includes('who is this') || q.includes('what are you') || q.includes('name')) {
      return {
        text: "I am **Axis** — the official digital support assistant for **Axis Engineering Solutions**, authorised distributor of Detron Machinery Co., Ltd. (Taiwan).\n\nI am here to assist you with product information, technical specifications, contact details, and more.",
        options: [
          { label: 'Browse Products', value: 'browse_products' },
          { label: 'Main Menu',       value: 'main_menu' },
        ]
      };
    }

    // Location
    if (['address','location','where','office','map','chennai','locate','directions'].some(k => q.includes(k))) {
      return {
        text: "**Principal Office & Design Facility**\n\nAxis Engineering Solutions\nNo. 78-B, 1st Floor, Geason Housing Colony,\nAyanambakkam, Chennai — 600095,\nTamil Nadu, India.",
        options: [
          { label: 'Open in Google Maps', value: 'view_map' },
          { label: 'Return to Main Menu', value: 'main_menu' },
        ]
      };
    }

    // Contact
    if (['phone','mobile','email','mail','contact','sales','call','number','reach','fax','tel'].some(k => q.includes(k))) {
      return {
        text: "**Sales & Technical Support Channels**\n\nMobile:   +91 98849 12279  |  +91 98849 12280\nTel / Fax:  044 – 4746 8749\nEmail:    info@axisengineeringsolutions.in\nWhatsApp:  +91 90032 24117  (wa.me/919003224117)\n\nAll inquiries are responded to within 24 business hours.",
        options: [
          { label: 'Chat on WhatsApp',       value: 'whatsapp_chat' },
          { label: 'Submit Inquiry Form',    value: 'contact_form' },
          { label: 'Return to Main Menu',    value: 'main_menu' },
        ]
      };
    }

    // Hours
    if (['hours','timing','open','close','saturday','sunday','working','schedule'].some(k => q.includes(k))) {
      return {
        text: "**Business Operating Hours**\n\nMonday – Saturday:   9:00 AM – 6:30 PM (IST)\nSunday:   Closed",
        options: [{ label: 'Return to Main Menu', value: 'main_menu' }]
      };
    }

    // Quote / Price
    if (['quote','price','pricing','cost','quotation','buy','purchase','order','rate'].some(k => q.includes(k))) {
      return {
        text: "**Requesting a Technical Quotation**\n\nTo issue an accurate price quotation, we require:\n• CNC controller interface (FANUC, Mitsubishi, Siemens, etc.)\n• Required table diameter and clamping torque\n• Intended application details\n\nPlease submit your requirements via our inquiry form or contact our sales team directly.",
        options: [
          { label: 'Submit Inquiry Form',   value: 'contact_form' },
          { label: 'Return to Main Menu',   value: 'main_menu' },
        ]
      };
    }

    // Detron / Partnership
    if (['detron','taiwan','partner','distributor','authorized','authorised','manufacturer'].some(k => q.includes(k))) {
      return {
        text: "**Global Partnership — Detron Machinery Co., Ltd.**\n\nAxis Engineering Solutions is the **Authorised Distributor & Technical Integration Partner** of Detron Machinery Co., Ltd. (Taiwan) — the world's foremost NC Rotary Table manufacturer.\n\nWe deliver complete sales, installation, and post-sales support across India.",
        options: [
          { label: 'Browse Detron Products', value: 'browse_products' },
          { label: 'Return to Main Menu',    value: 'main_menu' },
        ]
      };
    }

    // Service / Warranty
    if (['warranty','service','support','maintenance','installation','commissioning','repair','after-sales'].some(k => q.includes(k))) {
      return {
        text: "**Technical Service & After-Sales Support**\n\nOur qualified engineering team provides:\n• CNC machine integration and commissioning\n• Genuine manufacturer warranty support\n• Preventive and corrective maintenance\n• Pan-India on-site field service",
        options: [
          { label: 'Contact Technical Support', value: 'contact_info' },
          { label: 'Return to Main Menu',       value: 'main_menu' },
        ]
      };
    }

    // Fixtures
    if (['fixture','workholding','clamping','jig','hydraulic','pneumatic'].some(k => q.includes(k))) {
      return {
        text: "**Custom Workholding Fixtures**\n\nWe design and manufacture bespoke hydraulic and pneumatic clamping fixtures, tailored precisely to your component geometry and production requirements — engineered at our Chennai facility.",
        options: [
          { label: 'View Fixtures Catalogue', value: 'go_fixtures_page' },
          { label: 'Return to Main Menu',     value: 'main_menu' },
        ]
      };
    }

    // Product keyword search
    const foundProducts = [];
    const terms = q.split(/\s+/).filter(t => t.length > 1);
    for (const [catKey, category] of Object.entries(PRODUCT_DATABASE)) {
      if (!category.items) continue;
      for (const item of category.items) {
        if (!item.products) continue;
        for (const prod of item.products) {
          const corpus = `${prod.name} ${prod.description} ${prod.badge || ''}`.toLowerCase();
          const match = prod.name.toLowerCase().includes(q) || terms.every(t => corpus.includes(t));
          if (match) foundProducts.push({ ...prod, categoryKey: catKey });
        }
      }
    }

    if (foundProducts.length > 0) {
      return {
        text: `**${foundProducts.length} result${foundProducts.length > 1 ? 's' : ''}** found in our product catalogue for your query:`,
        products: foundProducts.slice(0, 4),
        options: [
          { label: 'Browse All Categories', value: 'browse_products' },
          { label: 'Return to Main Menu',   value: 'main_menu' },
        ]
      };
    }

    // Fallback
    return {
      text: "I was unable to locate information matching your query.\n\nAs your dedicated support assistant, I am equipped to help you with the following:\n\n• Product specifications and catalogue browsing\n• Office location and contact details\n• Business hours and operating schedule\n• Price quotation requests\n• Technical service and warranty support\n• Detron partnership information\n\nPlease refine your query or select one of the options below.",
      options: [
        { label: 'Browse Products',        value: 'browse_products' },
        { label: 'Office Location',        value: 'location_info' },
        { label: 'Contact Information',    value: 'contact_info' },
        { label: 'Return to Main Menu',    value: 'main_menu' },
      ]
    };
  };

  const formatText = (text) => {
    if (!text) return null;
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ fontWeight: 700, color: 'inherit' }}>{part.slice(2, -2)}</strong>;
      }
      return part.split('\n').map((line, li, arr) => (
        <span key={`${i}-${li}`}>{line}{li < arr.length - 1 && <br />}</span>
      ));
    });
  };

  return ReactDOM.createPortal(
    <>
      {/* ── Floating Trigger Button ─────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Axis Support Assistant"
        style={{ ...S.fab, ...(isOpen ? S.fabOpen : {}) }}
      >
        {isOpen
          ? <Icon name="close" size={20} color="#fff" />
          : <>
              <Icon name="msgcircle" size={22} color="#fff" />
              <span style={S.fabBadge} />
            </>
        }
      </button>

      {/* ── Chat Panel ──────────────────────────────────────────── */}
      {isOpen && (
        <div style={S.chatWindow}>

          {/* Header */}
          <div style={S.header}>
            <div style={S.headerAvatar}>
              <Icon name="award" size={18} color="#fff" />
            </div>
            <div style={S.headerMeta}>
              <p style={S.headerName}>Axis Support Assistant</p>
              <div style={S.headerStatus}>
                <span style={S.statusDot} />
                <span style={S.statusLabel}>Online — Axis Engineering Solutions</span>
              </div>
            </div>
            <button style={S.headerClose} onClick={() => setIsOpen(false)}>
              <Icon name="close" size={16} color="#94a3b8" />
            </button>
          </div>

          {/* Messages */}
          <div style={S.body}>
            {messages.map((msg) => (
              <div key={msg.id} style={S.msgWrapper}>
                <div style={{ ...S.bubble, ...(msg.sender === 'user' ? S.userBubble : S.botBubble) }}>
                  <p style={msg.sender === 'user' ? S.userText : S.botText}>
                    {formatText(msg.text)}
                  </p>

                  {/* Inline product result cards */}
                  {msg.products && msg.products.length > 0 && (
                    <div style={S.productList}>
                      {msg.products.map((p, idx) => (
                        <div key={idx} style={S.productItem}>
                          <div style={S.productItemHeader}>
                            <Icon name="product" size={12} color="#E30613" style={{ marginRight: 6 }} />
                            <span style={S.productName}>{p.name}</span>
                          </div>
                          {p.badge && <p style={S.productBadge}>{p.badge}</p>}
                          <p style={S.productDesc}>{p.description?.slice(0, 90)}...</p>
                          <button
                            style={S.productLink}
                            onClick={() => { setIsOpen(false); navigate(`/products/detron/${p.categoryKey || '4-axis'}/${p.name}`); }}
                          >
                            <Icon name="external" size={11} color="#E30613" style={{ marginRight: 4 }} />
                            View Full Specification
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Option pills */}
                {msg.sender === 'bot' && msg.options?.length > 0 && (
                  <div style={S.pills}>
                    {msg.options.map((opt, oi) => (
                      <button key={oi} style={S.pill} onClick={() => handleOptionClick(opt.value, opt.label)}>
                        <Icon
                          name={OPTION_ICON[opt.value] || 'menu'}
                          size={12}
                          color="#E30613"
                          style={{ marginRight: 6, flexShrink: 0 }}
                        />
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={S.msgWrapper}>
                <div style={{ ...S.bubble, ...S.botBubble }}>
                  <div style={S.typingDots}>
                    <span style={{ ...S.dot, animationDelay: '0ms' }} />
                    <span style={{ ...S.dot, animationDelay: '160ms' }} />
                    <span style={{ ...S.dot, animationDelay: '320ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={S.inputBar}>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Type your query here..."
              style={S.input}
            />
            <button type="submit" style={S.sendBtn} disabled={!inputValue.trim()}>
              <Icon name="send" size={15} color="#fff" />
            </button>
          </form>

          {/* Footer brand strip with WhatsApp */}
          <div style={S.footerStrip}>
            <div style={S.footerStripRow}>
              <Icon name="award" size={10} color="#94a3b8" style={{ marginRight: 5 }} />
              <span style={S.footerText}>Axis Engineering Solutions — Authorised Detron Partner</span>
            </div>
            <a
              href="https://wa.me/919003224117"
              target="_blank"
              rel="noopener noreferrer"
              style={S.whatsappBtn}
            >
              {/* WhatsApp SVG */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366" style={{ marginRight: 5, flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              WhatsApp: +91 90032 24117
            </a>
          </div>
        </div>
      )}

      {/* Typing animation keyframes injected globally */}
      <style>{`
        @keyframes axisTypingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes axisFabPulse {
          0% { box-shadow: 0 0 0 0 rgba(227,6,19,0.5); }
          70% { box-shadow: 0 0 0 10px rgba(227,6,19,0); }
          100% { box-shadow: 0 0 0 0 rgba(227,6,19,0); }
        }
      `}</style>
    </>,
    document.body
  );
}

/* ─── Styles ──────────────────────────────────────────────────────── */
const S = {
  fab: {
    position: 'fixed', bottom: 28, right: 28,
    width: 56, height: 56, borderRadius: '50%',
    backgroundColor: '#E30613', color: '#fff',
    border: 'none', cursor: 'pointer', zIndex: 99999,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(227,6,19,0.45)',
    transition: 'transform 0.25s ease, background-color 0.25s ease',
    animation: 'axisFabPulse 2.5s infinite',
    outline: 'none',
  },
  fabOpen: {
    backgroundColor: '#1e293b',
    animation: 'none',
    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
  },
  fabBadge: {
    position: 'absolute', top: 10, right: 10,
    width: 9, height: 9, borderRadius: '50%',
    backgroundColor: '#22c55e',
    border: '2px solid #E30613',
  },

  chatWindow: {
    position: 'fixed',
    bottom: '96px',
    right: '24px',
    top: '80px',
    width: '390px',
    maxHeight: 'calc(100vh - 120px)',
    maxWidth: 'calc(100vw - 56px)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    border: '1px solid #e2e8f0',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
    overflow: 'hidden',
    zIndex: 99999,
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif',
  },

  header: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '13px 16px',
    backgroundColor: '#0f172a',
    borderBottom: '3px solid #E30613',
    flexShrink: 0,
  },
  headerAvatar: {
    width: 38, height: 38, borderRadius: '50%',
    backgroundColor: '#E30613',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  headerMeta: { flexGrow: 1 },
  headerName: {
    margin: 0, fontSize: 13, fontWeight: 700,
    color: '#ffffff', letterSpacing: '0.2px',
  },
  headerStatus: { display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 },
  statusDot: {
    width: 7, height: 7, borderRadius: '50%',
    backgroundColor: '#22c55e', flexShrink: 0,
  },
  statusLabel: { fontSize: 10.5, color: '#94a3b8', letterSpacing: '0.1px' },
  headerClose: {
    background: 'none', border: 'none', cursor: 'pointer',
    padding: 5, display: 'flex', alignItems: 'center', flexShrink: 0,
  },

  body: {
    flexGrow: 1, overflowY: 'auto',
    padding: '18px 16px', backgroundColor: '#f8fafc',
    display: 'flex', flexDirection: 'column', gap: 14,
  },

  msgWrapper: { display: 'flex', flexDirection: 'column', gap: 8 },

  bubble: {
    maxWidth: '88%', borderRadius: 10,
    padding: '11px 14px', boxSizing: 'border-box',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderBottomLeftRadius: 2,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#E30613',
    borderBottomRightRadius: 2,
  },
  botText: {
    margin: 0, fontSize: 12.5, lineHeight: 1.65,
    color: '#1e293b', fontWeight: 400,
  },
  userText: {
    margin: 0, fontSize: 12.5, lineHeight: 1.65,
    color: '#ffffff', fontWeight: 500,
  },

  pills: { display: 'flex', flexWrap: 'wrap', gap: 7, paddingLeft: 2 },
  pill: {
    display: 'flex', alignItems: 'center',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderLeft: '3px solid #E30613',
    color: '#1e293b',
    padding: '6px 11px', borderRadius: 6,
    fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
    transition: 'all 0.15s ease', outline: 'none',
    letterSpacing: '0.1px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    textAlign: 'left',
  },

  productList: { display: 'flex', flexDirection: 'column', gap: 9, marginTop: 10 },
  productItem: {
    backgroundColor: '#f8fafc', border: '1px solid #e2e8f0',
    borderLeft: '3px solid #E30613',
    borderRadius: 7, padding: '9px 11px',
  },
  productItemHeader: { display: 'flex', alignItems: 'center', marginBottom: 2 },
  productName: { fontSize: 12.5, fontWeight: 700, color: '#0f172a' },
  productBadge: { fontSize: 10.5, color: '#E30613', fontWeight: 600, margin: '2px 0 4px' },
  productDesc: { fontSize: 11.5, color: '#475569', lineHeight: 1.5, margin: '0 0 6px' },
  productLink: {
    display: 'flex', alignItems: 'center',
    background: 'none', border: 'none',
    color: '#E30613', fontSize: 11, fontWeight: 700,
    cursor: 'pointer', padding: 0, letterSpacing: '0.1px',
  },

  typingDots: { display: 'flex', gap: 5, alignItems: 'center', padding: '2px 4px' },
  dot: {
    width: 7, height: 7, borderRadius: '50%',
    backgroundColor: '#cbd5e1',
    display: 'inline-block',
    animation: 'axisTypingBounce 1s ease infinite',
  },

  inputBar: {
    display: 'flex', alignItems: 'center', gap: 9,
    padding: '11px 14px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    flexShrink: 0,
  },
  input: {
    flexGrow: 1, backgroundColor: '#f1f5f9',
    border: '1px solid #cbd5e1', borderRadius: 7,
    padding: '9px 12px', fontSize: 12.5, color: '#0f172a',
    outline: 'none', fontFamily: 'inherit',
    letterSpacing: '0.1px',
  },
  sendBtn: {
    width: 36, height: 36, borderRadius: 7,
    backgroundColor: '#E30613', color: '#fff',
    border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'opacity 0.2s ease',
  },

  footerStrip: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 6, padding: '8px 14px',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e2e8f0',
    flexShrink: 0,
  },
  footerStripRow: {
    display: 'flex', alignItems: 'center',
  },
  footerText: {
    fontSize: 10, color: '#94a3b8',
    fontWeight: 500, letterSpacing: '0.2px',
  },
  whatsappBtn: {
    display: 'flex', alignItems: 'center',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: 6,
    padding: '5px 10px',
    fontSize: 11, fontWeight: 700,
    color: '#15803d', textDecoration: 'none',
    letterSpacing: '0.1px',
    transition: 'background-color 0.2s ease',
  },
};
