// src/features/toast/components/ToastMessage.tsx

import { memo } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";

import type {
  ToastMessageProps,
  ToastVariant,
} from "../types/toast.types";

interface ToastVisualConfig {
  symbol: string;
  backgroundColor: string;
  borderColor: string;
  symbolBackgroundColor: string;
  foregroundColor: string;
}

const TOAST_VISUALS: Record<
  ToastVariant,
  ToastVisualConfig
> = {
  success: {
    symbol: "✓",
    backgroundColor: "#ECFDF3",
    borderColor: "#16A34A",
    symbolBackgroundColor: "#16A34A",
    foregroundColor: "#14532D",
  },

  error: {
    symbol: "!",
    backgroundColor: "#FEF2F2",
    borderColor: "#DC2626",
    symbolBackgroundColor: "#DC2626",
    foregroundColor: "#7F1D1D",
  },

  warning: {
    symbol: "!",
    backgroundColor: "#FFFBEB",
    borderColor: "#D97706",
    symbolBackgroundColor: "#D97706",
    foregroundColor: "#78350F",
  },

  info: {
    symbol: "i",
    backgroundColor: "#EFF6FF",
    borderColor: "#2563EB",
    symbolBackgroundColor: "#2563EB",
    foregroundColor: "#1E3A8A",
  },
};

function ToastMessageComponent({
  toast,
  onDismiss,
}: ToastMessageProps) {
  const visual = TOAST_VISUALS[toast.variant];

  const dynamicContainerStyle: ViewStyle = {
    backgroundColor: visual.backgroundColor,
    borderLeftColor: visual.borderColor,
  };

  return (
    <View
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
      style={[styles.container, dynamicContainerStyle]}
    >
      <View
        style={[
          styles.symbolContainer,
          {
            backgroundColor: visual.symbolBackgroundColor,
          },
        ]}
      >
        <Text style={styles.symbol}>{visual.symbol}</Text>
      </View>

      <View style={styles.content}>
        {toast.title ? (
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              { color: visual.foregroundColor },
            ]}
          >
            {toast.title}
          </Text>
        ) : null}

        <Text
          numberOfLines={4}
          style={[
            styles.message,
            { color: visual.foregroundColor },
          ]}
        >
          {toast.message}
        </Text>
      </View>

      {toast.dismissible ? (
        <Pressable
          accessibilityLabel="Dismiss notification"
          accessibilityRole="button"
          hitSlop={10}
          onPress={onDismiss}
          style={({ pressed }) => [
            styles.closeButton,
            pressed && styles.closeButtonPressed,
          ]}
        >
          <Text
            style={[
              styles.closeSymbol,
              { color: visual.foregroundColor },
            ]}
          >
            ×
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export const ToastMessage = memo(ToastMessageComponent);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 560,
    minHeight: 72,

    flexDirection: "row",
    alignItems: "center",

    borderLeftWidth: 5,
    borderRadius: 16,

    paddingHorizontal: 16,
    paddingVertical: 14,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,

    elevation: 7,
  },

  symbolContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,
  },

  symbol: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22,
  },

  content: {
    flex: 1,
  },

  title: {
    marginBottom: 2,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },

  message: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },

  closeButton: {
    minWidth: 32,
    minHeight: 32,

    alignItems: "center",
    justifyContent: "center",

    marginLeft: 8,
    borderRadius: 16,
  },

  closeButtonPressed: {
    opacity: 0.5,
  },

  closeSymbol: {
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 28,
  },
});