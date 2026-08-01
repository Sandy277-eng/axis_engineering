import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

// Comprehensive product specifications database extracted from the websites
const PRODUCT_DATABASE = {
  '4th-axis': {
    title: '4th Axis Rotary Tables',
    description: 'Compact, ultra-rigid single-axis rotary tables engineered for high-accuracy indexing on 3-axis machining centres.',
    folderPath: '/detron-frames/4th_axis',
    totalFrames: 240,
    items: [
      {
        size: 'Ø 125mm (compatible chuck Ø 5-6")',
        products: [
          {
            name: 'GXA-125S',
            badge: 'Pneumatic Clamping, 220 N.m',
            description: 'Excellent choice for compact CNC machines. Features premium rigid clamping torque and indexing accuracy in a small footprint.',
            image: '/images/products_detron/4th_axis_pics/120mm/125mmcompatiblechunk5-6.jpg',
            specs: {
              'Table Diameter': 'Ø 125 mm',
              'Center Height': '110 mm',
              'Register Diameter': 'Ø 65 mm (H7)',
              'Thru-Hole Diameter': 'Ø 30 mm',
              'Clamping Torque': '220 N.m (at 0.5 MPa)',
              'Maximum Speed': '83.3 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '100 kg / 50 kg'
            }
          }
        ]
      },
      {
        size: 'Ø 170mm (compatible chuck Ø 6-7")',
        products: [
          {
            name: 'GXA-170S',
            badge: 'Standard Pneumatic, 380 N.m',
            description: 'Highly versatile mid-size rotary table. Standard choice for most 3-axis machining centers. Perfect balance of clamping rigidity and speed.',
            image: '/images/products_detron/4th_axis_pics/170mm/GXA-170S.jpg',
            specs: {
              'Table Diameter': 'Ø 170 mm',
              'Center Height': '135 mm',
              'Register Diameter': 'Ø 60 mm (H7)',
              'Thru-Hole Diameter': 'Ø 40 mm',
              'Clamping Torque': '380 N.m (at 0.5 MPa)',
              'Maximum Speed': '44.4 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '150 kg / 75 kg'
            }
          },
          {
            name: 'GXA-170SL',
            badge: 'Long Spindle, 380 N.m',
            description: 'Extended spindle nose design allowing wider fixture layouts and easier tailstock setups on narrow machine tables.',
            image: '/images/products_detron/4th_axis_pics/170mm/GXA170SL.jpg',
            specs: {
              'Table Diameter': 'Ø 170 mm',
              'Center Height': '135 mm',
              'Register Diameter': 'Ø 60 mm (H7)',
              'Thru-Hole Diameter': 'Ø 40 mm',
              'Clamping Torque': '380 N.m (at 0.5 MPa)',
              'Maximum Speed': '44.4 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '150 kg / 75 kg'
            }
          },
          {
            name: 'GXA-170SB',
            badge: 'Rear-Motor Mount, 380 N.m',
            description: 'Fitted with a rear-mounted motor casing to eliminate lateral interferences, maximizing active work envelope inside compact CNCs.',
            image: '/images/products_detron/4th_axis_pics/170mm/GV-170SB.jpg',
            specs: {
              'Table Diameter': 'Ø 170 mm',
              'Center Height': '135 mm',
              'Register Diameter': 'Ø 60 mm (H7)',
              'Thru-Hole Diameter': 'Ø 40 mm',
              'Clamping Torque': '380 N.m (at 0.5 MPa)',
              'Maximum Speed': '44.4 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '120 kg / 60 kg'
            }
          },
          {
            name: 'DV-170P',
            badge: 'High Speed, Pneumatic',
            description: 'High-speed pneumatic model engineered for fast component indexing on high-production drill/tap milling setups.',
            image: '/images/products_detron/4th_axis_pics/170mm/Dv170p.jpg',
            specs: {
              'Table Diameter': 'Ø 170 mm',
              'Center Height': '135 mm',
              'Register Diameter': 'Ø 60 mm (H7)',
              'Thru-Hole Diameter': 'Ø 40 mm',
              'Clamping Torque': '350 N.m',
              'Maximum Speed': '66.6 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '150 kg / 75 kg'
            }
          },
          {
            name: 'RCX-170S',
            badge: 'Economical Indexer',
            description: 'Reliable, cost-effective indexing table designed specifically for standard job shop operations and basic angular setups.',
            image: '/images/products_detron/4th_axis_pics/170mm/RCX-170S.jpg',
            specs: {
              'Table Diameter': 'Ø 170 mm',
              'Center Height': '135 mm',
              'Register Diameter': 'Ø 60 mm (H7)',
              'Thru-Hole Diameter': 'Ø 40 mm',
              'Clamping Torque': '300 N.m',
              'Maximum Speed': '33.3 RPM',
              'Indexing Accuracy': '20 arc-sec',
              'Repeatability': '5 arc-sec',
              'Max Load (Horiz/Vert)': '150 kg / 75 kg'
            }
          }
        ]
      },
      {
        size: 'Ø 210mm (compatible chuck Ø 8")',
        products: [
          {
            name: 'GXA-210S',
            badge: 'Pneumatic, 580 N.m',
            description: 'Robust, medium-to-large indexing table designed to handle standard structural fixtures with extreme precision.',
            image: '/images/products_detron/4th_axis_pics/210mm/GXA-210S.jpg',
            specs: {
              'Table Diameter': 'Ø 210 mm',
              'Center Height': '160 mm',
              'Register Diameter': 'Ø 90 mm (H7)',
              'Thru-Hole Diameter': 'Ø 50 mm',
              'Clamping Torque': '580 N.m (at 0.5 MPa)',
              'Maximum Speed': '33.3 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '200 kg / 100 kg'
            }
          },
          {
            name: 'GVA-210SB',
            badge: 'Rear Motor, 580 N.m',
            description: 'Rear-motor mounting casing to optimize spindle axes spacing on double-table horizontal or vertical machining layouts.',
            image: '/images/products_detron/4th_axis_pics/210mm/GVA210SB.jpg',
            specs: {
              'Table Diameter': 'Ø 210 mm',
              'Center Height': '160 mm',
              'Register Diameter': 'Ø 90 mm (H7)',
              'Thru-Hole Diameter': 'Ø 50 mm',
              'Clamping Torque': '580 N.m',
              'Maximum Speed': '33.3 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '180 kg / 90 kg'
            }
          },
          {
            name: 'GVA-210SL',
            badge: 'Extended Spindle, 580 N.m',
            description: 'Features an elongated spindle nose to simplify hydraulic fixture plumbing line connections and tooling support.',
            image: '/images/products_detron/4th_axis_pics/210mm/GVA-210SL.jpg',
            specs: {
              'Table Diameter': 'Ø 210 mm',
              'Center Height': '160 mm',
              'Register Diameter': 'Ø 90 mm (H7)',
              'Thru-Hole Diameter': 'Ø 50 mm',
              'Clamping Torque': '580 N.m',
              'Maximum Speed': '33.3 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '200 kg / 100 kg'
            }
          }
        ]
      },
      {
        size: 'Ø 255mm (compatible chuck Ø 9-10")',
        products: [
          {
            name: 'GXA-250S',
            badge: 'Pneumatic, 780 N.m',
            description: 'Highly popular size for heavy duty machining. Equipped with high-rigidity pneumatic clamp discs for medium milling forces.',
            image: '/images/products_detron/4th_axis_pics/255mm/GXA-250S.jpg',
            specs: {
              'Table Diameter': 'Ø 255 mm',
              'Center Height': '185 mm',
              'Register Diameter': 'Ø 120 mm (H7)',
              'Thru-Hole Diameter': 'Ø 70 mm',
              'Clamping Torque': '780 N.m (at 0.5 MPa)',
              'Maximum Speed': '33.3 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '300 kg / 150 kg'
            }
          },
          {
            name: 'GXA-255H',
            badge: 'Hydraulic Clamping, 1100 N.m',
            description: 'Hydraulically locked indexer offering immense clamping torque. Recommended for heavy roughing milling cuts.',
            image: '/images/products_detron/4th_axis_pics/255mm/GXA255H.jpg',
            specs: {
              'Table Diameter': 'Ø 255 mm',
              'Center Height': '185 mm',
              'Register Diameter': 'Ø 120 mm (H7)',
              'Thru-Hole Diameter': 'Ø 70 mm',
              'Clamping Torque': '1100 N.m (at 2.0 MPa)',
              'Maximum Speed': '33.3 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '300 kg / 150 kg'
            }
          },
          {
            name: 'GXA-255HL',
            badge: 'Hydraulic Long Spindle',
            description: 'Long-nose variant of the high-torque hydraulic table, ideal for wide faceplates and bridge tooling layouts.',
            image: '/images/products_detron/4th_axis_pics/255mm/GXA255HL.jpg',
            specs: {
              'Table Diameter': 'Ø 255 mm',
              'Center Height': '185 mm',
              'Register Diameter': 'Ø 120 mm (H7)',
              'Thru-Hole Diameter': 'Ø 70 mm',
              'Clamping Torque': '1100 N.m',
              'Maximum Speed': '33.3 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '300 kg / 150 kg'
            }
          },
          {
            name: 'GVA-255HBII',
            badge: 'Hydraulic Rear Motor',
            description: 'Rear-motor version with dual-clamping discs yielding high hydraulic braking torque while preserving transverse machine room.',
            image: '/images/products_detron/4th_axis_pics/255mm/GVA-255HBII.jpg',
            specs: {
              'Table Diameter': 'Ø 255 mm',
              'Center Height': '185 mm',
              'Register Diameter': 'Ø 120 mm (H7)',
              'Thru-Hole Diameter': 'Ø 70 mm',
              'Clamping Torque': '1100 N.m',
              'Maximum Speed': '33.3 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '250 kg / 125 kg'
            }
          },
          {
            name: 'RCX-255H',
            badge: 'Hydraulic Budget Indexer',
            description: 'Budget-friendly heavy indexing option with a hydraulic clamping brake. Excellent for production jig rotation.',
            image: '/images/products_detron/4th_axis_pics/255mm/RCX-255H.jpg',
            specs: {
              'Table Diameter': 'Ø 255 mm',
              'Center Height': '185 mm',
              'Register Diameter': 'Ø 120 mm (H7)',
              'Thru-Hole Diameter': 'Ø 70 mm',
              'Clamping Torque': '900 N.m',
              'Maximum Speed': '25.0 RPM',
              'Indexing Accuracy': '20 arc-sec',
              'Repeatability': '5 arc-sec',
              'Max Load (Horiz/Vert)': '300 kg / 150 kg'
            }
          },
          {
            name: 'DV-255PII',
            badge: 'High Speed Pneumatic, 700 N.m',
            description: 'Pneumatically clamped high-speed indexing table optimized for light milling and drilling operations.',
            image: '/images/products_detron/4th_axis_pics/255mm/DV-255PII.jpg',
            specs: {
              'Table Diameter': 'Ø 255 mm',
              'Center Height': '185 mm',
              'Register Diameter': 'Ø 120 mm (H7)',
              'Thru-Hole Diameter': 'Ø 70 mm',
              'Clamping Torque': '700 N.m',
              'Maximum Speed': '50.0 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '300 kg / 150 kg'
            }
          },
          {
            name: 'CX-255H',
            badge: 'Compact Spindle Hydraulic',
            description: 'A compact-height variant containing low profile body lines for maximum vertical height clearance under vertical spindles.',
            image: '/images/products_detron/4th_axis_pics/255mm/CX-255H.jpg',
            specs: {
              'Table Diameter': 'Ø 255 mm',
              'Center Height': '180 mm',
              'Register Diameter': 'Ø 120 mm (H7)',
              'Thru-Hole Diameter': 'Ø 70 mm',
              'Clamping Torque': '1000 N.m',
              'Maximum Speed': '25.0 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '300 kg / 150 kg'
            }
          }
        ]
      },
      {
        size: 'Ø 320mm (compatible chuck Ø 12")',
        products: [
          {
            name: 'GXA-320H',
            badge: 'Hydraulic Clamping, 1600 N.m',
            description: 'Engineered for heavy-duty manufacturing and aerospace parts. Imposes exceptional hydraulic clamping torque and axial load capacity.',
            image: '/images/products_detron/4th_axis_pics/320/GXA320H.jpg',
            specs: {
              'Table Diameter': 'Ø 320 mm',
              'Center Height': '210 mm',
              'Register Diameter': 'Ø 150 mm (H7)',
              'Thru-Hole Diameter': 'Ø 90 mm',
              'Clamping Torque': '1600 N.m (at 2.0 MPa)',
              'Maximum Speed': '25.0 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '500 kg / 250 kg'
            }
          },
          {
            name: 'RCX-320EH',
            badge: 'Standard Hydraulic Indexer',
            description: 'Economical large hydraulic table ideal for rotating heavy castings or manufacturing machine parts.',
            image: '/images/products_detron/4th_axis_pics/320/RCX-320EH.jpg',
            specs: {
              'Table Diameter': 'Ø 320 mm',
              'Center Height': '210 mm',
              'Register Diameter': 'Ø 150 mm (H7)',
              'Thru-Hole Diameter': 'Ø 90 mm',
              'Clamping Torque': '1300 N.m',
              'Maximum Speed': '20.0 RPM',
              'Indexing Accuracy': '20 arc-sec',
              'Repeatability': '5 arc-sec',
              'Max Load (Horiz/Vert)': '500 kg / 250 kg'
            }
          },
          {
            name: 'CX-320H',
            badge: 'Low Profile Large Table',
            description: 'Compact casing variant minimizing center height to support tall machining fixtures inside standard vertical mills.',
            image: '/images/products_detron/4th_axis_pics/320/CX-320H.jpg',
            specs: {
              'Table Diameter': 'Ø 320 mm',
              'Center Height': '200 mm',
              'Register Diameter': 'Ø 150 mm (H7)',
              'Thru-Hole Diameter': 'Ø 90 mm',
              'Clamping Torque': '1500 N.m',
              'Maximum Speed': '25.0 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '500 kg / 250 kg'
            }
          }
        ]
      },
      {
        size: 'Ø 400-500mm (compatible chuck Ø 12-16")',
        products: [
          {
            name: 'CX-400H',
            badge: 'Large Scale Hydraulic, 2800 N.m',
            description: 'Heavy duty indexing table. Employs premium rigid structure to handle severe radial milling loads.',
            image: '/images/products_detron/4th_axis_pics/400-500/CX-400H.jpg',
            specs: {
              'Table Diameter': 'Ø 400 mm',
              'Center Height': '255 mm',
              'Register Diameter': 'Ø 200 mm (H7)',
              'Thru-Hole Diameter': 'Ø 120 mm',
              'Clamping Torque': '2800 N.m (at 2.0 MPa)',
              'Maximum Speed': '16.6 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '800 kg / 400 kg'
            }
          },
          {
            name: 'GXA-500H',
            badge: 'High Torque Giant, 3600 N.m',
            description: 'Top-tier large table designed for heavy machine building, energy components and structural steel indexing.',
            image: '/images/products_detron/4th_axis_pics/400-500/GX-500H.jpg',
            specs: {
              'Table Diameter': 'Ø 500 mm',
              'Center Height': '310 mm',
              'Register Diameter': 'Ø 250 mm (H7)',
              'Thru-Hole Diameter': 'Ø 150 mm',
              'Clamping Torque': '3600 N.m',
              'Maximum Speed': '11.1 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '1200 kg / 600 kg'
            }
          },
          {
            name: 'CX-500H',
            badge: 'Low-Height 500mm Hydraulic',
            description: 'Low center-of-gravity design for 500mm table class, maximizing structural headroom on large boring mills.',
            image: '/images/products_detron/4th_axis_pics/400-500/CX500H.jpg',
            specs: {
              'Table Diameter': 'Ø 500 mm',
              'Center Height': '300 mm',
              'Register Diameter': 'Ø 250 mm (H7)',
              'Thru-Hole Diameter': 'Ø 150 mm',
              'Clamping Torque': '3400 N.m',
              'Maximum Speed': '11.1 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '1200 kg / 600 kg'
            }
          },
          {
            name: 'GXA-400H',
            badge: 'Heavy Spindle, 2800 N.m',
            description: 'Standard 400mm model designed for heavy industrial engineering and multi-spindle fixtures.',
            image: '/images/products_detron/4th_axis_pics/400-500/GXA400H.jpg',
            specs: {
              'Table Diameter': 'Ø 400 mm',
              'Center Height': '255 mm',
              'Register Diameter': 'Ø 200 mm (H7)',
              'Thru-Hole Diameter': 'Ø 120 mm',
              'Clamping Torque': '2800 N.m',
              'Maximum Speed': '16.6 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (Horiz/Vert)': '800 kg / 400 kg'
            }
          }
        ]
      },
      {
        size: 'Ø 630-800mm (compatible chuck Ø TBA)',
        products: [
          {
            name: 'GX-630H',
            badge: 'Super Heavy Duty, 6500 N.m',
            description: 'Giant rotary table offering outstanding braking torque and load capacity. Engineered for massive gantry milling setups.',
            image: '/images/products_detron/4th_axis_pics/680-800/GXA630H.jpg',
            specs: {
              'Table Diameter': 'Ø 630 mm',
              'Center Height': '410 mm',
              'Register Diameter': 'Ø 350 mm (H7)',
              'Thru-Hole Diameter': 'Ø 200 mm',
              'Clamping Torque': '6500 N.m (at 2.0 MPa)',
              'Maximum Speed': '8.3 RPM',
              'Indexing Accuracy': '20 arc-sec',
              'Repeatability': '5 arc-sec',
              'Max Load (Horiz/Vert)': '2500 kg / 1250 kg'
            }
          },
          {
            name: 'GXA-630EH',
            badge: 'Standard 630mm Giant',
            description: 'Excellent choice for heavy industrial applications, machining valves, engine blocks and turbine parts.',
            image: '/images/products_detron/4th_axis_pics/680-800/GXA-630EH.jpg',
            specs: {
              'Table Diameter': 'Ø 630 mm',
              'Center Height': '410 mm',
              'Register Diameter': 'Ø 350 mm (H7)',
              'Thru-Hole Diameter': 'Ø 200 mm',
              'Clamping Torque': '6000 N.m',
              'Maximum Speed': '8.3 RPM',
              'Indexing Accuracy': '20 arc-sec',
              'Repeatability': '5 arc-sec',
              'Max Load (Horiz/Vert)': '2500 kg / 1250 kg'
            }
          },
          {
            name: 'GX-800H',
            badge: 'Ultra Giant Table, 8500 N.m',
            description: 'The largest standard indexing option in the Detron lineup. Provides massive load limits and structural stiffness.',
            image: '/images/products_detron/4th_axis_pics/680-800/GX-800H.jpg',
            specs: {
              'Table Diameter': 'Ø 800 mm',
              'Center Height': '500 mm',
              'Register Diameter': 'Ø 400 mm (H7)',
              'Thru-Hole Diameter': 'Ø 250 mm',
              'Clamping Torque': '8500 N.m',
              'Maximum Speed': '5.5 RPM',
              'Indexing Accuracy': '25 arc-sec',
              'Repeatability': '6 arc-sec',
              'Max Load (Horiz/Vert)': '4000 kg / 2000 kg'
            }
          }
        ]
      }
    ]
  },
  '5th-axis': {
    title: '5th Axis Rotary Tables',
    description: 'Combined tilt & rotary units built for complex, multi-face component machining in a single setup.',
    folderPath: '/detron-frames/5th_axis',
    totalFrames: 240,
    items: [
      {
        size: 'Ø 100-125mm',
        products: [
          {
            name: 'GFA-101S',
            badge: 'Tilting Table, Dual-Pneumatic',
            description: 'Ultra-compact multi-axis positioning table. Perfect for dental, medical and micro-component precision machining.',
            image: '/images/products_detron/5th_axis_pics/100-125mm/GFA101S.jpg',
            specs: {
              'Table Diameter': 'Ø 100 mm',
              'Center Height (Flat)': '160 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '150 N.m / 250 N.m',
              'Max Speed (Rot/Tilt)': '50.0 / 25.0 RPM',
              'Indexing Accuracy': '20 arc-sec (Rotary)',
              'Repeatability': '5 arc-sec',
              'Max Load (0°-90°)': '20 kg / 10 kg'
            }
          },
          {
            name: 'GFA-125S',
            badge: 'Standard 125mm Tilting Table',
            description: 'Highly precise 5-axis unit designed for small vertical machining centers. Imparts extreme accuracy.',
            image: '/images/products_detron/5th_axis_pics/100-125mm/GFA-125S.jpg',
            specs: {
              'Table Diameter': 'Ø 125 mm',
              'Center Height (Flat)': '180 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '220 N.m / 350 N.m',
              'Max Speed (Rot/Tilt)': '50.0 / 25.0 RPM',
              'Indexing Accuracy': '20 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '30 kg / 15 kg'
            }
          },
          {
            name: 'GTFAS-125S',
            badge: 'Compact 125mm Tilt Table',
            description: 'Special compact-height casing version designed to optimize vertical spindle headroom.',
            image: '/images/products_detron/5th_axis_pics/100-125mm/GTFAS-125S.jpg',
            specs: {
              'Table Diameter': 'Ø 125 mm',
              'Center Height (Flat)': '170 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '220 N.m / 350 N.m',
              'Max Speed (Rot/Tilt)': '50.0 / 25.0 RPM',
              'Indexing Accuracy': '20 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '30 kg / 15 kg'
            }
          }
        ]
      },
      {
        size: 'Ø 170mm',
        products: [
          {
            name: 'GFA-170S',
            badge: 'Pneumatic Tilt Table, 450 N.m',
            description: 'The standard choice for medium-sized 5-axis indexing. Rigid pneumatic brake disc ensures structural stability.',
            image: '/images/products_detron/5th_axis_pics/170mm/GFA-170S.jpg',
            specs: {
              'Table Diameter': 'Ø 170 mm',
              'Center Height (Flat)': '215 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '380 N.m / 550 N.m',
              'Max Speed (Rot/Tilt)': '44.4 / 16.6 RPM',
              'Indexing Accuracy': '15 arc-sec (Rotary)',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '60 kg / 30 kg'
            }
          },
          {
            name: 'GTFAE-170SL',
            badge: 'Long Faceplate Tilt Table',
            description: 'Extended faceplate version providing a wider tooling mounting deck for custom clamping rigs.',
            image: '/images/products_detron/5th_axis_pics/170mm/GTFAE-170SL.jpg',
            specs: {
              'Table Diameter': 'Ø 170 mm',
              'Center Height (Flat)': '215 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '380 N.m / 550 N.m',
              'Max Speed (Rot/Tilt)': '44.4 / 16.6 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '60 kg / 30 kg'
            }
          }
        ]
      },
      {
        size: 'Ø 210mm',
        products: [
          {
            name: 'GFA-210S',
            badge: 'Pneumatic Tilt Table, 580 N.m',
            description: 'Highly versatile trunnion-style table, offering exceptional torsional rigidity for heavy indexing loads.',
            image: '/images/products_detron/5th_axis_pics/210mm/GFA-210S.jpg',
            specs: {
              'Table Diameter': 'Ø 210 mm',
              'Center Height (Flat)': '245 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '580 N.m / 800 N.m',
              'Max Speed (Rot/Tilt)': '33.3 / 16.6 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '80 kg / 40 kg'
            }
          },
          {
            name: 'GTFAE-210S',
            badge: 'Hydraulic Tilt Table, 900 N.m',
            description: 'Equipped with a hydraulic braking system on the tilt axis, ensuring zero displacement during aggressive side milling.',
            image: '/images/products_detron/5th_axis_pics/210mm/GTFAE-210S.jpg',
            specs: {
              'Table Diameter': 'Ø 210 mm',
              'Center Height (Flat)': '245 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '580 N.m / 1000 N.m',
              'Max Speed (Rot/Tilt)': '33.3 / 16.6 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '85 kg / 45 kg'
            }
          }
        ]
      },
      {
        size: 'Ø 255mm',
        products: [
          {
            name: 'GFA-255H',
            badge: 'Hydraulic Clamping, 1400 N.m',
            description: 'High-torque hydraulic tilting rotary table designed for heavy production parts and multi-side castings.',
            image: '/images/products_detron/5th_axis_pics/255mm/GFA255H.jpg',
            specs: {
              'Table Diameter': 'Ø 255 mm',
              'Center Height (Flat)': '285 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '1100 N.m / 1600 N.m',
              'Max Speed (Rot/Tilt)': '33.3 / 11.1 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '120 kg / 60 kg'
            }
          },
          {
            name: 'GFA-255HB',
            badge: 'Compact Casing Hydraulic',
            description: 'Narrow width casing variant, optimizing space inside mid-sized 3-axis CNC vertical mills converting to 5-axis.',
            image: '/images/products_detron/5th_axis_pics/255mm/GFA-255HB.jpg',
            specs: {
              'Table Diameter': 'Ø 255 mm',
              'Center Height (Flat)': '285 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '1100 N.m / 1600 N.m',
              'Max Speed (Rot/Tilt)': '33.3 / 11.1 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '100 kg / 50 kg'
            }
          },
          {
            name: 'GTFAE-255SBLS',
            badge: 'Heavy Trunnion Dual Clamping',
            description: 'Equipped with dual support brackets on the tilt axis to secure massive clamping bridges.',
            image: '/images/products_detron/5th_axis_pics/255mm/GTFAE-255SBLS.jpg',
            specs: {
              'Table Diameter': 'Ø 255 mm',
              'Center Height (Flat)': '285 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '1100 N.m / 2000 N.m',
              'Max Speed (Rot/Tilt)': '33.3 / 11.1 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '150 kg / 75 kg'
            }
          }
        ]
      },
      {
        size: 'Ø 320mm',
        products: [
          {
            name: 'GFA320H',
            badge: 'Large Scale Hydraulic, 2400 N.m',
            description: 'Engineered for aircraft components and heavy machine tooling. Imparts immense structural stiffness.',
            image: '/images/products_detron/5th_axis_pics/320mm/GFA320H.jpg',
            specs: {
              'Table Diameter': 'Ø 320 mm',
              'Center Height (Flat)': '345 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '1600 N.m / 3000 N.m',
              'Max Speed (Rot/Tilt)': '25.0 / 8.3 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '200 kg / 100 kg'
            }
          },
          {
            name: 'GTFAE-320H',
            badge: 'Extended Spindle Tilt Table',
            description: 'Special model with an extended rotary table nose to easily receive standard zero-point chucks.',
            image: '/images/products_detron/5th_axis_pics/320mm/GTFAE-320H.jpg',
            specs: {
              'Table Diameter': 'Ø 320 mm',
              'Center Height (Flat)': '345 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '1600 N.m / 3000 N.m',
              'Max Speed (Rot/Tilt)': '25.0 / 8.3 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '200 kg / 100 kg'
            }
          },
          {
            name: 'GTFAE-320XB',
            badge: 'Heavy Structural Trunnion',
            description: 'Built for high axial workloads. Features a rugged casting bed that minimizes vibration during indexing.',
            image: '/images/products_detron/5th_axis_pics/320mm/GTFAE-320XB.jpg',
            specs: {
              'Table Diameter': 'Ø 320 mm',
              'Center Height (Flat)': '345 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '1600 N.m / 3400 N.m',
              'Max Speed (Rot/Tilt)': '25.0 / 8.3 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '220 kg / 110 kg'
            }
          },
          {
            name: 'GTFAE-320XBL',
            badge: 'Dual-Support Bracket 320mm',
            description: 'Dual-clamp support variant designed specifically to support extra wide, double-clamping jigs.',
            image: '/images/products_detron/5th_axis_pics/320mm/GTFAE-320XBL.jpg',
            specs: {
              'Table Diameter': 'Ø 320 mm',
              'Center Height (Flat)': '345 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '1600 N.m / 3400 N.m',
              'Max Speed (Rot/Tilt)': '25.0 / 8.3 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '250 kg / 125 kg'
            }
          }
        ]
      },
      {
        size: 'Ø 410mm',
        products: [
          {
            name: 'GTFAE-410XB',
            badge: 'Industrial 5th-Axis Giant',
            description: 'Heavy industrial multi-axis positioning table, offering top-tier mechanical efficiency and hydraulic locking.',
            image: '/images/products_detron/5th_axis_pics/410mm/GTFAE-410XB.jpg',
            specs: {
              'Table Diameter': 'Ø 410 mm',
              'Center Height (Flat)': '430 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '2800 N.m / 5200 N.m',
              'Max Speed (Rot/Tilt)': '16.6 / 5.5 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '400 kg / 200 kg'
            }
          },
          {
            name: 'GTFAE-410HLS',
            badge: 'Long Spindle 410mm',
            description: 'Extended spindle version built for heavy mold and die machining, allowing high clearance for deep milling.',
            image: '/images/products_detron/5th_axis_pics/410mm/GTFAE-410HLS.jpg',
            specs: {
              'Table Diameter': 'Ø 410 mm',
              'Center Height (Flat)': '430 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '2800 N.m / 5200 N.m',
              'Max Speed (Rot/Tilt)': '16.6 / 5.5 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '400 kg / 200 kg'
            }
          },
          {
            name: 'GTFAE-410XBLS',
            badge: 'High Torque Dual Bracket',
            description: 'Features massive side-support brackets for maximum rigidity during heavy cutting of steel and titanium castings.',
            image: '/images/products_detron/5th_axis_pics/410mm/GTFAE-410XBLS.jpg',
            specs: {
              'Table Diameter': 'Ø 410 mm',
              'Center Height (Flat)': '430 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '2800 N.m / 6000 N.m',
              'Max Speed (Rot/Tilt)': '16.6 / 5.5 RPM',
              'Indexing Accuracy': '15 arc-sec',
              'Repeatability': '4 arc-sec',
              'Max Load (0°-90°)': '450 kg / 225 kg'
            }
          }
        ]
      },
      {
        size: 'Ø 500mm',
        products: [
          {
            name: 'GTFAE-500XB',
            badge: 'Massive Trunnion Table, 6800 N.m',
            description: 'Super large tilting rotary table designed for horizontal boring mills and large portal machining centers.',
            image: '/images/products_detron/5th_axis_pics/500mm/GTFAE-500XB.jpg',
            specs: {
              'Table Diameter': 'Ø 500 mm',
              'Center Height (Flat)': '500 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '3600 N.m / 6800 N.m',
              'Max Speed (Rot/Tilt)': '11.1 / 4.4 RPM',
              'Indexing Accuracy': '20 arc-sec',
              'Repeatability': '5 arc-sec',
              'Max Load (0°-90°)': '600 kg / 300 kg'
            }
          },
          {
            name: 'GTFAE-500XBL',
            badge: 'Ultra Heavy Dual Bracket 500mm',
            description: 'Top-tier large multi-axis table offering maximum structural clearance and heavy load rating.',
            image: '/images/products_detron/5th_axis_pics/500mm/GTFAE-500XBL.jpg',
            specs: {
              'Table Diameter': 'Ø 500 mm',
              'Center Height (Flat)': '500 mm',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '3600 N.m / 8000 N.m',
              'Max Speed (Rot/Tilt)': '11.1 / 4.4 RPM',
              'Indexing Accuracy': '20 arc-sec',
              'Repeatability': '5 arc-sec',
              'Max Load (0°-90°)': '700 kg / 350 kg'
            }
          }
        ]
      },
      {
        size: 'GFA Compact Type, Multi-Spindle',
        products: [
          {
            name: 'GFA-125S-2W_240',
            badge: 'Twin Spindle, 240mm Pitch',
            description: 'Multi-spindle solutions designed for simultaneous batch production on a single tilt-rotary assembly.',
            image: '/images/products_detron/5th_axis_pics/GFA_contact_type_multispindle/GFA-125S-2W_240.jpg',
            specs: {
              'Number of Spindles': '2',
              'Spindle Spacing': '240 mm',
              'Table Diameter': 'Ø 125 mm x 2',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '220 N.m x 2 / 450 N.m',
              'Max Speed (Rot/Tilt)': '50.0 / 25.0 RPM',
              'Max Load (Flat)': '40 kg (total)'
            }
          },
          {
            name: 'GFA-170S-2W-300',
            badge: 'Twin Spindle, 300mm Pitch',
            description: 'High efficiency dual spindle setup supporting wider workpiece geometries for automated mass production.',
            image: '/images/products_detron/5th_axis_pics/GFA_contact_type_multispindle/GFA-170S-2W-300.jpg',
            specs: {
              'Number of Spindles': '2',
              'Spindle Spacing': '300 mm',
              'Table Diameter': 'Ø 170 mm x 2',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '380 N.m x 2 / 700 N.m',
              'Max Speed (Rot/Tilt)': '44.4 / 16.6 RPM',
              'Max Load (Flat)': '80 kg (total)'
            }
          }
        ]
      },
      {
        size: 'GTFA Trunnion Type, Multi-Spindle',
        products: [
          {
            name: 'GTFAE-210S-2W-320',
            badge: 'Twin-Spindle Trunnion 320mm Pitch',
            description: 'High-efficiency trunnion design supporting twin-spindle machining. Dramatically reduces cycle times.',
            image: '/images/products_detron/5th_axis_pics/GFA_trunnion_type_multispindle/GTFAE-210S-2W-320.jpg',
            specs: {
              'Number of Spindles': '2',
              'Spindle Spacing': '320 mm',
              'Table Diameter': 'Ø 210 mm x 2',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '580 N.m x 2 / 1200 N.m',
              'Max Speed (Rot/Tilt)': '33.3 / 16.6 RPM',
              'Max Load (Flat)': '120 kg (total)'
            }
          },
          {
            name: 'GTFAE-255H-2W-400',
            badge: 'Twin-Spindle Trunnion 400mm Pitch',
            description: 'Large twin-spindle trunnion layout built for massive batch milling tasks. Offers superb rigidity.',
            image: '/images/products_detron/5th_axis_pics/GFA_trunnion_type_multispindle/GTFAE-255H-2W-400.jpg',
            specs: {
              'Number of Spindles': '2',
              'Spindle Spacing': '400 mm',
              'Table Diameter': 'Ø 255 mm x 2',
              'Tilt Range': '-30° to +110°',
              'Clamping Torque (Rot/Tilt)': '1100 N.m x 2 / 2400 N.m',
              'Max Speed (Rot/Tilt)': '33.3 / 11.1 RPM',
              'Max Load (Flat)': '200 kg (total)'
            }
          }
        ]
      }
    ]
  },
  'auto-pallet-changer': {
    title: 'Auto Pallet Changers',
    description: 'Automated pallet handling systems that cut idle spindle time and keep production running unattended.',
    folderPath: '/detron-frames/auto_pallet_changer',
    totalFrames: 240,
    items: [
      {
        size: 'CVR series (Vertical layout)',
        products: [
          {
            name: 'CVR-660',
            badge: '660x400 mm Pallet, 300kg Load',
            description: 'Vertical rotary auto-pallet changer enabling seamless loading and unloading during active machining cycles.',
            image: '/images/products_detron/Auto_pallet_changer/CVR/CVR600.jpg',
            specs: {
              'Pallet Size': '660 x 400 mm',
              'Maximum Load': '300 kg per pallet',
              'Pallet Change Time': '8.5 seconds',
              'Number of Pallets': '2',
              'Operating Method': 'Hydraulic rotation drive',
              'Repeatability': '±0.005 mm'
            }
          },
          {
            name: 'CVR-850',
            badge: '850x500 mm Pallet, 500kg Load',
            description: 'Large scale CVR model built to handle heavy castings and automated structural milling layouts.',
            image: '/images/products_detron/Auto_pallet_changer/CVR/CVR850.jpg',
            specs: {
              'Pallet Size': '850 x 500 mm',
              'Maximum Load': '500 kg per pallet',
              'Pallet Change Time': '12.0 seconds',
              'Number of Pallets': '2',
              'Operating Method': 'Hydraulic rotation drive',
              'Repeatability': '±0.005 mm'
            }
          },
          {
            name: 'CVR-10D',
            badge: 'Dual pallet horizontal interface',
            description: 'High reliability indexing changer designed to pair with heavy machine building operations.',
            image: '/images/products_detron/Auto_pallet_changer/CVR/CVR-10D.jpg',
            specs: {
              'Pallet Size': 'Ø 500 mm',
              'Maximum Load': '250 kg per pallet',
              'Pallet Change Time': '10.0 seconds',
              'Number of Pallets': '2',
              'Operating Method': 'Pneumatic / Hydraulic index'
            }
          }
        ]
      },
      {
        size: 'SVR series (Integrated clamping)',
        products: [
          {
            name: 'SVC-7050II',
            badge: '700x500 mm Pallet, 400kg Load',
            description: 'Integrated SVR multi-pallet clamping unit designed for heavy industrial milling and long untended production runs.',
            image: '/images/products_detron/Auto_pallet_changer/SVR/SVC10065II.jpg',
            specs: {
              'Pallet Size': '700 x 500 mm',
              'Maximum Load': '400 kg per pallet',
              'Pallet Change Time': '9.5 seconds',
              'Number of Pallets': '2',
              'Operating Method': 'Hydraulic index',
              'Repeatability': '±0.003 mm'
            }
          }
        ]
      }
    ]
  },
  'intelligent-control': {
    title: 'Intelligent Control Systems',
    description: 'Advanced control systems and software integration for real-time monitoring, diagnostics and precision tuning.',
    folderPath: '/detron-frames/Intellignet_control',
    totalFrames: 240,
    items: [
      {
        size: 'Smart Monitoring Units',
        products: [
          {
            name: 'Detron i4.0-RT Intelligent Data Box',
            badge: 'IoT Connected Sensor Unit',
            description: 'Connects machining centers with IoT networks. Features real-time sensory monitoring, clamping checks, and performance logging.',
            image: '/images/products_detron/Inteligent_control/Detron_i4.0-RT_intellegent_data_box.jpg',
            specs: {
              'Sensor Inputs': 'Temperature, Pressure, Vibration, Clamp state',
              'Interface': 'Wi-Fi, Ethernet, RS-485',
              'Protocol compatibility': 'MTConnect, OPC UA, Modbus TCP',
              'Power Input': 'DC 24V',
              'Casing Material': 'Industrial Aluminium Alloy (IP67)'
            }
          }
        ]
      },
      {
        size: 'Single Axis Controllers',
        products: [
          {
            name: 'SAC III Series Controller',
            badge: 'Standard Single Axis Drive',
            description: 'Provides independent control of indexer setups. Features programmable presets, M-code triggers, and clear diagnostic panels.',
            image: '/images/products_detron/Inteligent_control/detron_sac_pro_single_axis_controller.jpg',
            specs: {
              'Control Axes': '1 (Rotary / Tilting)',
              'Feedback Interface': 'Incremental / Absolute Encoder',
              'Programming Code': 'Simple M-code trigger / G-code subset',
              'Program capacity': '99 presets',
              'Display Panel': '7-inch LCD resistive touch panel'
            }
          }
        ]
      },
      {
        size: 'System Guidance Charts',
        products: [
          {
            name: 'System Connection Layout',
            badge: 'Connection Schematic setup',
            description: 'Detailed schematic setups demonstrating how Detron smart tables integrate with FANUC, Siemens, Mitsubishi, and custom CNC controllers.',
            image: '/images/products_detron/Inteligent_control/guidance/01.jpg',
            specs: {
              'CNC compatibility': 'FANUC, Siemens, Mitsubishi, Heidenhain, Fagor',
              'Bus systems': 'Profinet, EtherCAT, CC-Link, DeviceNet',
              'Safety standard': 'ISO 13849-1 (PLd)'
            }
          }
        ]
      }
    ]
  },
  'accessories': {
    title: 'Supporting Accessories',
    description: 'Clamping kits, tailstocks, chucks and workholding accessories that extend and complement the Detron range.',
    folderPath: '/detron-frames/accessories',
    totalFrames: 240,
    items: [
      {
        size: 'Tailstock Support',
        products: [
          {
            name: 'Pneumatic / Hydraulic Tailstock',
            badge: 'TS-135 / TS-170 / TS-210',
            description: 'Provides strong tail support for long structural parts, preventing component bending under heavy radial milling cuts.',
            image: '/images/products_detron/accessories/Tailstock.jpg',
            specs: {
              'Center Height': '135 mm / 170 mm / 210 mm',
              'Stroke': '50 mm',
              'Clamping force': '4.5 kN (at 0.5 MPa)',
              'Brake action': 'Pneumatic or Hydraulic options'
            }
          }
        ]
      },
      {
        size: 'Clamping Chucks',
        products: [
          {
            name: 'Precision Scroll Chuck Assembly',
            badge: '3-Jaw chuck with Spindle adapter',
            description: 'Precision hydraulic and manual chuck adapters designed to mount securely on Detron spindle faces.',
            image: '/images/products_detron/accessories/Chuck.jpg',
            specs: {
              'Chuck Size': '6-inch / 8-inch / 10-inch',
              'Mounting nose': 'A2-5 / A2-6 / A2-8',
              'Clamping system': '3-jaw self-centering scroll'
            }
          }
        ]
      },
      {
        size: 'Air Booster Units',
        products: [
          {
            name: 'ABR-50 Pressure Unit',
            badge: '5x Pressure multiplier',
            description: 'Boosts shop air pressure up to 5x. Ensures maximum clamping torque for pneumatic brake systems on rotary tables.',
            image: '/images/products_detron/accessories/Air-booster-Unit-ABR-50.jpg',
            specs: {
              'Input Pressure': '0.3 - 0.7 MPa',
              'Output Pressure': '1.5 - 3.5 MPa',
              'Pressure Ratio': '1 : 5',
              'Tank Capacity': '10 Liters'
            }
          }
        ]
      },
      {
        size: 'Hydraulic Power Units',
        products: [
          {
            name: 'HTK Series Power Pack',
            badge: 'Compact hydraulic station',
            description: 'Compact hydraulic pressure stations designed to actuate clamp/unclamp commands reliably.',
            image: '/images/products_detron/accessories/Hydraulic-power-unit-HTK-series.jpg',
            specs: {
              'Motor Rating': '0.75 kW',
              'Operating Pressure': '5.0 - 7.0 MPa',
              'Tank Capacity': '10 Liters / 20 Liters',
              'Solenoid valve voltage': 'AC 220V / DC 24V'
            }
          }
        ]
      },
      {
        size: 'Magnetic Workholding',
        products: [
          {
            name: 'MagVise Magnetic Plate',
            badge: 'Electro-permanent clamp',
            description: 'Electro-permanent magnetic clamps for quick, distortion-free workpiece clamping on indexing setups.',
            image: '/images/products_detron/accessories/MagVise-Magnetic-Workholding.jpg',
            specs: {
              'Clamping Force': 'Up to 1600 kg per plate',
              'Input Voltage': 'AC 380V pulse control',
              'IP rating': 'IP68 immersion proof'
            }
          }
        ]
      },
      {
        size: 'Rotary Encoders',
        products: [
          {
            name: 'Absolute Spindle Encoder',
            badge: 'Heidenhain / Renishaw ±2" Accuracy',
            description: 'Spindle-mounted encoders yielding positioning accuracies down to ±2 arc-seconds.',
            image: '/images/products_detron/accessories/Encoder.jpg',
            specs: {
              'Accuracy': '±2 arc-sec / ±5 arc-sec',
              'Output Protocol': 'EnDat 2.2 / Fanuc / Mitsubishi',
              'Resolution': '23 bits absolute'
            }
          }
        ]
      },
      {
        size: 'Servo Motors & Drives',
        products: [
          {
            name: 'CNC Servo Motor Adapter',
            badge: 'FANUC / Siemens / Mitsubishi',
            description: 'Configurable with any industrial servo motor to match your existing CNC machining center controller.',
            image: '/images/products_detron/accessories/Servo-Motor.jpg',
            specs: {
              'Motor compatibility': 'FANUC α/β, Siemens 1FK7, Yaskawa SGM7, Mitsubishi HF',
              'Gear Ratio': '1/90 / 1/120 / 1/180 options'
            }
          }
        ]
      },
      {
        size: 'Spindle Bridge Units',
        products: [
          {
            name: 'Custom Tailstock Bridge Unit',
            badge: 'Fixture mounting bridge plate',
            description: 'Provides bridging plates to mount multi-component fixtures between the indexer and tailstock.',
            image: '/images/products_detron/accessories/Bridge-Unit.jpg',
            specs: {
              'Plate Width': 'Custom (300 to 1200 mm)',
              'Material': 'Industrial Casting GGG40 / Steel plate',
              'Trunnion support bearing': 'Heavy duty radial roller type'
            }
          }
        ]
      }
    ]
  },
  'special-applications': {
    title: 'Special Applications',
    description: 'Purpose-built rotary and indexing solutions engineered around a customer’s specific component geometry.',
    folderPath: '/detron-frames/special_appliction',
    totalFrames: 240,
    items: [
      {
        size: 'Collet Clamping Setups',
        products: [
          {
            name: 'GXA-S with Pneumatic 5C Collet Chuck',
            badge: 'Pneumatic collet clamp system',
            description: 'Custom workholding designed for high-speed indexing of small shaft or tube parts using quick clamping collets.',
            image: '/images/products_detron/special_application/GXA-S-with-pneumatic-5C-collet-chuck.jpg',
            specs: {
              'Collet Standard': '5C / 16C / 3C options',
              'Clamping Force': '12 kN (at 0.5 MPa)',
              'Actuation': 'Drawbar pneumatic cylinder'
            }
          }
        ]
      },
      {
        size: 'Fixture Interfaces',
        products: [
          {
            name: 'GFA-H with BT-40/50 Spindle Interface',
            badge: 'BT-taper fixture interface block',
            description: 'Tilting rotary table fitted with custom BT taper receivers, allowing quick fixture tooling changes.',
            image: '/images/products_detron/special_application/GFA-H-with-BT-4050-fixture-interface.jpg',
            specs: {
              'Taper standard': 'BT-40 / BT-50 / HSK-A63',
              'Fixture release method': 'Hydraulic release pin system',
              'Indexing layout': 'Four-jaw tooling block'
            }
          }
        ]
      },
      {
        size: 'Multi-Pass Distributors',
        products: [
          {
            name: 'GXA Spindle with Kitagawa Chuck & 2-Port Distributor',
            badge: 'Rotary joint hydraulic distributor',
            description: 'Fitted with hydraulic rotary joints to run hydraulic lines directly into rotating clamp fixtures.',
            image: '/images/products_detron/special_application/GXA-wit-interface-for-Kitakawa-chuck-and-2P-distributor.jpg',
            specs: {
              'Fluid Ports': '2 / 4 ports',
              'Maximum fluid pressure': '15.0 MPa',
              'Piping standard': 'G 1/4" / G 3/8"'
            }
          }
        ]
      },
      {
        size: 'Quick Mold Systems',
        products: [
          {
            name: 'GFA with Quick-Change Mold Interface',
            badge: 'Zero-point clamping mould table',
            description: 'Special 5-axis setup optimized for high-volume automotive molding applications, supporting zero-point fixtures.',
            image: '/images/products_detron/special_application/GFA-with-interface-for-quick-change-mold.jpg',
            specs: {
              'Table Layout': 'Zero-point reference indexing pin layout',
              'Mold locking force': '25 kN per pin',
              'Axis pitch alignment': '±0.003 mm'
            }
          }
        ]
      }
    ]
  }
};

