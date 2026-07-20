import { StyleSheet } from "react-native";

import { spacing } from "@/design-system/tokens/spacing";

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: spacing[20],
    paddingTop: spacing[20],
    paddingBottom: spacing[40],
  },
});
