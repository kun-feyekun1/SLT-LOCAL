// import { ScrollView, Text } from "react-native";

// import AnimationCard from "@/design-system/components/ashowcase/AnimationCard";
// import {
//   useFadeAnimation,
//   useSlideAnimation,
// } from "@/design-system/hooks/animation";
// import { useScaleAnimation } from "@/design-system/hooks/animation/useScaleAnimation";
// const fade = useFadeAnimation();
// const slide = useSlideAnimation();

// export default function DesignSystemScreen() {
//   const { animatedStyle, scaleDown } = useScaleAnimation();
//   return (

//     <ScrollView
//       style={{
//         flex: 1,
//         backgroundColor: "#F5F3F0",
//       }}

//       contentContainerStyle={{
//         padding: 24,
//       }}
//     >
//       <Text
//         style={{
//           fontSize: 28,
//           fontWeight: "700",
//           marginBottom: 30,
//         }}
//       >
//         SmartLink Design System
//       </Text>

//       <AnimationCard
//         title="Scale Animation Card"
//         description="Testing reusable animation card component"
//         animatedStyle={animatedStyle}
//         duration={120}
//         easing="easeInOut"
//         spring="snappy"
//         scale={0.95}
//         onPlay={scaleDown}
//       />

//       <AnimationCard
//         title="Slide"
//         description="Slide animation"
//         animatedStyle={slide.animatedStyle}
//         onPlay={slide.slideIn}
//         duration={250}
//         easing="Ease Out"
//         distance={16}
//       />

//       <AnimationCard
//         title="Fade"
//         description="Fade animation"
//         animatedStyle={fade.animatedStyle}
//         onPlay={fade.fadeIn}
//         duration={250}
//         easing="Ease Out"
//       />
//     </ScrollView>
//   );
// }

import React from "react";
import { Text } from "react-native";

import Screen from "@/components/ScreenWrapper/ScreenWrapper";
import AnimationCard from "@/design-system/components/ashowcase/AnimationCard";

import { useTheme } from "@/features/theme/hooks/useTheme";

import {
  useFadeAnimation,
  useScaleAnimation,
  useSlideAnimation,
} from "@/design-system/hooks/animation";

import { spacing } from "@/design-system/tokens/spacing";
import { typography } from "@/design-system/tokens/typography";

export default function DesignSystemScreen() {
  const { theme } = useTheme();

  // Hooks MUST be inside the component
  const fade = useFadeAnimation();
  const slide = useSlideAnimation();
  const scale = useScaleAnimation();

  return (
    <Screen>
      <Text
        style={[
          typography.h1,
          {
            color: theme.text.primary,
            marginBottom: spacing[24],
          },
        ]}
      >
        SmartLink Design System
      </Text>

      <AnimationCard
        title="Scale Animation"
        description="Testing reusable scale animation."
        animatedStyle={scale.animatedStyle}
        duration={120}
        easing="Ease In Out"
        spring="Snappy"
        scale={0.95}
        onPlay={scale.scaleDown}
      />

      <AnimationCard
        title="Slide Animation"
        description="Testing slide transition animation."
        animatedStyle={slide.animatedStyle}
        onPlay={slide.slideIn}
        duration={250}
        easing="Ease Out"
        distance={16}
      />

      <AnimationCard
        title="Fade Animation"
        description="Testing fade transition animation."
        animatedStyle={fade.animatedStyle}
        onPlay={fade.fadeIn}
        duration={250}
        easing="Ease Out"
      />
    </Screen>
  );
}
