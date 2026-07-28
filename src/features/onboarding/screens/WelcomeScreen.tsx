// // src/features/onboarding/screens/WelcomeScreen.tsx

// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import {
//   Image,
//   Pressable,
//   ScrollView,
//   View,
//   useWindowDimensions,
// } from "react-native";

// import { AppText } from "@/components/AppText/AppText";
// import ScreenWrapper from "@/components/ScreenWrapper/ScreenWrapper";
// import { radius, spacing } from "@/design-system/tokens";
// import { completeOnboarding } from "@/features/onboarding/state/onboardingSlice";
// import { useTheme } from "@/features/theme/hooks/useTheme";
// import { useAppDispatch } from "@/store/hooks";
// const BENEFITS = [
//   {
//     id: "routes",
//     icon: "map-outline" as const,
//     title: "Plan smarter journeys",
//     description:
//       "Discover routes, stops, schedules, and transport options around you.",
//   },
//   {
//     id: "live",
//     icon: "navigate-outline" as const,
//     title: "Travel with confidence",
//     description:
//       "Follow live transport information and stay informed throughout your trip.",
//   },
//   {
//     id: "connected",
//     icon: "people-outline" as const,
//     title: "One connected platform",
//     description:
//       "Passengers, drivers, operators, buses, and minibuses connected in one ecosystem.",
//   },
// ] as const;

// export default function WelcomeScreen() {
//   const { theme } = useTheme();
//   const { width } = useWindowDimensions();
//   const dispatch = useAppDispatch();

//   const isLargeScreen = width >= 768;

//   const goToSignUp = () => {
//     dispatch(completeOnboarding());
//     router.replace("/(auth)/signup");
//   };
//   const goToLogin = () => {
//     dispatch(completeOnboarding());
//     router.replace("/(auth)/login");
//   };

//   const goToHelp = () => {
//     router.push("/(public)/help");
//   };

//   const goToTerms = () => {
//     router.push("/(public)/terms-of-service");
//   };

//   const goToPrivacy = () => {
//     router.push("/(public)/privacy-policy");
//   };

//   return (
//     <ScreenWrapper padded={false} scrollable={false}>
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: theme.background.primary,
//         }}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             flexGrow: 1,
//             paddingHorizontal: spacing[20],
//             paddingTop: spacing[12],
//             paddingBottom: spacing[24],
//           }}
//         >
//           {/* Header */}
//           <View
//             style={{
//               minHeight: 52,
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 gap: spacing[10],
//               }}
//             >
//               <Image
//                 source={require("@/assets/images/icon.png")}
//                 resizeMode="contain"
//                 style={{
//                   width: 38,
//                   height: 38,
//                   borderRadius: radius.md,
//                 }}
//               />

//               <AppText
//                 variant="h4"
//                 weight={700}
//                 style={{ color: theme.text.primary }}
//               >
//                 SmartLink
//               </AppText>
//             </View>

//             <Pressable
//               accessibilityRole="button"
//               accessibilityLabel="Open help center"
//               hitSlop={10}
//               onPress={goToHelp}
//               style={({ pressed }) => ({
//                 minWidth: 48,
//                 minHeight: 44,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 opacity: pressed ? 0.6 : 1,
//               })}
//             >
//               <AppText
//                 variant="labelLarge"
//                 weight={600}
//                 style={{ color: theme.brand.primary }}
//               >
//                 Help
//               </AppText>
//             </Pressable>
//           </View>

//           {/* Main content */}
//           <View
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               flexDirection: isLargeScreen ? "row" : "column",
//               alignItems: isLargeScreen ? "center" : "stretch",
//               gap: isLargeScreen ? spacing[48] : spacing[32],
//               paddingVertical: spacing[32],
//             }}
//           >
//             {/* Hero */}
//             <View
//               style={{
//                 flex: isLargeScreen ? 1 : undefined,
//                 width: "100%",
//               }}
//             >
//               <View
//                 style={{
//                   alignSelf: "flex-start",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   gap: spacing[6],
//                   paddingHorizontal: spacing[12],
//                   paddingVertical: spacing[6],
//                   borderRadius: radius.full,
//                   backgroundColor: theme.brand.primary,
//                   marginBottom: spacing[20],
//                 }}
//               >
//                 <Ionicons
//                   name="sparkles-outline"
//                   size={14}
//                   color={theme.brand.primary}
//                 />

