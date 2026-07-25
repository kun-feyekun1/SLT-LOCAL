// export { OTPVerificationScreen as default } from "@/features/auth/screens";

// src/app/(auth)/verify-otp.tsx

import { router } from "expo-router";
import { Button, Text, TextInput, View } from "react-native";
import { useState } from "react";

import { useOTP } from "@/features/auth/hooks/useOTP";

export default function VerifyOTPScreen() {
  const [code, setCode] = useState("");

  const {
    phoneNumber,
    verifyOTP,
    isVerifying,
    error,
    resetOTP,
  } = useOTP();

  const handleVerify = async () => {
    await verifyOTP(code);

    resetOTP();
    router.replace("/(tabs)");
  };

  return (
    <View>
      <Text>
        Enter the code sent to {phoneNumber}
      </Text>

      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Verification code"
        keyboardType="number-pad"
        maxLength={6}
      />

      {error ? <Text>{error}</Text> : null}

      <Button
        title={isVerifying ? "Verifying..." : "Verify"}
        disabled={isVerifying || code.length !== 6}
        onPress={handleVerify}
      />
    </View>
  );
}