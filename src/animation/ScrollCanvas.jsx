import React, { useEffect, useRef } from 'react';

export default function ScrollCanvas({ totalFrames, folderPath = '/frames' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !totalFrames) return;
    const ctx = canvas.getContext('2d');

    const images = [];
    let currentFrame = 0;
    let targetFrame = 0;
    let animId;

    // Zero-padded filename generator (e.g., frame_0000.jpg, frame_0001.jpg)
    const getFrameUrl = (index) => {
      const paddedIndex = String(index).padStart(4, '0');
      return `${folderPath}/frame_${paddedIndex}.jpg`;
    };

    // Get exact parent container dimensions instead of full window size
    const getContainerBounds = () => {
      const parent = canvas.parentElement;
      if (parent) {
        return {
          w: parent.clientWidth || window.innerWidth,
          h: parent.clientHeight || window.innerHeight
        };
      }
      return { w: window.innerWidth, h: window.innerHeight };
    };

    const resizeCanvas = () => {
      const { w, h } = getContainerBounds();
      const dpr = window.devicePixelRatio || 1;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = w * dpr;
      canvas.height = h * dpr;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);
      renderFrame();
    };

    const renderFrame = () => {
      const index = Math.max(0, Math.min(totalFrames - 1, Math.round(currentFrame)));
      let img = images[index];

      // Fallback search: find nearest loaded frame if target frame isn't ready
      if (!img || !img.complete || img.naturalWidth === 0) {
        let minDiff = Infinity;
        let closestImg = null;

        for (let i = 0; i < totalFrames; i++) {
          const candidate = images[i];
          if (candidate && candidate.complete && candidate.naturalWidth > 0) {
            const diff = Math.abs(i - index);
            if (diff < minDiff) {
              minDiff = diff;
              closestImg = candidate;
            }
          }
        }
        img = closestImg;
      }

      if (img && img.complete && img.naturalWidth > 0) {
        const { w, h } = getContainerBounds();
        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;

        let drawW, drawH, drawX, drawY;

        // Cover-fit object scaling inside container bounds
        if (imgRatio > canvasRatio) {
          drawH = h;
          drawW = h * imgRatio;
          drawX = (w - drawW) / 2;
          drawY = 0;
        } else {
          drawW = w;
          drawH = w / imgRatio;
          drawX = 0;
          drawY = (h - drawH) / 2;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }
    };

    // Animation Loop with Easing Physics
    const loop = () => {
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.001) {
        currentFrame += diff * 0.15; // Animation speed / easing rate
        renderFrame();
      }
      animId = requestAnimationFrame(loop);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll > 0) {
        const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));
        targetFrame = progress * (totalFrames - 1);
      }
    };

    // Preload image sequence according to supplied totalFrames count
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      images[i] = img;
      if (i === 0) {
        img.onload = () => renderFrame();
      }
    }

    // Observe parent container size changes dynamically
    const parent = canvas.parentElement;
    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    if (parent) resizeObserver.observe(parent);

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });

    resizeCanvas();
    animId = requestAnimationFrame(loop);

    return () => {
      if (parent) resizeObserver.unobserve(parent);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [totalFrames, folderPath]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}