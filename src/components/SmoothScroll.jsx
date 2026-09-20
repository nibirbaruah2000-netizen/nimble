import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children, reducedMotion = false }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Top progress bar update listener
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // If reduced motion is requested, do not initialize Lenis
    if (reducedMotion) {
      return () => {
        window.removeEventListener('scroll', updateProgress);
      };
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
      updateProgress();
    });

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Intercept in-page anchor clicks so Lenis scrolls smoothly to targets
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"], button[data-scroll-to]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('data-scroll-to') || anchor.getAttribute('href')?.replace('#', '');
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', updateProgress);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return (
    <>
      {/* 2-3px slim fixed ice-blue gradient scroll progress bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] pointer-events-none origin-left bg-gradient-to-r from-ice-accent via-ice to-ice-light shadow-[0_0_10px_rgba(125,211,252,0.8)] transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
      {children}
    </>
  );
}