// Handle route naming alias (special-application in cards, special-applications in URL list)
PRODUCT_DATABASE['special-application'] = PRODUCT_DATABASE['special-applications'];

export default function DetronProductDetailPage() {
  const { productId } = useParams();

  const getVideoUrl = (id) => {
    const mapping = {
      '4th-axis': '/videos/4th_axis.mp4',
      '5th-axis': '/videos/5th_axis.mp4',
      'auto-pallet-changer': '/videos/auto_pallet_changer.mp4',
      'special-application': '/videos/special_applications.mp4',
      'special-applications': '/videos/special_applications.mp4',
      'accessories': '/videos/accessories.mp4',
      'intelligent-control': '/videos/intelligent_control.mp4'
    };
    return mapping[id] || '/videos/4th_axis.mp4';
  };

  const productData = PRODUCT_DATABASE[productId] || PRODUCT_DATABASE['4th-axis'];

  // Check screen width for responsive rendering
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // Expanded accordion drawer states
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);

    // Initialize accordion states so the first model in each size is open by default
    const initial = {};
    productData.items.forEach((item) => {
      if (item.products && item.products.length > 0) {
        initial[`${item.size}-${item.products[0].name}`] = true;
      }
    });
    setExpanded(initial);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [productId, productData]);

  const toggleProduct = (size, productName) => {
    const key = `${size}-${productName}`;
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div style={styles.container}>

      {/* FIXED HEADER WRAPPER */}
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
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={styles.logoGroup}>
              <img
                src="/logo_axis/logo%20axis.jpg.jpeg"
                alt="Axis Engineering Solutions Logo"
                style={styles.logoImage}
              />
            </div>
          </Link>

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

      {/* SPLIT COLUMN DETAILS & ANIMATION PANEL */}
      <div style={{
        ...styles.splitWrapper,
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        
        {/* LEFT COLUMN: STICKY 3D VIDEO PREVIEW */}
        <div style={isMobile ? styles.leftStickyColMobile : styles.leftFixedColDesktop}>
          <video
            key={productId}
            src={getVideoUrl(productId)}
            autoPlay
            loop
            muted
            playsInline
            style={styles.detailVideo}
          />
          <div style={styles.canvasGradOverlay} />
          <div style={styles.canvasLabelOverlay}>
            <span style={styles.canvasLabelIcon}>◈</span>
            <span>CINEMATIC 3D ROTATION PREVIEW</span>
          </div>
        </div>

        {/* RIGHT COLUMN: SCROLLING DETAILS LIST */}
        <div style={isMobile ? styles.rightScrollColMobile : styles.rightScrollColDesktop}>
          {/* CATEGORY HERO SECTION */}
          <section style={styles.heroSection}>
            <div style={styles.heroContent}>
              <span style={styles.heroBadge}>DETRON INDUSTRIAL RANGE</span>
              <h1 style={styles.heroTitle}>{productData.title}</h1>
              <p style={styles.heroDescription}>{productData.description}</p>
              <div style={styles.heroDivider} />
            </div>
          </section>

          <h3 style={styles.specificationsHeading}>Product Lineup & Technical Configurations</h3>
          
          <div style={styles.lineupList}>
            {productData.items.map((item, idx) => (
              <div key={idx} style={styles.modelCard}>
                <div style={styles.modelHeader}>
                  <div style={styles.modelIndex}>0{idx + 1}</div>
                  <h4 style={styles.modelSizeTitle}>{item.size}</h4>
                </div>

                <div style={styles.modelBody}>
                  {item.products.map((prod) => {
                    const isExpanded = !!expanded[`${item.size}-${prod.name}`];
                    return (
                      <div key={prod.name} style={styles.accordionContainer}>
                        {/* ACCORDION HEADER TOGGLE */}
                        <div
                          style={isExpanded ? styles.accordionHeaderActive : styles.accordionHeader}
                          onClick={() => toggleProduct(item.size, prod.name)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <h5 style={styles.accordionTitle}>{prod.name}</h5>
                            <span style={styles.accordionBadge}>{prod.badge}</span>
                          </div>
                          <span style={styles.accordionIndicator}>
                            {isExpanded ? '▲ CLAMP' : '▼ VIEW DETAILS'}
                          </span>
                        </div>

                        {/* ACCORDION EXPANSION DRAWER */}
                        {isExpanded && (
                          <div style={styles.accordionContent}>
                            {/* Left Specs Side */}
                            <div style={styles.modelDetailsHalf}>
                              <p style={styles.modelText}>{prod.description}</p>
                              
                              <table style={styles.specTable}>
                                <tbody>
                                  {Object.entries(prod.specs).map(([key, val]) => (
                                    <tr key={key} style={styles.specRow}>
                                      <td style={styles.specKey}>{key}</td>
                                      <td style={styles.specVal}>{val}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>

                              <Link to="/contact" style={styles.enquireButton}>
                                ENQUIRE ABOUT {prod.name} &gt;
                              </Link>
                            </div>

                            {/* Right Image Side */}
                            <div style={styles.modelImageHalf}>
                              <div style={styles.productImageWrapper}>
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  style={styles.productImage}
                                  onError={(e) => {
                                    e.target.src = '/images/detron.jpeg';
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Render Footer at bottom of right scroll column for desktop, or below it on mobile */}
          {!isMobile && <div style={{ marginTop: '56px' }}><Footer /></div>}
        </div>

      </div>

      {/* FOOTER FOR MOBILE (Spans full screen width) */}
      {isMobile && <Footer />}

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

  /* FIXED HEADER WRAPPERS */
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottom: '1px solid #e2e8f0'
  },
  logoGroup: { cursor: 'pointer', display: 'flex', alignItems: 'center' },
  logoImage: { height: '48px', width: 'auto', display: 'block', objectFit: 'contain' },
  navMenu: { display: 'flex', alignItems: 'center', gap: '28px' },
  navLink: {
    textDecoration: 'none',
    color: '#0f172a',
    fontWeight: '700',
    fontSize: '12px',
    letterSpacing: '0.5px'
  },
  navLinkActive: {
    textDecoration: 'none',
    color: '#E30613',
    fontWeight: '800',
    fontSize: '12px',
    letterSpacing: '0.5px'
  },
  contactHeaderBtn: {
    backgroundColor: '#000000',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '2px',
    fontWeight: '700',
    fontSize: '12px'
  },

  /* CATEGORY HERO */
  heroSection: {
    padding: '24px 0',
    textAlign: 'left',
    borderBottom: 'none'
  },
  heroContent: {
    maxWidth: '100%',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px'
  },
  heroBadge: {
    fontSize: '10px',
    fontWeight: '900',
    letterSpacing: '1.5px',
    color: '#E30613',
    backgroundColor: 'rgba(227, 6, 19, 0.12)',
    padding: '6px 14px',
    borderRadius: '30px'
  },
  heroTitle: {
    fontSize: '44px',
    fontWeight: '900',
    letterSpacing: '0.5px',
    margin: 0,
    color: '#ffffff'
  },
  heroDescription: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#cbd5e1',
    maxWidth: '650px',
    margin: '8px auto 0 auto'
  },
  heroDivider: {
    width: '60px',
    height: '3px',
    backgroundColor: '#E30613',
    borderRadius: '1.5px',
    marginTop: '16px'
  },

  /* SPLIT LAYOUT */
  splitWrapper: {
    display: 'flex',
    width: '100%',
    position: 'relative'
  },
  
  /* LEFT STATIC ANIMATOR (DESKTOP) */
  leftFixedColDesktop: {
    width: '45vw',
    position: 'fixed',
    top: '140px',
    left: 0,
    height: 'calc(100vh - 140px)',
    overflow: 'hidden',
    borderRight: '1px solid #1a1a1a',
    backgroundColor: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  },

  /* LEFT STATIC ANIMATOR (MOBILE) */
  leftStickyColMobile: {
    width: '100%',
    position: 'relative',
    height: '45vh',
    overflow: 'hidden',
    borderBottom: '1px solid #1a1a1a',
    backgroundColor: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none'
  },

  canvasGradOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.4) 100%)',
    pointerEvents: 'none'
  },
  canvasLabelOverlay: {
    position: 'absolute',
    bottom: '32px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(10, 10, 10, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(8px)',
    color: '#94a3b8',
    padding: '8px 16px',
    borderRadius: '30px',
    fontSize: '10px',
    fontWeight: '800',
    letterSpacing: '1.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    pointerEvents: 'none',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
  },
  canvasLabelIcon: {
    color: '#E30613',
    fontSize: '12px'
  },

  /* RIGHT SCROLL PANEL (DESKTOP) */
  rightScrollColDesktop: {
    marginLeft: '45vw', // prevents overlay under fixed panel
    width: '55vw',
    padding: '56px 48px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
    backgroundColor: '#050505',
    minHeight: 'calc(100vh - 140px)'
  },

  /* RIGHT SCROLL PANEL (MOBILE) */
  rightScrollColMobile: {
    width: '100%',
    padding: '32px 16px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    backgroundColor: '#050505'
  },

  specificationsHeading: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#ffffff',
    margin: 0,
    textAlign: 'left',
    letterSpacing: '0.5px',
    borderBottom: '1px solid #1a1a1a',
    paddingBottom: '16px'
  },
  lineupList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },

  /* MODEL CARD */
  modelCard: {
    backgroundColor: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: '12px',
    padding: '24px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    textAlign: 'left',
    boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
  },
  modelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    borderBottom: '1px solid #1a1a1a',
    paddingBottom: '12px'
  },
  modelIndex: {
    fontSize: '14px',
    fontWeight: '900',
    color: '#E30613',
    backgroundColor: 'rgba(227, 6, 19, 0.1)',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modelSizeTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#ffffff',
    margin: 0
  },
  modelBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },

  /* ACCORDION DESIGNS */
  accordionContainer: {
    width: '100%'
  },
  accordionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    backgroundColor: '#121212',
    border: '1px solid #222',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  accordionHeaderActive: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #E30613',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  accordionTitle: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#ffffff',
    margin: 0,
    letterSpacing: '0.5px'
  },
  accordionBadge: {
    fontSize: '11px',
    color: '#94a3b8',
    fontWeight: '600'
  },
  accordionIndicator: {
    fontSize: '11px',
    color: '#E30613',
    fontWeight: '800',
    letterSpacing: '1px'
  },
  accordionContent: {
    backgroundColor: '#0c0c0c',
    border: '1px solid #222',
    borderTop: 'none',
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '28px',
    boxSizing: 'border-box'
  },

  modelDetailsHalf: {
    flex: '1 1 260px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'left'
  },
  modelText: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#cbd5e1',
    margin: 0
  },
  enquireButton: {
    backgroundColor: '#E30613',
    border: 'none',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '11px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    textAlign: 'center'
  },
  modelImageHalf: {
    flex: '1 1 200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  productImageWrapper: {
    width: '100%',
    maxWidth: '280px',
    height: '180px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #222',
    backgroundColor: '#000000',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '12px',
    boxSizing: 'border-box'
  },

  /* SPECIFICATIONS TABLE */
  specTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '8px',
    marginBottom: '8px',
    fontSize: '12px'
  },
  specRow: {
    borderBottom: '1px solid #1f1f1f'
  },
  specKey: {
    padding: '6px 12px 6px 0',
    color: '#94a3b8',
    fontWeight: '500',
    width: '50%',
    textAlign: 'left'
  },
  specVal: {
    padding: '6px 0 6px 12px',
    color: '#f8fafc',
    fontWeight: '700',
    textAlign: 'right'
  }
};
