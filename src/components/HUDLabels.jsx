import { motion } from 'framer-motion';

const LABELS = [
  { text: 'REACT', top: '12%', left: '4%', delay: 0.1 },
  { text: 'THREE.JS', top: '22%', right: '2%', delay: 0.25 },
  { text: 'DISCORD.JS', bottom: '20%', left: '0%', delay: 0.4 },
  { text: 'NODE.JS', bottom: '10%', right: '8%', delay: 0.55 },
];

/**
 * Static HUD-style tags anchored around the Developer Core. Kept as
 * plain HTML (not inside the Canvas) so they read as an overlay
 * instrument panel rather than objects that spin with the scene.
 */
export default function HUDLabels() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block">
      {LABELS.map((label) => (
        <motion.div
          key={label.text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 + label.delay, duration: 0.6 }}
          className="absolute flex items-center gap-2"
          style={{ top: label.top, left: label.left, right: label.right, bottom: label.bottom }}
        >
          <span className="h-px w-5 bg-ice/40" />
          <span className="glass-panel rounded-sm px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-ice-light/80 shadow-glow-sm">
            {label.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
