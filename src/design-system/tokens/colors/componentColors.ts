import type { SemanticColorTokens } from "./types";

export function createComponentColors(colors: SemanticColorTokens) {
  return {
    button: {
      primary: {
        background: colors.interactive.primary.default,
        backgroundHover: colors.interactive.primary.hover,
        backgroundPressed: colors.interactive.primary.pressed,
        backgroundDisabled: colors.interactive.primary.disabled,
        text: colors.interactive.primary.foreground,
        textDisabled: colors.interactive.primary.foregroundDisabled,
        icon: colors.interactive.primary.foreground,
      },

      secondary: {
        background: colors.interactive.secondary.default,
        backgroundHover: colors.interactive.secondary.hover,
        backgroundPressed: colors.interactive.secondary.pressed,
        backgroundDisabled: colors.interactive.secondary.disabled,
        text: colors.interactive.secondary.foreground,
        textDisabled: colors.interactive.secondary.foregroundDisabled,
        border: colors.interactive.secondary.border,
      },

      destructive: {
        background: colors.interactive.destructive.default,
        backgroundHover: colors.interactive.destructive.hover,
        backgroundPressed: colors.interactive.destructive.pressed,
        backgroundDisabled: colors.interactive.destructive.disabled,
        text: colors.interactive.destructive.foreground,
        textDisabled: colors.interactive.destructive.foregroundDisabled,
      },
    },

    card: {
      background: colors.background.surface,
      backgroundElevated: colors.background.surfaceElevated,
      border: colors.border.subtle,
      title: colors.text.primary,
      description: colors.text.secondary,
      icon: colors.icon.secondary,
    },

    input: {
      background: colors.input.background,
      backgroundDisabled: colors.input.backgroundDisabled,
      text: colors.input.text,
      placeholder: colors.input.placeholder,
      label: colors.input.label,
      helperText: colors.input.helperText,
      border: colors.input.border,
      borderFocus: colors.input.borderFocus,
      borderError: colors.input.borderError,
      icon: colors.input.icon,
    },

    checkbox: {
      background: colors.background.surface,
      backgroundChecked: colors.interactive.primary.default,
      backgroundDisabled: colors.background.disabled,
      border: colors.border.default,
      borderChecked: colors.interactive.primary.default,
      checkmark: colors.interactive.primary.foreground,
      checkmarkDisabled: colors.text.disabled,
    },

    switch: {
      trackOff: colors.border.strong,
      trackOn: colors.interactive.primary.default,
      trackDisabled: colors.border.disabled,
      thumb: colors.background.surface,
      thumbDisabled: colors.text.disabled,
    },

    tabs: {
      background: colors.navigation.background,
      activeText: colors.navigation.active,
      inactiveText: colors.navigation.inactive,
      activeBackground: colors.navigation.activeBackground,
      indicator: colors.navigation.indicator,
      border: colors.navigation.border,
    },

    badge: {
      neutral: {
        background: colors.status.neutral.background,
        text: colors.status.neutral.foreground,
        border: colors.status.neutral.border,
      },
      success: {
        background: colors.status.success.background,
        text: colors.status.success.foreground,
        border: colors.status.success.border,
      },
      warning: {
        background: colors.status.warning.background,
        text: colors.status.warning.foreground,
        border: colors.status.warning.border,
      },
      error: {
        background: colors.status.error.background,
        text: colors.status.error.foreground,
        border: colors.status.error.border,
      },
      info: {
        background: colors.status.info.background,
        text: colors.status.info.foreground,
        border: colors.status.info.border,
      },
    },

    toast: {
      success: {
        background: colors.status.success.backgroundStrong,
        text: colors.text.inverse,
        icon: colors.text.inverse,
      },
      warning: {
        background: colors.status.warning.backgroundStrong,
        text: colors.status.warning.foregroundStrong,
        icon: colors.status.warning.foregroundStrong,
      },
      error: {
        background: colors.status.error.backgroundStrong,
        text: colors.text.inverse,
        icon: colors.text.inverse,
      },
      info: {
        background: colors.status.info.backgroundStrong,
        text: colors.text.inverse,
        icon: colors.text.inverse,
      },
    },

    modal: {
      background: colors.background.surfaceElevated,
      backdrop: colors.overlay.modal,
      title: colors.text.primary,
      description: colors.text.secondary,
      border: colors.border.subtle,
    },

    bottomSheet: {
      background: colors.background.surfaceElevated,
      handle: colors.border.strong,
      backdrop: colors.overlay.scrim,
      border: colors.border.subtle,
    },
  } as const;
}

export type ComponentColorTokens = ReturnType<typeof createComponentColors>;
