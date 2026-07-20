// src/features/public/screens/AboutScreen.tsx

import { StyleSheet, Text, View } from "react-native";

import PublicHeader from "../components/PublicHeader";
import PublicScreen from "../components/PublicScreen";
import { PUBLIC_CONFIG } from "../constants/public.constants";

const VALUES = [
  {
    id: "reliability",
    title: "Reliable mobility",
    description:
      "We design transportation experiences around accurate information, dependable access, and operational visibility.",
  },
  {
    id: "accessibility",
    title: "Accessible by design",
    description:
      "Our goal is to make transport easier to understand and use for people with different needs, devices, and levels of digital experience.",
  },
  {
    id: "safety",
    title: "Safety and trust",
    description:
      "We support verification, transparent service information, responsible platform controls, and clear communication.",
  },
  {
    id: "connection",
    title: "Connected communities",
    description:
      "We bring passengers, drivers, operators, and transportation services into one coordinated digital ecosystem.",
  },
] as const;

export default function AboutScreen() {
  return (
    <PublicScreen>
      <PublicHeader
        title={`About ${PUBLIC_CONFIG.appName}`}
        description="Building a connected, accessible, and dependable transportation ecosystem."
      />

      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>OUR MISSION</Text>

        <Text style={styles.heroTitle}>
          Make everyday transportation simpler, safer, and more connected.
        </Text>

        <Text style={styles.heroDescription}>
          Smart Link Transit is a technology platform designed to help people
          discover transportation services, plan journeys, receive meaningful
          travel information, and stay connected throughout every trip.
        </Text>
      </View>

      <View style={styles.section}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>
          What we are building
        </Text>

        <Text style={styles.body}>
          Transportation often involves fragmented schedules, uncertain arrival
          times, disconnected payment systems, and limited communication between
          passengers and service providers.
        </Text>

        <Text style={styles.body}>
          Smart Link Transit aims to connect those experiences through one
          professional platform. Depending on service availability, users may be
          able to explore routes, request or reserve transport, follow active
          journeys, receive service alerts, manage payments, and access support.
        </Text>
      </View>

      <View style={styles.section}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>
          Who the platform serves
        </Text>

        <View style={styles.audienceGrid}>
          <View style={styles.audienceCard}>
            <Text style={styles.audienceTitle}>Passengers</Text>
            <Text style={styles.audienceDescription}>
              Clear travel options, journey information, booking tools, service
              updates, and account support.
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceTitle}>Drivers</Text>
            <Text style={styles.audienceDescription}>
              Trip management, navigation support, service communication,
              verification, and operational tools.
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceTitle}>Operators</Text>
            <Text style={styles.audienceDescription}>
              Fleet visibility, route coordination, service monitoring,
              reporting, and customer communication.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>
          Our principles
        </Text>

        <View style={styles.values}>
          {VALUES.map((value, index) => (
            <View key={value.id} style={styles.value}>
              <View style={styles.valueNumber}>
                <Text style={styles.valueNumberText}>{index + 1}</Text>
              </View>

              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>{value.title}</Text>
                <Text style={styles.valueDescription}>{value.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.closingCard}>
        <Text style={styles.closingTitle}>
          Transportation should connect communities—not complicate them.
        </Text>

        <Text style={styles.closingDescription}>
          Smart Link Transit is working toward a future where transport
          information and services are easier to access, understand, and trust.
        </Text>
      </View>
    </PublicScreen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    marginBottom: 32,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#0F766E",
  },

  eyebrow: {
    marginBottom: 12,
    color: "#99F6E4",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    lineHeight: 33,
    fontWeight: "800",
    letterSpacing: -0.4,
  },

  heroDescription: {
    marginTop: 14,
    color: "#CCFBF1",
    fontSize: 15,
    lineHeight: 24,
  },

  section: {
    marginBottom: 34,
  },

  sectionTitle: {
    marginBottom: 12,
    color: "#0F172A",
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "800",
  },

  body: {
    marginBottom: 12,
    color: "#475569",
    fontSize: 15,
    lineHeight: 24,
  },

  audienceGrid: {
    gap: 12,
  },

  audienceCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
  },

  audienceTitle: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "800",
  },

  audienceDescription: {
    marginTop: 7,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 22,
  },

  values: {
    gap: 20,
  },

  value: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },

  valueNumber: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    backgroundColor: "#CCFBF1",
  },

  valueNumberText: {
    color: "#0F766E",
    fontSize: 14,
    fontWeight: "800",
  },

  valueContent: {
    flex: 1,
  },

  valueTitle: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "700",
  },

  valueDescription: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 22,
  },

  closingCard: {
    padding: 22,
    borderWidth: 1,
    borderColor: "#99F6E4",
    borderRadius: 20,
    backgroundColor: "#F0FDFA",
  },

  closingTitle: {
    color: "#134E4A",
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "800",
  },

  closingDescription: {
    marginTop: 8,
    color: "#0F766E",
    fontSize: 14,
    lineHeight: 22,
  },
});
