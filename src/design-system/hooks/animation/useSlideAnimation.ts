/**
 * Animation Hooks - SmartLink Transit
 * Enterprise reusable animation utilities
 * Powered by React Native Reanimated
 */

import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { getEasing } from "@/design-system/utils/reanimated";
import {
  animation,
  getDuration,
  getSpringPreset,
} from "../../tokens/animation";

/**
 * Slide Animation
 * Used for:
 * - page transitions
 * - drawers
 * - bottom sheets
 */
export const useSlideAnimation = (
  direction: "up" | "down" | "left" | "right" = "up",

  distance = animation.distances.slide,

  duration = getDuration("medium")
) => {
  const translate = useSharedValue(0);

  const spring = getSpringPreset("default");

  const getInitialValue = () => {
    switch (direction) {
      case "up":
        return distance;

      case "down":
        return -distance;

      case "left":
        return distance;

      case "right":
        return -distance;
    }
  };

  const slideIn = () => {
    translate.value = getInitialValue();

    translate.value = withSpring(0, {
      damping: spring.damping,
      stiffness: spring.stiffness,
      mass: spring.mass,
    });
  };

  const slideOut = () => {
    translate.value = withTiming(getInitialValue(), {
      duration,
      easing: getEasing(animation.easing.easeIn),
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    if (direction === "left" || direction === "right") {
      return {
        transform: [
          {
            translateX: translate.value,
          },
        ],
      };
    }

    return {
      transform: [
        {
          translateY: translate.value,
        },
      ],
    };
  });

  return {
    translate,
    animatedStyle,
    slideIn,
    slideOut,
  };
};
