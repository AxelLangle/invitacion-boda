export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 100, damping: 20 },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { type: "spring" as const, stiffness: 200, damping: 25 },
};

export const slideFromLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { type: "spring" as const, stiffness: 120, damping: 18 },
};

export const viewportConfig = {
  once: true,
  margin: "-100px" as const,
};
