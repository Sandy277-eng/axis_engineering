import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCT_DATABASE } from './products/productData';

export default function Header({ activePage, scrollToProducts }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSeriesIndex, setActiveSeriesIndex] = useState(null);
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

  const PRODUCT_MENU_CATEGORIES = [
    {
      id: 'all',
      title: 'All Products',
      link: '/products/detron',
      hasArrow: true,
      series: [
        {
          name: '4 Axis Rotary Tables',
          link: '/products/detron/4-axis',
          products: [
            { name: 'GXA-125S', badge: 'Pneumatic 140 N.m', image: '/images/products_detron/4th_axis.png', categoryId: '4-axis' },
            { name: 'GXA-170S / GXA-170H', badge: 'Pneumatic 300 / Hydraulic 450 N.m', image: '/images/products_detron/4th_axis_pics/170mm/GXA-170S.jpg', categoryId: '4-axis' },
            { name: 'GXA-210S / GXA-210H', badge: 'Pneumatic 400 / Hydraulic 600 N.m', image: '/images/products_detron/4th_axis_pics/210mm/GXA-210S.jpg', categoryId: '4-axis' },
            { name: 'GXA-255S / GXA-255H', badge: 'Pneumatic 700 / Hydraulic 1000 N.m', image: '/images/products_detron/4th_axis_pics/255mm/GXA-255S.jpg', categoryId: '4-axis' },
            { name: 'GXA-320S / GXA-320H', badge: 'Pneumatic 1100 / Hydraulic 1500 N.m', image: '/images/products_detron/4th_axis_pics/320mm/GXA-320S.jpg', categoryId: '4-axis' },
            { name: 'GXA-400H', badge: 'Hydraulic 3000 N.m (Ø180 Thru)', image: '/images/products_detron/4th_axis_pics/400-500/GXA400H.jpg', categoryId: '4-axis' }
          ]
        },
        {
          name: '5 Axis Tilt Rotary Tables',
          link: '/products/detron/5-axis',
          products: [
            { name: 'GXA-170T', badge: 'Ø170mm Tilting 5-Axis', image: '/images/products_detron/5th_axis_pics/170mm/GXA-170T.jpg', categoryId: '5-axis' },
            { name: 'GXA-210T', badge: 'Ø210mm Tilting 5-Axis', image: '/images/products_detron/5th_axis_pics/210mm/GXA-210T.jpg', categoryId: '5-axis' },
            { name: 'GTF-170', badge: 'High Rigidity 5th Axis', image: '/images/products_detron/5th_axis_pics/170mm/GTF-170.jpg', categoryId: '5-axis' },
            { name: 'GTF-210', badge: 'High Rigidity 5th Axis', image: '/images/products_detron/5th_axis_pics/210mm/GTF-210.jpg', categoryId: '5-axis' },
            { name: 'DVA-170', badge: 'Direct Drive DDR 5-Axis', image: '/images/products_detron/5th_axis_pics/170mm/DVA-170.jpg', categoryId: '5-axis' }
          ]
        },
        {
          name: 'Auto Pallet Changers (APC)',
          link: '/products/detron/auto-pallet-changer',
          products: [
            { name: 'AP-400', badge: 'Dual Pallet 400mm Table', image: '/images/products_detron/Auto-Pallet-changer.png', categoryId: 'auto-pallet-changer' },
            { name: 'AP-500', badge: 'Dual Pallet 500mm Table', image: '/images/products_detron/Auto-Pallet-changer.png', categoryId: 'auto-pallet-changer' },
            { name: 'APC-630', badge: 'Heavy Hydraulic APC 630mm', image: '/images/products_detron/Auto-Pallet-changer.png', categoryId: 'auto-pallet-changer' },
            { name: 'APC-800', badge: 'Heavy Hydraulic APC 800mm', image: '/images/products_detron/Auto-Pallet-changer.png', categoryId: 'auto-pallet-changer' }
          ]
        },
        {
          name: 'Supporting Accessories',
          link: '/products/detron/accessories',
          products: [
            { name: 'Manual Tailstock TS-125 / TS-170', badge: 'Precision Tailstock', image: '/images/products_detron/accessories/Tailstock.jpg', categoryId: 'accessories' },
            { name: 'Pneumatic Tailstock PTS-210 / PTS-255', badge: 'Pneumatic Clamping', image: '/images/products_detron/accessories/Tailstock.jpg', categoryId: 'accessories' },
            { name: 'Rotary Joints (2/4/6/8 Port)', badge: 'Hydraulic / Pneumatic', image: '/images/products_detron/accessories/Bridge-Unit.jpg', categoryId: 'accessories' },
            { name: 'Air-over-Oil Booster Unit ABR-50', badge: 'Pressure Intensifier', image: '/images/products_detron/accessories/Air-booster-Unit-ABR-50.jpg', categoryId: 'accessories' }
          ]
        },
        {
          name: 'Intelligent Control Systems',
          link: '/products/detron/intelligent-control',
          products: [
            { name: 'SAC-10 Single Axis Controller', badge: 'Standalone LCD Unit', image: '/images/products_detron/Inteligent_control/detron_sac_pro_single_axis_controller.jpg', categoryId: 'intelligent-control' },
            { name: 'MAC-200 Dual Axis Synchronizer', badge: 'Multi-Axis Sync', image: '/images/products_detron/Inteligent_control/Detron_i4.0-RT_intellegent_data_box.jpg', categoryId: 'intelligent-control' },
            { name: 'Detron i4.0-RT Data Box', badge: 'Industry 4.0 Module', image: '/images/products_detron/Inteligent_control/Detron_i4.0-RT_intellegent_data_box.jpg', categoryId: 'intelligent-control' }
          ]
        },
        {
          name: 'Special Applications & DDR',
          link: '/products/detron/special-application',
          products: [
            { name: 'Turnkey DDR Direct Drive Systems', badge: 'Zero Backlash DDR', image: '/images/products_detron/Special-Application.png', categoryId: 'special-application' },
            { name: 'Multi-Spindle Custom 4-Axis', badge: 'Production Solutions', image: '/images/products_detron/Special-Application.png', categoryId: 'special-application' },
            { name: 'Custom Tilting Trunnion Tables', badge: 'Heavy 5-Axis Solutions', image: '/images/products_detron/Special-Application.png', categoryId: 'special-application' }
          ]
        }
      ]
    },
    {
      id: '4-axis',
      title: '4 Axis',
      link: '/products/detron/4-axis',
      hasArrow: true,
      series: [
        {
          name: 'GXA-S Series (Pneumatic)',
          link: '/products/detron/4-axis',
          products: [
            { name: 'GXA-125S', badge: 'Pneumatic 140 N.m', image: '/images/products_detron/4th_axis.png', categoryId: '4-axis' },
            { name: 'GXA-170S', badge: 'Pneumatic 300 N.m', image: '/images/products_detron/4th_axis_pics/170mm/GXA-170S.jpg', categoryId: '4-axis' },
            { name: 'GXA-210S', badge: 'Pneumatic 400 N.m', image: '/images/products_detron/4th_axis_pics/210mm/GXA-210S.jpg', categoryId: '4-axis' },
            { name: 'GXA-255S', badge: 'Pneumatic 700 N.m', image: '/images/products_detron/4th_axis_pics/255mm/GXA-255S.jpg', categoryId: '4-axis' },
            { name: 'GXA-320S', badge: 'Pneumatic 1100 N.m', image: '/images/products_detron/4th_axis_pics/320mm/GXA-320S.jpg', categoryId: '4-axis' },
            { name: 'GXA-400S', badge: 'Pneumatic 1800 N.m', image: '/images/products_detron/4th_axis_pics/400-500/GXA400H.jpg', categoryId: '4-axis' }
          ]
        },
        {
          name: 'GXA-H / GX-H (Hydraulic)',
          link: '/products/detron/4-axis',
          products: [
            { name: 'GXA-170H', badge: 'Hydraulic 450 N.m', image: '/images/products_detron/4th_axis_pics/170mm/GXA-170S.jpg', categoryId: '4-axis' },
            { name: 'GXA-210H', badge: 'Hydraulic 600 N.m', image: '/images/products_detron/4th_axis_pics/210mm/GXA-210S.jpg', categoryId: '4-axis' },
            { name: 'GXA-255H', badge: 'Hydraulic 1000 N.m', image: '/images/products_detron/4th_axis_pics/255mm/GXA-255S.jpg', categoryId: '4-axis' },
            { name: 'GXA-320H', badge: 'Hydraulic 1500 N.m', image: '/images/products_detron/4th_axis_pics/320mm/GXA-320S.jpg', categoryId: '4-axis' },
            { name: 'GXA-400H', badge: 'Hydraulic 3000 N.m', image: '/images/products_detron/4th_axis_pics/400-500/GXA400H.jpg', categoryId: '4-axis' },
            { name: 'GXA-500HII', badge: 'Hydraulic 3600 N.m', image: '/images/products_detron/4th_axis_pics/400-500/GX-500H.jpg', categoryId: '4-axis' },
            { name: 'GX-630H', badge: 'Hydraulic 6000 N.m', image: '/images/products_detron/4th_axis_pics/630-800/GX-630H.jpg', categoryId: '4-axis' },
            { name: 'GX-800H', badge: 'Hydraulic 8000 N.m', image: '/images/products_detron/4th_axis_pics/630-800/GX-800H.jpg', categoryId: '4-axis' }
          ]
        },
        {
          name: 'GXA-2W Series (Dual Spindle)',
          link: '/products/detron/4-axis',
          products: [
            { name: 'GXA-170S-2W-250', badge: 'Dual Spindle (250mm Pitch)', image: '/images/products_detron/4th_axis_pics/GXA-170S-2W-250.png', categoryId: '4-axis' },
            { name: 'GXA-210S-2W-300', badge: 'Dual Spindle (300mm Pitch)', image: '/images/products_detron/4th_axis_pics/GXA-170S-2W-250.png', categoryId: '4-axis' },
            { name: 'GXA-255S-2W-350', badge: 'Dual Spindle (350mm Pitch)', image: '/images/products_detron/4th_axis_pics/GXA-170S-2W-250.png', categoryId: '4-axis' },
            { name: 'GXA-320S-2W-400', badge: 'Dual Spindle (400mm Pitch)', image: '/images/products_detron/4th_axis_pics/GXA-170S-2W-250.png', categoryId: '4-axis' }
          ]
        },
        {
          name: 'GXA-L Series (Left Motor Mount)',
          link: '/products/detron/4-axis',
          products: [
            { name: 'GXA-170SL / GXA-170HL', badge: 'Left-Hand Motor Mount', image: '/images/products_detron/4th_axis_pics/170mm/GXA170SL.jpg', categoryId: '4-axis' },
            { name: 'GVA-210SL / GVA-210HL', badge: 'Left-Hand Motor Mount', image: '/images/products_detron/4th_axis_pics/210mm/GVA-210SL.jpg', categoryId: '4-axis' },
            { name: 'GVA-255SL / GVA-255HL', badge: 'Left-Hand Motor Mount', image: '/images/products_detron/4th_axis_pics/255mm/GVA-255SL.jpg', categoryId: '4-axis' },
            { name: 'GXA-320SL / GXA-320HL', badge: 'Left-Hand Motor Mount', image: '/images/products_detron/4th_axis_pics/320mm/GXA-320SL.jpg', categoryId: '4-axis' },
            { name: 'GXA-400HL / GXA-500HIIL', badge: 'Left-Hand Motor Mount', image: '/images/products_detron/4th_axis_pics/400-500/GXA400H.jpg', categoryId: '4-axis' }
          ]
        },
        {
          name: 'RCX / RCF Series (Rear Motor)',
          link: '/products/detron/4-axis',
          products: [
            { name: 'RCX-210S / RCX-210H', badge: 'Rear Motor Compact', image: '/images/products_detron/4th_axis_pics/210mm/GXA-210S.jpg', categoryId: '4-axis' },
            { name: 'RCX-255S / RCX-255H', badge: 'Rear Motor Compact', image: '/images/products_detron/4th_axis_pics/255mm/GXA-255S.jpg', categoryId: '4-axis' },
            { name: 'RCX-320S / RCX-320H', badge: 'Rear Motor Compact', image: '/images/products_detron/4th_axis_pics/320mm/GXA-320S.jpg', categoryId: '4-axis' },
            { name: 'RCF-210S / RCF-210H', badge: 'Rear Motor Flanged', image: '/images/products_detron/4th_axis_pics/210mm/GXA-210S.jpg', categoryId: '4-axis' },
            { name: 'RCF-255S / RCF-255H', badge: 'Rear Motor Flanged', image: '/images/products_detron/4th_axis_pics/255mm/GXA-255S.jpg', categoryId: '4-axis' }
          ]
        },
        {
          name: 'GVA-B Series (Backside Motor)',
          link: '/products/detron/4-axis',
          products: [
            { name: 'GV-170SB', badge: 'Backside Motor (250 N.m)', image: '/images/products_detron/4th_axis_pics/170mm/GV-170SB.jpg', categoryId: '4-axis' },
            { name: 'GVA-210SB', badge: 'Backside Motor (400 N.m)', image: '/images/products_detron/4th_axis_pics/210mm/GVA210SB.jpg', categoryId: '4-axis' },
            { name: 'GVA-255SB', badge: 'Backside Motor (700 N.m)', image: '/images/products_detron/4th_axis_pics/255mm/GVA-255SB.jpg', categoryId: '4-axis' },
            { name: 'GV-320SB', badge: 'Backside Motor (1100 N.m)', image: '/images/products_detron/4th_axis_pics/320mm/GVA-320SB.jpg', categoryId: '4-axis' }
          ]
        },
        {
          name: 'DV Series (Direct Drive DDR)',
          link: '/products/detron/4-axis',
          products: [
            { name: 'DV-170P', badge: 'Direct Drive (250 RPM)', image: '/images/products_detron/4th_axis_pics/170mm/Dv170p.jpg', categoryId: '4-axis' },
            { name: 'DV-210P', badge: 'Direct Drive (250 RPM)', image: '/images/products_detron/4th_axis_pics/210mm/DV-210P.jpg', categoryId: '4-axis' },
            { name: 'DV-255P', badge: 'Direct Drive (200 RPM)', image: '/images/products_detron/4th_axis_pics/255mm/DV-255P.jpg', categoryId: '4-axis' }
          ]
        }
      ]
    },
    {
      id: '5-axis',
      title: '5 Axis',
      link: '/products/detron/5-axis',
      hasArrow: true,
      series: [
        {
          name: 'GXA-T Series (Dual Axis Tilting)',
          link: '/products/detron/5-axis',
          products: [
            { name: 'GXA-170T', badge: 'Ø170mm Dual-Axis 5-Axis', image: '/images/products_detron/5th_axis_pics/170mm/GXA-170T.jpg', categoryId: '5-axis' },
            { name: 'GXA-210T', badge: 'Ø210mm Dual-Axis 5-Axis', image: '/images/products_detron/5th_axis_pics/210mm/GXA-210T.jpg', categoryId: '5-axis' },
            { name: 'GXA-255T', badge: 'Ø255mm Dual-Axis 5-Axis', image: '/images/products_detron/5th_axis_pics/255mm/GXA-255T.jpg', categoryId: '5-axis' },
            { name: 'GXA-320T', badge: 'Ø320mm Dual-Axis 5-Axis', image: '/images/products_detron/5th_axis_pics/320mm/GXA-320T.jpg', categoryId: '5-axis' }
          ]
        },
        {
          name: 'GTF Series (Heavy-Rigidity 5-Axis)',
          link: '/products/detron/5-axis',
          products: [
            { name: 'GTF-170', badge: 'High Rigidity 5th Axis', image: '/images/products_detron/5th_axis_pics/170mm/GTF-170.jpg', categoryId: '5-axis' },
            { name: 'GTF-210', badge: 'High Rigidity 5th Axis', image: '/images/products_detron/5th_axis_pics/210mm/GTF-210.jpg', categoryId: '5-axis' },
            { name: 'GTF-255', badge: 'High Rigidity 5th Axis', image: '/images/products_detron/5th_axis_pics/255mm/GTF-255.jpg', categoryId: '5-axis' },
            { name: 'GTF-320', badge: 'High Rigidity 5th Axis', image: '/images/products_detron/5th_axis_pics/320mm/GTF-320.jpg', categoryId: '5-axis' }
          ]
        },
        {
          name: 'GTFA Multi-Spindle Series',
          link: '/products/detron/5-axis',
          products: [
            { name: 'GTFA-170-2W', badge: '2-Spindle 5-Axis Indexer', image: '/images/products_detron/5th_axis_pics/GFA_contact_type_multispindle/GFA-170S-2W.jpg', categoryId: '5-axis' },
            { name: 'GTFA-210-2W', badge: '2-Spindle 5-Axis Indexer', image: '/images/products_detron/5th_axis_pics/GFA_contact_type_multispindle/GFA-210S-2W.jpg', categoryId: '5-axis' }
          ]
        },
        {
          name: 'DVA Series (Direct Drive 5-Axis)',
          link: '/products/detron/5-axis',
          products: [
            { name: 'DVA-170', badge: 'Direct Drive DDR 5-Axis', image: '/images/products_detron/5th_axis_pics/170mm/DVA-170.jpg', categoryId: '5-axis' },
            { name: 'DVA-210', badge: 'Direct Drive DDR 5-Axis', image: '/images/products_detron/5th_axis_pics/210mm/DVA-210.jpg', categoryId: '5-axis' }
          ]
        },
        {
          name: 'RCX-T / RCF-T / RCTFE Series',
          link: '/products/detron/5-axis',
          products: [
            { name: 'RCX-210T', badge: 'Rear Motor Tilting 5-Axis', image: '/images/products_detron/5th_axis_pics/210mm/RCX-210T.jpg', categoryId: '5-axis' },
            { name: 'RCX-255T', badge: 'Rear Motor Tilting 5-Axis', image: '/images/products_detron/5th_axis_pics/255mm/RCX-255T.jpg', categoryId: '5-axis' },
            { name: 'RCTFE-170', badge: 'Compact Multi-Axis Tilt', image: '/images/products_detron/5th_axis_pics/RXCFE/RCTFE-170.jpg', categoryId: '5-axis' }
          ]
        }
      ]
    },
    {
      id: 'auto-pallet-changer',
      title: 'Auto Pallet Changer',
      link: '/products/detron/auto-pallet-changer',
      hasArrow: true,
      series: [
        {
          name: 'Dual Pallet APC Series',
          link: '/products/detron/auto-pallet-changer',
          products: [
            { name: 'AP-400', badge: 'Dual Pallet 400mm Table', image: '/images/products_detron/Auto-Pallet-changer.png', categoryId: 'auto-pallet-changer' },
            { name: 'AP-500', badge: 'Dual Pallet 500mm Table', image: '/images/products_detron/Auto-Pallet-changer.png', categoryId: 'auto-pallet-changer' }
          ]
        },
        {
          name: 'Hydraulic Turnkey APC',
          link: '/products/detron/auto-pallet-changer',
          products: [
            { name: 'APC-630', badge: 'Heavy Hydraulic APC 630mm', image: '/images/products_detron/Auto-Pallet-changer.png', categoryId: 'auto-pallet-changer' },
            { name: 'APC-800', badge: 'Heavy Hydraulic APC 800mm', image: '/images/products_detron/Auto-Pallet-changer.png', categoryId: 'auto-pallet-changer' }
          ]
        },
        {
          name: 'Fast-Cycle Pallet Changers',
          link: '/products/detron/auto-pallet-changer',
          products: [
            { name: 'Fast-Cycle 2-Pallet System', badge: 'Ultra Fast Indexing Cycle', image: '/images/products_detron/Auto-Pallet-changer.png', categoryId: 'auto-pallet-changer' },
            { name: 'Turnkey VMC Automation Cell', badge: 'Complete Robot / APC Setup', image: '/images/products_detron/Auto-Pallet-changer.png', categoryId: 'auto-pallet-changer' }
          ]
        }
      ]
    },
    {
      id: 'accessories',
      title: 'Accessories',
      link: '/products/detron/accessories',
      hasArrow: true,
      series: [
        {
          name: 'Pneumatic & Hydraulic Tailstocks',
          link: '/products/detron/accessories',
          products: [
            { name: 'Manual Tailstock TS-125 / TS-170', badge: 'Precision Manual Tailstock', image: '/images/products_detron/accessories/Tailstock.jpg', categoryId: 'accessories' },
            { name: 'Pneumatic Tailstock PTS-210 / PTS-255', badge: 'Pneumatic Clamping Tailstock', image: '/images/products_detron/accessories/Tailstock.jpg', categoryId: 'accessories' },
            { name: 'Hydraulic Tailstock HTS-320 / HTS-400', badge: 'Hydraulic Heavy Tailstock', image: '/images/products_detron/accessories/Tailstock.jpg', categoryId: 'accessories' }
          ]
        },
        {
          name: 'Rotary Joints & Distributing Rings',
          link: '/products/detron/accessories',
          products: [
            { name: '2-Port / 4-Port Rotary Joint', badge: 'High Pressure Hydraulic/Air', image: '/images/products_detron/accessories/Bridge-Unit.jpg', categoryId: 'accessories' },
            { name: '6-Port / 8-Port Distributing Ring', badge: 'Multi-Circuit Distributing', image: '/images/products_detron/accessories/Bridge-Unit.jpg', categoryId: 'accessories' }
          ]
        },
        {
          name: 'Support Tables & Center Rests',
          link: '/products/detron/accessories',
          products: [
            { name: 'Rotary Support Table ST-210 / ST-255', badge: 'Heavy Support Table', image: '/images/products_detron/accessories/Bridge-Unit.jpg', categoryId: 'accessories' },
            { name: 'Hydraulic Brake Support ST-320H', badge: 'Hydraulic Clamped Support', image: '/images/products_detron/accessories/Bridge-Unit.jpg', categoryId: 'accessories' }
          ]
        },
        {
          name: 'Booster Cylinders & Chucks',
          link: '/products/detron/accessories',
          products: [
            { name: 'Air-over-Oil Booster Unit ABR-50', badge: 'Pressure Intensifier', image: '/images/products_detron/accessories/Air-booster-Unit-ABR-50.jpg', categoryId: 'accessories' },
            { name: 'High Precision Scroll Chuck', badge: 'Manual & Hydraulic Chuck', image: '/images/products_detron/accessories/Chuck.jpg', categoryId: 'accessories' }
          ]
        }
      ]
    },
    {
      id: 'intelligent-control',
      title: 'Smart',
      link: '/products/detron/intelligent-control',
      hasArrow: true,
      series: [
        {
          name: 'SAC Single Axis Controllers',
          link: '/products/detron/intelligent-control',
          products: [
            { name: 'SAC-10 Single Axis Controller', badge: 'LCD Screen Standalone Controller', image: '/images/products_detron/Inteligent_control/detron_sac_pro_single_axis_controller.jpg', categoryId: 'intelligent-control' },
            { name: 'SAC-20 High-Speed Indexer', badge: 'Program Memory M-Code Control', image: '/images/products_detron/Inteligent_control/detron_sac_pro_single_axis_controller.jpg', categoryId: 'intelligent-control' }
          ]
        },
        {
          name: 'MAC Multi Axis Controllers',
          link: '/products/detron/intelligent-control',
          products: [
            { name: 'MAC-200 Dual Axis Synchronizer', badge: 'Simultaneous 4th/5th Axis Sync', image: '/images/products_detron/Inteligent_control/Detron_i4.0-RT_intellegent_data_box.jpg', categoryId: 'intelligent-control' },
            { name: 'Detron i4.0-RT Data Box', badge: 'Industry 4.0 Intelligent Hub', image: '/images/products_detron/Inteligent_control/Detron_i4.0-RT_intellegent_data_box.jpg', categoryId: 'intelligent-control' }
          ]
        },
        {
          name: 'Operator Pendants & Handwheels',
          link: '/products/detron/intelligent-control',
          products: [
            { name: 'Detron MPG Handwheel Pendant', badge: 'Manual Pulse Generator', image: '/images/products_detron/Inteligent_control/detron_sac_pro_single_axis_controller.jpg', categoryId: 'intelligent-control' },
            { name: 'CNC Wire Harness & Interface Kit', badge: 'Plug & Play Integration', image: '/images/products_detron/Inteligent_control/Detron_i4.0-RT_intellegent_data_box.jpg', categoryId: 'intelligent-control' }
          ]
        }
      ]
    },
    {
      id: 'special-application',
      title: 'Special Applications',
      link: '/products/detron/special-application',
      hasArrow: true,
      series: [
        {
          name: 'Turnkey DDR Integration',
          link: '/products/detron/special-application',
          products: [
            { name: 'Direct-Drive Large Turnkey Table', badge: 'Zero Backlash DDR Solution', image: '/images/products_detron/Special-Application.png', categoryId: 'special-application' },
            { name: 'High-Speed DDR Indexer', badge: '500+ RPM Spindle Indexing', image: '/images/products_detron/Special-Application.png', categoryId: 'special-application' }
          ]
        },
        {
          name: 'Multi-Axis CNC Solutions',
          link: '/products/detron/special-application',
          products: [
            { name: 'Multi-Spindle 4-Axis Fixture System', badge: 'Production Machining Solution', image: '/images/products_detron/Special-Application.png', categoryId: 'special-application' },
            { name: 'Custom Tilting Trunnion Table', badge: 'Heavy 5-Axis Fixture System', image: '/images/products_detron/Special-Application.png', categoryId: 'special-application' }
          ]
        },
        {
          name: 'Custom Hydraulic Fixtures',
          link: '/products/detron/special-application',
          products: [
            { name: 'GFA-H BT-40/50 Fixture Interface', badge: 'BT Interface Clamping', image: '/images/products_detron/special_application/GFA-H-with-BT-4050-fixture-interface.jpg', categoryId: 'special-application' },
            { name: 'Automated Hydraulic Clamping Fixture', badge: 'Turnkey Auto Clamping', image: '/images/products_detron/Special-Application.png', categoryId: 'special-application' }
          ]
        }
      ]
    }
  ];

  const selectedCategoryData = activeCategory ? PRODUCT_MENU_CATEGORIES.find(c => c.id === activeCategory) : null;
  const activeSeriesList = selectedCategoryData?.series || [];
  const selectedSeriesData = (activeSeriesIndex !== null && activeSeriesList[activeSeriesIndex]) ? activeSeriesList[activeSeriesIndex] : null;
  const activeProductList = selectedSeriesData?.products || [];

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
              {/* HOME — triggers intro splash */}
              <span
                role="button"
                tabIndex={0}
                style={{ ...styles.navLink, cursor: 'pointer' }}
                onMouseEnter={() => setShowMegaMenu(false)}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('showAxisSplash'));
                  navigate('/');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    window.dispatchEvent(new CustomEvent('showAxisSplash'));
                    navigate('/');
                  }
                }}
              >
                HOME
              </span>
              <button 
                onClick={scrollToProducts} 
                style={styles.navLinkBtn}
                onMouseEnter={() => setShowMegaMenu(false)}
              >
                DISCOVER AXIS
              </button>
            </>
          ) : (
            <span
              role="button"
              tabIndex={0}
              style={{ ...styles.navLink, cursor: 'pointer' }}
              onMouseEnter={() => setShowMegaMenu(false)}
              onClick={() => {
                window.dispatchEvent(new CustomEvent('showAxisSplash'));
                navigate('/');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  window.dispatchEvent(new CustomEvent('showAxisSplash'));
                  navigate('/');
                }
              }}
            >
              HOME
            </span>
          )}

          {/* PRODUCT RANGE WITH CASCADING MULTI-LEVEL DROPDOWN */}
          <div
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <Link 
              to="/products/detron" 
              onClick={() => setShowMegaMenu(prev => !prev)}
              style={showMegaMenu ? styles.navLinkOpenTab : (activePage === 'detron' ? styles.navLinkActive : styles.navLink)}
            >
              {activePage === 'home' ? 'PRODUCT RANGE' : 'DETRON PRODUCTS'}
            </Link>

            {/* CASCADING 3-STAGE FLYOUT MENU (EXPANDS PROGRESSIVELY TO THE LEFT) */}
            {showMegaMenu && (
              <div 
                style={styles.cascadingDropdown}
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => {
                  setShowMegaMenu(false);
                  setActiveCategory(null);
                  setActiveSeriesIndex(null);
                }}
              >
                <style>{`
                  .cascading-cat-item {
                    transition: background-color 0.15s ease, color 0.15s ease;
                  }
                  .cascading-cat-item:hover, .cascading-cat-item.active {
                    background-color: #E30613 !important;
                    color: #ffffff !important;
                  }
                  .cascading-cat-item:hover span, .cascading-cat-item.active span {
                    color: #ffffff !important;
                  }
                  .cascading-series-item {
                    transition: all 0.15s ease;
                  }
                  .cascading-series-item:hover, .cascading-series-item.active {
                    background-color: #f1f5f9 !important;
                    color: #E30613 !important;
                    font-weight: 700 !important;
                  }
                  .cascading-series-item:hover .series-arrow, .cascading-series-item.active .series-arrow {
                    opacity: 1 !important;
                    transform: translateX(-2px);
                  }
                  .cascading-product-card {
                    transition: all 0.15s ease;
                  }
                  .cascading-product-card:hover {
                    background-color: #f8fafc !important;
                    border-color: #cbd5e1 !important;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
                  }
                  .cascading-product-card:hover .product-card-title {
                    color: #E30613 !important;
                  }
                `}</style>

                {/* Panel 1 (Stage 1): Main Categories (Image 1) */}
                <div style={styles.dropdownCol1}>
                  <div style={styles.panelHeader}>CATEGORIES</div>
                  {PRODUCT_MENU_CATEGORIES.map(cat => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <div
                        key={cat.id}
                        onMouseEnter={() => {
                          setActiveCategory(cat.id);
                          setActiveSeriesIndex(null);
                        }}
                        onClick={() => {
                          navigate(cat.link);
                          setShowMegaMenu(false);
                          setActiveCategory(null);
                          setActiveSeriesIndex(null);
                        }}
                        className={`cascading-cat-item ${isActive ? 'active' : ''}`}
                        style={{
                          ...styles.catItem,
                          backgroundColor: isActive ? '#E30613' : 'transparent',
                          color: isActive ? '#ffffff' : '#1e293b'
                        }}
                      >
                        {cat.hasArrow && (
                          <span style={{ fontSize: '9px', marginRight: '10px', color: isActive ? '#ffffff' : '#94a3b8', transition: 'all 0.15s ease' }}>
                            ◀
                          </span>
                        )}
                        <span style={{ flex: 1 }}>{cat.title}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Panel 2 (Stage 2): Series / Subcategories (Image 2) - Pops to the LEFT */}
                {activeCategory && activeSeriesList.length > 0 && (
                  <div style={styles.dropdownCol2Flyout}>
                    <div style={styles.panelHeader}>SERIES / LINEUP</div>
                    <div style={styles.scrollableContent}>
                      {activeSeriesList.map((s, idx) => {
                        const isSeriesActive = activeSeriesIndex === idx;
                        return (
                          <div
                            key={idx}
                            onMouseEnter={() => setActiveSeriesIndex(idx)}
                            onClick={() => {
                              navigate(s.link);
                              setShowMegaMenu(false);
                              setActiveCategory(null);
                              setActiveSeriesIndex(null);
                            }}
                            className={`cascading-series-item ${isSeriesActive ? 'active' : ''}`}
                            style={{
                              ...styles.seriesItem,
                              backgroundColor: isSeriesActive ? '#f1f5f9' : 'transparent',
                              color: isSeriesActive ? '#E30613' : '#334155',
                              fontWeight: isSeriesActive ? '700' : '500'
                            }}
                          >
                            <span 
                              className="series-arrow" 
                              style={{ 
                                fontSize: '9px', 
                                color: '#E30613', 
                                opacity: isSeriesActive ? 1 : 0,
                                transition: 'all 0.15s ease',
                                marginRight: '10px'
                              }}
                            >
                              ◀
                            </span>
                            <span style={{ flex: 1 }}>{s.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Panel 3 (Stage 3): Specific Product Models (Image 3) - Pops to the LEFT of Series */}
                {activeCategory && activeSeriesIndex !== null && activeProductList.length > 0 && (
                  <div style={styles.dropdownCol3Flyout}>
                    <div style={styles.productPanelHeader}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={styles.productPanelTitle}>{selectedSeriesData?.name || 'Products'}</span>
                        <span style={styles.productPanelSubtitle}>{activeProductList.length} Models Available</span>
                      </div>
                      <Link
                        to={selectedSeriesData?.link || selectedCategoryData?.link}
                        onClick={() => {
                          setShowMegaMenu(false);
                          setActiveCategory(null);
                          setActiveSeriesIndex(null);
                        }}
                        style={styles.viewAllSeriesLink}
                      >
                        View All &gt;
                      </Link>
                    </div>

                    <div style={styles.productsScrollableGrid}>
                      {activeProductList.map((prod, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => {
                            navigate(`/products/detron/${prod.categoryId}/${encodeURIComponent(prod.name)}`);
                            setShowMegaMenu(false);
                            setActiveCategory(null);
                            setActiveSeriesIndex(null);
                          }}
                          className="cascading-product-card"
                          style={styles.productCard}
                        >
                          <div style={styles.productCardImgWrap}>
                            <img
                              src={prod.image}
                              alt={prod.name}
                              style={styles.productCardImg}
                              onError={(e) => { e.target.src = '/images/detron.jpeg'; }}
                            />
                          </div>
                          <div style={styles.productCardInfo}>
                            <span className="product-card-title" style={styles.productCardTitle}>{prod.name}</span>
                            {prod.badge && (
                              <span style={styles.productCardBadge}>{prod.badge}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <Link 
            to="/products/fixtures" 
            style={activePage === 'fixtures' ? styles.navLinkActive : styles.navLink}
            onMouseEnter={() => {
              setShowMegaMenu(false);
              setActiveCategory(null);
              setActiveSeriesIndex(null);
            }}
          >
            CUSTOM FIXTURES
          </Link>
          <Link 
            to="/contact" 
            style={styles.contactHeaderBtn}
            onMouseEnter={() => {
              setShowMegaMenu(false);
              setActiveCategory(null);
              setActiveSeriesIndex(null);
            }}
          >
            CONTACT PANEL &gt;
          </Link>
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
    zIndex: 10500,
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
    color: '#E30613',
    padding: '6px 12px',
    textDecoration: 'none',
    fontWeight: '800',
    fontSize: '12px',
    letterSpacing: '0.3px',
    border: '1px solid transparent',
    display: 'inline-flex',
    alignItems: 'center'
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
    zIndex: 11000,
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

  /* CASCADING MULTI-LEVEL DROPDOWN (PROGRESSIVE LEFTWARD EXPANSION) */
  cascadingDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '6px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 12000,
    textAlign: 'left'
  },
  panelHeader: {
    padding: '11px 16px 8px',
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '0.5px',
    color: '#8da2b5',
    textTransform: 'uppercase',
    borderBottom: '1px solid #f1f5f9'
  },
  dropdownCol1: {
    width: '200px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    maxHeight: '440px',
    order: 0 // Base panel on the right
  },
  catItem: {
    padding: '11px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    fontWeight: '600',
    borderBottom: '1px solid #f8fafc',
    cursor: 'pointer',
    userSelect: 'none'
  },
  dropdownCol2Flyout: {
    width: '240px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    maxHeight: '440px',
    marginRight: '6px',
    order: -1 // Appears to the LEFT of Col 1
  },
  scrollableContent: {
    flex: 1,
    overflowY: 'auto'
  },
  seriesItem: {
    padding: '11px 16px',
    fontSize: '12.5px',
    borderBottom: '1px solid #f8fafc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none'
  },
  dropdownCol3Flyout: {
    width: '360px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    maxHeight: '440px',
    marginRight: '6px',
    order: -2 // Appears to the LEFT of Col 2
  },
  productPanelHeader: {
    padding: '11px 16px',
    borderBottom: '1px solid #f1f5f9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa'
  },
  productPanelTitle: {
    fontSize: '13px',
    fontWeight: '800',
    color: '#0f172a'
  },
  productPanelSubtitle: {
    fontSize: '10.5px',
    color: '#64748b',
    marginTop: '1px'
  },
  viewAllSeriesLink: {
    fontSize: '11.5px',
    fontWeight: '700',
    color: '#E30613',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  productsScrollableGrid: {
    flex: 1,
    padding: '12px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  productCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
    cursor: 'pointer'
  },
  productCardImgWrap: {
    width: '46px',
    height: '46px',
    borderRadius: '4px',
    backgroundColor: '#f8fafc',
    border: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3px',
    flexShrink: 0
  },
  productCardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  productCardInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    flex: 1,
    minWidth: 0
  },
  productCardTitle: {
    fontSize: '12.5px',
    fontWeight: '700',
    color: '#0f172a',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  productCardBadge: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#E30613',
    backgroundColor: '#fff1f2',
    padding: '2px 8px',
    borderRadius: '4px',
    alignSelf: 'flex-start',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};
