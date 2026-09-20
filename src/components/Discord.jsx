import { lazy, Suspense } from 'react';
import { MessageCircle, Users, Hash } from 'lucide-react';
import Reveal from './Reveal';
import MagneticButton from './MagneticButton';
import SafeLink from './SafeLink';
import { PROFILE, SOCIAL_LINKS } from '../data/social';

const DiscordOrbCanvas = lazy(() => import('./3d/DiscordOrbCanvas'));

export default function Discord({ showCanvas, reducedMotion }) {
  return (
    <section id="discord" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <div className="glass-panel relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <span className="eyebrow">Community</span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ice-light sm:text-4xl">
                Build with the community.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ice-light/65 sm:text-base">
                {PROFILE.discord.server} is where I share progress, talk shop and help other
                developers building bots and web projects.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-ice-light/60">
                <span className="flex items-center gap-2">
                  <Users size={14} className="text-ice/60" /> {PROFILE.discord.username}
                </span>
                <span className="flex items-center gap-2">
                  <Hash size={14} className="text-ice/60" /> {PROFILE.discord.server}
                </span>
              </div>

              <div className="mt-8">
                <MagneticButton
                  as={SafeLink}
                  href={SOCIAL_LINKS.discord}
                  placeholderTitle="Discord invite coming soon"
                  className="inline-flex items-center gap-2 rounded-full bg-ice px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-bg shadow-glow"
                >
                  <MessageCircle size={15} />
                  Join Discord
                </MagneticButton>
              </div>
            </Reveal>

            <div className="relative h-56 sm:h-64" data-cursor="object">
              {showCanvas && (
                <Suspense fallback={<div className="h-full w-full animate-pulse-slow rounded-full bg-ice/5" />}>
                  <DiscordOrbCanvas reducedMotion={reducedMotion} />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
