// app/(auth)/signup.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import { AppHeader, AppInput, PrimaryButton } from "@/components";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useSignup } from "@/features/auth/hooks/useAuthActions";
import {
  signupSchema,
  type SignupFormValues,
} from "@/features/auth/utils/authSchemas";
import { spacing } from "@/theme";

export default function SignupScreen() {
  const signup = useSignup();

  const { control, handleSubmit } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = (values: SignupFormValues) => {
    signup.mutate(values);
  };

  return (
    <ScreenWrapper>
      <AppHeader
        title="Create account"
        subtitle="A secure Derash account keeps trips, tickets, and routes together."
        showActions={false}
      />

      <View style={styles.form}>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label="Full name"
              placeholder="Your name"
              autoCapitalize="words"
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
              placeholder="you@example.com"
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
              secureTextEntry
              autoCapitalize="none"
              placeholder="At least 8 characters"
            />
          )}
        />

        <PrimaryButton
          label="Continue"
          loading={signup.isPending}
          disabled={signup.isPending}
          onPress={handleSubmit(handleSignup)}
        />

        <PrimaryButton
          label="Back to login"
          variant="ghost"
          disabled={signup.isPending}
          onPress={() => router.replace("/(auth)/login")}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
  },
});
