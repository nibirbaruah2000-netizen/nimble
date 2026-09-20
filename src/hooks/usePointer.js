import { useEffect, useRef } from 'react';

/**
 * Tracks pointer position normalized to [-1, 1] on both axes,
 * with (0,0) at the center of the viewport. Stored in a ref so
 * consumers (e.g. useFrame loops) can read it without re-rendering.
 */
export function usePointerRef() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      pointer.current.x = x;
      pointer.current.y = y;
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return pointer;
}
