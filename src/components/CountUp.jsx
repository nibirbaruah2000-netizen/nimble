import { useEffect, useRef, useState } from 'react';

/**
 * Eased count-up animation that starts when the element enters the viewport.
 */
export default function CountUp({
  end,
  duration = 1100,
  prefix = '',
  suffix = '',
  reducedMotion = false,
}) {
  const [count, setCount] = useState(reducedMotion ? end : 0);
  const ref = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setCount(end);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const startTime = performance.now();
          const target = typeof end === 'number' ? end : parseInt(end, 10) || 0;

          const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic: 1 - Math.pow(1 - progress, 3)
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.round(easeOutProgress * target);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [end, duration, reducedMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
