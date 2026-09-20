import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const SHAPES = ['octahedron', 'tetrahedron', 'icosahedron'];

function Shard({ position, scale, rotationSpeed, geometry }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += rotationSpeed;
    ref.current.rotation.y += rotationSpeed * 0.6;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.15;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      {geometry === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
      {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
      <meshStandardMaterial
        color="#0f172a"
        emissive="#38bdf8"
        emissiveIntensity={0.25}
        roughness={0.25}
        metalness={0.6}
        wireframe
      />
    </mesh>
  );
}

/**
 * A sparse layer of small wireframe polyhedra drifting slowly in the
 * background — geometric texture without competing for attention.
 */
export default function FloatingObjects({ count = 10, spread = 9 }) {
  const shards = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        position: [
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread * 0.6,
          (Math.random() - 0.5) * spread - 2,
        ],
        scale: 0.15 + Math.random() * 0.35,
        rotationSpeed: 0.001 + Math.random() * 0.003,
        geometry: SHAPES[i % SHAPES.length],
      })),
    [count, spread]
  );

  return (
    <group>
      {shards.map((shard) => (
        <Shard key={shard.id} {...shard} />
      ))}
    </group>
  );
}
