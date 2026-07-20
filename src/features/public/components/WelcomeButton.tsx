// src/features/public/components/PrimaryButton.tsx

import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
};

export default function PrimaryButton({
  label,
  onPress,
  icon,
  loading = false,
  disabled = false,
  variant = 'primary',
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#FFFFFF' : '#0F766E'} />
      ) : (
        <View style={styles.content}>
          {icon}

          <Text
            style={[
              styles.label,
              isPrimary ? styles.primaryLabel : styles.secondaryLabel,
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },

  primary: {
    backgroundColor: '#0F766E',
  },

  secondary: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },

  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },

  disabled: {
    opacity: 0.5,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
  },

  primaryLabel: {
    color: '#FFFFFF',
  },

  secondaryLabel: {
    color: '#0F766E',
  },
});