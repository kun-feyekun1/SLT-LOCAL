/**
 * Accessibility Utilities - SmartLink Transit
 * WCAG compliance helpers
 */

type AccessibilityProps = {
  accessibilityLabel?: string;
  accessibilityRole?: 'button' | 'link' | 'image' | 'text' | 'header';
  accessibilityHint?: string;
  accessible?: boolean;
  accessibilityViewIsModal?: boolean;
};

export const accessibility = {
  // Touch target sizes (48dp minimum)
  touchTarget: {
    min: 48,
    recommended: 56,
    driver: 56,
    emergency: 64,
  },

  // Color contrast requirements
  contrast: {
    normalText: 4.5,
    largeText: 3,
    uiComponents: 3,
    enhancedNormal: 7,
    enhancedLarge: 4.5,
  },

  // Screen reader props
  screenReader: {
    button: (label: string): AccessibilityProps => ({
      accessibilityLabel: label,
      accessibilityRole: 'button',
      accessible: true,
    }),
    link: (label: string): AccessibilityProps => ({
      accessibilityLabel: label,
      accessibilityRole: 'link',
      accessible: true,
    }),
    image: (label: string): AccessibilityProps => ({
      accessibilityLabel: label,
      accessibilityRole: 'image',
      accessible: true,
    }),
    input: (label: string, hint?: string): AccessibilityProps => ({
      accessibilityLabel: label,
      accessibilityHint: hint,
      accessibilityRole: 'text',
      accessible: true,
    }),
    header: (label: string): AccessibilityProps => ({
      accessibilityLabel: label,
      accessibilityRole: 'header',
      accessible: true,
    }),
  },

  // Focus management
  focus: {
    trap: (): AccessibilityProps => ({
      accessibilityViewIsModal: true,
    }),
  },

  // Motion reduction
  prefersReducedMotion: (): boolean => {
    // Check for prefers-reduced-motion
    // This would be implemented with a hook or context
    return false;
  },
};

export const getReducedMotionStyles = (styles: any) => {
  if (accessibility.prefersReducedMotion()) {
    return {
      ...styles,
      animationDuration: '0ms',
      transitionDuration: '0ms',
    };
  }
  return styles;
};