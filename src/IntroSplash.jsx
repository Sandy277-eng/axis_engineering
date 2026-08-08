import React, { useEffect, useState, useRef } from 'react';

export default function IntroSplash({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef(null);

  const handleFinish = () => {
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 600);
  };

  useEffect(() => {
    // Attempt playback when mounted
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // In case autoplay is blocked, wait fallback time
      });
    }

    // Safety fallback timeout (e.g., 10 seconds max) in case video fails or gets stuck
    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, 10000);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
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
      `}</style>

      <video
        ref={videoRef}
        src="/videos/intro/VID01.mp4"
        className="intro-video-player"
        autoPlay
        muted
        playsInline
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
    zIndex: 99999,
    transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
    overflow: 'hidden',
  }
};

