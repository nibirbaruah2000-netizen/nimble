import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import IdentityCard from './components/IdentityCard';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Github from './components/Github';
import Discord from './components/Discord';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundScene from './components/3d/BackgroundScene';
import SmoothScroll from './components/SmoothScroll';
import { useDeviceProfile } from './hooks/useIsMobile';

export default function App() {
  const [loading, setLoading] = useState(true);
  const { isMobile, isTablet, isTouch, prefersReducedMotion } = useDeviceProfile();

  // Respect prefers-reduced-motion / low-power devices by scaling
  // back 3D complexity rather than disabling it outright.
  const reducedMotion = prefersReducedMotion || isMobile;
  const bgQuality = isMobile || isTablet ? 'lite' : 'full';
  const showHeavyCanvas = !isMobile; // hero/skills/discord canvases skip on small phones

  useEffect(() => {
    if (!loading) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <SmoothScroll reducedMotion={reducedMotion}>
      {loading && (
        <Loader onComplete={() => setLoading(false)} reducedMotion={prefersReducedMotion} />
      )}

      <BackgroundScene quality={bgQuality} />
      <CustomCursor enabled={!isTouch} />

      <div className={loading ? 'invisible' : 'visible'}>
        <Navbar />
        <main>
          <Hero reducedMotion={reducedMotion} showCanvas={showHeavyCanvas} />
          <TechMarquee className="my-2" />
          <About />
          <IdentityCard />
          <Projects />
          <Skills showCanvas={showHeavyCanvas} reducedMotion={reducedMotion} />
          <Github reducedMotion={reducedMotion} />
          <Discord showCanvas={showHeavyCanvas} reducedMotion={reducedMotion} />
          <Experience reducedMotion={reducedMotion} />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
