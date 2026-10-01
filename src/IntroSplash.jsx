import React, { useEffect, useState, useRef, useCallback } from 'react';

export default function IntroSplash({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef(null);

  const handleFinish = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 350);
  }, [onComplete]);

  const applySpeed = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.75; // Increased speed for snappy intro
    }
  };

  useEffect(() => {
    // Attempt playback when mounted with increased speed
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.75;
      videoRef.current.play().catch(() => {
        // In case autoplay is blocked, wait fallback time
      });
    }

    // Safety fallback timeout (e.g. 5 seconds max)
    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, 5000);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, [handleFinish]);

  if (!visible) return null;

  return (
    <div
      onClick={handleFinish}
      style={{
        ...styles.overlay,
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      <style>{`
        .intro-video-player {
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          display: block;
        }
        .intro-skip-btn {
          position: absolute;
          top: 24px;
          right: 28px;
          background: rgba(0, 0, 0, 0.55);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 20px;
          padding: 8px 18px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
          z-index: 10;
        }
        .intro-skip-btn:hover {
          background: #E30613;
          border-color: #E30613;
          color: #ffffff;
          box-shadow: 0 0 15px rgba(227, 6, 19, 0.6);
        }
      `}</style>

      <button className="intro-skip-btn" onClick={(e) => { e.stopPropagation(); handleFinish(); }}>
        SKIP INTRO &gt;
      </button>

      <video
        ref={videoRef}
        src="/videos/intro/VID01.mp4"
        className="intro-video-player"
        autoPlay
        muted
        playsInline
        onLoadedMetadata={applySpeed}
        onPlay={applySpeed}
        onEnded={handleFinish}
        onError={handleFinish}
      />
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
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2147483647,
    transition: 'opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
    overflow: 'hidden',
    cursor: 'pointer'
  }
};

