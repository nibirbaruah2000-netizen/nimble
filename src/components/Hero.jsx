import { lazy, Suspense, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, MessageCircle, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import SafeLink from './SafeLink';
import HUDLabels from './HUDLabels';
import TypewriterRole from './TypewriterRole';
import { PROFILE, SOCIAL_LINKS } from '../data/social';

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = lazy(() => import('./3d/HeroCanvas'));

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const textWipe = {
  hidden: {
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    y: 20,
    opacity: 0,
  },
  show: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const coreEntrance = {
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 },
  },
};

export default function Hero({ reducedMotion, showCanvas }) {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const coreContainerRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Signature moment: Pin Developer Core briefly while hero text fades & scales out
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=40%',
        pin: coreContainerRef.current,
        pinSpacing: false,
        scrub: 0.8,
        onUpdate: (self) => {
          if (textRef.current) {
            const p = self.progress;
            textRef.current.style.opacity = `${Math.max(0, 1 - p * 1.6)}`;
            textRef.current.style.transform = `scale(${1 - p * 0.08}) translateY(-${p * 50}px)`;
          }
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      <div className="grid-overlay" />

      <div className="section-shell relative grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <motion.div
          ref={textRef}
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 will-change-transform"
        >
          <motion.div variants={textWipe} className="mb-6 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ice opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ice" />
            </span>
            <span className="eyebrow">Available for new projects</span>
          </motion.div>

          <motion.h1
            variants={textWipe}
            className="font-display text-4xl font-semibold leading-[1.08] text-ice-light sm:text-5xl md:text-6xl"
          >
            Hey, I&apos;m NimbleFlea.
          </motion.h1>

          <motion.h2
            variants={textWipe}
            className="mt-3 font-display text-3xl font-semibold leading-[1.15] text-white sm:text-4xl md:text-5xl"
          >
            I build digital
            <br />
            experiences that{' '}
            <span className="text-ice drop-shadow-[0_0_18px_rgba(125,211,252,0.45)]">
              feel alive.
            </span>
          </motion.h2>

          {/* Typewriter role rotator with blinking cursor */}
          <motion.div variants={textWipe} className="mt-4 flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ice-light/50">
              Role //
            </span>
            <TypewriterRole reducedMotion={reducedMotion} />
          </motion.div>

          <motion.p
            variants={textWipe}
            className="mt-6 max-w-md text-sm leading-relaxed text-ice-light/70 sm:text-base"
          >
            Discord bot &amp; web developer creating interactive digital experiences, automation
            systems and open-source tools.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-ice px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-bg shadow-glow hover:shadow-glow"
            >
              Explore My Work
            </MagneticButton>
            <MagneticButton
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-ice/30 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ice-light hover:bg-ice/10"
            >
              Let&apos;s Connect
            </MagneticButton>
          </motion.div>

          <motion.div variants={staggerItem} className="mt-10 flex items-center gap-3">
            <SafeLink
              href={SOCIAL_LINKS.github}
              data-cursor="button"
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs text-ice-light/80 transition-colors hover:border-ice/40 hover:text-ice-light"
            >
              <Github size={16} /> GitHub
            </SafeLink>
            <SafeLink
              href={SOCIAL_LINKS.discord}
              data-cursor="button"
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs text-ice-light/80 transition-colors hover:border-ice/40 hover:text-ice-light"
            >
              <MessageCircle size={16} /> Discord
            </SafeLink>
          </motion.div>
        </motion.div>

        <motion.div
          ref={coreContainerRef}
          variants={coreEntrance}
          initial="hidden"
          animate="show"
          className="relative z-0 h-[380px] sm:h-[460px] lg:h-[560px]"
          data-cursor="object"
        >
          {showCanvas && (
            <Suspense fallback={<div className="h-full w-full animate-pulse-slow rounded-full bg-ice/5" />}>
              <HeroCanvas dpr={reducedMotion ? [1, 1] : [1, 2]} reduced={reducedMotion} />
            </Suspense>
          )}
          <HUDLabels />
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ice-light/50 sm:flex"
        aria-label="Scroll down"
        data-cursor="button"
      >
        <span className="font-mono text-[10px] tracking-[0.25em]">SCROLL</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
