import type { LucideIcon } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/features/theme/hooks/useTheme";
import { spacing } from "@/design-system/tokens";

import { AppText } from "../AppText/AppText";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";

type Props = {
  title: string;
  message: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
};

export const EmptyState = ({
  title,
  message,
  icon: Icon,
  actionLabel,
  onAction,
}: Props) => {
  const theme = useTheme();

  return (
    <View style={styles.wrap}>
      {Icon ? <Icon size={34} color={theme.colors.textMuted} /> : null}
      <AppText variant="subtitle" weight="700" style={styles.center}>
        {title}
      </AppText>
      <AppText muted style={styles.center}>
        {message}
      </AppText>
      {actionLabel && onAction ? (
        <PrimaryButton
          label={actionLabel}
          onPress={onAction}
          variant="secondary"
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    padding: spacing.xl,
  },
  center: { textAlign: "center" },
});
