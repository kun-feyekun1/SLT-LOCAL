// import React, { memo } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   RefreshControl,
//   ScrollView,
//   StatusBar,
//   View,
// } from "react-native";
// import Animated, { FadeIn } from "react-native-reanimated";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { useTheme } from "@/design-system/hooks/theme/useTheme";

// import { styles } from "./Screen.styles";
// import { ScreenProps } from "./Screen.types";

// const AnimatedView = Animated.createAnimatedComponent(View);

// function Screen({
//   children,
//   scrollable = true,
//   padded = true,
//   animated = true,
//   keyboard = true,
//   safeAreaEdges = ["top", "bottom"],
//   backgroundColor,
//   style,
//   contentStyle,
//   scrollViewProps,
//   refreshing,
//   onRefresh,
// }: ScreenProps) {
//   const { theme } = useTheme();

//   const Container = animated ? AnimatedView : View;

//   const content = (
//     <Container
//       entering={animated ? FadeIn.duration(250) : undefined}
//       style={[styles.content, padded && styles.padded, contentStyle]}
//     >
//       {children}
//     </Container>
//   );

//   return (
//     <>
//       <StatusBar
//         translucent={false}
//         backgroundColor={backgroundColor ?? theme.background.primary}
//         barStyle={theme.statusBar}
//       />

//       <SafeAreaView
//         edges={safeAreaEdges}
//         style={[
//           styles.safeArea,
//           {
//             backgroundColor: backgroundColor ?? theme.background.primary,
//           },
//           style,
//         ]}
//       >
//         <KeyboardAvoidingView
//           enabled={keyboard}
//           style={styles.flex}
//           behavior={Platform.OS === "ios" ? "padding" : undefined}
//         >
//           {scrollable ? (
//             <ScrollView
//               keyboardShouldPersistTaps="handled"
//               keyboardDismissMode="on-drag"
//               automaticallyAdjustKeyboardInsets
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={styles.scrollContent}
//               refreshControl={
//                 onRefresh ? (
//                   <RefreshControl
//                     refreshing={refreshing ?? false}
//                     onRefresh={onRefresh}
//                     tintColor={theme.primary}
//                     colors={[theme.primary]}
//                   />
//                 ) : undefined
//               }
//               {...scrollViewProps}
//             >
//               {content}
//             </ScrollView>
//           ) : (
//             content
//           )}
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </>
//   );
// }

// src/components/ScreenWrapper/Screen.tsx

import React, { memo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/features/theme/hooks/useTheme";

import { styles } from "./Screen.styles";
import type { ScreenProps } from "./Screen.types";

function ScreenWrapper({
  children,
  scrollable = true,
  padded = true,
  keyboard = true,
  keyboardVerticalOffset = 30,
  safeAreaEdges = ["top", "bottom"],
  backgroundColor,
  style,
  contentStyle,
  scrollViewProps,
  refreshing,
  onRefresh,
}: ScreenProps) {
  const { theme } = useTheme();

  const screenBackgroundColor = backgroundColor ?? theme.background.primary;

  const content = (
    <View style={[styles.content, padded && styles.padded, contentStyle]}>
      {children}
    </View>
  );

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={screenBackgroundColor}
        barStyle={theme.statusBar}
      />

      <SafeAreaView
        edges={safeAreaEdges}
        style={[
          styles.safeArea,
          {
            backgroundColor: screenBackgroundColor,
          },
          style,
        ]}
      >
        <KeyboardAvoidingView
          enabled={keyboard}
          style={styles.flex}
          behavior={
            keyboard
              ? Platform.OS === "ios"
                ? "padding"
                : "height"
              : undefined
          }
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          {scrollable ? (
            <ScrollView
              {...scrollViewProps}
              style={[styles.scrollView, scrollViewProps?.style]}
              contentContainerStyle={[
                styles.scrollContent,
                scrollViewProps?.contentContainerStyle,
              ]}
              keyboardShouldPersistTaps={
                scrollViewProps?.keyboardShouldPersistTaps ?? "handled"
              }
              keyboardDismissMode={
                scrollViewProps?.keyboardDismissMode ??
                (Platform.OS === "ios" ? "interactive" : "on-drag")
              }
              automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
              showsVerticalScrollIndicator={
                scrollViewProps?.showsVerticalScrollIndicator ?? false
              }
              refreshControl={
                onRefresh ? (
                  <RefreshControl
                    refreshing={refreshing ?? false}
                    onRefresh={onRefresh}
                    tintColor={theme.primary}
                    colors={[theme.primary]}
                  />
                ) : undefined
              }
            >
              {content}
            </ScrollView>
          ) : (
            content
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

export default memo(ScreenWrapper);
