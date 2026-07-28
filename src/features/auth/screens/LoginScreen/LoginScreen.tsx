// import Screen from "@/components/ScreenWrapper/ScreenWrapper";
// import { router } from "expo-router";
// import { useState } from "react";
// import { Button, TextInput, View } from "react-native";

// import { useAuth } from "@/features/auth/hooks/useAuth";
// import { useBiometricAuth } from "@/features/auth/hooks/useBiometricAuth";
// import { useOTP } from "@/features/auth/hooks/useOTP";

// export default function LoginScreen() {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");

//   const { signIn } = useAuth();

//   const { requestOTP, isSending } = useOTP();

//   const { isAvailable, isAuthenticating, authenticate } = useBiometricAuth();

//   const handlePasswordLogin = async () => {
//     await signIn({
//       phoneNumber,
//       password,
//     });

//     router.replace("/(tabs)/home");
//   };

//   const handleOTPLogin = async () => {
//     await requestOTP({
//       phoneNumber,
//       purpose: "login",
//     });

//     router.push("/(auth)/otp");
//   };

//   const handleBiometricLogin = async () => {
//     const authenticated = await authenticate();

//     if (authenticated) {
//       router.replace("/(tabs)/home");
//     }
//   };

//   return (
//     <Screen>
//       <View>
//         <TextInput
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//           placeholder="Phone number"
//           keyboardType="phone-pad"
//         />

//         <TextInput
//           value={password}
//           onChangeText={setPassword}
//           placeholder="Password"
//           secureTextEntry
//         />

//         <Button title="Sign in" onPress={handlePasswordLogin} />

//         <Button
//           title={isSending ? "Sending..." : "Sign in with OTP"}
//           disabled={isSending}
//           onPress={handleOTPLogin}
//         />

//         {isAvailable && (
//           <Button
//             title={isAuthenticating ? "Authenticating..." : "Use biometrics"}
//             disabled={isAuthenticating}
//             onPress={handleBiometricLogin}
//           />
//         )}
//       </View>
//     </Screen>
//   );
// }


// src/features/auth/screens/LoginScreen/LoginScreen.tsx

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import { AppInput } from "@/components/AppInput/AppInput";
import { AppText } from "@/components/AppText/AppText";
import Screen from "@/components/ScreenWrapper/ScreenWrapper";
import { radius, spacing } from "@/design-system/tokens";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useBiometricAuth } from "@/features/auth/hooks/useBiometricAuth";
import { useOTP } from "@/features/auth/hooks/useOTP";
import { useTheme } from "@/features/theme/hooks/useTheme";

function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallbackMessage;
}

