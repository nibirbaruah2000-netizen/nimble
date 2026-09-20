import { ExternalLink, Github } from 'lucide-react';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import ProjectVisual from './ProjectVisual';
import SafeLink from './SafeLink';
import TechIcon from './TechIcon';
import { PROJECTS } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <Reveal className="max-w-xl">
          <span className="eyebrow">Selected Work</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ice-light sm:text-4xl">
            Projects worth a closer look.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ice-light/60 sm:text-base">
            A mix of Discord systems, web platforms and open-source tools — links are wired up and
            ready as soon as repositories and demos go public.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.1}>
              <TiltCard className="h-full rounded-2xl" maxTilt={6}>
                {/* Border container with traveling gradient on hover */}
                <div className="relative h-full rounded-2xl p-[1.5px] overflow-hidden group/border border border-white/5 transition-colors duration-300 hover:border-transparent">
                  {/* Traveling gradient border */}
                  <div className="traveling-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Card inner body */}
                  <div className="glass-panel relative z-10 flex h-full flex-col overflow-hidden rounded-[15px] p-5">
                    {/* Diagonal shine sweep */}
                    <div className="shine-sweep z-20" />

                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ boxShadow: `inset 0 0 0 1px ${project.accent}55` }}
                    />

                    <ProjectVisual accent={project.accent} index={i} />

                    <div className="mt-5 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ice/60">
                          {project.category}
                        </p>
                        <h3 className="mt-1 font-display text-xl font-semibold text-ice-light transition-colors group-hover:text-white">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <SafeLink
                          href={project.github}
                          data-cursor="view"
                          placeholderTitle="Repository coming soon"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ice-light/70 transition-colors hover:border-ice/40 hover:text-ice-light"
                        >
                          <Github size={15} />
                        </SafeLink>
                        <SafeLink
                          href={project.demo}
                          data-cursor="view"
                          placeholderTitle="Live demo coming soon"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ice-light/70 transition-colors hover:border-ice/40 hover:text-ice-light"
                        >
                          <ExternalLink size={15} />
                        </SafeLink>
                      </div>
                    </div>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ice-light/60">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-white/5 pt-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] text-ice-light/60 transition-colors hover:border-ice/30 hover:text-ice-light"
                        >
                          <TechIcon name={tech} size={11} className="text-ice/70" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
