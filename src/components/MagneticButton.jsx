import { useRef, useState } from 'react';

/**
 * Wraps any button/link and gives it a subtle magnetic pull toward
 * the cursor while hovered, snapping back on leave.
 * Also adds an ice-blue ripple effect on click and hover background wipe.
 */
export default function MagneticButton({
  as: Component = 'button',
  className = '',
  children,
  strength = 18,
  withWipe = true,
  onClick,
  ...props
}) {
  const ref = useRef(null);
  const [ripples, setRipples] = useState([]);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)';
  };

  const handleClick = (e) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = {
        x,
        y,
        id: Date.now() + Math.random(),
      };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 550);
    }
    onClick?.(e);
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      data-cursor="button"
      className={`group relative overflow-hidden magnetic-btn transition-transform duration-200 ease-out ${className}`}
      {...props}
    >
      {/* Background hover wipe layer */}
      {withWipe && (
        <span className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-ice-accent/30 via-ice/20 to-transparent transition-transform duration-300 ease-out group-hover:scale-x-100" />
      )}

      {/* Ripple elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="btn-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 24,
            height: 24,
            marginLeft: -12,
            marginTop: -12,
          }}
        />
      ))}

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
}
