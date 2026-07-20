import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Animated from "react-native-reanimated";

import { useTheme } from "@/providers/ThemeProvider";

import { componentRadius } from "@/design-system/tokens/radius";
import { componentElevation } from "@/design-system/tokens/shadows";
import { spacing } from "@/design-system/tokens/spacing";
import { typography } from "@/design-system/tokens/typography";

import { useFadeAnimation } from "@/design-system/hooks/animation/useFadeAnimation";
import { useScaleAnimation } from "@/design-system/hooks/animation/useScaleAnimation";
import { useShakeAnimation } from "@/design-system/hooks/animation/useShakeAnimation";
import { useSlideAnimation } from "@/design-system/hooks/animation/useSlideAnimation";

export default function AnimationLabScreen() {
  const { theme } = useTheme();

  /*
-----------------------
SHAKE TEST
-----------------------
*/

  const { animatedStyle: shakeStyle, shake } = useShakeAnimation();

  /*
-----------------------
SLIDE TEST
-----------------------
*/

  const {
    animatedStyle: slideStyle,
    slideIn,
    slideOut,
  } = useSlideAnimation("up");

  /*
-----------------------
SCALE TEST
-----------------------
*/

  const { animatedStyle: scaleStyle, scaleDown, scaleUp } = useScaleAnimation();

  /*
-----------------------
FADE TEST
-----------------------
*/

  const { animatedStyle: fadeStyle, fadeIn, fadeOut } = useFadeAnimation();

  return (
    <ScrollView
      style={{
        backgroundColor: theme.brand.primary,
      }}

      contentContainerStyle={{
        padding: spacing[20],
      }}
    >
      <Text
        style={[
          typography.h1,
          {
            color: theme.text.primary,
          },
        ]}
      >
        Animation Lab
      </Text>

      <Text
        style={[
          typography.bodyMedium,
          {
            color: theme.text.secondary,
            marginTop: spacing[8],
          },
        ]}
      >
        Testing Reanimated hooks and animation tokens
      </Text>

      {/* SHAKE */}

      <AnimationSection
        title="Shake Animation"
        description="Validation errors, wrong password"
      />

      <Animated.View
        style={[
          styles.box,

          {
            backgroundColor: theme.brand.primary,
          },

          shakeStyle,
        ]}
      >
        <Text style={styles.white}>Shake</Text>
      </Animated.View>

      <ActionButton title="Trigger Shake" onPress={shake} />

      {/* SLIDE */}

      <AnimationSection
        title="Slide Animation"
        description="Screen transitions, drawers"
      />

      <Animated.View
        style={[
          styles.box,

          {
            backgroundColor: theme.brand.primary,
          },

          slideStyle,
        ]}
      >
        <Text style={styles.white}>Slide</Text>
      </Animated.View>

      <View style={styles.row}>
        <ActionButton title="Slide In" onPress={slideIn} />

        <ActionButton title="Slide Out" onPress={slideOut} />
      </View>

      {/* SCALE */}

      <AnimationSection
        title="Scale Animation"
        description="Buttons and card press effects"
      />

      <Animated.View
        style={[
          styles.box,

          {
            backgroundColor: theme.brand.primary,
          },

          scaleStyle,
        ]}
      >
        <Text style={styles.white}>Scale</Text>
      </Animated.View>

      <View style={styles.row}>
        <ActionButton title="Press" onPress={scaleDown} />

        <ActionButton title="Release" onPress={scaleUp} />
      </View>

      {/* FADE */}

      <AnimationSection
        title="Fade Animation"
        description="Screens, modals, overlays"
      />

      <Animated.View
        style={[
          styles.box,

          {
            backgroundColor: theme.brand.primary,
          },

          fadeStyle,
        ]}
      >
        <Text style={styles.white}>Fade</Text>
      </Animated.View>

      <View style={styles.row}>
        <ActionButton title="Fade In" onPress={fadeIn} />

        <ActionButton title="Fade Out" onPress={fadeOut} />
      </View>

      {/* TOKEN INFORMATION */}

      <View
        style={[
          styles.tokenCard,
          {
            backgroundColor: theme.surface.card,
          },
          componentElevation.card,
        ]}
      >
        <Text
          style={[
            typography.h3,
            {
              color: theme.text.primary,
            },
          ]}
        >
          Animation Tokens
        </Text>

        <Token label="Slide Distance" value="16px" />

        <Token label="Shake Distance" value="10px" />

        <Token label="Button Scale" value="0.95" />

        <Token label="Medium Duration" value="250ms" />

        <Token label="Complex Duration" value="400ms" />

        <Token label="Default Spring" value="15 damping / 180 stiffness" />
      </View>
    </ScrollView>
  );
}

function AnimationSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        marginTop: spacing[32],
      }}
    >
      <Text
        style={[
          typography.h2,
          {
            color: theme.text.primary,
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          typography.bodyMedium,
          {
            color: theme.text.secondary,
          },
        ]}
      >
        {description}
      </Text>
    </View>
  );
}

function ActionButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}

      style={{
        backgroundColor: theme.button.primary.background,

        paddingHorizontal: spacing[16],

        paddingVertical: spacing[12],

        borderRadius: componentRadius.button,

        marginTop: spacing[12],
      }}
    >
      <Text
        style={{
          color: theme.button.primary.text,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

function Token({ label, value }: { label: string; value: string }) {
  const { theme } = useTheme();

  return (
    <View style={styles.tokenRow}>
      <Text
        style={{
          color: theme.text.secondary,
        }}
      >
        {label}
      </Text>

      <Text
        style={{
          color: theme.text.primary,
          fontWeight: "700",
        }}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 120,
    height: 120,

    borderRadius: componentRadius.card,

    justifyContent: "center",
    alignItems: "center",

    marginTop: spacing[16],
  },

  white: {
    color: "#fff",
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    gap: spacing[12],
  },

  tokenCard: {
    marginTop: spacing[40],

    padding: spacing[16],

    borderRadius: componentRadius.card,
  },

  tokenRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingVertical: spacing[12],
  },
});
