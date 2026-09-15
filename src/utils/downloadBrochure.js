import { PRODUCT_DATABASE } from '../products/productData';
import { getSpecificationUnit } from './specUnits';

export function downloadBrochure() {
  // Generate comprehensive HTML catalog document from exact product data
  let catalogHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Axis Engineering Solutions - Official Product Catalog & Technical Data</title>
      <style>
        @page {
          size: A4;
          margin: 15mm;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #0f172a;
          background-color: #ffffff;
          line-height: 1.5;
          margin: 0;
          padding: 24px;
        }
        .header-banner {
          background-color: #05070a;
          color: #ffffff;
          padding: 28px 32px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-left: 6px solid #E30613;
          margin-bottom: 24px;
        }
        .company-title {
          font-size: 24px;
          font-weight: 900;
          color: #E30613;
          letter-spacing: 1px;
          margin: 0;
        }
        .company-sub {
          font-size: 11px;
          font-weight: 800;
          color: #ffffff;
          letterSpacing: 2px;
          margin-top: 2px;
        }
        .contact-info-head {
          text-align: right;
          font-size: 12px;
          color: #cbd5e1;
          line-height: 1.6;
        }
        .contact-info-head strong {
          color: #ffffff;
        }
        .partnership-badge {
          background-color: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 12px 18px;
          font-size: 13px;
          margin-bottom: 28px;
        }
        .section-title {
          font-size: 20px;
          font-weight: 900;
          color: #0f172a;
          border-bottom: 3px solid #E30613;
          padding-bottom: 6px;
          margin-top: 36px;
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .category-desc {
          font-size: 13px;
          color: #475569;
          margin-bottom: 20px;
        }
        .size-header {
          font-size: 14px;
          font-weight: 800;
          color: #E30613;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 8px 14px;
          border-radius: 4px;
          margin-top: 20px;
          margin-bottom: 12px;
        }
        .product-card {
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 18px;
          margin-bottom: 20px;
          page-break-inside: avoid;
        }
        .product-name {
          font-size: 16px;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 6px 0;
        }
        .product-badge {
          display: inline-block;
          background-color: #f1f5f9;
          color: #0f172a;
          border: 1px solid #94a3b8;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .product-desc {
          font-size: 12.5px;
          color: #334155;
          margin-bottom: 12px;
        }
        table.specs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11.5px;
          margin-top: 10px;
        }
        table.specs-table th {
          color: #ffffff;
          padding: 7px 10px;
          text-align: left;
          font-weight: 700;
        }
        table.specs-table th.th-param { width: 44%; background-color: #2c2d30; border-right: 1px solid rgba(255, 255, 255, 0.08); }
        table.specs-table th.th-unit { width: 20%; background-color: #4c5056; border-right: 1px solid rgba(255, 255, 255, 0.08); }
        table.specs-table th.th-val { width: 36%; background-color: #6c717a; }
        table.specs-table td {
          padding: 6px 10px;
          border-bottom: 1px solid #e2e8f0;
        }
        table.specs-table tr:nth-child(even) {
          background-color: #f8fafc;
        }
        table.specs-table td.spec-key {
          font-weight: 600;
          color: #1e293b;
        }
        table.specs-table td.spec-unit {
          color: #64748b;
          font-weight: 500;
        }
        table.specs-table td.spec-val {
          font-weight: 700;
          color: #0f172a;
        }
        .no-print {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 9999;
          background-color: #E30613;
          color: #ffffff;
          border: none;
          padding: 10px 18px;
          font-weight: 700;
          font-size: 13px;
          border-radius: 4px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        @media print {
          .no-print { display: none; }
          body { padding: 0; }
          .product-card { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <button class="no-print" onclick="window.print()">🖨️ Print / Save as PDF</button>

      <div class="header-banner">
        <div class="brand-title">AXIS ENGINEERING SOLUTIONS</div>
        <div class="brand-sub">Exclusive Detron Rotary Tables & Advanced Automation Solutions</div>
      </div>

      <div class="doc-header">
        <h1 class="doc-title">Detron High-Precision Machine Tool Accessories & CNC Rotary Tables</h1>
        <div class="doc-meta">Comprehensive Product Lineup, Engineering Specifications, and Technical Dimensions</div>
      </div>
  `;

  // Iterate over all categories in PRODUCT_DATABASE
  Object.entries(PRODUCT_DATABASE).forEach(([catKey, catData]) => {
    if (catKey === 'special-applications') return; // skip alias duplicate

    catalogHTML += `
      <div class="section-title">${catData.title}</div>
      <div class="category-desc">${catData.description}</div>
    `;

    catData.items.forEach((sizeGroup) => {
      catalogHTML += `<div class="size-header">${sizeGroup.size}</div>`;

      sizeGroup.products.forEach((prod) => {
        catalogHTML += `
          <div class="product-card">
            <div class="product-name">${prod.name}</div>
            ${prod.badge ? `<div class="product-badge">${prod.badge}</div>` : ''}
            <div class="product-desc">${prod.description}</div>
        `;

        if (prod.specs && Object.keys(prod.specs).length > 0) {
          catalogHTML += `
            <table class="specs-table">
              <thead>
                <tr>
                  <th class="th-param">MODEL</th>
                  <th class="th-unit">Unit</th>
                  <th class="th-val">${prod.name}</th>
                </tr>
              </thead>
              <tbody>
          `;

          Object.entries(prod.specs).forEach(([k, v]) => {
            catalogHTML += `
              <tr>
                <td class="spec-key">${k}</td>
                <td class="spec-unit">${getSpecificationUnit(k, v)}</td>
                <td class="spec-val">${v}</td>
              </tr>
            `;
          });

          catalogHTML += `
              </tbody>
            </table>
          `;
        }

        catalogHTML += `</div>`;
      });
    });
  });

  // Footer section of the brochure
  catalogHTML += `
      <div style="margin-top: 40px; padding: 20px; background-color: #0f172a; color: #ffffff; border-radius: 8px; font-size: 12px; line-height: 1.6;">
        <strong style="font-size: 14px; color: #E30613;">Axis Engineering Solutions — Technical & Sales Headquarters</strong><br>
        78-B, First Floor, Geason Housing Colony, 1st Main Road, Ayanambakkam, Chennai, Tamil Nadu 600095, India<br>
        Contact Numbers: +91 98849 12279 / +91 98849 12280 | Direct: +91 90032 24117<br>
        Email: info@axisengineeringsolutions.in | Website: www.axisengineeringsolutions.in<br>
        <em>© ${new Date().getFullYear()} Axis Engineering Solutions. All Rights Reserved.</em>
      </div>
    </body>
    </html>
  `;

  // Open printable catalog directly in a new tab (without auto-downloading an .html file)
  const newWin = window.open('', '_blank');
  if (newWin) {
    newWin.document.write(catalogHTML);
    newWin.document.close();
  }
}
