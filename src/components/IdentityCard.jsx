import { Github, MessageCircle } from 'lucide-react';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import TechIcon from './TechIcon';
import { PROFILE } from '../data/social';

export default function IdentityCard() {
  return (
    <section className="relative py-10 sm:py-16">
      <div className="section-shell flex justify-center">
        <Reveal className="w-full max-w-md">
          <TiltCard className="rounded-3xl" maxTilt={7}>
            <div className="glass-panel relative overflow-hidden rounded-3xl border-ice/20 p-8">
              {/* scan line */}
              <div className="scan-line absolute inset-0 animate-scan opacity-70" />

              {/* corner brackets */}
              <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-ice/50" />
              <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-ice/50" />
              <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-ice/50" />
              <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-ice/50" />

              <div className="relative flex items-center justify-between">
                <span className="eyebrow">Developer ID</span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-ice/70">
                  <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-ice" />
                  VERIFIED
                </span>
              </div>

              <div className="relative mt-8 flex items-center gap-5">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-ice/30 bg-ice/5 shadow-[0_0_15px_rgba(125,211,252,0.2)]">
                  <span className="font-display text-xl font-semibold text-ice-light">
                    {PROFILE.displayName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ice-light">
                    {PROFILE.name}
                  </h3>
                  <p className="font-mono text-xs text-ice/70">{PROFILE.username}</p>
                </div>
              </div>

              <div className="relative mt-7 flex flex-wrap gap-2">
                {PROFILE.roles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ice-light/60 transition-colors hover:border-ice/30 hover:text-ice-light"
                  >
                    <TechIcon
                      name={
                        role.toLowerCase().includes('discord')
                          ? 'discordjs'
                          : role.toLowerCase().includes('web')
                          ? 'react'
                          : 'git'
                      }
                      size={11}
                      className="text-ice/70"
                    />
                    {role}
                  </span>
                ))}
              </div>

              <div className="relative mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                <div className="flex items-center gap-2">
                  <Github size={14} className="text-ice/70" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-ice-light/40">
                      GitHub
                    </p>
                    <p className="font-mono text-xs text-ice-light/80">{PROFILE.github.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={14} className="text-ice/70" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-ice-light/40">
                      Discord
                    </p>
                    <p className="font-mono text-xs text-ice-light/80">{PROFILE.discord.username}</p>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
