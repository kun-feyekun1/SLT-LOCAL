// import { createComponentColors } from "./componentColors";
// import { darkColors } from "./darkColors";
// import { lightColors } from "./lightColors";
// import { palette } from "./palette";

// export const colorTokens = {
//   palette,

//   light: {
//     semantic: lightColors,
//     component: createComponentColors(lightColors),
//   },

//   dark: {
//     semantic: darkColors,
//     component: createComponentColors(darkColors),
//   },
// } as const;

// export { createComponentColors, darkColors, lightColors, palette };

// export type { ComponentColorTokens } from "./componentColors";
// export type { ColorPalette } from "./palette";
// export type { SemanticColorTokens, StatusColorTokens } from "./types";

// export type ColorSchemeName = "light" | "dark";

// export function getColorTheme(mode: ColorSchemeName) {
//   return colorTokens[mode];
// }

import { createComponentColors } from "./componentColors";
import { darkColors } from "./darkColors";
import { lightColors } from "./lightColors";
import { palette } from "./palette";

export const colorTokens = {
  palette,
  light: {
    semantic: lightColors,
    component: createComponentColors(lightColors),
  },
  dark: {
    semantic: darkColors,
    component: createComponentColors(darkColors),
  },
} as const;

export type ColorSchemeName = "light" | "dark";

export function getColorTheme(mode: ColorSchemeName) {
  return colorTokens[mode];
}

export * from "./componentColors";
export * from "./darkColors";
export * from "./lightColors";
export * from "./palette";
export * from "./types";
