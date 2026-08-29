import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setLoading(true);
      setTransitionStage('fadeOut');

      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
        setLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      <style>{`
        @keyframes topLoadingBar {
          0% { width: 0%; left: 0; }
          50% { width: 70%; left: 15%; }
          100% { width: 100%; left: 0; }
        }
        .page-fade-in {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.25s ease-out, transform 0.25s ease-out;
        }
        .page-fade-out {
          opacity: 0.2;
          transform: translateY(6px);
          transition: opacity 0.2s ease-in, transform 0.2s ease-in;
        }
      `}</style>

      {/* TOP ROUTE TRANSITION PROGRESS BAR */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: '#E30613',
            zIndex: 999999,
            boxShadow: '0 0 10px rgba(227, 6, 19, 0.8), 0 0 5px rgba(227, 6, 19, 0.6)',
            animation: 'topLoadingBar 0.3s ease-in-out infinite'
          }}
        />
      )}

      {/* ROUTE CONTENT WITH FADE/SLIDE TRANSITION */}
      <div className={transitionStage === 'fadeIn' ? 'page-fade-in' : 'page-fade-out'}>
        {children}
      </div>
    </div>
  );
}
