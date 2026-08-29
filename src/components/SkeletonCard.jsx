import React from 'react';

export default function SkeletonCard({ count = 2 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(520px, 1fr))', gap: '28px', width: '100%' }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-pulse {
          background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 6px;
        }
      `}</style>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '28px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* TOP BADGE SKELETON */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="skeleton-pulse" style={{ width: '32px', height: '24px', borderRadius: '4px' }} />
            <div className="skeleton-pulse" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
          </div>

          {/* MAIN CONTENT SKELETON */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="skeleton-pulse" style={{ width: '60%', height: '24px' }} />
              <div className="skeleton-pulse" style={{ width: '40%', height: '28px' }} />
              <div className="skeleton-pulse" style={{ width: '100%', height: '14px' }} />
              <div className="skeleton-pulse" style={{ width: '85%', height: '14px' }} />
            </div>
            <div className="skeleton-pulse" style={{ width: '200px', height: '160px', borderRadius: '12px' }} />
          </div>

          {/* FEATURE BAR SKELETON */}
          <div className="skeleton-pulse" style={{ width: '100%', height: '54px', borderRadius: '12px' }} />

          {/* BUTTONS SKELETON */}
          <div style={{ display: 'flex', gap: '14px' }}>
            <div className="skeleton-pulse" style={{ flex: 1, height: '42px', borderRadius: '8px' }} />
            <div className="skeleton-pulse" style={{ flex: 1, height: '42px', borderRadius: '8px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
