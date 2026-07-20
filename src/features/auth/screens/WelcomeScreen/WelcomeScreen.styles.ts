import { StyleSheet } from "react-native";

import { componentRadius } from "@/design-system/tokens/radius";
import { spacing } from "@/design-system/tokens/spacing";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing[24],
    paddingVertical: spacing[32],
  },

  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "90%",
    height: 280,
  },

  content: {
    alignItems: "center",
    gap: spacing[12],
  },

  title: {
    textAlign: "center",
  },

  description: {
    textAlign: "center",
    maxWidth: 320,
  },

  actions: {
    gap: spacing[12],
  },

  primaryButton: {
    height: 56,
    borderRadius: componentRadius.avatar,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryButtonText: {},

  secondaryButton: {
    height: 56,
    borderRadius: componentRadius.avatar,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  secondaryButtonText: {},
});
