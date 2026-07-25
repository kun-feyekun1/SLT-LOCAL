export interface SemanticColorTokens {
  background: {
    canvas: string;
    canvasSubtle: string;
    surface: string;
    surfaceSubtle: string;
    surfaceElevated: string;
    surfaceSunken: string;
    inverse: string;
    disabled: string;
    brand: string;
    brandSubtle: string;
    accent: string;
    accentSubtle: string;
  };

  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    placeholder: string;
    inverse: string;
    brand: string;
    accent: string;
    link: string;
    linkHover: string;
    linkPressed: string;
    onBrand: string;
    onAccent: string;
  };

  icon: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
    brand: string;
    accent: string;
    onBrand: string;
    onAccent: string;
  };

  border: {
    subtle: string;
    default: string;
    strong: string;
    disabled: string;
    inverse: string;
    brand: string;
    accent: string;
    focus: string;
  };

  interactive: {
    primary: {
      default: string;
      hover: string;
      pressed: string;
      selected: string;
      disabled: string;
      foreground: string;
      foregroundDisabled: string;
    };

    secondary: {
      default: string;
      hover: string;
      pressed: string;
      selected: string;
      disabled: string;
      foreground: string;
      foregroundDisabled: string;
      border: string;
    };

    tertiary: {
      default: string;
      hover: string;
      pressed: string;
      selected: string;
      disabled: string;
      foreground: string;
      foregroundDisabled: string;
    };

    destructive: {
      default: string;
      hover: string;
      pressed: string;
      disabled: string;
      foreground: string;
      foregroundDisabled: string;
    };
  };

  status: {
    success: StatusColorTokens;
    warning: StatusColorTokens;
    error: StatusColorTokens;
    info: StatusColorTokens;
    neutral: StatusColorTokens;
  };

  input: {
    background: string;
    backgroundDisabled: string;
    backgroundReadOnly: string;
    text: string;
    placeholder: string;
    label: string;
    helperText: string;
    border: string;
    borderHover: string;
    borderFocus: string;
    borderError: string;
    icon: string;
    iconDisabled: string;
    selection: string;
  };

  navigation: {
    background: string;
    backgroundElevated: string;
    active: string;
    inactive: string;
    activeBackground: string;
    indicator: string;
    border: string;
  };

  overlay: {
    subtle: string;
    default: string;
    strong: string;
    scrim: string;
    scrimStrong: string;
    modal: string;
  };

  skeleton: {
    base: string;
    highlight: string;
  };

  map: {
    routePrimary: string;
    routeAlternative: string;
    routeCompleted: string;
    routeRemaining: string;
    pickup: string;
    dropoff: string;
    userLocation: string;
    vehicleLocation: string;
    geofenceFill: string;
    geofenceBorder: string;
    mapOverlay: string;
  };

  accessibility: {
    focusRing: string;
    focusRingOffset: string;
    highContrastText: string;
    highContrastBackground: string;
  };
}

export interface StatusColorTokens {
  background: string;
  backgroundStrong: string;
  foreground: string;
  foregroundStrong: string;
  border: string;
  icon: string;
}
