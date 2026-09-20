import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import TechIcon from '../TechIcon';
import { SKILLS } from '../../data/skills';

const GROUP_COLORS = {
  language: '#e0f2fe',
  frontend: '#7dd3fc',
  backend: '#38bdf8',
  creative: '#a5f3fc',
  tooling: '#bae6fd',
};

function useNodePositions() {
  return useMemo(() => {
    const n = SKILLS.length;
    return SKILLS.map((skill, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.1;
      return {
        ...skill,
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.75,
          r * Math.cos(phi),
        ],
      };
    });
  }, []);
}

function PulseDot({ start, end, speed = 0.35, offset = 0 }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const progress = (state.clock.elapsedTime * speed + offset) % 1;
    ref.current.position.x = start[0] + (end[0] - start[0]) * progress;
    ref.current.position.y = start[1] + (end[1] - start[1]) * progress;
    ref.current.position.z = start[2] + (end[2] - start[2]) * progress;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.038, 8, 8]} />
      <meshBasicMaterial color="#e0f2fe" transparent opacity={0.9} />
    </mesh>
  );
}

function Node({ skill, hovered, onHover, onLeave }) {
  const meshRef = useRef();
  const isActive = hovered === skill.id;
  const color = GROUP_COLORS[skill.group] ?? '#7dd3fc';

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetScale = isActive ? 1.8 : 1;
    meshRef.current.scale.setScalar(
      meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * 0.15
    );
    meshRef.current.position.y =
      skill.position[1] + Math.sin(state.clock.elapsedTime * 0.6 + skill.position[0]) * 0.05;
  });

  return (
    <group position={skill.position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(skill.id);
        }}
        onPointerOut={onLeave}
        onClick={(e) => {
          e.stopPropagation();
          onHover(skill.id);
        }}
      >
        <icosahedronGeometry args={[0.13, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 1.6 : 0.8}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      <Html center distanceFactor={8.5} occlude={false}>
        <div
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(skill.id);
          }}
          onPointerOut={onLeave}
          onClick={(e) => {
            e.stopPropagation();
            onHover(skill.id);
          }}
          className="flex flex-col items-center gap-1 cursor-pointer select-none transition-all duration-300"
          style={{
            transform: `translateY(${isActive ? '22px' : '18px'}) scale(${isActive ? 1.15 : 1})`,
          }}
        >
          {/* Tech icon badge attached to node */}
          <div
            className="flex items-center justify-center rounded-full p-1.5 backdrop-blur-md transition-all duration-300"
            style={{
              backgroundColor: isActive ? 'rgba(15,23,42,0.9)' : 'rgba(5,7,13,0.7)',
              border: `1px solid ${isActive ? '#7dd3fc' : 'rgba(125,211,252,0.3)'}`,
              color: color,
              boxShadow: isActive
                ? '0 0 16px rgba(125,211,252,0.75)'
                : '0 0 6px rgba(125,211,252,0.2)',
            }}
          >
            <TechIcon name={skill.id} size={isActive ? 16 : 13} />
          </div>
          <div
            className="pointer-events-none whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.09em] transition-opacity"
            style={{
              color: isActive ? '#ffffff' : 'rgba(224,242,254,0.6)',
              opacity: isActive ? 1 : 0.85,
              textShadow: isActive ? '0 0 8px rgba(125,211,252,0.8)' : 'none',
            }}
          >
            {skill.label}
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function SkillsConstellation({ onHoverSkill }) {
  const nodes = useNodePositions();
  const [hovered, setHovered] = useState(null);
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06;
  });

  const handleHover = (id) => {
    setHovered(id);
    onHoverSkill?.(id);
  };
  const handleLeave = () => {
    setHovered(null);
    onHoverSkill?.(null);
  };

  const connections = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < nodes.length; i++) {
      const next = nodes[(i + 1) % nodes.length];
      pairs.push([nodes[i].position, next.position, nodes[i].group === next.group]);
      if (i % 2 === 0) {
        const skip = nodes[(i + 3) % nodes.length];
        pairs.push([nodes[i].position, skip.position, false]);
      }
    }
    return pairs;
  }, [nodes]);

  // Select connections for traveling energy pulses
  const pulseLines = useMemo(() => {
    return connections.slice(0, 8).map(([start, end], index) => ({
      start,
      end,
      speed: 0.3 + (index % 3) * 0.1,
      offset: (index * 0.25) % 1,
    }));
  }, [connections]);

  return (
    <group ref={groupRef}>
      {connections.map(([start, end, sameGroup], i) => (
        <Line
          key={i}
          points={[start, end]}
          color={sameGroup ? '#7dd3fc' : '#38bdf8'}
          transparent
          opacity={sameGroup ? 0.35 : 0.12}
          lineWidth={1}
        />
      ))}

      {/* Traveling energy pulse dots along constellation lines */}
      {pulseLines.map((pulse, i) => (
        <PulseDot key={`pulse-${i}`} {...pulse} />
      ))}

      {nodes.map((skill) => (
        <Node key={skill.id} skill={skill} hovered={hovered} onHover={handleHover} onLeave={handleLeave} />
      ))}

      <pointLight position={[0, 0, 0]} intensity={1.2} color="#7dd3fc" distance={6} />
    </group>
  );
}
