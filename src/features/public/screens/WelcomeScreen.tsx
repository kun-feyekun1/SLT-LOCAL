// src/features/public/screens/WelcomeScreen.tsx

import { Link, router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PrimaryButton from "../components/PrimaryButton";
import { PUBLIC_CONFIG } from "../constants/public.constants";

const BENEFITS = [
  {
    id: "journeys",
    title: "Plan every journey",
    description: "Discover routes, stops, schedules, and transport options.",
  },
  {
    id: "tracking",
    title: "Travel with confidence",
    description: "Receive live service information and trip updates.",
  },
  {
    id: "connected",
    title: "One connected platform",
    description: "Bringing passengers, drivers, and operators together.",
  },
] as const;

export default function WelcomeScreen() {
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 768;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={[styles.container, isWideScreen && styles.wideContainer]}>
        <View style={styles.topBar}>
          <View style={styles.brandRow}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>SL</Text>
            </View>

            <Text style={styles.brandName}>{PUBLIC_CONFIG.appName}</Text>
          </View>

          <Link href="/help" asChild>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="Open help center"
              hitSlop={10}
              style={({ pressed }) => [
                styles.helpButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.helpButtonText}>Help</Text>
            </Pressable>
          </Link>
        </View>

        <View
          style={[styles.mainContent, isWideScreen && styles.wideMainContent]}
        >
          <View
            style={[styles.heroSection, isWideScreen && styles.wideHeroSection]}
          >
            <View style={styles.eyebrow}>
              <Text style={styles.eyebrowText}>SMARTER URBAN MOBILITY</Text>
            </View>

            <Text accessibilityRole="header" style={styles.title}>
              Move smarter.{"\n"}
              Travel connected.
            </Text>

            <Text style={styles.description}>
              Plan journeys, discover transport options, receive live updates,
              and manage your travel from one reliable platform.
            </Text>

            <View style={styles.actions}>
              <PrimaryButton
                label="Create an account"
                onPress={() => router.push("/sign-up")}
              />

              <PrimaryButton
                label="Sign in"
                variant="secondary"
                onPress={() => router.push("/sign-in")}
              />
            </View>

            <Text style={styles.agreement}>
              By continuing, you agree to our{" "}
              <Link href="/terms-of-service" style={styles.inlineLink}>
                Terms of Service
              </Link>{" "}
              and acknowledge our{" "}
              <Link href="/privacy-policy" style={styles.inlineLink}>
                Privacy Policy
              </Link>
              .
            </Text>
          </View>

          <View
            style={[
              styles.benefitsCard,
              isWideScreen && styles.wideBenefitsCard,
            ]}
          >
            <View style={styles.routeVisual}>
              <View style={styles.routeLine} />

              <View style={[styles.routePoint, styles.routePointTop]} />
              <View style={[styles.routePoint, styles.routePointMiddle]} />
              <View style={[styles.routePoint, styles.routePointBottom]} />

              <View style={styles.vehicleCard}>
                <Text style={styles.vehicleLabel}>NEXT CONNECTION</Text>
                <Text style={styles.vehicleTitle}>City Center Express</Text>
                <Text style={styles.vehicleMeta}>
                  Arriving in approximately 6 minutes
                </Text>
              </View>
            </View>

            <View style={styles.benefitList}>
              {BENEFITS.map((benefit, index) => (
                <View key={benefit.id} style={styles.benefit}>
                  <View style={styles.benefitNumber}>
                    <Text style={styles.benefitNumberText}>{index + 1}</Text>
                  </View>

                  <View style={styles.benefitText}>
                    <Text style={styles.benefitTitle}>{benefit.title}</Text>

                    <Text style={styles.benefitDescription}>
                      {benefit.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.footerLinks}>
          <Link href="/about" style={styles.footerLink}>
            About
          </Link>

          <Text style={styles.footerSeparator}>•</Text>

          <Link href="/privacy-policy" style={styles.footerLink}>
            Privacy
          </Link>

          <Text style={styles.footerSeparator}>•</Text>

          <Link href="/terms-of-service" style={styles.footerLink}>
            Terms
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    flex: 1,
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },

  wideContainer: {
    paddingHorizontal: 40,
  },

  topBar: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#0F766E",
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: -0.3,
  },

  brandName: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: -0.3,
  },

  helpButton: {
    minWidth: 58,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },

  helpButtonText: {
    color: "#0F766E",
    fontSize: 15,
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.65,
  },

  mainContent: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 26,
    gap: 36,
  },

  wideMainContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 64,
  },

  heroSection: {
    width: "100%",
  },

  wideHeroSection: {
    flex: 1,
  },

  eyebrow: {
    alignSelf: "flex-start",
    marginBottom: 18,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#CCFBF1",
  },

  eyebrowText: {
    color: "#0F766E",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
  },

  title: {
    color: "#0F172A",
    fontSize: 45,
    lineHeight: 50,
    fontWeight: "900",
    letterSpacing: -1.4,
  },

  description: {
    maxWidth: 540,
    marginTop: 18,
    color: "#64748B",
    fontSize: 17,
    lineHeight: 27,
  },

  actions: {
    maxWidth: 480,
    marginTop: 30,
    gap: 12,
  },

  agreement: {
    maxWidth: 480,
    marginTop: 18,
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
  },

  inlineLink: {
    color: "#0F766E",
    fontWeight: "700",
  },

  benefitsCard: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#DDE7E6",
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
  },

  wideBenefitsCard: {
    flex: 1,
    maxWidth: 500,
  },

  routeVisual: {
    height: 220,
    overflow: "hidden",
    backgroundColor: "#E6FFFB",
  },

  routeLine: {
    position: "absolute",
    top: -30,
    left: "38%",
    width: 8,
    height: 300,
    borderRadius: 999,
    backgroundColor: "#5EEAD4",
    transform: [{ rotate: "28deg" }],
  },

  routePoint: {
    position: "absolute",
    width: 18,
    height: 18,
    borderWidth: 5,
    borderColor: "#FFFFFF",
    borderRadius: 999,
    backgroundColor: "#0F766E",
  },

  routePointTop: {
    top: 22,
    left: "29%",
  },

  routePointMiddle: {
    top: 98,
    left: "43%",
  },

  routePointBottom: {
    bottom: 19,
    left: "59%",
  },

  vehicleCard: {
    position: "absolute",
    right: 18,
    bottom: 18,
    left: 18,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
  },

  vehicleLabel: {
    marginBottom: 5,
    color: "#0F766E",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  vehicleTitle: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "800",
  },

  vehicleMeta: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
  },

  benefitList: {
    padding: 20,
    gap: 18,
  },

  benefit: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 13,
  },

  benefitNumber: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#F0FDFA",
  },

  benefitNumberText: {
    color: "#0F766E",
    fontSize: 13,
    fontWeight: "800",
  },

  benefitText: {
    flex: 1,
  },

  benefitTitle: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "700",
  },

  benefitDescription: {
    marginTop: 3,
    color: "#64748B",
    fontSize: 13,
    lineHeight: 20,
  },

  footerLinks: {
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  footerLink: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },

  footerSeparator: {
    color: "#CBD5E1",
    fontSize: 11,
  },
});
