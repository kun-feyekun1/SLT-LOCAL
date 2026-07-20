/**
 * Animation Hooks - SmartLink Transit
 * Enterprise reusable animation utilities
 * Powered by React Native Reanimated
 */

import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { animation, getDuration } from "../../tokens/animation";
import { getEasing } from "../../utils/reanimated";

/**
 * Shake Animation
 * Used for:
 * - validation errors
 * - wrong password
 * - failed actions
 */
export const useShakeAnimation = (
  duration = getDuration("complex"),

  distance = animation.distances.shake
) => {
  const translateX = useSharedValue(0);

  const shake = () => {
    translateX.value = withTiming(
      -distance,

      {
        duration: duration / 4,
        easing: getEasing(animation.easing.linear),
      },

      () => {
        translateX.value = withTiming(
          distance,

          {
            duration: duration / 2,
            easing: getEasing(animation.easing.linear),
          },

          () => {
            translateX.value = withTiming(
              0,

              {
                duration: duration / 4,
                easing: getEasing(animation.easing.linear),
              }
            );
          }
        );
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return {
    translateX,
    animatedStyle,
    shake,
  };
};
