import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import {
  Controller,
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

import { AppHeader, AppInput, PrimaryButton } from "@/components";
import ScreenWrapper from "@/components/ScreenWrapper";
import { spacing } from "@/design-system/tokens";
import { useSignup } from "@/features/auth/hooks/useAuthActions";
import {
  signupSchema,
  type SignupFormValues,
} from "@/features/auth/utils/authSchemas";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { RegisterUserRequest } from "../../types/auth.types";

export default function SignupScreen() {
  const signup = useSignup();
  const { theme } = useTheme();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    reValidateMode: "onChange",

    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

//   const handleSignup: SubmitHandler<SignupFormValues> = (values) => {
//   const payload = {
//     name: values.firstName.trim(),
//     last_name: values.lastName.trim(),
//     phone: values.phoneNumber.trim(),
//     email: values.email?.trim() || undefined,
//     password: values.password,
//   };

//   console.log("SIGNUP PAYLOAD:", {
//     ...payload,
//     password: "***",
//   });

//   signup.mutate(payload, {
//     onSuccess: () => {
//       router.replace("/(auth)/login");
//     },

//     onError: (error) => {
//       console.error("Signup failed:", error);
//     },
//   });
// };


const handleSignup: SubmitHandler<SignupFormValues> = (values) => {
  const payload: RegisterUserRequest = {
    name: values.firstName.trim(),
    last_name: values.lastName.trim(),
    phone: values.phoneNumber.trim(),
    email: values.email?.trim() || undefined,
    password: values.password,
  };

  console.log("SIGNUP PAYLOAD:", {
    ...payload,
    password: "***",
  });

  signup.mutate(payload, {
    onSuccess: (user) => {
      console.log("Signup successful:", user);
      router.replace("/(auth)/login");
    },

    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });
};
  const handleInvalidForm: SubmitErrorHandler<SignupFormValues> = (
    validationErrors
  ) => {
    console.log("Signup validation failed:", validationErrors);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((current) => !current);
  };

  const submitting = signup.isPending || isSubmitting;

  return (
    <ScreenWrapper
      keyboard
      scrollViewProps={{
        keyboardDismissMode: "none",
        keyboardShouldPersistTaps: "handled",
      }}
    >
      <AppHeader
        title="Create account"
        subtitle="A secure SLT account keeps trips, tickets, and routes together."
        showActions={false}
      />

      <View style={styles.form}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label="First Name"
              placeholder="First name"
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
              errorMessage={errors.firstName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label="Last Name"
              placeholder="Last name"
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
              errorMessage={errors.lastName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label="Phone number"
              keyboardType="phone-pad"
              placeholder="0912345678"
              autoComplete="tel"
              returnKeyType="next"
              errorMessage={errors.phoneNumber?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              placeholder="you@example.com"
              returnKeyType="next"
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label="Password"
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              textContentType="newPassword"
              placeholder="At least 8 characters"
              returnKeyType="done"
              errorMessage={errors.password?.message}
              rightIcon={
                <Pressable
                  onPress={togglePasswordVisibility}
                  hitSlop={12}
                  accessibilityRole="button"
                  accessibilityLabel={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                  accessibilityState={{
                    expanded: passwordVisible,
                  }}
                  style={styles.passwordVisibilityButton}
                >
                  <Ionicons
                    name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color={theme.primary}
                  />
                </Pressable>
              }
            />
          )}
        />

        <View style={styles.actions}>
          <PrimaryButton
            label="Create"
            loading={submitting}
            disabled={submitting}
            onPress={handleSubmit(handleSignup, handleInvalidForm)}
          />

          <PrimaryButton
            label="Back to login"
            variant="secondary"
            disabled={submitting}
            onPress={() => router.replace("/(auth)/login")}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing[8],
  },

  actions: {
    marginTop: spacing[16],
    gap: spacing[12],
  },

  passwordVisibilityButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
    minHeight: 40,
  },
});
