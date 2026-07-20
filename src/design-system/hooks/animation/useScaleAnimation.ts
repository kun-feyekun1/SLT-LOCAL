
/**
 * Animation Hooks - SmartLink Transit
 * Enterprise reusable animation utilities
 * Powered by React Native Reanimated
 */

import {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";

import {
  animation,
  getSpringPreset
} from "../../tokens/animation";


/**
 * Scale Animation
 * Used for:
 * - buttons
 * - cards
 * - press effects
 */
export const useScaleAnimation = (

  initialScale = 1,

  targetScale = animation.scales.buttonPress

)=>{


  const scale = useSharedValue(initialScale);


  const spring = getSpringPreset("snappy");



  const scaleDown = () => {


    scale.value = withSpring(

      targetScale,

      {
        damping:spring.damping,
        stiffness:spring.stiffness,
        mass:spring.mass,
      }

    );

  };




  const scaleUp = () => {


    scale.value = withSpring(

      initialScale,

      {
        damping:spring.damping,
        stiffness:spring.stiffness,
        mass:spring.mass,
      }

    );

  };




  const animatedStyle = useAnimatedStyle(()=>({

    transform:[
      {
        scale:scale.value
      }
    ]

  }));



  return {

    scale,
    animatedStyle,
    scaleDown,
    scaleUp,

  };

};







