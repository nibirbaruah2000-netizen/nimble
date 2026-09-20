import { useEffect, useRef, useState } from 'react';

/**
 * Desktop-only custom cursor: a glowing dot + trailing ring + fading particle trail.
 * Reads data attributes on hovered elements to change state:
 *   data-cursor="button"  -> ring expands
 *   data-cursor="object"  -> ring becomes a larger glow ring
 *   data-cursor="view"    -> ring shows "VIEW" text
 */
export default function CustomCursor({ enabled }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trail0 = useRef(null);
  const trail1 = useRef(null);
  const trail2 = useRef(null);
  const [variant, setVariant] = useState('default');

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add('cursor-active');

    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let ringX = dotX;
    let ringY = dotY;
    let targetX = dotX;
    let targetY = dotY;

    // Trail positions
    const trails = [
      { x: dotX, y: dotY, factor: 0.5 },
      { x: dotX, y: dotY, factor: 0.4 },
      { x: dotX, y: dotY, factor: 0.3 },
    ];

    let raf;

    const handleMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const hovered = e.target.closest('[data-cursor]');
      setVariant(hovered ? hovered.getAttribute('data-cursor') : 'default');
    };

    const animate = () => {
      dotX += (targetX - dotX) * 0.9;
      dotY += (targetY - dotY) * 0.9;
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      if (dotRef.current) dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      // Update trail positions with progressive lag
      let prevX = dotX;
      let prevY = dotY;
      const trailRefs = [trail0.current, trail1.current, trail2.current];

      for (let i = 0; i < trails.length; i++) {
        trails[i].x += (prevX - trails[i].x) * trails[i].factor;
        trails[i].y += (prevY - trails[i].y) * trails[i].factor;

        if (trailRefs[i]) {
          trailRefs[i].style.transform = `translate(${trails[i].x}px, ${trails[i].y}px) translate(-50%, -50%)`;
        }

        prevX = trails[i].x;
        prevY = trails[i].y;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('cursor-active');
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize =
    variant === 'object' ? 64 : variant === 'view' ? 56 : variant === 'button' ? 48 : 34;

  return (
    <>
      {/* 3 fading particle trail dots */}
      <div
        ref={trail2}
        className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full bg-ice/30 shadow-[0_0_6px_rgba(125,211,252,0.4)]"
        style={{ width: 2.5, height: 2.5 }}
      />
      <div
        ref={trail1}
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full bg-ice/50 shadow-[0_0_8px_rgba(125,211,252,0.6)]"
        style={{ width: 3.5, height: 3.5 }}
      />
      <div
        ref={trail0}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-ice/70 shadow-[0_0_8px_rgba(125,211,252,0.8)]"
        style={{ width: 4.5, height: 4.5 }}
      />

      {/* Main cursor dot */}
      <div ref={dotRef} className="cursor-dot" />

      {/* Trailing cursor ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: ringSize,
          height: ringSize,
          background: variant === 'view' ? 'rgba(125,211,252,0.12)' : 'transparent',
          borderColor: variant === 'default' ? 'rgba(125,211,252,0.6)' : 'rgba(125,211,252,0.9)',
        }}
      >
        {variant === 'view' && 'VIEW'}
      </div>
    </>
  );
}
