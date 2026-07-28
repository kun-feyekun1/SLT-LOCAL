// src/features/public/screens/PrivacyPolicyScreen.tsx

import { Linking, StyleSheet, Text, View } from "react-native";

import PublicHeader from "../../about/components/PublicHeader";
import PrimaryButton from "../../onboarding/components/PrimaryButton";
import PublicScreen from "../../onboarding/components/PublicScreen";
import LegalSection from "../constants/LegalSection";
import { PRIVACY_POLICY_SECTIONS } from "../constants/privacy-policy";
import { PUBLIC_CONFIG } from "../constants/public.constants";

export default function PrivacyPolicyScreen() {
  function contactPrivacyTeam() {
    const subject = encodeURIComponent("Privacy request");
    const url = `mailto:${PUBLIC_CONFIG.privacyEmail}?subject=${subject}`;

    void Linking.openURL(url);
  }

  return (
    <PublicScreen>
      <PublicHeader
        title="Privacy Policy"
        description="How Smart Link Transit collects, uses, protects, and manages information."
      />

      <View style={styles.metadataCard}>
        <Text style={styles.metadataLabel}>LAST UPDATED</Text>
        <Text style={styles.metadataValue}>{PUBLIC_CONFIG.lastUpdated}</Text>
      </View>

      <View style={styles.introduction}>
        <Text style={styles.introductionText}>
          Please read this policy carefully. The data practices described here
          should be updated whenever Smart Link Transit introduces new features,
          providers, tracking technologies, or markets.
        </Text>
      </View>

      {PRIVACY_POLICY_SECTIONS.map((section, index) => (
        <LegalSection
          key={section.id}
          section={section}
          sectionNumber={index + 1}
        />
      ))}

      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>Privacy request</Text>

        <Text style={styles.contactDescription}>
          Contact the privacy team to ask about your information or submit an
          eligible access, correction, or deletion request.
        </Text>

        <View style={styles.button}>
          <PrimaryButton
            label="Contact privacy team"
            onPress={contactPrivacyTeam}
          />
        </View>

        <Text selectable style={styles.email}>
          {PUBLIC_CONFIG.privacyEmail}
        </Text>
      </View>
    </PublicScreen>
  );
}

const styles = StyleSheet.create({
  metadataCard: {
    marginBottom: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },

  metadataLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  metadataValue: {
    marginTop: 4,
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "700",
  },

  introduction: {
    marginBottom: 30,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#F0FDFA",
  },

  introductionText: {
    color: "#0F766E",
    fontSize: 14,
    lineHeight: 22,
  },

  contactCard: {
    padding: 22,
    borderRadius: 20,
    backgroundColor: "#0F172A",
  },

  contactTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  contactDescription: {
    marginTop: 8,
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 22,
  },

  button: {
    marginTop: 18,
  },

  email: {
    marginTop: 14,
    color: "#94A3B8",
    fontSize: 13,
    textAlign: "center",
  },
});
