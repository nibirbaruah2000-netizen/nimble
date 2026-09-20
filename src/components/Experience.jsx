import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from './Reveal';
import TechIcon from './TechIcon';
import { EXPERIENCE } from '../data/experience';

gsap.registerPlugin(ScrollTrigger);

export default function Experience({ reducedMotion = false }) {
  const containerRef = useRef(null);
  const lineProgressRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || !containerRef.current || !lineProgressRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineProgressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.6,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <Reveal className="max-w-xl">
          <span className="eyebrow">Experience</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ice-light sm:text-4xl">
            Where my focus has been.
          </h2>
        </Reveal>

        <div ref={containerRef} className="relative mt-16">
          {/* Background track line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-white/5 sm:left-[19px]" />

          {/* Dynamic drawing connecting line */}
          <div
            ref={lineProgressRef}
            style={{ transformOrigin: 'top center' }}
            className={`absolute left-[15px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-ice-accent via-ice to-ice-light shadow-[0_0_10px_rgba(125,211,252,0.8)] sm:left-[19px] ${
              reducedMotion ? 'scale-y-100' : ''
            }`}
          />

          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((entry, i) => (
              <Reveal key={entry.id} delay={i * 0.1} className="relative flex gap-6 sm:gap-8">
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ice/40 bg-bg shadow-glow-sm sm:h-10 sm:w-10">
                  <span className="h-2 w-2 rounded-full bg-ice shadow-[0_0_8px_rgba(125,211,252,0.9)]" />
                </div>

                <div className="glass-panel flex-1 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:border-ice/30">
                  <h3 className="font-display text-lg font-semibold text-ice-light sm:text-xl">
                    {entry.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ice-light/65">
                    {entry.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] text-ice-light/55 transition-colors hover:text-ice-light hover:border-ice/20"
                      >
                        <TechIcon name={tag} size={11} className="text-ice/60" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
