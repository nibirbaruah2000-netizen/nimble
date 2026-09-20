import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import DeveloperCore from './3d/DeveloperCore';
import SceneLights from './3d/SceneLights';
import { PROFILE } from '../data/social';

export default function Loader({ onComplete, reducedMotion }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const staticPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const duration = reducedMotion ? 600 : 1800;
    const start = performance.now();

    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.floor(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  useEffect(() => {
    if (done) {
      const timeout = setTimeout(onComplete, 550);
      return () => clearTimeout(timeout);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="grid-overlay" />

          <div className="relative h-40 w-40 sm:h-52 sm:w-52">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
              <Suspense fallback={null}>
                <SceneLights pointerRef={staticPointer} interactive={false} />
                <DeveloperCore pointerRef={staticPointer} reduced />
              </Suspense>
            </Canvas>
          </div>

          <div className="relative mt-6 flex flex-col items-center gap-4">
            <p className="font-display text-lg tracking-[0.3em] text-ice-light">
              {PROFILE.brandName}
            </p>
            <p className="eyebrow text-[10px] text-ice/70">INITIALIZING DIGITAL EXPERIENCE...</p>

            <div className="relative h-px w-56 overflow-hidden bg-white/10 sm:w-72">
              <motion.div
                className="absolute inset-y-0 left-0 bg-ice"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-xs text-ice/60">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
