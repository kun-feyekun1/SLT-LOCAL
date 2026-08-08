import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/features/theme/hooks/useTheme";
import { dismissToast } from "@/features/toast/state/toastSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getComponentShadow, radius, spacing } from "@/design-system/tokens";

import { AppText } from "@/components/AppText/AppText";

export const ToastMessage = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state: any) => state.toast.active);
  const theme = useTheme();

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = setTimeout(() => dispatch(dismissToast(toast.id)), 3500);
    return () => clearTimeout(timer);
  }, [dispatch, toast]);

  if (!toast) {
    return null;
  }

  const color =
    toast.kind === "error"
      ? theme.colors.danger
      : toast.kind === "success"
        ? theme.colors.success
        : theme.colors.info;

  return (
    <View pointerEvents="none" style={styles.overlay}>
      <View
        style={[
          styles.toast,
          getComponentShadow("snackbar"),
          { backgroundColor: theme.colors.surface, borderColor: color },
        ]}
      >
        <AppText weight={700}>{toast.message}</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: spacing[5],
    left: spacing[4],
    right: spacing[4],
    zIndex: 30,
  },
  toast: {
    borderLeftWidth: 4,
    borderRadius: radius.md,
    padding: spacing[4],
  },
});
