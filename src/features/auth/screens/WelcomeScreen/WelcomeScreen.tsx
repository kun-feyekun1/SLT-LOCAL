import React from "react";
import { Image, Text, View } from "react-native";

import Screen from "@/components/ScreenWrapper/ScreenWrapper";
import { useTheme } from "@/design-system/hooks/theme/useTheme";

import { styles } from "./WelcomeScreen.styles";

export default function WelcomeScreen() {
  const { theme } = useTheme();

  return (
    <Screen scrollable={false} padded={false}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background.primary,
          },
        ]}
      >
        <View style={styles.hero}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              {
                color: theme.text.primary,
              },
            ]}
          >
            Move Smarter With SmartLink
          </Text>

          <Text
            style={[
              styles.description,
              {
                color: theme.text.secondary,
              },
            ]}
          >
            Your intelligent transportation companion. Find routes, connect with
            drivers, and travel faster.
          </Text>
        </View>

        <View style={styles.actions}>
          <View
            style={[
              styles.primaryButton,
              {
                backgroundColor: theme.button.primary.background,
              },
            ]}
          >
            <Text
              style={[
                styles.primaryButtonText,
                {
                  color: theme.button.primary.text,
                },
              ]}
            >
              Get Started
            </Text>
          </View>

          <View
            style={[
              styles.secondaryButton,
              {
                borderColor: theme.button.secondary.border,
              },
            ]}
          >
            <Text
              style={[
                styles.secondaryButtonText,
                {
                  color: theme.button.secondary.text,
                },
              ]}
            >
              I already have an account
            </Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}
