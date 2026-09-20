// Technology constellation nodes.
// "group" is used purely to color/cluster related nodes — not a
// factual proficiency score.

export const SKILLS = [
  { id: 'javascript', label: 'JavaScript', group: 'language' },
  { id: 'react', label: 'React', group: 'frontend' },
  { id: 'nextjs', label: 'Next.js', group: 'frontend' },
  { id: 'nodejs', label: 'Node.js', group: 'backend' },
  { id: 'discordjs', label: 'Discord.js', group: 'backend' },
  { id: 'threejs', label: 'Three.js', group: 'creative' },
  { id: 'tailwind', label: 'Tailwind CSS', group: 'frontend' },
  { id: 'mongodb', label: 'MongoDB', group: 'backend' },
  { id: 'git', label: 'Git / GitHub', group: 'tooling' },
];

export const SKILL_DESCRIPTIONS = {
  javascript: 'Core language behind every bot, API and interface I build.',
  react: 'Primary library for building interactive, component-based UI.',
  nextjs: 'Used for production web apps that need routing and performance out of the box.',
  nodejs: 'Runtime powering bots, APIs and backend automation.',
  discordjs: 'The library behind every Discord bot and dashboard I ship.',
  threejs: 'Used to build 3D scenes and interactive visuals like this portfolio.',
  tailwind: 'Utility-first styling for fast, consistent interface design.',
  mongodb: 'Document database used for bot data, dashboards and app storage.',
  git: 'Version control and collaboration for every project, solo or open source.',
};
