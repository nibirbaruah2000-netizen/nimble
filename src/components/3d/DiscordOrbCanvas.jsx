import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, RoundedBox } from '@react-three/drei';
import ParticleField from './ParticleField';

function Bubble({ position, scale, speed }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
    ref.current.rotation.x += 0.004;
    ref.current.rotation.y += 0.006;
  });
  return (
    <RoundedBox ref={ref} position={position} scale={scale} args={[1, 0.7, 0.2]} radius={0.15} smoothness={4}>
      <meshStandardMaterial color="#0f172a" emissive="#38bdf8" emissiveIntensity={0.5} roughness={0.3} metalness={0.5} />
    </RoundedBox>
  );
}

function DiscordOrb({ reducedMotion }) {
  const coreRef = useRef();
  useFrame((state, delta) => {
    if (!coreRef.current) return;
    if (!reducedMotion) coreRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.1, 48, 48]} />
        <MeshDistortMaterial
          color="#0b3a52"
          emissive="#7dd3fc"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.2}
          distort={reducedMotion ? 0.1 : 0.3}
          speed={reducedMotion ? 0.4 : 1.2}
        />
      </mesh>
      <pointLight color="#7dd3fc" intensity={2.5} distance={5} />

      {!reducedMotion && (
        <>
          <Bubble position={[1.6, 0.5, 0.3]} scale={0.35} speed={0.6} />
          <Bubble position={[-1.5, -0.4, 0.4]} scale={0.28} speed={0.8} />
          <Bubble position={[0.4, -1.2, 0.6]} scale={0.22} speed={0.5} />
        </>
      )}

      <ParticleField count={90} spread={4.5} size={0.015} opacity={0.5} speed={0.02} />
    </group>
  );
}

export default function DiscordOrbCanvas({ reducedMotion }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={reducedMotion ? [1, 1] : [1, 1.75]}>
      <ambientLight intensity={0.4} />
      <Suspense fallback={null}>
        <DiscordOrb reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
