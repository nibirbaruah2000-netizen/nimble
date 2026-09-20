import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import ParticleField from './ParticleField';
import FloatingObjects from './FloatingObjects';

function BackgroundParallaxGroup({ children }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    // Mouse parallax: subtle rotation towards cursor position
    const targetRotY = state.pointer.x * 0.15;
    const targetRotX = -state.pointer.y * 0.1;

    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.035;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.035;

    // Scroll parallax: starfield/particles move slower than page scroll
    const scrollY = window.scrollY || 0;
    const targetY = scrollY * 0.0012;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
}

/**
 * Sits fixed behind the entire page (z-index below all content) to
 * give every section a shared sense of depth: stars, drifting cyan
 * particles, a few sparse wireframe shards and atmospheric fog.
 * Parallaxes toward cursor position and responds to page scroll.
 */
export default function BackgroundScene({ quality = 'full' }) {
  const isLite = quality === 'lite';

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, isLite ? 1.3 : 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <color attach="background" args={['#05070d']} />
        <fog attach="fog" args={['#05070d', 4, 13]} />
        <ambientLight intensity={0.2} />
        <Suspense fallback={null}>
          <BackgroundParallaxGroup>
            <Stars
              radius={60}
              depth={30}
              count={isLite ? 900 : 2200}
              factor={2}
              saturation={0}
              fade
              speed={0.4}
            />
            <ParticleField
              count={isLite ? 90 : 220}
              spread={12}
              size={0.018}
              opacity={0.45}
              speed={0.015}
            />
            {!isLite && <FloatingObjects count={7} spread={11} />}
          </BackgroundParallaxGroup>
        </Suspense>
      </Canvas>
    </div>
  );
}
