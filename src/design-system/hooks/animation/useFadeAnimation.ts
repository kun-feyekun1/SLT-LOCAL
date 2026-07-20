/**
 * Animation Hooks - SmartLink Transit
 * Enterprise reusable animation utilities
 * Powered by React Native Reanimated
 */

import {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";


import {
  animation,
  getDuration
} from "../../tokens/animation";

import { getEasing } from "../../utils/reanimated";


/**
 * Fade Animation
 * Used for:
 * - screens
 * - cards
 * - overlays
 * - modals
 */
export const useFadeAnimation = (
  duration = getDuration("medium")
) => {

  const opacity = useSharedValue(0);


  const fadeIn = () => {

  opacity.value = withTiming(
  1,
  {
    duration,
    easing: getEasing(
      animation.easing.easeOut
    ),
  }
);

  };


  const fadeOut = () => {

    opacity.value = withTiming(
      0,
      {
        duration,
        easing: getEasing(
          animation.easing.easeIn,
        )
      }
    );

  };


  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));


  return {
    opacity,
    animatedStyle,
    fadeIn,
    fadeOut,
  };
};
