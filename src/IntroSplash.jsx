import React, { useEffect, useState } from 'react';

export default function IntroSplash({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fading out the overall container at 2.4 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2400);

    // Completely remove the splash screen from DOM at 3.0 seconds
    const completeTimer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div style={{
      ...styles.overlay,
      opacity: fadeOut ? 0 : 1,
      pointerEvents: fadeOut ? 'none' : 'all'
    }}>
      <style>{`
        @keyframes splashScale {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }
          15% {
            opacity: 1;
            transform: scale(1);
          }
          80% {
            opacity: 1;
            transform: scale(1.03);
          }
          100% {
            opacity: 0;
            transform: scale(1.06);
          }
        }
        .splash-logo-container {
          display: flex;
          align-items: center;
          gap: 32px;
          animation: splashScale 2.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .splash-logo-axis {
          height: 76px;
          width: auto;
          object-fit: contain;
          border-radius: 4px;
        }
        .splash-logo-detron {
          height: 64px;
          width: auto;
          object-fit: contain;
        }
        .splash-divider {
          height: 60px;
          width: 2px;
          background-color: #cbd5e1;
        }
      `}</style>
      <div className="splash-logo-container">
        <img
          src="/logo_axis/logo%20axis.jpg.jpeg"
          alt="Axis Engineering Solutions Logo"
          className="splash-logo-axis"
        />
        <div className="splash-divider" />
        <img
          src="/logo_axis/logo_detron.jpg.png"
          alt="Detron Logo"
          className="splash-logo-detron"
        />
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
    transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
  }
};
