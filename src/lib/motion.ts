// Simple motion utilities without framer-motion
export const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'ease-out', delay } }
});

// CSS-based animation classes as fallback
export const animationClasses = {
  fadeUp: 'animate-fade-up',
  fadeIn: 'animate-fade-in'
};