// app/(auth)/biometric-example.tsx

import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type BiometricType = "Fingerprint" | "Face Recognition" | "Iris" | "Biometrics";

export default function BiometricExample() {
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(false);
  const [biometricType, setBiometricType] =
    useState<BiometricType>("Biometrics");

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      setLoading(true);

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (
        supportedTypes.includes(
          LocalAuthentication.AuthenticationType.FINGERPRINT,
        )
      ) {
        setBiometricType("Fingerprint");
      } else if (
        supportedTypes.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
        )
      ) {
        setBiometricType("Face Recognition");
      } else if (
        supportedTypes.includes(LocalAuthentication.AuthenticationType.IRIS)
      ) {
        setBiometricType("Iris");
      }

      setAvailable(hasHardware && isEnrolled);
    } catch (error) {
      console.error("Biometric availability error:", error);
      setAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  const authenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Verify your identity",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (result.success) {
        Alert.alert(
          "Authentication successful",
          "Your identity was verified successfully.",
        );

        // Later you can do something like:
        // router.replace("/(tabs)/home");
        // dispatch(unlockSession());
        // restoreSecureSession();
      } else {
        Alert.alert(
          "Authentication failed",
          result.error ?? "Biometric authentication was not completed.",
        );
      }
    } catch (error) {
      console.error("Authentication error:", error);

      Alert.alert(
        "Something went wrong",
        "Unable to start biometric authentication.",
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>
            Checking biometric availability...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>
            {biometricType === "Fingerprint" ? "☝️" : "🔐"}
          </Text>
        </View>

        <Text style={styles.title}>Secure Login</Text>

        <Text style={styles.description}>
          Use {biometricType.toLowerCase()} to securely access your account.
        </Text>

        <View
          style={[
            styles.statusCard,
            available ? styles.statusAvailable : styles.statusUnavailable,
          ]}
        >
          <Text style={styles.statusTitle}>
            {available
              ? `${biometricType} is ready`
              : "Biometric authentication unavailable"}
          </Text>

          <Text style={styles.statusDescription}>
            {available
              ? "Your device is ready for biometric authentication."
              : "Make sure your device supports biometrics and that fingerprint or face recognition is configured in your device settings."}
          </Text>
        </View>

        <Pressable
          disabled={!available}
          onPress={authenticate}
          style={({ pressed }) => [
            styles.button,
            !available && styles.buttonDisabled,
            pressed && available && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Login with {biometricType}</Text>
        </Pressable>

        {!available && (
          <Pressable
            style={styles.retryButton}
            onPress={checkBiometricAvailability}
          >
            <Text style={styles.retryText}>Check again</Text>
          </Pressable>
        )}

        <Text style={styles.securityText}>
          Your biometric information never leaves your device.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 16,
    fontSize: 15,
    color: "#64748B",
  },

  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F5ED",
    marginBottom: 24,
  },

  icon: {
    fontSize: 44,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
  },

  description: {
    marginTop: 10,
    paddingHorizontal: 18,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#64748B",
  },

  statusCard: {
    marginTop: 32,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
  },

  statusAvailable: {
    backgroundColor: "#F0FDF4",
    borderColor: "#BBF7D0",
  },

  statusUnavailable: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },

  statusDescription: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: "#475569",
  },

  button: {
    marginTop: 24,
    minHeight: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A7A3C",
  },

  buttonPressed: {
    opacity: 0.85,
  },

  buttonDisabled: {
    backgroundColor: "#94A3B8",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  retryButton: {
    marginTop: 16,
    alignSelf: "center",
    padding: 12,
  },

  retryText: {
    color: "#1A7A3C",
    fontSize: 15,
    fontWeight: "600",
  },

  securityText: {
    marginTop: 28,
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 13,
  },
});
