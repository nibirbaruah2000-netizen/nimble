import { Github as GithubIcon, GitBranch, Users, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import MagneticButton from './MagneticButton';
import SafeLink from './SafeLink';
import CountUp from './CountUp';
import { useGithubStats } from '../hooks/useGithubStats';
import { PROFILE, SOCIAL_LINKS } from '../data/social';

export default function Github({ reducedMotion = false }) {
  const { data } = useGithubStats();

  return (
    <section id="github" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">GitHub</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ice-light sm:text-4xl">
              Open-source &amp; repositories.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ice-light/60 sm:text-base">
              Code, experiments and open-source tools live on GitHub under{' '}
              <span className="text-ice-light/80">{PROFILE.github.username}</span>.
            </p>
            <div className="mt-8">
              <MagneticButton
                as={SafeLink}
                href={SOCIAL_LINKS.github}
                className="inline-flex items-center gap-2 rounded-full bg-ice px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-bg shadow-glow"
              >
                <GithubIcon size={15} />
                View GitHub Profile
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="glass-panel relative overflow-hidden rounded-2xl p-6 sm:p-8">
            {!data.isLive && (
              <span className="absolute right-4 top-4 rounded-full border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-ice-light/40">
                Demo Preview
              </span>
            )}

            <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-6">
              <Stat
                icon={GitBranch}
                label="Repositories"
                value={data.repositories}
                reducedMotion={reducedMotion}
              />
              <Stat
                icon={Users}
                label="Followers"
                value={data.followers}
                reducedMotion={reducedMotion}
              />
              <Stat
                icon={Activity}
                label="Contributions"
                value={data.contributionsLastYear}
                reducedMotion={reducedMotion}
              />
            </div>

            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ice-light/40">
                Languages
              </p>
              <div className="mt-4 space-y-3">
                {data.topLanguages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between font-mono text-[11px] text-ice-light/60">
                      <span>{lang.name}</span>
                      <span>
                        <CountUp end={lang.percent} suffix="%" reducedMotion={reducedMotion} />
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-ice-accent to-ice shadow-[0_0_8px_rgba(125,211,252,0.5)]"
                        initial={{ width: reducedMotion ? `${lang.percent}%` : 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[11px] leading-relaxed text-ice-light/35">
                Illustrative preview, structured to swap in live GitHub API data — not a claim about
                actual repository statistics.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value, reducedMotion }) {
  return (
    <div>
      <Icon size={16} className="text-ice/60" />
      <p className="mt-2 font-display text-xl font-semibold text-ice-light">
        <CountUp end={value} reducedMotion={reducedMotion} />
      </p>
      <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ice-light/40">{label}</p>
    </div>
  );
}
