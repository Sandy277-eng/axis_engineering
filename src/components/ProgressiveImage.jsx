import React, { useState } from 'react';

export default function ProgressiveImage({ src, alt, style, className, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: loaded ? 'transparent' : '#f1f5f9',
        borderRadius: style?.borderRadius || '8px',
        ...style
      }}
    >
      <style>{`
        @keyframes shimmerImg {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .img-skeleton-pulse {
          background: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%);
          background-size: 200% 100%;
          animation: shimmerImg 1.5s infinite;
        }
        @keyframes spinFast {
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* SKELETON / LOADING PLACEHOLDER */}
      {!loaded && !error && (
        <div
          className="img-skeleton-pulse"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: 'spinFast 1s linear infinite' }}
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      )}

      {/* FALLBACK IF IMAGE FAILS TO LOAD */}
      {error ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            fontSize: '11px',
            fontWeight: '600',
            padding: '8px'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span style={{ marginTop: '4px' }}>Image Unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt || 'Product Spec'}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: style?.objectFit || 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease-in-out',
            ...style
          }}
          className={className}
          {...props}
        />
      )}
    </div>
  );
}
