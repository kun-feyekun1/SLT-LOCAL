import type {
  ComponentColorTokens,
  SemanticColorTokens,
} from "../tokens/colors/";

export type ThemeStatusBarStyle = "light-content" | "dark-content";

export interface Theme {
  // COMPLETE TOKEN ACCESS

  //Complete semantic color system.
  colors: SemanticColorTokens;

  //Complete component color system.
  components: ComponentColorTokens;

  // BRAND
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  brand: {
    primary: string;
    secondary: string;
  };

  // BACKGROUND
  background: {
    primary: string;
    secondary: string;
  };

  // STATUS
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  info: string;
  infoLight: string;

  // TEXT
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    hint: string;
    placeholder: string;
    disabled: string;
    inverse: string;
  };

  // SURFACE
  surface: {
    background: string;
    surface: string;
    surfaceElevated: string;
    card: string;
    inputBackground: string;
  };

  // BORDER
  border: {
    default: string;
    focus: string;
    error: string;
    success: string;
    divider: string;
    input: string;
  };

  // ICON
  icon: {
    active: string;
    inactive: string;
    error: string;
    success: string;
    warning: string;
    disabled: string;
  };

  // BUTTON
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
    destructive: ComponentColorTokens["button"]["destructive"];
  };

  // INPUT
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

  // CARD
  card: {
    background: string;
    border: string;
    shadow: string;
  };

  // NAVIGATION
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

  // COMPONENT TOKENS
  checkbox: ComponentColorTokens["checkbox"];
  switch: ComponentColorTokens["switch"];
  tabs: ComponentColorTokens["tabs"];
  badge: ComponentColorTokens["badge"];
  toast: ComponentColorTokens["toast"];
  modal: ComponentColorTokens["modal"];
  bottomSheet: ComponentColorTokens["bottomSheet"];

  // SPECIALIZED SEMANTIC TOKENS
  map: SemanticColorTokens["map"];
  skeleton: SemanticColorTokens["skeleton"];
  accessibility: SemanticColorTokens["accessibility"];

  // GENERAL
  divider: string;
  overlay: {
    light: string;
    medium: string;
    dark: string;
    scrim: string;
    scrimHeavy: string;
  };
  statusBar: ThemeStatusBarStyle;
  white: string;
  black: string;
  transparent: string;
}
