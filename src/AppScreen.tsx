// src/design-system/components/AppScreen/AppScreen.tsx

import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { layout, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

type BackgroundVariant = "primary" | "secondary" | "surface";

interface AppScreenProps {
  children: ReactNode;
  scrollable?: boolean;
  padded?: boolean;
  keyboardAvoiding?: boolean;
  background?: BackgroundVariant;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: Omit<ScrollViewProps, "contentContainerStyle">;
}

export function AppScreen({
  children,
  scrollable = false,
  padded = true,
  keyboardAvoiding = false,
  background = "primary",
  contentContainerStyle,
  scrollViewProps,
}: AppScreenProps) {
  const { theme } = useTheme();

  const backgroundColorMap = {
    primary: theme.background.primary,
    secondary: theme.background.secondary,
    surface: theme.surface.background,
  };

  const contentStyle: StyleProp<ViewStyle> = [
    {
      flexGrow: 1,
      paddingHorizontal: padded ? layout.screenPadding : 0,
      paddingVertical: padded ? spacing[16] : 0,
    },
    contentContainerStyle,
  ];

  const content = scrollable ? (
    <ScrollView
      {...scrollViewProps}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={contentStyle}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[{ flex: 1 }, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{
        flex: 1,
        backgroundColor: backgroundColorMap[background],
      }}
    >
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}
