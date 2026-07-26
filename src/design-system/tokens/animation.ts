/**
 * Design System - Animation Tokens
 * SmartLink Transit
 *
 * Enterprise-ready motion system for:
 * - React Native Animated
 * - React Native Reanimated
 * - Expo Router transitions
 * - Gesture-driven interactions
 *
 * IMPORTANT:
 * These are motion design tokens.
 * Components should consume these values instead of hardcoding
 * durations, distances, scales, spring configs, etc.
 */
export const animation = {
  // DURATIONS
  /**
   * Standard animation durations in milliseconds.
   */
  durations: {
    instant: 0,
    micro: 50,
    veryFast: 100,
    fast: 150,
    normal: 200,
    medium: 250,
    slow: 300,
    complex: 400,
    extraSlow: 500,
    emphasized: 600,
    long: 800,
    loading: 1200,
  },

  // DELAYS
  /**
   * Standard delays used for staggered animations,
   * tooltips, loading states and sequential transitions.
   */
  delays: {
    none: 0,
    micro: 25,
    short: 50,
    normal: 100,
    medium: 150,
    long: 250,
    tooltip: 400,
  },

  // DISTANCES
  /**
   * Motion distances in density-independent pixels.
   */
  distances: {
    micro: 2,
    tiny: 4,
    small: 8,
    slide: 16,
    medium: 24,
    large: 32,
    page: 40,
    drawer: 48,
    toast: 24,
    snackbar: 24,
    bottomSheet: 32,
    shake: 10,
    fabLift: 24,
    pullToRefresh: 64,
    swipeThreshold: 80,
  },

  // SCALE
  /**
   * Standard scale values.
   */
  scales: {
    hidden: 0,
    subtlePress: 0.99,
    buttonPress: 0.95,
    cardPress: 0.98,
    iconPress: 0.92,
    modal: 0.98,
    dialogEnter: 0.96,
    fabPress: 0.92,
    badgeEnter: 0.8,
    popEnter: 0.9,
    full: 1,
    emphasis: 1.02,
    pulse: 1.05,
  },

  // OPACITY
  /**
   * Standard opacity values used during motion.
   */
  opacity: {
    hidden: 0,
    faint: 0.25,
    subtle: 0.5,
    visible: 1,
    pressed: 0.85,
    disabledTransition: 0.6,
  },

  // ROTATION
  /**
   * Rotation values expressed in degrees.
   *
   * Convert to strings where required:
   * `${animation.rotation.quarter}deg`
   */
  rotation: {
    none: 0,
    slight: 5,
    quarter: 90,
    half: 180,
    threeQuarter: 270,
    full: 360,
    chevron: 180,
    shake: 2,
  },

  // EASING
  /**
   * Semantic easing identifiers.
   *
   * These names can be mapped to React Native Easing
   * or Reanimated Easing functions.
   */
  easing: {
    linear: "linear",
    easeIn: "easeIn",
    easeOut: "easeOut",
    easeInOut: "easeInOut",
    easeInQuad: "easeInQuad",
    easeOutQuad: "easeOutQuad",
    easeInOutQuad: "easeInOutQuad",
    easeInCubic: "easeInCubic",
    easeOutCubic: "easeOutCubic",
    easeInOutCubic: "easeInOutCubic",
    standard: "easeInOut",
    emphasized: "easeOutCubic",
    enter: "easeOut",
    exit: "easeIn",
  },

  // SPRINGS
  /**
   * Spring presets.
   *
   * Compatible conceptually with:
   * - Reanimated withSpring()
   * - React Native Animated.spring()
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
    stiff: {
      damping: 20,
      stiffness: 300,
      mass: 1,
    },
    soft: {
      damping: 24,
      stiffness: 100,
      mass: 1,
    },
    navigation: {
      damping: 22,
      stiffness: 220,
      mass: 1,
    },
    bottomSheet: {
      damping: 22,
      stiffness: 200,
      mass: 1,
    },
  },

  // GESTURES
  /**
   * Shared gesture thresholds.
   */
  gestures: {
    swipe: {
      activationDistance: 8,
      threshold: 80,
      velocityThreshold: 500,
    },
    drag: {
      activationDistance: 4,
      dismissThreshold: 120,
      velocityThreshold: 600,
    },
    longPress: {
      duration: 500,
    },
    doubleTap: {
      interval: 300,
    },
    bottomSheet: {
      dismissVelocity: 900,
      dismissDistance: 120,
    },
  },

  // STAGGER
  /**
   * Stagger timing for lists and sequential animations.
   */
  stagger: {
    fast: 30,
    default: 50,
    medium: 75,
    slow: 100,
    maximumItems: 12,
  },

  // LOOP
  /**
   * Repeating animation configuration.
   */
  loops: {
    spinner: {
      duration: 900,
    },
    skeleton: {
      duration: 1200,
    },
    pulse: {
      duration: 1400,
    },
    locationPulse: {
      duration: 1600,
    },
    vehiclePulse: {
      duration: 1200,
    },
  },

  // COMPONENT / MOTION PRESETS
  presets: {
    // BUTTON
    buttonPress: {
      type: "timing",
      duration: 100,
      easing: "easeInOut",
      scale: 0.95,
    },

    // CARD
    cardPress: {
      type: "timing",
      duration: 120,
      easing: "easeInOut",
      scale: 0.98,
    },

    // ICON
    iconPress: {
      type: "timing",
      duration: 100,
      easing: "easeOut",
      scale: 0.92,
    },

    // PAGE
    pageTransition: {
      type: "timing",
      duration: 250,
      easing: "easeInOut",
      slide: 16,
      fade: true,
    },
    pageEnter: {
      type: "timing",
      duration: 250,
      easing: "easeOut",
      slide: 16,
      fade: true,
    },
    pageExit: {
      type: "timing",
      duration: 200,
      easing: "easeIn",
      slide: 8,
      fade: true,
    },

    // MODAL
    modal: {
      type: "timing",
      duration: 300,
      easing: "easeInOut",
      fade: true,
      scale: 0.98,
    },
    modalEnter: {
      type: "timing",
      duration: 300,
      easing: "easeOut",
      fade: true,
      scale: 0.96,
    },
    modalExit: {
      type: "timing",
      duration: 200,
      easing: "easeIn",
      fade: true,
      scale: 0.98,
    },

    // BOTTOM SHEET
    bottomSheet: {
      type: "spring",
      spring: "bottomSheet",
    },

    // TOAST
    toast: {
      type: "timing",
      duration: 300,
      easing: "easeOut",
    },
    toastEnter: {
      type: "timing",
      duration: 300,
      easing: "easeOut",
      slide: 24,
      fade: true,
    },
    toastExit: {
      type: "timing",
      duration: 200,
      easing: "easeIn",
      slide: 16,
      fade: true,
    },

    // SNACKBAR
    snackbar: {
      type: "timing",
      duration: 250,
      easing: "easeOut",
    },
    snackbarEnter: {
      type: "timing",
      duration: 250,
      easing: "easeOut",
      slide: 24,
      fade: true,
    },
    snackbarExit: {
      type: "timing",
      duration: 200,
      easing: "easeIn",
      slide: 16,
      fade: true,
    },

    // TOGGLE
    toggle: {
      type: "timing",
      duration: 200,
      easing: "easeInOut",
    },

    // CHECKBOX
    checkbox: {
      type: "spring",
      spring: "snappy",
      scale: 0.9,
    },

    // RADIO
    radio: {
      type: "spring",
      spring: "snappy",
      scale: 0.9,
    },

    // PROGRESS
    progress: {
      type: "timing",
      duration: 300,
      easing: "easeIn",
    },

    // FAB
    fab: {
      type: "spring",
      spring: "snappy",
    },
    fabPress: {
      type: "timing",
      duration: 120,
      easing: "easeInOut",
      scale: 0.92,
    },

    // RIPPLE
    ripple: {
      type: "timing",
      duration: 180,
      easing: "easeOut",
    },

    // DROPDOWN
    dropdown: {
      type: "timing",
      duration: 200,
      easing: "easeOut",
      fade: true,
      slide: 8,
    },

    // TOOLTIP
    tooltip: {
      type: "timing",
      duration: 150,
      easing: "easeOut",
      fade: true,
      scale: 0.98,
    },

    // ACCORDION
    accordion: {
      type: "timing",
      duration: 250,
      easing: "easeInOut",
    },

    // TAB
    tabIndicator: {
      type: "spring",
      spring: "snappy",
    },

    // DRAWER
    drawer: {
      type: "spring",
      spring: "navigation",
    },

    // BADGE
    badgeEnter: {
      type: "spring",
      spring: "snappy",
      scale: 0.8,
    },

    // LIST
    listItemEnter: {
      type: "timing",
      duration: 250,
      easing: "easeOut",
      fade: true,
      slide: 16,
    },
    listItemExit: {
      type: "timing",
      duration: 180,
      easing: "easeIn",
      fade: true,
      slide: 8,
    },

    // SKELETON
    skeleton: {
      type: "timing",
      duration: 1200,
      easing: "linear",
      loop: true,
    },

    // LOADING SPINNER
    spinner: {
      type: "timing",
      duration: 900,
      easing: "linear",
      rotation: 360,
      loop: true,
    },

    // PULSE
    pulse: {
      type: "timing",
      duration: 1400,
      easing: "easeInOut",
      scale: 1.05,
      loop: true,
    },

    // FEEDBACK
    shake: {
      type: "timing",
      duration: 300,
      easing: "easeInOut",
      distance: 10,
    },
    success: {
      type: "spring",
      spring: "bouncy",
      scale: 1.05,
    },
    error: {
      type: "timing",
      duration: 300,
      easing: "easeInOut",
      distance: 10,
    },

    // TRANSPORT / MAP
    locationPulse: {
      type: "timing",
      duration: 1600,
      easing: "easeOut",
      scale: 1.05,
      loop: true,
    },
    vehicleMarker: {
      type: "spring",
      spring: "gentle",
    },
    mapMarkerEnter: {
      type: "spring",
      spring: "bouncy",
      scale: 0.8,
    },
    routeUpdate: {
      type: "timing",
      duration: 400,
      easing: "easeInOut",
    },
    mapCamera: {
      type: "timing",
      duration: 500,
      easing: "easeInOut",
    },
  },

  // NAVIGATION
  navigation: {
    screenPush: {
      duration: 250,
      easing: "easeInOut",
      distance: 40,
    },
    screenPop: {
      duration: 220,
      easing: "easeInOut",
      distance: 40,
    },
    tabChange: {
      duration: 200,
      easing: "easeInOut",
    },
    drawerOpen: {
      spring: "navigation",
    },
    drawerClose: {
      duration: 220,
      easing: "easeIn",
    },
  },

  // LAYOUT
  layout: {
    resize: {
      duration: 250,
      easing: "easeInOut",
    },
    reposition: {
      duration: 250,
      easing: "easeInOut",
    },
    expand: {
      duration: 250,
      easing: "easeOut",
    },
    collapse: {
      duration: 200,
      easing: "easeIn",
    },
  },

  // ACCESSIBILITY
  accessibility: {
    /**
     * Used when Reduce Motion is enabled.
     *
     * Keep essential state-change feedback while
     * removing large spatial movement.
     */
    reducedMotion: {
      duration: 0,
      distance: 0,
      scale: 1,
      rotation: 0,
      allowOpacity: true,
    },
  },
} as const;