//                 <AppText
//                   variant="labelSmall"
//                   weight={700}
//                   style={{
//                     color: theme.brand.primary,
//                     letterSpacing: 0.8,
//                   }}
//                 >
//                   SMARTER URBAN MOBILITY
//                 </AppText>
//               </View>

//               <AppText
//                 variant={isLargeScreen ? "displayLarge" : "displayMedium"}
//                 weight={700}
//                 style={{
//                   color: theme.text.primary,
//                   maxWidth: 560,
//                 }}
//               >
//                 Move smarter.
//                 {"\n"}
//                 Travel connected.
//               </AppText>

//               <AppText
//                 variant="bodyLarge"
//                 style={{
//                   color: theme.text.secondary,
//                   marginTop: spacing[16],
//                   maxWidth: 520,
//                 }}
//               >
//                 Plan journeys, discover buses and minibuses, receive live
//                 transport updates, and manage your travel from one connected
//                 platform.
//               </AppText>

//               {/* Actions */}
//               <View
//                 style={{
//                   width: "100%",
//                   maxWidth: 480,
//                   gap: spacing[12],
//                   marginTop: spacing[32],
//                 }}
//               >
//                 <Pressable
//                   accessibilityRole="button"
//                   accessibilityLabel="Create an account"
//                   onPress={goToSignUp}
//                   style={({ pressed }) => ({
//                     minHeight: 54,
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: spacing[8],
//                     paddingHorizontal: spacing[20],
//                     borderRadius: radius.md,
//                     backgroundColor: pressed
//                       ? theme.button.primary.pressed
//                       : theme.button.primary.background,
//                   })}
//                 >
//                   <AppText
//                     variant="buttonLarge"
//                     weight={600}
//                     style={{ color: theme.button.primary.text }}
//                   >
//                     Get Started
//                   </AppText>

//                   <Ionicons
//                     name="arrow-forward"
//                     size={19}
//                     color={theme.button.primary.text}
//                   />
//                 </Pressable>

//                 <Pressable
//                   accessibilityRole="button"
//                   accessibilityLabel="Sign in to an existing account"
//                   onPress={goToLogin}
//                   style={({ pressed }) => ({
//                     minHeight: 54,
//                     alignItems: "center",
//                     justifyContent: "center",
//                     paddingHorizontal: spacing[20],
//                     borderWidth: 1,
//                     borderRadius: radius.md,
//                     borderColor: theme.button.secondary.border,
//                     backgroundColor: pressed
//                       ? theme.button.secondary.pressed
//                       : theme.button.secondary.border,
//                   })}
//                 >
//                   <AppText
//                     variant="buttonLarge"
//                     weight={600}
//                     style={{ color: theme.button.secondary.text }}
//                   >
//                     I already have an account
//                   </AppText>
//                 </Pressable>
//               </View>

//               <View
//                 style={{
//                   maxWidth: 480,
//                   marginTop: spacing[16],
//                 }}
//               >
//                 <AppText
//                   variant="bodySmall"
//                   style={{
//                     color: theme.text.tertiary,
//                     textAlign: "center",
//                   }}
//                 >
//                   By continuing, you agree to our{" "}
//                   <AppText
//                     variant="bodySmall"
//                     weight={600}
//                     onPress={goToTerms}
//                     style={{ color: theme.brand.primary }}
//                   >
//                     Terms of Service
//                   </AppText>{" "}
//                   and acknowledge our{" "}
//                   <AppText
//                     variant="bodySmall"
//                     weight={600}
//                     onPress={goToPrivacy}
//                     style={{ color: theme.brand.primary }}
//                   >
//                     Privacy Policy
//                   </AppText>
//                   .
//                 </AppText>
//               </View>
//             </View>

