import { Github, MessageCircle, Mail } from 'lucide-react';
import Reveal from './Reveal';
import MagneticButton from './MagneticButton';
import SafeLink from './SafeLink';
import { SOCIAL_LINKS } from '../data/social';

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 sm:py-44">
      <div className="grid-overlay" />
      <div className="section-shell relative text-center">
        <Reveal>
          <span className="eyebrow">Contact</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-ice-light sm:text-5xl md:text-6xl">
            Have an idea?
            <br />
            <span className="text-ice drop-shadow-[0_0_24px_rgba(125,211,252,0.4)]">
              Let&apos;s build it.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-ice-light/60 sm:text-base">
            Have a project, collaboration or interesting idea? Let&apos;s create something
            memorable.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            as={SafeLink}
            href={SOCIAL_LINKS.github}
            className="inline-flex items-center gap-2 rounded-full bg-ice px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-bg shadow-glow"
          >
            <Github size={15} /> GitHub
          </MagneticButton>
          <MagneticButton
            as={SafeLink}
            href={SOCIAL_LINKS.discord}
            className="inline-flex items-center gap-2 rounded-full border border-ice/30 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ice-light hover:bg-ice/10"
          >
            <MessageCircle size={15} /> Discord
          </MagneticButton>
          <MagneticButton
            as={SafeLink}
            href={SOCIAL_LINKS.email}
            placeholderTitle="Email coming soon"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ice-light/70 hover:border-ice/30 hover:text-ice-light"
          >
            <Mail size={15} /> Email
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
