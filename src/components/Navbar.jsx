import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';
import { PROFILE } from '../data/social';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="section-shell">
        <div
          className={`flex items-center justify-between rounded-full border px-5 py-3 transition-all duration-500 ${
            scrolled
              ? 'border-ice/20 bg-bg/80 shadow-glow-sm backdrop-blur-xl'
              : 'border-white/5 bg-white/[0.02] backdrop-blur-md'
          }`}
        >
          <button
            onClick={() => handleNavClick('home')}
            data-cursor="button"
            className="font-display text-sm font-semibold tracking-[0.15em] text-ice-light"
          >
            {PROFILE.brandName}
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                data-cursor="button"
                onClick={() => handleNavClick(item.id)}
                className="group relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ice-light/70 transition-colors hover:text-ice-light"
              >
                {activeId === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-ice/10 ring-1 ring-ice/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
                {/* Animated underline: center-outward on hover, stays filled from left when active */}
                <span
                  className={`pointer-events-none absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-ice-accent to-ice shadow-[0_0_8px_rgba(125,211,252,0.8)] transition-all duration-300 ${
                    activeId === item.id
                      ? 'scale-x-100 origin-left opacity-100'
                      : 'scale-x-0 group-hover:scale-x-100 origin-center opacity-70'
                  }`}
                />
              </button>
            ))}
          </nav>

          <button
            onClick={() => handleNavClick('contact')}
            data-cursor="button"
            className="magnetic-btn hidden rounded-full border border-ice/40 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ice-light transition-colors hover:bg-ice/10 lg:block"
          >
            Let&apos;s Connect
          </button>

          <button
            className="rounded-full p-2 text-ice-light lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            data-cursor="button"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="section-shell mt-3 lg:hidden"
          >
            <div className="glass-panel flex flex-col gap-1 rounded-2xl p-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`rounded-xl px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                    activeId === item.id ? 'bg-ice/10 text-ice-light' : 'text-ice-light/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('contact')}
                className="mt-1 rounded-xl border border-ice/40 px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.15em] text-ice-light"
              >
                Let&apos;s Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
