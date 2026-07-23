import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor
 * A premium, dependency-free custom cursor with a snapping core dot
 * and an eased trailing ring. Built for performance: the animation
 * loop mutates DOM styles directly via refs instead of driving
 * React re-renders on every mousemove/rAF tick.
 *
 * Usage: mount once near the root of your app, e.g. in HomePage or App.jsx
 *   <CustomCursor />
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Mutable state that never triggers React re-renders
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const isPointer = useRef(false);
  const isPressed = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    // Skip entirely on touch-only devices — a custom cursor there is
    // both meaningless and can visually glitch on first tap.
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!supportsHover) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target;
      const interactive =
        target.closest('a, button, input, textarea, select, [data-cursor="pointer"]') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (interactive !== isPointer.current) {
        isPointer.current = interactive;
        ringRef.current?.classList.toggle('is-pointer', interactive);
      }
    };

    const handleMouseDown = () => {
      isPressed.current = true;
      ringRef.current?.classList.add('is-pressed');
      dotRef.current?.classList.add('is-pressed');
    };

    const handleMouseUp = () => {
      isPressed.current = false;
      ringRef.current?.classList.remove('is-pressed');
      dotRef.current?.classList.remove('is-pressed');
    };

    const handleMouseLeaveWindow = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const handleMouseEnterWindow = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Single rAF loop drives both dot (snappy) and ring (eased trail)
    // by writing transforms directly — no setState, no re-render.
    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Rendered unconditionally; on touch devices the effect above
  // never runs, so these stay inert at (-100,-100), fully hidden.
  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
      <style>{`
        body.custom-cursor-active,
        body.custom-cursor-active * {
          cursor: none !important;
        }

        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #000000;
          pointer-events: none;
          z-index: 9999;
          opacity: 1;
          transition: opacity 0.2s ease, background-color 0.2s ease;
          will-change: transform;
        }
        .custom-cursor-dot.is-pressed {
          background-color: #E30613;
        }

        .custom-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.6);
          background-color: transparent;
          pointer-events: none;
          z-index: 9998;
          opacity: 1;
          transition: width 0.25s cubic-bezier(0.25, 1, 0.5, 1),
                      height 0.25s cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 0.2s ease,
                      background-color 0.2s ease,
                      opacity 0.2s ease;
          will-change: transform;
        }
        .custom-cursor-ring.is-pointer {
          width: 58px;
          height: 58px;
          border-color: #E30613;
          background-color: rgba(227, 6, 19, 0.1);
        }
        .custom-cursor-ring.is-pressed {
          width: 30px;
          height: 30px;
        }
      `}</style>
    </>
  );
}