//             {/* Product preview / benefits */}
//             <View
//               style={{
//                 flex: isLargeScreen ? 1 : undefined,
//                 width: "100%",
//                 maxWidth: isLargeScreen ? 500 : undefined,
//                 overflow: "hidden",
//                 borderWidth: 1,
//                 borderColor: theme.border.default,
//                 borderRadius: radius.xl,
//                 backgroundColor: theme.surface.card,
//               }}
//             >
//               {/* Visual */}
//               <View
//                 style={{
//                   minHeight: 200,
//                   overflow: "hidden",
//                   justifyContent: "flex-end",
//                   padding: spacing[16],
//                   backgroundColor: theme.brand.primary,
//                 }}
//               >
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: -20,
//                     left: "37%",
//                     width: 8,
//                     height: 300,
//                     borderRadius: radius.full,
//                     backgroundColor: theme.brand.primary,
//                     opacity: 0.2,
//                     transform: [{ rotate: "28deg" }],
//                   }}
//                 />

//                 <View
//                   style={{
//                     alignSelf: "stretch",
//                     gap: spacing[8],
//                     padding: spacing[16],
//                     borderRadius: radius.lg,
//                     backgroundColor: theme.surface.card,
//                   }}
//                 >
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         alignItems: "center",
//                         gap: spacing[8],
//                       }}
//                     >
//                       <View
//                         style={{
//                           width: 34,
//                           height: 34,
//                           alignItems: "center",
//                           justifyContent: "center",
//                           borderRadius: radius.full,
//                           backgroundColor: theme.brand.primary,
//                         }}
//                       >
//                         <Ionicons
//                           name="bus-outline"
//                           size={18}
//                           color={theme.brand.primary}
//                         />
//                       </View>

//                       <View>
//                         <AppText
//                           variant="labelSmall"
//                           weight={700}
//                           style={{ color: theme.brand.primary }}
//                         >
//                           NEXT CONNECTION
//                         </AppText>

//                         <AppText
//                           variant="bodyMedium"
//                           weight={600}
//                           style={{
//                             color: theme.text.primary,
//                             marginTop: spacing[2],
//                           }}
//                         >
//                           City Center Express
//                         </AppText>
//                       </View>
//                     </View>

//                     <View
//                       style={{
//                         paddingHorizontal: spacing[10],
//                         paddingVertical: spacing[6],
//                         borderRadius: radius.full,
//                         backgroundColor: theme.accent,
//                       }}
//                     >
//                       <AppText
//                         variant="labelSmall"
//                         weight={700}
//                         style={{ color: theme.accent }}
//                       >
//                         6 min
//                       </AppText>
//                     </View>
//                   </View>

//                   <AppText
//                     variant="bodySmall"
//                     style={{ color: theme.text.secondary }}
//                   >
//                     Live arrival information based on current service
//                     conditions.
//                   </AppText>
//                 </View>
//               </View>

//               {/* Benefits */}
//               <View
//                 style={{
//                   gap: spacing[20],
//                   padding: spacing[20],
//                 }}
//               >
//                 {BENEFITS.map((benefit) => (
//                   <View
//                     key={benefit.id}
//                     style={{
//                       flexDirection: "row",
//                       alignItems: "flex-start",
//                       gap: spacing[12],
//                     }}
//                   >
//                     <View
//                       style={{
//                         width: 38,
//                         height: 38,
//                         alignItems: "center",
//                         justifyContent: "center",
//                         borderRadius: radius.md,
//                         backgroundColor: theme.brand.primary,
//                       }}
//                     >
//                       <Ionicons
//                         name={benefit.icon}
//                         size={19}
//                         color={theme.brand.primary}
//                       />
//                     </View>

//                     <View
//                       style={{
//                         flex: 1,
//                         gap: spacing[4],
//                       }}
//                     >
//                       <AppText
//                         variant="bodyMedium"
//                         weight={600}
//                         style={{ color: theme.text.primary }}
//                       >
//                         {benefit.title}
//                       </AppText>

//                       <AppText
//                         variant="bodySmall"
//                         style={{ color: theme.text.secondary }}
//                       >
//                         {benefit.description}
//                       </AppText>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             </View>
//           </View>

//           {/* Footer */}
//           <View
//             style={{
//               flexDirection: "row",
//               flexWrap: "wrap",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: spacing[12],
//               paddingTop: spacing[8],
//             }}
//           >
//             <Pressable
//               onPress={() => router.push("/(public)/about")}
//               hitSlop={8}
//             >
//               <AppText
//                 variant="bodySmall"
//                 style={{ color: theme.text.secondary }}
//               >
//                 About
//               </AppText>
//             </Pressable>

