

/**
 * Tailwind Configuration - SmartLink Transit
 * Maps design tokens to Tailwind classes
 */

// const { colors, typography, spacing, radius, elevation } = require('./src/design-system/tokens');

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './src/**/*.{js,jsx,ts,tsx}',
//     './app/**/*.{js,jsx,ts,tsx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // Brand
//         primary: {
//           DEFAULT: colors.brand.green,
//           light: colors.brand.greenLight,
//           dark: colors.brand.greenDark,
//         },
//         accent: {
//           DEFAULT: colors.brand.gold,
//           light: colors.brand.goldLight,
//         },
        
//         // Semantic
//         success: {
//           DEFAULT: colors.semantic.success,
//           light: colors.semantic.successLight,
//         },
//         warning: {
//           DEFAULT: colors.semantic.warning,
//           light: colors.semantic.warningLight,
//         },
//         error: {
//           DEFAULT: colors.semantic.error,
//           light: colors.semantic.errorLight,
//         },
//         info: {
//           DEFAULT: colors.semantic.info,
//           light: colors.semantic.infoLight,
//         },

//         // Neutral
//         neutral: {
//           50: colors.neutral[50],
//           100: colors.neutral[100],
//           200: colors.neutral[200],
//           300: colors.neutral[300],
//           400: colors.neutral[400],
//           500: colors.neutral[500],
//           600: colors.neutral[600],
//           700: colors.neutral[700],
//           800: colors.neutral[800],
//           900: colors.neutral[900],
//         },

//         // Dark mode neutrals
//         dark: {
//           300: colors.dark[300],
//           400: colors.dark[400],
//           500: colors.dark[500],
//           600: colors.dark[600],
//           700: colors.dark[700],
//           800: colors.dark[800],
//           900: colors.dark[900],
//         },
//       },

//       spacing: {
//         2: spacing[2],
//         4: spacing[4],
//         6: spacing[6],
//         8: spacing[8],
//         12: spacing[12],
//         16: spacing[16],
//         20: spacing[20],
//         24: spacing[24],
//         32: spacing[32],
//         40: spacing[40],
//         48: spacing[48],
//         56: spacing[56],
//         64: spacing[64],
//       },

//       borderRadius: {
//         4: radius[4],
//         8: radius[8],
//         12: radius[12],
//         16: radius[16],
//         24: radius[24],
//         999: radius[999],
//       },

//       fontSize: {
//         'display-large': typography.displayLarge.fontSize,
//         'display-medium': typography.displayMedium.fontSize,
//         'h1': typography.h1.fontSize,
//         'h2': typography.h2.fontSize,
//         'h3': typography.h3.fontSize,
//         'h4': typography.h4.fontSize,
//         'body-large': typography.bodyLarge.fontSize,
//         'body-medium': typography.bodyMedium.fontSize,
//         'body-small': typography.bodySmall.fontSize,
//         'label-large': typography.labelLarge.fontSize,
//         'label-medium': typography.labelMedium.fontSize,
//         'label-small': typography.labelSmall.fontSize,
//         'button-large': typography.buttonLarge.fontSize,
//         'button-medium': typography.buttonMedium.fontSize,
//         'button-small': typography.buttonSmall.fontSize,
//       },

//       lineHeight: {
//         'display-large': typography.displayLarge.lineHeight,
//         'display-medium': typography.displayMedium.lineHeight,
//         'h1': typography.h1.lineHeight,
//         'h2': typography.h2.lineHeight,
//         'h3': typography.h3.lineHeight,
//         'h4': typography.h4.lineHeight,
//         'body-large': typography.bodyLarge.lineHeight,
//         'body-medium': typography.bodyMedium.lineHeight,
//         'body-small': typography.bodySmall.lineHeight,
//         'label-large': typography.labelLarge.lineHeight,
//         'label-medium': typography.labelMedium.lineHeight,
//         'label-small': typography.labelSmall.lineHeight,
//         'button-large': typography.buttonLarge.lineHeight,
//         'button-medium': typography.buttonMedium.lineHeight,
//         'button-small': typography.buttonSmall.lineHeight,
//       },

//       fontFamily: {
//         'inter-thin': ['Inter-Thin'],
//         'inter-extra-light': ['Inter-ExtraLight'],
//         'inter-light': ['Inter-Light'],
//         'inter-regular': ['Inter-Regular'],
//         'inter-medium': ['Inter-Medium'],
//         'inter-semi-bold': ['Inter-SemiBold'],
//         'inter-bold': ['Inter-Bold'],
//         'inter-extra-bold': ['Inter-ExtraBold'],
//         'inter-black': ['Inter-Black'],
//       },

//       fontWeight: {
//         'thin': '100',
//         'extra-light': '200',
//         'light': '300',
//         'regular': '400',
//         'medium': '500',
//         'semi-bold': '600',
//         'bold': '700',
//         'extra-bold': '800',
//         'black': '900',
//       },

//       letterSpacing: {
//         'tight': '-0.5px',
//         '-0.25': '-0.25px',
//         '0': '0px',
//         '0.25': '0.25px',
//         '0.5': '0.5px',
//         '0.75': '0.75px',
//       },

//       // Shadow configuration (for web, React Native uses different approach)
//       boxShadow: {
//         'elevation-0': 'none',
//         'elevation-1': '0 1px 2px rgba(0,0,0,0.05)',
//         'elevation-2': '0 2px 4px rgba(0,0,0,0.08)',
//         'elevation-3': '0 4px 8px rgba(0,0,0,0.10)',
//         'elevation-4': '0 8px 16px rgba(0,0,0,0.12)',
//         'elevation-5': '0 12px 24px rgba(0,0,0,0.15)',
//         'elevation-6': '0 16px 32px rgba(0,0,0,0.20)',
//       },
//     },
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")], 
  theme: {
    extend: {
      colors: {
        primary: "#00ff9f",
      },
    },
  },
  plugins: [],
};
