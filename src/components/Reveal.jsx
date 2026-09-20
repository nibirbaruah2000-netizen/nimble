import { motion } from 'framer-motion';

/**
 * Fades + slides content up into view once as it enters the
 * viewport. `delay` and `y` let callers stagger related elements.
 */
export default function Reveal({ children, delay = 0, y = 28, className = '', once = true, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
