import { Github, MessageCircle, Code2 } from 'lucide-react';
import SafeLink from './SafeLink';
import { PROFILE, SOCIAL_LINKS } from '../data/social';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="section-shell flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-base font-semibold tracking-[0.18em] text-ice-light">
            {PROFILE.brandName}
          </p>
          <p className="mt-1 font-mono text-[11px] text-ice-light/40">
            © {YEAR} {PROFILE.name}. All rights reserved.
          </p>
          <div className="mt-3 flex items-center justify-center sm:justify-start gap-1.5 font-mono text-xs text-ice/80">
            <Code2 size={13} className="text-ice-accent" />
            <span>
              Developed By{' '}
              <span className="font-semibold text-ice-light drop-shadow-[0_0_8px_rgba(125,211,252,0.5)]">
                Mohsin.Exe
              </span>{' '}
              and Development team{' '}
              <SafeLink
                href={SOCIAL_LINKS.discord}
                className="font-semibold text-ice underline decoration-ice/40 underline-offset-4 transition-colors hover:text-ice-light hover:decoration-ice"
              >
                CodeX Development
              </SafeLink>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SafeLink
            href={SOCIAL_LINKS.github}
            data-cursor="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ice-light/60 transition-colors hover:border-ice/40 hover:text-ice-light"
          >
            <Github size={15} />
          </SafeLink>
          <SafeLink
            href={SOCIAL_LINKS.discord}
            data-cursor="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ice-light/60 transition-colors hover:border-ice/40 hover:text-ice-light"
          >
            <MessageCircle size={15} />
          </SafeLink>
        </div>
      </div>
    </footer>
  );
}
