// src/features/auth/screens/LoginScreen/LoginScreen.tsx

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import { AppInput } from "@/components/AppInput/AppInput";
import { AppText } from "@/components/AppText/AppText";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import ScreenWrapper from "@/components/ScreenWrapper/ScreenWrapper";
import { radius, spacing } from "@/design-system/tokens";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTheme } from "@/features/theme/hooks/useTheme";

function getErrorMessage(error: unknown, fallbackMessage: string): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallbackMessage;
}

function isValidEthiopianPhone(phoneNumber: string): boolean {
  return /^0(9|7)\d{8}$/.test(phoneNumber);
}

export default function LoginScreen() {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const { signIn } = useAuth();

  const passwordInputRef = useRef<TextInput>(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLargeScreen = width >= 768;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/(public)/welcome");
  };

  const clearError = () => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handlePasswordLogin = async () => {
    if (isSigningIn) {
      return;
    }

    const normalizedPhone = phoneNumber.replace(/\s+/g, "").trim();

    setErrorMessage(null);

    if (!normalizedPhone) {
      setErrorMessage("Enter your phone number.");
      return;
    }

    if (!isValidEthiopianPhone(normalizedPhone)) {
      setErrorMessage(
        "Enter a valid Ethiopian phone number, such as 0912345678."
      );
      return;
    }

    if (!password) {
      setErrorMessage("Enter your password.");
      return;
    }

    setIsSigningIn(true);

    try {
      await signIn({
        phoneNumber: normalizedPhone,
        password,
      });

      /*
       * Successful navigation should be handled by useAuth/signIn
       * after saving the authenticated session.
       */
    } catch (error) {
      setErrorMessage(
        getErrorMessage(
          error,
          "We could not sign you in. Check your phone number and password."
        )
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <ScreenWrapper
      padded={false}
      keyboard
      keyboardVerticalOffset={0}
      scrollViewProps={{
        keyboardDismissMode: "none",
        keyboardShouldPersistTaps: "handled",
        contentContainerStyle: styles.scrollContent,
      }}
    >
      <View
        style={[
          styles.screen,
          {
            backgroundColor: theme.background.primary,
          },
        ]}
      >
        <View
          pointerEvents="none"
          style={[
            styles.topDecoration,
            {
              backgroundColor: theme.brand.primary,
            },
          ]}
        />

        <View
          pointerEvents="none"
          style={[
            styles.bottomDecoration,
            {
              backgroundColor: theme.brand.primary,
            },
          ]}
        />

        <View
          style={[
            styles.container,
            {
              maxWidth: isLargeScreen ? 520 : undefined,
            },
          ]}
        >
          <View style={styles.topNavigation}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              accessibilityHint="Returns to the previous screen"
              hitSlop={10}
              onPress={handleBack}
              android_ripple={{
                color: theme.border.default,
                borderless: true,
              }}
              style={[
                styles.backButton,
                {
                  borderColor: theme.border.default,
                  backgroundColor: theme.surface.card,
                },
              ]}
            >
              <Ionicons
                name="arrow-back"
                size={21}
                color={theme.text.primary}
              />
            </Pressable>

            <View style={styles.brand}>
              <View
                style={[
                  styles.brandIcon,
                  {
                    backgroundColor: theme.brand.primary,
                  },
                ]}
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

            <View style={styles.navigationPlaceholder} />
          </View>

          <View style={styles.mainContent}>
            <View style={styles.heading}>
              <View
                style={[
                  styles.securityBadge,
                  {
                    borderColor: theme.brand.primary,
                    backgroundColor: theme.surface.card,
                  },
                ]}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={14}
                  color={theme.brand.primary}
                />

                <AppText
                  variant="labelSmall"
                  weight={700}
                  style={[
                    styles.securityBadgeText,
                    {
                      color: theme.brand.primary,
                    },
                  ]}
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
                style={[
                  styles.subtitle,
                  {
                    color: theme.text.secondary,
                  },
                ]}
              >
                Sign in to manage your journeys, saved routes, transport
                updates, and account.
              </AppText>
            </View>

            <View
              style={[
                styles.authCard,
                {
                  borderColor: theme.border.default,
                  backgroundColor: theme.surface.card,
                },
              ]}
            >
              {errorMessage ? (
                <View
                  accessibilityRole="alert"
                  style={[
                    styles.errorContainer,
                    {
                      borderColor: theme.error,
                      backgroundColor: theme.background.primary,
                    },
                  ]}
                >
                  <Ionicons
                    name="alert-circle-outline"
                    size={20}
                    color={theme.error}
                  />

                  <AppText
                    variant="bodySmall"
                    color="error"
                    style={styles.errorText}
                  >
                    {errorMessage}
                  </AppText>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Dismiss error"
                    hitSlop={8}
                    onPress={() => setErrorMessage(null)}
                    style={styles.dismissButton}
                  >
                    <Ionicons
                      name="close"
                      size={18}
                      color={theme.text.secondary}
                    />
                  </Pressable>
                </View>
              ) : null}

              <View style={styles.form}>
                <AppInput
                  label="Phone number"
                  value={phoneNumber}
                  onChangeText={(value) => {
                    setPhoneNumber(value);
                    clearError();
                  }}
                  placeholder="0912345678"
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
                    clearError();
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
                        passwordVisible ? "Hide password" : "Show password"
                      }
                      accessibilityState={{
                        expanded: passwordVisible,
                      }}
                      hitSlop={10}
                      onPress={() => {
                        setPasswordVisible((current) => !current);
                      }}
                      style={styles.passwordVisibilityButton}
                    >
                      <Ionicons
                        name={
                          passwordVisible ? "eye-off-outline" : "eye-outline"
                        }
                        size={20}
                        color={theme.text.secondary}
                      />
                    </Pressable>
                  }
                />
              </View>

              <PrimaryButton
                label="Sign in"
                loading={isSigningIn}
                disabled={isSigningIn}
                onPress={handlePasswordLogin}
              />

              <View style={styles.signupPrompt}>
                <AppText
                  variant="bodySmall"
                  style={{
                    color: theme.text.secondary,
                  }}
                >
                  Don&apos;t have an account?
                </AppText>

                <Pressable
                  accessibilityRole="link"
                  accessibilityLabel="Create a new account"
                  hitSlop={8}
                  onPress={() => router.push("/(auth)/signup")}
                >
                  <AppText
                    variant="buttonSmall"
                    weight={600}
                    style={{
                      color: theme.brand.primary,
                    }}
                  >
                    Create account
                  </AppText>
                </Pressable>
              </View>
            </View>

            <View style={styles.securityInformation}>
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
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },

  screen: {
    flex: 1,
    overflow: "hidden",
  },

  topDecoration: {
    position: "absolute",
    top: -110,
    right: -90,
    width: 260,
    height: 260,
    borderRadius: radius.full,
    opacity: 0.07,
  },

  bottomDecoration: {
    position: "absolute",
    bottom: -130,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: radius.full,
    opacity: 0.05,
  },

  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: spacing[20],
    paddingTop: spacing[12],
    paddingBottom: spacing[32],
  },

  topNavigation: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: radius.full,
    overflow: "hidden",
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[8],
  },

  brandIcon: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
  },

  navigationPlaceholder: {
    width: 44,
    height: 44,
  },

  mainContent: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: spacing[24],
  },

  heading: {
    marginBottom: spacing[28],
  },

  securityBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[6],
    paddingHorizontal: spacing[12],
    paddingVertical: spacing[6],
    borderWidth: 1,
    borderRadius: radius.full,
    marginBottom: spacing[16],
  },

  securityBadgeText: {
    letterSpacing: 0.8,
  },

  subtitle: {
    marginTop: spacing[8],
  },

  authCard: {
    gap: spacing[20],
    padding: spacing[20],
    borderWidth: 1,
    borderRadius: radius.xl,
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[10],
    padding: spacing[12],
    borderWidth: 1,
    borderRadius: radius.md,
  },

  errorText: {
    flex: 1,
  },

  dismissButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  form: {
    gap: spacing[16],
  },

  passwordVisibilityButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  signupPrompt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: spacing[6],
  },

  securityInformation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[6],
    marginTop: spacing[20],
  },
});
