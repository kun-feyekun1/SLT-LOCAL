import { Navigation } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/features/theme/hooks/useTheme";
import { radius, spacing } from "@/design-system/tokens";

import { AppText } from "../AppText/AppText";

type Props = {
  title: string;
  subtitle: string;
};

export const MapMarkerCard = ({ title, subtitle }: Props) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Navigation size={16} color={theme.colors.primary} />
      <View style={styles.text}>
        <AppText variant="bodyMedium"  numberOfLines={1}>
          {title}
        </AppText>
        <AppText variant="bodySmall"  numberOfLines={1}>
          {subtitle}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minWidth: 150,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing[2],
    flexDirection: "row",
    gap: spacing[2],
    alignItems: "center",
  },
  text: { flex: 1 },
});
