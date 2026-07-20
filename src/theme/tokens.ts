
export const colors = {
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceMuted: '#F1F5F9',
    text: '#0F172A',
    textMuted: '#64748B',
    border: '#E2E8F0',

    primary: '#2563EB',
    primaryPressed: '#1D4ED8',

    accent: '#F59E0B',

    danger: '#DC2626',
    info: '#0284C7',
    success: '#16A34A',

    taxi: '#F59E0B',
    bus: '#2563EB',
    minibus: '#7C3AED',
    walking: '#EA580C',
    rail: '#DB2777',

    overlay: 'rgba(15, 23, 42, 0.42)'
  },

  dark: {
    background: '#020617',
    surface: '#0F172A',
    surfaceMuted: '#1E293B',

    text: '#F8FAFC',
    textMuted: '#94A3B8',
    border: '#334155',

    primary: '#3B82F6',
    primaryPressed: '#2563EB',

    accent: '#FBBF24',

    danger: '#F87171',
    info: '#38BDF8',
    success: '#4ADE80',

    taxi: '#FBBF24',
    bus: '#60A5FA',
    minibus: '#A78BFA',
    walking: '#FB923C',
    rail: '#F472B6',

    overlay: 'rgba(0, 0, 0, 0.58)'
  }
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999
} as const;

export const typography = {
  family: {
    regular: 'System',
    medium: 'System',
    bold: 'System'
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 28,
    xxl: 36
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 36,
    xxl: 44
  }
} as const;

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  floating: {
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8
  }
} as const;

// export const colors = {
//   light: {
//     background: '#F7F8F5',
//     surface: '#FFFFFF',
//     surfaceMuted: '#EEF2EC',
//     text: '#10201A',
//     textMuted: '#5D6F67',
//     border: '#DDE5DF',
//     primary: '#1B8A5A',
//     primaryPressed: '#146A45',
//     accent: '#F2B84B',
//     danger: '#C94F43',
//     info: '#4F8DB7',
//     success: '#1B8A5A',
//     taxi: '#F2B84B',
//     bus: '#1B8A5A',
//     minibus: '#4F8DB7',
//     walking: '#C9653F',
//     rail: '#6D5BD0',
//     overlay: 'rgba(16, 32, 26, 0.42)'
//   },
//   dark: {
//     background: '#07130F',
//     surface: '#10201A',
//     surfaceMuted: '#173328',
//     text: '#F7F8F5',
//     textMuted: '#B7C4BC',
//     border: '#2B463A',
//     primary: '#39B979',
//     primaryPressed: '#2EA568',
//     accent: '#F2B84B',
//     danger: '#F07467',
//     info: '#7AB2D4',
//     success: '#39B979',
//     taxi: '#F2B84B',
//     bus: '#39B979',
//     minibus: '#7AB2D4',
//     walking: '#E08762',
//     rail: '#9A8CFF',
//     overlay: 'rgba(0, 0, 0, 0.58)'
//   }
// } as const;

// export const spacing = {
//   xxs: 4,
//   xs: 8,
//   sm: 12,
//   md: 16,
//   lg: 24,
//   xl: 32,
//   xxl: 40
// } as const;

// export const radii = {
//   sm: 8,
//   md: 12,
//   lg: 16,
//   xl: 24,
//   pill: 999
// } as const;

// export const typography = {
//   family: {
//     regular: 'System',
//     medium: 'System',
//     bold: 'System'
//   },
//   size: {
//     xs: 12,
//     sm: 14,
//     md: 16,
//     lg: 20,
//     xl: 28,
//     xxl: 36
//   },
//   lineHeight: {
//     xs: 16,
//     sm: 20,
//     md: 24,
//     lg: 28,
//     xl: 36,
//     xxl: 44
//   }
// } as const;

// export const shadows = {
//   card: {
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 16,
//     shadowOffset: { width: 0, height: 8 },
//     elevation: 3
//   },
//   floating: {
//     shadowColor: '#000',
//     shadowOpacity: 0.18,
//     shadowRadius: 24,
//     shadowOffset: { width: 0, height: 12 },
//     elevation: 8
//   }
// } as const;
