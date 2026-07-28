// src/features/public/screens/TermsOfServiceScreen.tsx

import { Linking, StyleSheet, Text, View } from "react-native";

import PublicHeader from "../../about/components/PublicHeader";
import PrimaryButton from "../../onboarding/components/PrimaryButton";
import PublicScreen from "../../onboarding/components/PublicScreen";
import LegalSection from "../constants/LegalSection";
import { PUBLIC_CONFIG } from "../constants/public.constants";
import { TERMS_OF_SERVICE_SECTIONS } from "../constants/terms-of-service";

export default function TermsOfServiceScreen() {
  function contactLegalTeam() {
    const subject = encodeURIComponent("Terms of Service question");
    const url = `mailto:${PUBLIC_CONFIG.legalEmail}?subject=${subject}`;

    void Linking.openURL(url);
  }

  return (
    <PublicScreen>
      <PublicHeader
        title="Terms of Service"
        description="The terms that govern access to and use of Smart Link Transit."
      />

      <View style={styles.metadataCard}>
        <Text style={styles.metadataLabel}>EFFECTIVE DATE</Text>

        <Text style={styles.metadataValue}>{PUBLIC_CONFIG.lastUpdated}</Text>
      </View>

      <View style={styles.noticeCard}>
        <Text style={styles.noticeTitle}>Important</Text>

        <Text style={styles.noticeDescription}>
          These terms are starter content for product development. They must be
          reviewed and adapted by qualified legal counsel before production,
          especially for transportation licensing, payments, driver
          relationships, insurance, consumer rights, and local regulations.
        </Text>
      </View>

      {TERMS_OF_SERVICE_SECTIONS.map((section, index) => (
        <LegalSection
          key={section.id}
          section={section}
          sectionNumber={index + 1}
        />
      ))}

      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>Questions about these terms?</Text>

        <Text style={styles.contactDescription}>
          Contact the Smart Link Transit legal team for clarification.
        </Text>

        <View style={styles.button}>
          <PrimaryButton
            label="Contact legal team"
            onPress={contactLegalTeam}
          />
        </View>

        <Text selectable style={styles.email}>
          {PUBLIC_CONFIG.legalEmail}
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

  noticeCard: {
    marginBottom: 30,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 16,
    backgroundColor: "#FFF7ED",
  },

  noticeTitle: {
    color: "#9A3412",
    fontSize: 15,
    fontWeight: "800",
  },

  noticeDescription: {
    marginTop: 6,
    color: "#C2410C",
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
