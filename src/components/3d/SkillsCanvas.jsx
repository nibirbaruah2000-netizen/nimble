import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import SkillsConstellation from './SkillsConstellation';

export default function SkillsCanvas({ onHoverSkill, reducedMotion }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={reducedMotion ? [1, 1] : [1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <Suspense fallback={null}>
        <SkillsConstellation onHoverSkill={onHoverSkill} />
      </Suspense>
    </Canvas>
  );
}