//             <AppText variant="bodySmall" style={{ color: theme.text.tertiary }}>
//               •
//             </AppText>

//             <Pressable onPress={goToPrivacy} hitSlop={8}>
//               <AppText
//                 variant="bodySmall"
//                 style={{ color: theme.text.secondary }}
//               >
//                 Privacy
//               </AppText>
//             </Pressable>

//             <AppText variant="bodySmall" style={{ color: theme.text.tertiary }}>
//               •
//             </AppText>

//             <Pressable onPress={goToTerms} hitSlop={8}>
//               <AppText
//                 variant="bodySmall"
//                 style={{ color: theme.text.secondary }}
//               >
//                 Terms
//               </AppText>
//             </Pressable>
//           </View>
//         </ScrollView>
//       </View>
//     </ScreenWrapper>
//   );
// }





// src/features/onboarding/screens/WelcomeScreen.tsx

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";

import { AppText } from "@/components/AppText/AppText";
import ScreenWrapper from "@/components/ScreenWrapper/ScreenWrapper";
import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

const BENEFITS = [
  {
    id: "routes",
    icon: "map-outline",
    title: "Plan smarter journeys",
    description:
      "Discover routes, stops, schedules, and transport options around you.",
  },
  {
    id: "live",
    icon: "navigate-outline",
    title: "Travel with confidence",
    description:
      "Follow live transport information and stay informed throughout your trip.",
  },
  {
    id: "connected",
    icon: "people-outline",
    title: "One connected platform",
    description:
      "Passengers, drivers, operators, buses, and minibuses connected in one ecosystem.",
  },
] as const;

