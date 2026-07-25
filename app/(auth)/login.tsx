// export { LoginScreen as default } from "@/features/auth/screens";
    



// src/app/(auth)/login.tsx

import { router } from "expo-router";
import { Button, TextInput, View } from "react-native";
import { useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useBiometricAuth } from "@/features/auth/hooks/useBiometricAuth";
import { useOTP } from "@/features/auth/hooks/useOTP";

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  const {
    requestOTP,
    isSending,
  } = useOTP();

  const {
    isAvailable,
    isAuthenticating,
    authenticate,
  } = useBiometricAuth();

  const handlePasswordLogin = async () => {
    await signIn({
      phoneNumber,
      password,
    });

    router.replace("/(tabs)");
  };

  const handleOTPLogin = async () => {
    await requestOTP({
      phoneNumber,
      purpose: "login",
    });

    router.push("/(auth)/verify-otp");
  };

  const handleBiometricLogin = async () => {
    const authenticated = await authenticate();

    if (authenticated) {
      router.replace("/(tabs)");
    }
  };

  return (
    <View>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone number"
        keyboardType="phone-pad"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <Button
        title="Sign in"
        onPress={handlePasswordLogin}
      />

      <Button
        title={isSending ? "Sending..." : "Sign in with OTP"}
        disabled={isSending}
        onPress={handleOTPLogin}
      />

      {isAvailable && (
        <Button
          title={
            isAuthenticating
              ? "Authenticating..."
              : "Use biometrics"
          }
          disabled={isAuthenticating}
          onPress={handleBiometricLogin}
        />
      )}
    </View>
  );
}