// TOKEN ACCESSORS
export const getAnimationPreset = (preset: AnimationPreset) =>
  animation.presets[preset];

export const getSpringPreset = (preset: SpringPreset) =>
  animation.springs[preset];

export const getDuration = (duration: AnimationDuration) =>
  animation.durations[duration];

export const getDelay = (delay: AnimationDelay) => animation.delays[delay];

export const getDistance = (distance: AnimationDistance) =>
  animation.distances[distance];

export const getScale = (scale: AnimationScale) => animation.scales[scale];

export const getEasing = (easing: AnimationEasing) => animation.easing[easing];

// TYPES
export type AnimationTokens = typeof animation;
export type AnimationPreset = keyof typeof animation.presets;
export type AnimationDuration = keyof typeof animation.durations;
export type AnimationDelay = keyof typeof animation.delays;
export type AnimationDistance = keyof typeof animation.distances;
export type AnimationScale = keyof typeof animation.scales;
export type AnimationOpacity = keyof typeof animation.opacity;
export type AnimationRotation = keyof typeof animation.rotation;
export type AnimationEasing = keyof typeof animation.easing;
export type SpringPreset = keyof typeof animation.springs;
export type AnimationGesture = keyof typeof animation.gestures;
export type AnimationLoop = keyof typeof animation.loops;
