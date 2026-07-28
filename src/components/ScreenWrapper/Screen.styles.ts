// src/components/ScreenWrapper/Screen.styles.ts

import { StyleSheet } from "react-native";

import { spacing } from "@/design-system/tokens/spacing";

export const styles = StyleSheet.create({
  /**
   * Generic full-size container.
   * Used by KeyboardAvoidingView and other root wrappers.
   */
  flex: {
    flex: 1,
  },

  /**
   * Root safe-area container.
   */
  safeArea: {
    flex: 1,
  },

  /**
   * Ensures the ScrollView occupies the available screen space.
   */
  scrollView: {
    flex: 1,
  },

  /**
   * Allows short content to fill the screen while long content remains
   * scrollable.
   *
   * The additional bottom spacing gives focused inputs and buttons room
   * to scroll above the keyboard.
   */
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing[24],
  },

  /**
   * Main content container.
   *
   * flexGrow works better than flex: 1 inside a ScrollView because it allows
   * the content to grow beyond the viewport and remain scrollable.
   */
  content: {
    flexGrow: 1,
    width: "100%",
  },

  /**
   * Default screen padding.
   *
   * Individual screens can extend or override this through contentStyle.
   */
  padded: {
    paddingHorizontal: spacing[20],
    paddingTop: spacing[20],
    paddingBottom: spacing[40],
  },
});
