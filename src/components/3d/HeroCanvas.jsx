import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import DeveloperCore from './DeveloperCore';
import SceneLights from './SceneLights';
import { usePointerRef } from '../../hooks/usePointer';

function CameraRig({ pointerRef, reduced }) {
  useFrame((state) => {
    if (reduced) return;
    const { x, y } = pointerRef.current;
    state.camera.position.x += (x * 0.6 - state.camera.position.x) * 0.03;
    state.camera.position.y += (-y * 0.4 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroCanvas({ dpr = [1, 2], reduced = false }) {
  const pointerRef = usePointerRef();

  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <SceneLights pointerRef={pointerRef} interactive={!reduced} />
        <DeveloperCore pointerRef={pointerRef} reduced={reduced} />
        <CameraRig pointerRef={pointerRef} reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}
