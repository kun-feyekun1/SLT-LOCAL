import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Screen from "@/components/ScreenWrapper/ScreenWrapper";

export default function OnboardingScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Onboarding Screen</Text>
        <Text style={styles.subtitle}>
          Introduces the application features.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "700" },
  subtitle: { marginTop: 8, fontSize: 16, opacity: 0.7, textAlign: "center" },
});
