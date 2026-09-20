import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiDiscord,
  SiThreedotjs,
  SiTailwindcss,
  SiMongodb,
  SiGithub,
} from 'react-icons/si';
import { FiGitBranch } from 'react-icons/fi';

export const TECH_ICONS_MAP = {
  javascript: SiJavascript,
  react: SiReact,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  discordjs: SiDiscord,
  threejs: SiThreedotjs,
  tailwind: SiTailwindcss,
  mongodb: SiMongodb,
  git: 'git-combo', // Combined FiGitBranch + SiGithub
  github: SiGithub,
};

/**
 * Renders an ice-blue tinted monochrome technology icon with hover glow and scale.
 */
export default function TechIcon({
  name,
  size = 18,
  className = '',
  withGlow = false,
}) {
  const key = (name || '').toLowerCase().replace(/[\s./-]/g, '');

  let IconComponent = TECH_ICONS_MAP[name] || TECH_ICONS_MAP[key];

  if (!IconComponent) {
    if (key.includes('javascript') || key === 'js') IconComponent = SiJavascript;
    else if (key.includes('react')) IconComponent = SiReact;
    else if (key.includes('next')) IconComponent = SiNextdotjs;
    else if (key.includes('node')) IconComponent = SiNodedotjs;
    else if (key.includes('discord')) IconComponent = SiDiscord;
    else if (key.includes('three')) IconComponent = SiThreedotjs;
    else if (key.includes('tailwind')) IconComponent = SiTailwindcss;
    else if (key.includes('mongo')) IconComponent = SiMongodb;
    else if (key.includes('git')) IconComponent = 'git-combo';
    else if (key.includes('github')) IconComponent = SiGithub;
  }

  const glowStyle = withGlow
    ? 'drop-shadow-[0_0_8px_rgba(125,211,252,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(125,211,252,0.9)]'
    : 'transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(125,211,252,0.6)]';

  if (IconComponent === 'git-combo') {
    return (
      <span
        className={`inline-flex items-center gap-1 text-ice transition-transform duration-300 group-hover:scale-110 ${glowStyle} ${className}`}
        style={{ color: 'currentColor' }}
      >
        <FiGitBranch size={size} />
        <SiGithub size={size} />
      </span>
    );
  }

  if (!IconComponent) {
    return null;
  }

  return (
    <span
      className={`inline-flex items-center justify-center text-ice transition-transform duration-300 group-hover:scale-110 ${glowStyle} ${className}`}
      style={{ color: 'currentColor' }}
    >
      <IconComponent size={size} />
    </span>
  );
}
