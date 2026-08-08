import type { LucideIcon } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/features/theme/hooks/useTheme";
import { semanticSpacing } from "@/design-system/tokens";

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
  const { theme } = useTheme();

  return (
    <View style={styles.wrap}>
      {Icon ? <Icon size={34} color={theme.text.tertiary} /> : null}
      <AppText variant="h5" weight={700} align="center">
        {title}
      </AppText>
      <AppText color="secondary" align="center">
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
    gap: semanticSpacing.stack.small,
    padding: semanticSpacing.screen.horizontalLarge,
  },
});
