// src/features/public/components/HelpItem.tsx

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type HelpItemProps = {
  question: string;
  answer: string;
};

export default function HelpItem({
  question,
  answer,
}: HelpItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={() => setExpanded((current) => !current)}
        style={({ pressed }) => [
          styles.questionButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.question}>{question}</Text>

        <Text style={styles.symbol}>{expanded ? '−' : '+'}</Text>
      </Pressable>

      {expanded ? (
        <Text accessibilityLiveRegion="polite" style={styles.answer}>
          {answer}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  questionButton: {
    minHeight: 64,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  pressed: {
    opacity: 0.7,
  },

  question: {
    flex: 1,
    color: '#0F172A',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },

  symbol: {
    width: 24,
    color: '#0F766E',
    fontSize: 25,
    lineHeight: 28,
    textAlign: 'center',
  },

  answer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    color: '#64748B',
    fontSize: 15,
    lineHeight: 23,
  },
});