// src/features/public/components/LegalSection.tsx

import { StyleSheet, Text, View } from "react-native";

export type LegalParagraph = {
  id: string;
  text: string;
};

export type LegalSectionData = {
  id: string;
  title: string;
  paragraphs?: LegalParagraph[];
  bullets?: string[];
};

type LegalSectionProps = {
  section: LegalSectionData;
  sectionNumber?: number;
};

export default function LegalSection({
  section,
  sectionNumber,
}: LegalSectionProps) {
  const heading = sectionNumber
    ? `${sectionNumber}. ${section.title}`
    : section.title;

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {heading}
      </Text>

      {section.paragraphs?.map((paragraph) => (
        <Text key={paragraph.id} style={styles.paragraph}>
          {paragraph.text}
        </Text>
      ))}

      {section.bullets?.map((bullet) => (
        <View key={bullet} style={styles.bulletRow}>
          <Text style={styles.bulletSymbol}>•</Text>
          <Text style={styles.bulletText}>{bullet}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  title: {
    marginBottom: 10,
    color: "#0F172A",
    fontSize: 19,
    lineHeight: 26,
    fontWeight: "700",
  },

  paragraph: {
    marginBottom: 12,
    color: "#475569",
    fontSize: 15,
    lineHeight: 24,
  },

  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 9,
    paddingRight: 8,
  },

  bulletSymbol: {
    width: 22,
    color: "#0F766E",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },

  bulletText: {
    flex: 1,
    color: "#475569",
    fontSize: 15,
    lineHeight: 24,
  },
});
