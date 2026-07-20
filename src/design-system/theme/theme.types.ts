export interface Theme {
  primary: string;
  primaryLight: string;
  primaryDark: string;

  accent: string;
  accentLight: string;

  success: string;
  successLight: string;

  warning: string;
  warningLight: string;

  error: string;
  errorLight: string;

  info: string;
  infoLight: string;

  brand: {
    primary: string;
    secondary: string;
  };

  background: {
    primary: string;
    secondary: string;
  };

  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    hint: string;
    placeholder: string;
    disabled: string;
    inverse: string;
  };

  surface: {
    background: string;
    surface: string;
    surfaceElevated: string;
    card: string;
    inputBackground: string;
  };

  border: {
    default: string;
    focus: string;
    error: string;
    success: string;
    divider: string;
    input: string;
  };

  icon: {
    active: string;
    inactive: string;
    error: string;
    success: string;
    warning: string;
    disabled: string;
  };

  // Button Colors
  button: {
    primary: {
      background: string;
      text: string;
      pressed: string;
      disabled: string;
      disabledText: string;
    };

    secondary: {
      border: string;
      text: string;
      pressed: string;
      disabled: string;
      disabledText: string;
    };

    tertiary: {
      background: string;
      text: string;
      pressed: string;
      disabled: string;
      disabledText: string;
    };

    text: {
      text: string;
      pressed: string;
      disabled: string;
    };
  };

  input: {
    border: string;
    borderFocus: string;
    borderError: string;
    borderSuccess: string;
    background: string;
    label: string;
    labelFocus: string;
    labelError: string;
    labelSuccess: string;
    placeholder: string;
  };

  card: {
    background: string;
    border: string;
    shadow: string;
  };

  // Navigation Colors
  navigation: {
    bottomNav: {
      active: string;
      inactive: string;
      background: string;
      border: string;
    };

    topAppBar: {
      background: string;
      title: string;
      icon: string;
    };

    drawer: {
      background: string;
      divider: string;
    };
  };

  overlay: {
    light: string;
    medium: string;
    dark: string;
    scrim: string;
    scrimHeavy: string;
  };

  divider: string;

  statusBar: "light-content" | "dark-content";

  white: string;
  black: string;
}
