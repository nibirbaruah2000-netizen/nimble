import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import ParticleField from './ParticleField';

const CODE_SYMBOLS = ['{ }', '</>', '=>', '01', '#!', '&&'];

function CodeSymbol({ position, text, speed }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.12;
    ref.current.lookAt(state.camera.position);
  });
  return (
    <group ref={ref} position={position}>
      <Html center distanceFactor={8} occlude={false}>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '11px',
            color: '#7dd3fc',
            opacity: 0.55,
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          {text}
        </span>
      </Html>
    </group>
  );
}

function OrbitingShard({ radius, speed, offset, scale = 0.12 }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.7) * radius * 0.4, Math.sin(t) * radius);
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.015;
  });
  return (
    <mesh ref={ref} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.1} roughness={0.3} metalness={0.4} />
    </mesh>
  );
}

function EnergyRing({ radius, tilt, speed, thickness = 0.015, color = '#7dd3fc' }) {
  const ref = useRef();
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.z += speed;
  });
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, thickness, 16, 120]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.4}
          roughness={0.2}
          metalness={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

function EnergyLines({ count = 10, radius = 1.6 }) {
  const lines = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const theta = (i / count) * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const end = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      return { start: new THREE.Vector3(0, 0, 0), end };
    });
  }, [count, radius]);

  return (
    <group>
      {lines.map((line, i) => {
        const points = [line.start, line.end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color="#38bdf8" transparent opacity={0.18} />
          </line>
        );
      })}
    </group>
  );
}

/**
 * The Developer Core — the interactive centerpiece of the hero.
 * A glass/energy sphere wrapped in a wireframe shell, orbited by
 * rings, particles and small geometric shards, with floating code
 * symbols and holographic HUD labels. Mouse movement drives group
 * rotation and light position via `pointerRef` (read in the parent
 * canvas's SceneLights, and here for rotation).
 */
export default function DeveloperCore({ pointerRef, reduced = false }) {
  const groupRef = useRef();
  const coreRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const pointer = pointerRef?.current ?? { x: 0, y: 0 };
    const targetY = pointer.x * 0.6;
    const targetX = -pointer.y * 0.35;

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;

    if (!reduced) {
      groupRef.current.rotation.y += delta * 0.05;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.15;
    }
  });

  const codeSymbolPositions = useMemo(
    () =>
      CODE_SYMBOLS.map((text, i) => {
        const theta = (i / CODE_SYMBOLS.length) * Math.PI * 2;
        return {
          text,
          position: [Math.cos(theta) * 2.3, Math.sin(theta * 1.3) * 1.1, Math.sin(theta) * 2.3],
          speed: 0.4 + Math.random() * 0.3,
        };
      }),
    []
  );

  return (
    <group ref={groupRef}>
      {/* Central glowing / glass core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#0b3a52"
          emissive="#38bdf8"
          emissiveIntensity={0.6}
          roughness={0.05}
          metalness={0.1}
          transmission={0.85}
          thickness={1.2}
          distort={reduced ? 0.08 : 0.22}
          speed={reduced ? 0.6 : 1.4}
          clearcoat={1}
        />
      </mesh>

      {/* Inner light source for the glow */}
      <pointLight color="#7dd3fc" intensity={3} distance={4} />

      {/* Wireframe shell */}
      <mesh scale={1.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.18} />
      </mesh>

      {/* Rotating rings */}
      <EnergyRing radius={1.9} tilt={[Math.PI / 3, 0, 0]} speed={0.0032} color="#38bdf8" />
      <EnergyRing radius={2.2} tilt={[0, Math.PI / 4, Math.PI / 6]} speed={-0.0022} color="#7dd3fc" />
      <EnergyRing radius={1.65} tilt={[Math.PI / 2.2, Math.PI / 5, 0]} speed={0.0045} color="#e0f2fe" thickness={0.008} />

      {/* Energy lines from core outward */}
      <EnergyLines count={reduced ? 5 : 10} radius={1.65} />

      {/* Orbiting geometric components */}
      {!reduced &&
        Array.from({ length: 5 }).map((_, i) => (
          <OrbitingShard key={i} radius={2.6 + (i % 2) * 0.4} speed={0.25 + i * 0.05} offset={i * 1.3} />
        ))}

      {/* Particle halo */}
      <ParticleField count={reduced ? 120 : 260} spread={5.5} size={0.016} opacity={0.7} speed={0.03} />

      {/* Floating code symbols */}
      {!reduced && codeSymbolPositions.map((s, i) => <CodeSymbol key={i} {...s} />)}
    </group>
  );
}