export default function WelcomeScreen() {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const isLargeScreen = width >= 768;

  const goToSignUp = () => {
    router.push("/(auth)/signup");
  };

  const goToLogin = () => {
    router.push("/(auth)/login");
  };

  const goToHelp = () => {
    router.push("/(public)/help");
  };

  const goToTerms = () => {
    router.push("/(public)/terms-of-service");
  };

  const goToPrivacy = () => {
    router.push("/(public)/privacy-policy");
  };

  const goToAbout = () => {
    router.push("/(public)/about");
  };

  return (
    <ScreenWrapper padded={false} scrollable={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background.primary,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: spacing[20],
            paddingTop: spacing[12],
            paddingBottom: spacing[24],
          }}
        >
          {/* Header */}
          <View
            style={{
              minHeight: 52,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing[8],
              }}
            >
              <Image
                source={require("@/assets/images/icon.png")}
                resizeMode="contain"
                accessibilityIgnoresInvertColors
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: radius.md,
                }}
              />

              <AppText
                variant="h4"
                weight={700}
                style={{
                  color: theme.text.primary,
                }}
              >
                SmartLink
              </AppText>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open help centre"
              accessibilityHint="Opens SmartLink help and support"
              hitSlop={10}
              onPress={goToHelp}
              style={({ pressed }) => ({
                minWidth: 48,
                minHeight: 44,
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <AppText
                variant="labelLarge"
                weight={600}
                style={{
                  color: theme.brand.primary,
                }}
              >
                Help
              </AppText>
            </Pressable>
          </View>

          {/* Main content */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: isLargeScreen ? "row" : "column",
              alignItems: isLargeScreen ? "center" : "stretch",
              gap: isLargeScreen ? spacing[48] : spacing[32],
              paddingVertical: spacing[32],
            }}
          >
            {/* Hero section */}
            <View
              style={{
                flex: isLargeScreen ? 1 : undefined,
                width: "100%",
              }}
            >
              {/* Hero label */}
              <View
                style={{
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing[6],
                  paddingHorizontal: spacing[12],
                  paddingVertical: spacing[6],
                  borderWidth: 1,
                  borderColor: theme.brand.primary,
                  borderRadius: radius.full,
                  backgroundColor: theme.surface.card,
                  marginBottom: spacing[20],
                }}
              >
                <Ionicons
                  name="sparkles-outline"
                  size={14}
                  color={theme.brand.primary}
                />

                <AppText
                  variant="labelSmall"
                  weight={700}
                  style={{
                    color: theme.brand.primary,
                    letterSpacing: 0.8,
                  }}
                >
                  SMARTER URBAN MOBILITY
                </AppText>
              </View>

              <AppText
                variant={isLargeScreen ? "displayLarge" : "displayMedium"}
                weight={700}
                style={{
                  color: theme.text.primary,
                  maxWidth: 560,
                }}
              >
                Move smarter.
                {"\n"}
                Travel connected.
              </AppText>

              <AppText
                variant="bodyLarge"
                style={{
                  color: theme.text.secondary,
                  marginTop: spacing[16],
                  maxWidth: 520,
                }}
              >
                Plan journeys, discover buses and minibuses, receive live
                transport updates, and manage your travel from one connected
                platform.
              </AppText>

              {/* Authentication actions */}
              <View
                style={{
                  width: "100%",
                  maxWidth: 480,
                  gap: spacing[12],
                  marginTop: spacing[32],
                }}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Create an account"
                  accessibilityHint="Opens the SmartLink account registration screen"
                  onPress={goToSignUp}
                  style={({ pressed }) => ({
                    minHeight: 54,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: spacing[8],
                    paddingHorizontal: spacing[20],
                    borderRadius: radius.md,
                    backgroundColor: pressed
                      ? theme.button.primary.pressed
                      : theme.button.primary.background,
                    opacity: pressed ? 0.95 : 1,
                  })}
                >
                  <AppText
                    variant="buttonLarge"
                    weight={600}
                    style={{
                      color: theme.button.primary.text,
                    }}
                  >
                    Get Started
                  </AppText>

                  <Ionicons
                    name="arrow-forward"
                    size={19}
                    color={theme.button.primary.text}
                  />
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Sign in to an existing account"
                  accessibilityHint="Opens the SmartLink login screen"
                  onPress={goToLogin}
                  style={({ pressed }) => ({
                    minHeight: 54,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: spacing[20],
                    borderWidth: 1,
                    borderRadius: radius.md,
                    borderColor: theme.button.secondary.border,
                    backgroundColor: pressed
                      ? theme.button.secondary.pressed
                      : theme.button.secondary.border,
                    opacity: pressed ? 0.95 : 1,
                  })}
                >
                  <AppText
                    variant="buttonLarge"
                    weight={600}
                    style={{
                      color: theme.button.secondary.text,
                    }}
                  >
                    I already have an account
                  </AppText>
                </Pressable>
              </View>

              {/* Legal information */}
              <View
                style={{
                  width: "100%",
                  maxWidth: 480,
                  marginTop: spacing[16],
                }}
              >
                <AppText
                  variant="bodySmall"
                  style={{
                    color: theme.text.tertiary,
                    textAlign: "center",
                  }}
                >
                  By creating an account, you agree to our{" "}
                  <AppText
                    variant="bodySmall"
                    weight={600}
                    accessibilityRole="link"
                    accessibilityLabel="Read the Terms of Service"
                    onPress={goToTerms}
                    style={{
                      color: theme.brand.primary,
                    }}
                  >
                    Terms of Service
                  </AppText>{" "}
                  and acknowledge our{" "}
                  <AppText
                    variant="bodySmall"
                    weight={600}
                    accessibilityRole="link"
                    accessibilityLabel="Read the Privacy Policy"
                    onPress={goToPrivacy}
                    style={{
                      color: theme.brand.primary,
                    }}
                  >
                    Privacy Policy
                  </AppText>
                  .
                </AppText>
              </View>
            </View>

            {/* Product preview and benefits */}
            <View
              style={{
                flex: isLargeScreen ? 1 : undefined,
                width: "100%",
                maxWidth: isLargeScreen ? 500 : undefined,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: theme.border.default,
                borderRadius: radius.xl,
                backgroundColor: theme.surface.card,
              }}
            >
              {/* Product visual */}
              <View
                style={{
                  minHeight: 200,
                  overflow: "hidden",
                  justifyContent: "flex-end",
                  padding: spacing[16],
                  backgroundColor: theme.brand.primary,
                }}
              >
                {/* Decorative route line */}
                <View
                  pointerEvents="none"
                  style={{
                    position: "absolute",
                    top: -20,
                    left: "37%",
                    width: 8,
                    height: 300,
                    borderRadius: radius.full,
                    backgroundColor: theme.surface.card,
                    opacity: 0.2,
                    transform: [{ rotate: "28deg" }],
                  }}
                />

                {/* Arrival preview card */}
                <View
                  style={{
                    alignSelf: "stretch",
                    gap: spacing[8],
                    padding: spacing[16],
                    borderRadius: radius.lg,
                    backgroundColor: theme.surface.card,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: spacing[12],
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: spacing[8],
                      }}
                    >
                      <View
                        style={{
                          width: 34,
                          height: 34,
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 1,
                          borderColor: theme.brand.primary,
                          borderRadius: radius.full,
                          backgroundColor: theme.surface.card,
                        }}
                      >
                        <Ionicons
                          name="bus-outline"
                          size={18}
                          color={theme.brand.primary}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <AppText
                          variant="labelSmall"
                          weight={700}
                          style={{
                            color: theme.brand.primary,
                          }}
                        >
                          NEXT CONNECTION
                        </AppText>

                        <AppText
                          variant="bodyMedium"
                          weight={600}
                          numberOfLines={1}
                          style={{
                            color: theme.text.primary,
                            marginTop: spacing[2],
                          }}
                        >
                          City Centre Express
                        </AppText>
                      </View>
                    </View>

                    <View
                      style={{
                        paddingHorizontal: spacing[12],
                        paddingVertical: spacing[6],
                        borderWidth: 1,
                        borderColor: theme.brand.primary,
                        borderRadius: radius.full,
                        backgroundColor: theme.surface.card,
                      }}
                    >
                      <AppText
                        variant="labelSmall"
                        weight={700}
                        style={{
                          color: theme.brand.primary,
                        }}
                      >
                        6 min
                      </AppText>
                    </View>
                  </View>

                  <AppText
                    variant="bodySmall"
                    style={{
                      color: theme.text.secondary,
                    }}
                  >
                    Live arrival information based on current service
                    conditions.
                  </AppText>
                </View>
              </View>

              {/* Benefits list */}
              <View
                style={{
                  gap: spacing[20],
                  padding: spacing[20],
                }}
              >
                {BENEFITS.map((benefit) => (
                  <View
                    key={benefit.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: spacing[12],
                    }}
                  >
                    <View
                      style={{
                        width: 38,
                        height: 38,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: theme.brand.primary,
                        borderRadius: radius.md,
                        backgroundColor: theme.surface.card,
                      }}
                    >
                      <Ionicons
                        name={benefit.icon}
                        size={19}
                        color={theme.brand.primary}
                      />
                    </View>

                    <View
                      style={{
                        flex: 1,
                        gap: spacing[4],
                      }}
                    >
                      <AppText
                        variant="bodyMedium"
                        weight={600}
                        style={{
                          color: theme.text.primary,
                        }}
                      >
                        {benefit.title}
                      </AppText>

                      <AppText
                        variant="bodySmall"
                        style={{
                          color: theme.text.secondary,
                        }}
                      >
                        {benefit.description}
                      </AppText>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing[12],
              paddingTop: spacing[8],
            }}
          >
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="Read about SmartLink"
              onPress={goToAbout}
              hitSlop={8}
              style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <AppText
                variant="bodySmall"
                style={{
                  color: theme.text.secondary,
                }}
              >
                About
              </AppText>
            </Pressable>

            <AppText
              variant="bodySmall"
              accessibilityElementsHidden
              importantForAccessibility="no"
              style={{
                color: theme.text.tertiary,
              }}
            >
              •
            </AppText>

            <Pressable
              accessibilityRole="link"
              accessibilityLabel="Read the Privacy Policy"
              onPress={goToPrivacy}
              hitSlop={8}
              style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <AppText
                variant="bodySmall"
                style={{
                  color: theme.text.secondary,
                }}
              >
                Privacy
              </AppText>
            </Pressable>

            <AppText
              variant="bodySmall"
              accessibilityElementsHidden
              importantForAccessibility="no"
              style={{
                color: theme.text.tertiary,
              }}
            >
              •
            </AppText>

            <Pressable
              accessibilityRole="link"
              accessibilityLabel="Read the Terms of Service"
              onPress={goToTerms}
              hitSlop={8}
              style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <AppText
                variant="bodySmall"
                style={{
                  color: theme.text.secondary,
                }}
              >
                Terms
              </AppText>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