export default function LoginScreen() {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const passwordInputRef = useRef<TextInput>(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { signIn } = useAuth();
  const { requestOTP, isSending } = useOTP();

  const {
    isAvailable,
    isAuthenticating,
    authenticate,
  } = useBiometricAuth();

  const isLargeScreen = width >= 768;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/(public)/welcome");
  };

  const handlePasswordLogin = async () => {
    if (isSigningIn) {
      return;
    }

    setErrorMessage(null);
    setIsSigningIn(true);

    try {
      await signIn({
        phoneNumber,
        password,
      });

      router.replace("/(tabs)/home");
    } catch (error) {
      setErrorMessage(
        getErrorMessage(
          error,
          "We could not sign you in. Check your phone number and password.",
        ),
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleOTPLogin = async () => {
    if (isSending) {
      return;
    }

    setErrorMessage(null);

    try {
      await requestOTP({
        phoneNumber,
        purpose: "login",
      });

      router.push("/(auth)/otp");
    } catch (error) {
      setErrorMessage(
        getErrorMessage(
          error,
          "We could not send the verification code. Please try again.",
        ),
      );
    }
  };

  const handleBiometricLogin = async () => {
    if (isAuthenticating) {
      return;
    }

    setErrorMessage(null);

    try {
      const authenticated = await authenticate();

      if (authenticated) {
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      setErrorMessage(
        getErrorMessage(
          error,
          "Biometric authentication was unsuccessful. Please try again.",
        ),
      );
    }
  };

  return (
    <Screen
      padded={false}
      keyboard
      keyboardVerticalOffset={30}
      scrollViewProps={{
        contentContainerStyle: {
          flexGrow: 1,
        },
      }}
    >
      <View
        style={{
          flex: 1,
          overflow: "hidden",
          backgroundColor: theme.background.primary,
        }}
      >
        {/* Decorative background elements */}
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: -110,
            right: -90,
            width: 260,
            height: 260,
            borderRadius: radius.full,
            backgroundColor: theme.brand.primary,
            opacity: 0.07,
          }}
        />

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            bottom: -130,
            left: -100,
            width: 300,
            height: 300,
            borderRadius: radius.full,
            backgroundColor: theme.brand.primary,
            opacity: 0.05,
          }}
        />

        <View
          style={{
            flex: 1,
            width: "100%",
            maxWidth: isLargeScreen ? 520 : undefined,
            alignSelf: "center",
            paddingHorizontal: spacing[20],
            paddingTop: spacing[12],
            paddingBottom: spacing[32],
          }}
        >
          {/* Top navigation */}
          <View
            style={{
              minHeight: 52,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              accessibilityHint="Returns to the previous screen"
              hitSlop={10}
              onPress={handleBack}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: theme.border.default,
                borderRadius: radius.full,
                backgroundColor: theme.surface.card,
                opacity: pressed ? 0.65 : 1,
              })}
            >
              <Ionicons
                name="arrow-back"
                size={21}
                color={theme.text.primary}
              />
            </Pressable>

            <View
              style={{
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
                  borderRadius: radius.md,
                  backgroundColor: theme.brand.primary,
                }}
              >
                <Ionicons
                  name="bus-outline"
                  size={19}
                  color={theme.button.primary.text}
                />
              </View>

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

            <View
              style={{
                width: 44,
                height: 44,
              }}
            />
          </View>

          {/* Main content */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingVertical: spacing[24],
            }}
          >
            {/* Heading */}
            <View
              style={{
                marginBottom: spacing[28],
              }}
            >
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
                  marginBottom: spacing[16],
                }}
              >
                <Ionicons
                  name="shield-checkmark-outline"
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
                  SECURE ACCESS
                </AppText>
              </View>

              <AppText
                variant={isLargeScreen ? "displayMedium" : "h1"}
                weight={700}
                style={{
                  color: theme.text.primary,
                }}
              >
                Welcome back
              </AppText>

              <AppText
                variant="bodyLarge"
                style={{
                  color: theme.text.secondary,
                  marginTop: spacing[8],
                }}
              >
                Sign in to manage your journeys, saved routes, transport
                updates, and account.
              </AppText>
            </View>

            {/* Authentication card */}
            <View
              style={{
                gap: spacing[20],
                padding: spacing[20],
                borderWidth: 1,
                borderColor: theme.border.default,
                borderRadius: radius.xl,
                backgroundColor: theme.surface.card,
              }}
            >
              {/* Error message */}
              {errorMessage ? (
                <View
                  accessibilityRole="alert"
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: spacing[10],
                    padding: spacing[12],
                    borderWidth: 1,
                    borderColor: theme.error,
                    borderRadius: radius.md,
                    backgroundColor: theme.background.primary,
                  }}
                >
                  <Ionicons
                    name="alert-circle-outline"
                    size={20}
                    color={theme.error}
                  />

                  <AppText
                    variant="bodySmall"
                    color="error"
                    style={{
                      flex: 1,
                    }}
                  >
                    {errorMessage}
                  </AppText>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Dismiss error"
                    hitSlop={8}
                    onPress={() => setErrorMessage(null)}
                  >
                    <Ionicons
                      name="close"
                      size={18}
                      color={theme.text.secondary}
                    />
                  </Pressable>
                </View>
              ) : null}

              {/* Form */}
              <View
                style={{
                  gap: spacing[16],
                }}
              >
                <AppInput
                  label="Phone number"
                  value={phoneNumber}
                  onChangeText={(value) => {
                    setPhoneNumber(value);

                    if (errorMessage) {
                      setErrorMessage(null);
                    }
                  }}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                  leftIcon={
                    <Ionicons
                      name="call-outline"
                      size={20}
                      color={theme.text.secondary}
                    />
                  }
                />

                <AppInput
                  ref={passwordInputRef}
                  label="Password"
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);

                    if (errorMessage) {
                      setErrorMessage(null);
                    }
                  }}
                  placeholder="Enter your password"
                  secureTextEntry={!passwordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password"
                  textContentType="password"
                  returnKeyType="done"
                  onSubmitEditing={handlePasswordLogin}
                  leftIcon={
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={theme.text.secondary}
                    />
                  }
                  rightIcon={
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={
                        passwordVisible
                          ? "Hide password"
                          : "Show password"
                      }
                      hitSlop={10}
                      onPress={() => {
                        setPasswordVisible((current) => !current);
                      }}
                      style={({ pressed }) => ({
                        width: 36,
                        height: 36,
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: pressed ? 0.6 : 1,
                      })}
                    >
                      <Ionicons
                        name={
                          passwordVisible
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color={theme.text.secondary}
                      />
                    </Pressable>
                  }
                />
              </View>

              {/* Password login */}
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Sign in with password"
                accessibilityState={{
                  disabled: isSigningIn,
                  busy: isSigningIn,
                }}
                disabled={isSigningIn}
                onPress={handlePasswordLogin}
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
                  opacity: isSigningIn ? 0.65 : pressed ? 0.95 : 1,
                })}
              >
                {isSigningIn ? (
                  <>
                    <ActivityIndicator
                      size="small"
                      color={theme.button.primary.text}
                    />

                    <AppText
                      variant="buttonLarge"
                      weight={600}
                      style={{
                        color: theme.button.primary.text,
                      }}
                    >
                      Signing in...
                    </AppText>
                  </>
                ) : (
                  <>
                    <AppText
                      variant="buttonLarge"
                      weight={600}
                      style={{
                        color: theme.button.primary.text,
                      }}
                    >
                      Sign in
                    </AppText>

                    <Ionicons
                      name="arrow-forward"
                      size={19}
                      color={theme.button.primary.text}
                    />
                  </>
                )}
              </Pressable>

              {/* Divider */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing[12],
                }}
              >
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: theme.border.default,
                  }}
                />

                <AppText
                  variant="labelSmall"
                  weight={600}
                  style={{
                    color: theme.text.tertiary,
                    letterSpacing: 0.5,
                  }}
                >
                  OR CONTINUE WITH
                </AppText>

                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: theme.border.default,
                  }}
                />
              </View>

              {/* Alternative login methods */}
              <View
                style={{
                  gap: spacing[12],
                }}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Sign in with a verification code"
                  accessibilityState={{
                    disabled: isSending,
                    busy: isSending,
                  }}
                  disabled={isSending}
                  onPress={handleOTPLogin}
                  style={({ pressed }) => ({
                    minHeight: 52,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: spacing[10],
                    paddingHorizontal: spacing[16],
                    borderWidth: 1,
                    borderColor: theme.brand.primary,
                    borderRadius: radius.md,
                    backgroundColor: theme.surface.card,
                    opacity: isSending ? 0.6 : pressed ? 0.72 : 1,
                  })}
                >
                  {isSending ? (
                    <ActivityIndicator
                      size="small"
                      color={theme.brand.primary}
                    />
                  ) : (
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={20}
                      color={theme.brand.primary}
                    />
                  )}

                  <AppText
                    variant="buttonMedium"
                    weight={600}
                    style={{
                      color: theme.brand.primary,
                    }}
                  >
                    {isSending
                      ? "Sending verification code..."
                      : "Sign in with OTP"}
                  </AppText>
                </Pressable>

                {isAvailable ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Sign in using biometrics"
                    accessibilityState={{
                      disabled: isAuthenticating,
                      busy: isAuthenticating,
                    }}
                    disabled={isAuthenticating}
                    onPress={handleBiometricLogin}
                    style={({ pressed }) => ({
                      minHeight: 52,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: spacing[10],
                      paddingHorizontal: spacing[16],
                      borderWidth: 1,
                      borderColor: theme.border.default,
                      borderRadius: radius.md,
                      backgroundColor: theme.background.primary,
                      opacity: isAuthenticating
                        ? 0.6
                        : pressed
                          ? 0.72
                          : 1,
                    })}
                  >
                    {isAuthenticating ? (
                      <ActivityIndicator
                        size="small"
                        color={theme.text.primary}
                      />
                    ) : (
                      <Ionicons
                        name="finger-print-outline"
                        size={22}
                        color={theme.text.primary}
                      />
                    )}

                    <AppText
                      variant="buttonMedium"
                      weight={600}
                      style={{
                        color: theme.text.primary,
                      }}
                    >
                      {isAuthenticating
                        ? "Authenticating..."
                        : "Use biometrics"}
                    </AppText>
                  </Pressable>
                ) : null}
              </View>
            </View>

            {/* Security information */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: spacing[6],
                marginTop: spacing[20],
              }}
            >
              <Ionicons
                name="lock-closed-outline"
                size={14}
                color={theme.text.tertiary}
              />

              <AppText
                variant="bodySmall"
                style={{
                  color: theme.text.tertiary,
                  textAlign: "center",
                }}
              >
                Your account information is securely protected.
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
}