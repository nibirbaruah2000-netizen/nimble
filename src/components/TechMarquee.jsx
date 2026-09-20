import TechIcon from './TechIcon';
import { SKILLS } from '../data/skills';

export default function TechMarquee({ className = '' }) {
  // Duplicate array so seamless infinite loop scrolls smoothly
  const marqueeItems = [...SKILLS, ...SKILLS, ...SKILLS];

  return (
    <div
      className={`relative w-full overflow-hidden py-4 border-y border-white/5 bg-bg-secondary/40 backdrop-blur-sm ${className}`}
      aria-label="Technologies and skills"
    >
      {/* Edge gradient fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-bg to-transparent" />

      {/* Marquee track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]">
        {marqueeItems.map((skill, index) => (
          <div
            key={`${skill.id}-${index}`}
            className="group mx-3 sm:mx-4 flex items-center gap-2.5 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 text-ice-light/70 transition-all duration-300 hover:border-ice/30 hover:bg-ice/5 hover:text-ice-light cursor-default"
          >
            <TechIcon
              name={skill.id}
              size={17}
              className="text-ice group-hover:text-ice-accent transition-colors"
            />
            <span className="font-mono text-xs uppercase tracking-[0.12em] font-medium whitespace-nowrap">
              {skill.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
