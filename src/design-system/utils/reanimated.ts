import { Easing, type EasingFunction } from "react-native-reanimated";

import type { AnimationEasing } from "@/tokens/animation";

export const getEasing = (easing: AnimationEasing): EasingFunction => {
  switch (easing) {
    case "linear":
      return Easing.linear;

    case "easeIn":
      return Easing.in(Easing.ease);

    case "easeOut":
      return Easing.out(Easing.ease);

    case "easeInOut":
      return Easing.inOut(Easing.ease);

    case "easeInQuad":
      return Easing.in(Easing.quad);

    case "easeOutQuad":
      return Easing.out(Easing.quad);

    case "easeInCubic":
      return Easing.in(Easing.cubic);

    case "easeOutCubic":
      return Easing.out(Easing.cubic);

    default:
      return Easing.linear;
  }
};
