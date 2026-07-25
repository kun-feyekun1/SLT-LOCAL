// src/features/trips/components/TripCard.tsx

import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import { Badge, Card, Divider } from "@/design-system/components";
import { spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

type TripStatus = "scheduled" | "arriving" | "completed" | "cancelled";

interface TripCardProps {
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  routeNumber: string;
  price: string;
  status: TripStatus;
  onPress?: () => void;
}

export function TripCard({
  origin,
  destination,
  departureTime,
  arrivalTime,
  routeNumber,
  price,
  status,
  onPress,
}: TripCardProps) {
  const { theme } = useTheme();

  const statusBadge = {
    scheduled: {
      label: "Scheduled",
    },
    arriving: {
      label: "Arriving",
    },
    completed: {
      label: "Completed",
    },
    cancelled: {
      label: "Cancelled",
    },
  } as const;

  const badge = statusBadge[status];

  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <Card variant="elevated">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: spacing[12],
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing[8],
            }}
          >
            <Ionicons name="bus" size={22} color={theme.icon.active} />

            <AppText variant="h4">Route {routeNumber}</AppText>
          </View>

          <Badge label={badge.label} />
        </View>

        <Divider spacingVertical={16} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "stretch",
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginRight: spacing[12],
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: theme.primary,
              }}
            />

            <View
              style={{
                width: 2,
                flex: 1,
                minHeight: 36,
                backgroundColor: theme.divider,
              }}
            />

            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: theme.accent,
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
              gap: spacing[20],
            }}
          >
            <View>
              <AppText variant="labelMedium" color="secondary">
                {departureTime}
              </AppText>

              <AppText variant="bodyLarge">{origin}</AppText>
            </View>

            <View>
              <AppText variant="labelMedium" color="secondary">
                {arrivalTime}
              </AppText>

              <AppText variant="bodyLarge">{destination}</AppText>
            </View>
          </View>
        </View>

        <Divider spacingVertical={16} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AppText color="secondary">Estimated fare</AppText>

          <AppText variant="priceMedium">{price}</AppText>
        </View>
      </Card>
    </Pressable>
  );
}
