import { Variants } from "framer-motion";

// Framer Motion variants matching design.md motion spec
export const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_EXPO_IN = [0.7, 0, 0.84, 0] as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: EASE_EXPO_OUT },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: EASE_EXPO_IN },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_EXPO_OUT },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: EASE_EXPO_IN },
  },
};

export const drawerSlide: Variants = {
  hidden: { x: "100%", opacity: 0.8 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", damping: 30, stiffness: 300 },
  },
  exit: {
    x: "100%",
    opacity: 0.8,
    transition: { duration: 0.25, ease: EASE_EXPO_IN },
  },
};

export const modalScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: EASE_EXPO_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.2, ease: EASE_EXPO_IN },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const cardHoverTransition = {
  duration: 0.25,
  ease: "easeOut",
};
