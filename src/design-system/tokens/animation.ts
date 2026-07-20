/**
 * Design System - Animation Tokens
 * SmartLink Transit
 * Enterprise-ready animation system for React Native & Reanimated
 */

export const animation = {
  /**
   * Standard animation durations (milliseconds)
   */
  durations: {
    instant: 0,
    micro: 50,
    fast: 150,
    medium: 250,
    slow: 300,
    complex: 400,
    extraSlow: 500,
  },

  distances: {
  slide: 16,
  shake: 10,
  fabLift: 24,
},

scales: {
  buttonPress: 0.95,
  cardPress: 0.98,
  modal: 0.98,
},
  /**
   * Timing easing names
   * These map to React Native Easing/Reanimated Easing functions.
   */
easing: {
  linear: "linear",
  easeIn: "easeIn",
  easeOut: "easeOut",
  easeInOut: "easeInOut",
  easeInQuad: "easeInQuad",
  easeOutQuad: "easeOutQuad",
  easeInCubic: "easeInCubic",
  easeOutCubic: "easeOutCubic",
},

  /**
   * Spring presets
   * Used with Reanimated's withSpring() or Animated.spring()
   */
  springs: {
    gentle: {
      damping: 20,
      stiffness: 120,
      mass: 1,
    },

    default: {
      damping: 15,
      stiffness: 180,
      mass: 1,
    },

    snappy: {
      damping: 10,
      stiffness: 260,
      mass: 1,
    },

    bouncy: {
      damping: 8,
      stiffness: 140,
      mass: 1,
    },
  },

  /**
   * Component animation presets
   */
  presets: {
    buttonPress: {
      type: "timing",
      duration: 100,
      easing: "easeInOut",
      scale: 0.95,
    },

    pageTransition: {
      type: "timing",
      duration: 250,
      easing: "easeInOut",
      slide: 16,
      fade: true,
    },

    toast: {
      type: "timing",
      duration: 300,
      easing: "easeOut",
    },

    modal: {
      type: "timing",
      duration: 300,
      easing: "easeInOut",
      fade: true,
      scale: 0.98,
    },

    bottomSheet: {
      type: "spring",
      spring: "default",
    },

    toggle: {
      type: "timing",
      duration: 200,
      easing: "easeInOut",
    },

    progress: {
      type: "timing",
      duration: 300,
      easing: "easeIn",
    },

    fab: {
      type: "spring",
      spring: "snappy",
    },

    snackbar: {
      type: "timing",
      duration: 250,
      easing: "easeOut",
    },

    cardPress: {
      type: "timing",
      duration: 120,
      easing: "easeInOut",
      scale: 0.98,
    },

    ripple: {
      type: "timing",
      duration: 180,
      easing: "easeOut",
    },
  },
} as const;

export const getAnimationPreset = (
    preset: AnimationPreset
) => animation.presets[preset];

export const getSpringPreset = (
    preset: SpringPreset
) => animation.springs[preset];

export const getDuration = (
    duration: AnimationDuration
) => animation.durations[duration];

export type AnimationTokens = typeof animation;
export type AnimationPreset = keyof typeof animation.presets;
export type AnimationDuration = keyof typeof animation.durations;
export type AnimationEasing = keyof typeof animation.easing;
export type SpringPreset = keyof typeof animation.springs;