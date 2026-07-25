// src/features/vehicles/components/VehicleStatusCard.tsx

import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import { Badge, Card } from "@/design-system/components";
import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

interface VehicleStatusCardProps {
  plateNumber: string;
  driverName: string;
  occupancyPercent: number;
  minutesAway: number;
}

export function VehicleStatusCard({
  plateNumber,
  driverName,
  occupancyPercent,
  minutesAway,
}: VehicleStatusCardProps) {
  const { theme } = useTheme();

  const occupancyVariant =
    occupancyPercent >= 90
      ? "error"
      : occupancyPercent >= 70
        ? "warning"
        : "success";

  const progressColor =
    occupancyVariant === "error"
      ? theme.error
      : occupancyVariant === "warning"
        ? theme.warning
        : theme.success;

  return (
    <Card variant="outlined">
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[12],
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: radius.full,
            backgroundColor: theme.primaryLight,
          }}
        >
          <Ionicons name="bus-outline" size={24} color={theme.primary} />
        </View>

        <View style={{ flex: 1 }}>
          <AppText variant="h4">{plateNumber}</AppText>

          <AppText color="secondary">Driver: {driverName}</AppText>
        </View>

        <Badge label={`${minutesAway} min`} />
      </View>

      <View
        style={{
          marginTop: spacing[16],
          gap: spacing[8],
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AppText variant="labelMedium" color="secondary">
            Occupancy
          </AppText>

          <AppText variant="labelMedium">{occupancyPercent}%</AppText>
        </View>

        <View
          style={{
            height: 8,
            overflow: "hidden",
            borderRadius: radius.full,
            backgroundColor: theme.surface.surface,
          }}
        >
          <View
            style={{
              width: `${Math.min(occupancyPercent, 100)}%`,
              height: "100%",
              borderRadius: radius.full,
              backgroundColor: progressColor,
            }}
          />
        </View>
      </View>
    </Card>
  );
}
