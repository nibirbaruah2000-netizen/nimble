import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Cinematic lighting rig: a dim ambient fill, a cool key light that
 * drifts slightly with the pointer, and two cyan accent point lights
 * that give the Developer Core its glow and reflections.
 */
export default function SceneLights({ pointerRef, interactive = true }) {
  const keyLight = useRef();

  useFrame(() => {
    if (!interactive || !keyLight.current || !pointerRef?.current) return;
    const { x, y } = pointerRef.current;
    keyLight.current.position.x = x * 4;
    keyLight.current.position.y = 2 + y * 2;
  });

  return (
    <>
      <ambientLight intensity={0.35} color="#1e293b" />
      <directionalLight ref={keyLight} position={[3, 3, 4]} intensity={0.6} color="#e0f2fe" />
      <pointLight position={[-3, -1, 2]} intensity={2.2} color="#38bdf8" distance={9} />
      <pointLight position={[2, 2, -2]} intensity={1.4} color="#7dd3fc" distance={10} />
      <hemisphereLight args={['#0b111a', '#020308', 0.4]} />
    </>
  );
}
