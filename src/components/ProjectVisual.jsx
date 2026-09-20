/**
 * Procedural project visual — no stock photography or placeholder
 * images. A layered SVG "hologram" panel colored per-project via
 * its accent, with a grid, orbiting ring and glow.
 */
export default function ProjectVisual({ accent = '#38BDF8', index = 0 }) {
  const uid = `proj-${index}`;

  return (
    <div className="relative h-44 w-full overflow-hidden rounded-xl border border-white/5 bg-bg-secondary sm:h-52">
      <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <pattern id={`${uid}-grid`} width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 22 0 L 0 0 0 22" fill="none" stroke={accent} strokeOpacity="0.12" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="400" height="220" fill={`url(#${uid}-grid)`} />
        <rect width="400" height="220" fill={`url(#${uid}-glow)`} />

        <g className="origin-center animate-[spin_18s_linear_infinite]" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <ellipse cx="200" cy="110" rx="90" ry="30" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1" />
        </g>
        <g className="origin-center animate-[spin_26s_linear_infinite_reverse]" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <ellipse cx="200" cy="110" rx="60" ry="60" fill="none" stroke={accent} strokeOpacity="0.25" strokeWidth="1" />
        </g>

        <circle cx="200" cy="110" r="10" fill={accent} fillOpacity="0.85" />
        <circle cx="200" cy="110" r="22" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1" />

        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          const x = 200 + Math.cos(angle) * 70;
          const y = 110 + Math.sin(angle) * 40;
          return <circle key={i} cx={x} cy={y} r="2.4" fill={accent} fillOpacity="0.7" />;
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
    </div>
  );
}
