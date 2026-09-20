import { Suspense, lazy, useState } from 'react';
import Reveal from './Reveal';
import TechIcon from './TechIcon';
import TechMarquee from './TechMarquee';
import { SKILL_DESCRIPTIONS, SKILLS } from '../data/skills';

const Canvas3D = lazy(() => import('./3d/SkillsCanvas'));

export default function Skills({ showCanvas, reducedMotion }) {
  const [activeId, setActiveId] = useState(null);
  const active = SKILLS.find((s) => s.id === activeId);

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <Reveal className="max-w-xl">
          <span className="eyebrow">Skills</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ice-light sm:text-4xl">
            A technology constellation.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ice-light/60 sm:text-base">
            Hover or tap a node to see how each technology fits into what I build. No arbitrary
            percentages — just the tools I reach for.
          </p>
        </Reveal>

        <div className="relative mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div className="relative h-[360px] sm:h-[440px] lg:h-[500px]" data-cursor="object">
            {showCanvas && (
              <Suspense fallback={<div className="h-full w-full animate-pulse-slow rounded-2xl bg-white/5" />}>
                <Canvas3D onHoverSkill={setActiveId} reducedMotion={reducedMotion} />
              </Suspense>
            )}
          </div>

          <Reveal delay={0.15} className="glass-panel rounded-2xl p-7 transition-all duration-300">
            {active ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-ice/40 bg-ice/10 text-ice shadow-[0_0_16px_rgba(125,211,252,0.4)]">
                    <TechIcon name={active.id} size={26} withGlow />
                  </div>
                  <div>
                    <p className="eyebrow">{active.group}</p>
                    <h3 className="font-display text-xl font-semibold text-ice-light">{active.label}</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-ice-light/80">
                  {SKILL_DESCRIPTIONS[active.id]}
                </p>
              </div>
            ) : (
              <>
                <p className="eyebrow">Core Toolkit</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => setActiveId(skill.id)}
                      onMouseEnter={() => setActiveId(skill.id)}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-[10px] text-ice-light/60 transition-all hover:border-ice/40 hover:bg-ice/10 hover:text-ice-light cursor-pointer"
                    >
                      <TechIcon name={skill.id} size={12} className="text-ice/70 group-hover:text-ice" />
                      {skill.label}
                    </button>
                  ))}
                </div>
                <p className="mt-5 text-xs leading-relaxed text-ice-light/40">
                  Hover any node in the constellation or click a tag to inspect it.
                </p>
              </>
            )}
          </Reveal>
        </div>
      </div>

      {/* Tech Marquee: secondary accessible presentation directly below the constellation */}
      <div className="mt-20">
        <TechMarquee />
      </div>
    </section>
  );
}
