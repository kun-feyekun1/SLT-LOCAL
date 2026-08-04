// src/features/public/screens/HelpScreen.tsx

import { useState } from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import PublicHeader from "../../about/components/PublicHeader";
import { PUBLIC_CONFIG } from "../../legal/constants/public.constants";
import HelpItem from "../../public/components/HelpItem";
import PrimaryButton from "../components/PrimaryButton";
import PublicScreen from "../components/PublicScreen";

const FAQS = [
  {
    id: "create-account",
    question: "How do I create an account?",
    answer:
      "Open the welcome screen, select “Create an account,” and follow the registration process. You may be asked to verify your phone number or email address.",
  },
  {
    id: "reset-password",
    question: "I forgot my password. What should I do?",
    answer:
      "Open the sign-in screen and select “Forgot password.” Follow the verification steps to create a new password.",
  },
  {
    id: "location",
    question: "Why does Smart Link Transit request my location?",
    answer:
      "Location access helps identify nearby transport options, select pickup points, estimate arrival times, provide navigation, and support active-trip safety features.",
  },
  {
    id: "booking",
    question: "How do I request or book transportation?",
    answer:
      "After signing in, choose your destination or available service, review the route and price information, and confirm the request. Available options may vary by location.",
  },
  {
    id: "driver",
    question: "How do I join as a driver?",
    answer:
      "Create an account, choose the driver role, and complete driver onboarding. You may need to submit identity, license, vehicle, insurance, and compliance documents.",
  },
  {
    id: "payment",
    question: "What payment methods are supported?",
    answer:
      "Available payment methods depend on your market and service provider. Supported methods will be shown before you confirm an eligible trip or transaction.",
  },
  {
    id: "cancel",
    question: "Can I cancel a trip?",
    answer:
      "Eligible trips can be cancelled from the trip screen. A cancellation fee may apply depending on timing, provider rules, and the status of the trip.",
  },
  {
    id: "emergency",
    question: "What should I do during an emergency?",
    answer:
      "Contact the appropriate local emergency service immediately. Application support is not a replacement for police, medical, fire, or other emergency responders.",
  },
] as const;

export default function HelpScreen() {
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();

  const filteredFaqs = FAQS.filter((faq) => {
    if (!normalizedSearch) {
      return true;
    }

    return (
      faq.question.toLowerCase().includes(normalizedSearch) ||
      faq.answer.toLowerCase().includes(normalizedSearch)
    );
  });

  async function contactSupport() {
    const subject = encodeURIComponent("Smart Link Transit support request");
    const url = `mailto:${PUBLIC_CONFIG.supportEmail}?subject=${subject}`;

    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      Alert.alert(
        "Email unavailable",
        `Please contact us at ${PUBLIC_CONFIG.supportEmail}.`,
      );

      return;
    }

    await Linking.openURL(url);
  }

  return (
    <PublicScreen keyboardAware>
      <PublicHeader
        title="Help and support"
        description="Find answers to common questions or contact the Smart Link Transit support team."
      />

      <View style={styles.searchContainer}>
        <TextInput
          accessibilityLabel="Search help articles"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          value={search}
          onChangeText={setSearch}
          placeholder="Search help"
          placeholderTextColor="#94A3B8"
          returnKeyType="search"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>
          Frequently asked questions
        </Text>

        <Text style={styles.resultCount}>
          {filteredFaqs.length}{" "}
          {filteredFaqs.length === 1 ? "result" : "results"}
        </Text>
      </View>

      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((faq) => (
          <HelpItem key={faq.id} question={faq.question} answer={faq.answer} />
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No answers found</Text>
          <Text style={styles.emptyDescription}>
            Try a different search or contact our support team.
          </Text>
        </View>
      )}

      <View style={styles.supportCard}>
        <Text style={styles.supportEyebrow}>NEED MORE HELP?</Text>

        <Text style={styles.supportTitle}>
          Contact Smart Link Transit support
        </Text>

        <Text style={styles.supportDescription}>
          Describe the issue, the trip or transaction involved, and any relevant
          details. Never send passwords or verification codes.
        </Text>

        <View style={styles.supportButton}>
          <PrimaryButton label="Email support" onPress={contactSupport} />
        </View>

        <Text selectable style={styles.supportEmail}>
          {PUBLIC_CONFIG.supportEmail}
        </Text>
      </View>

      <View style={styles.emergencyNotice}>
        <Text style={styles.emergencyTitle}>Emergency assistance</Text>

        <Text style={styles.emergencyText}>
          Smart Link Transit support is not an emergency service. During an
          immediate threat to health or safety, contact the appropriate local
          emergency authority.
        </Text>
      </View>
    </PublicScreen>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 26,
  },

  searchInput: {
    minHeight: 54,
    paddingHorizontal: 17,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    fontSize: 16,
  },

  sectionHeader: {
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  sectionTitle: {
    flex: 1,
    color: "#0F172A",
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "800",
  },

  resultCount: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
  },

  emptyState: {
    marginBottom: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
  },

  emptyTitle: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "700",
  },

  emptyDescription: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },

  supportCard: {
    marginTop: 26,
    padding: 22,
    borderRadius: 21,
    backgroundColor: "#0F766E",
  },

  supportEyebrow: {
    marginBottom: 8,
    color: "#99F6E4",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.1,
  },

  supportTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "800",
  },

  supportDescription: {
    marginTop: 9,
    color: "#CCFBF1",
    fontSize: 14,
    lineHeight: 22,
  },

  supportButton: {
    marginTop: 20,
  },

  supportEmail: {
    marginTop: 15,
    color: "#CCFBF1",
    fontSize: 13,
    textAlign: "center",
  },

  emergencyNotice: {
    marginTop: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 17,
    backgroundColor: "#FFF7ED",
  },

  emergencyTitle: {
    color: "#9A3412",
    fontSize: 15,
    fontWeight: "800",
  },

  emergencyText: {
    marginTop: 6,
    color: "#C2410C",
    fontSize: 13,
    lineHeight: 20,
  },
});
