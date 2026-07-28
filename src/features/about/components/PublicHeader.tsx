// src/features/public/components/PublicHeader.tsx

import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type PublicHeaderProps = {
  title: string;
  description?: string;
  showBackButton?: boolean;
};

export default function PublicHeader({
  title,
  description,
  showBackButton = true,
}: PublicHeaderProps) {
  return (
    <View style={styles.container}>
      {showBackButton ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
      ) : null}

      <View style={styles.textContainer}>
        <Text accessibilityRole="header" style={styles.title}>
          {title}
        </Text>

        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  backButton: {
    width: 44,
    height: 44,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },

  backButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  backIcon: {
    marginTop: -3,
    color: '#0F172A',
    fontSize: 38,
    lineHeight: 40,
    fontWeight: '300',
  },

  textContainer: {
    gap: 8,
  },

  title: {
    color: '#0F172A',
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '800',
    letterSpacing: -0.6,
  },

  description: {
    maxWidth: 620,
    color: '#64748B',
    fontSize: 16,
    lineHeight: 24,
  },
});