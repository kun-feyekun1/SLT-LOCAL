import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { AlertCircle, MapPinned } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  AppHeader,
  AppText,
  EmptyState,
  LoadingSpinner,
  SearchBar,
} from "@/components";
import ScreenWrapper from "@/components/ScreenWrapper";
import { radius, spacing } from "@/design-system/tokens";
import { TransportMap } from "@/features/map/components/TransportMap";
import { useCurrentLocation } from "@/features/map/hooks/useCurrentLocation";
import type { TransportMapVehicle } from "@/features/map/types/TransportMap.types";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { TransportCard } from "@/features/transport/components/TransportCard";
import { useNearbyTransport } from "@/features/transport/hooks/useNearbyTransport";
import type { TransportOption } from "@/features/transport/types/transport.types";

export default function HomeScreen() {
  const theme = useTheme();

  const location = useCurrentLocation();

  const point =
    location.data?.status === "granted" ? location.data.point : null;

  const nearby = useNearbyTransport(point);

  const vehicles = useMemo<TransportMapVehicle[]>(
    () =>
      (nearby.data ?? [])
        .filter(
          (
            item,
          ): item is TransportOption & {
            liveLocation: {
              latitude: number;
              longitude: number;
            };
          } => Boolean(item.liveLocation),
        )
        .map((item) => ({
          id: item.id,
          mode: item.mode,
          routeId: item.routeName,
          heading: 0,
          updatedAt: new Date().toISOString(),
          latitude: item.liveLocation.latitude,
          longitude: item.liveLocation.longitude,
        })),
    [nearby.data],
  );

  const renderItem = ({ item }: { item: TransportOption }) => {
    return <TransportCard item={item} />;
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Pressable
          style={[
            styles.animationButton,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface,
            },
          ]}
          onPress={() => router.push("/animation-lab")}
        >
          <Text
            style={[
              styles.animationButtonText,
              {
                color: theme.colors.text,
              },
            ]}
          >
            Open Animation Lab
          </Text>
        </Pressable>

        <View style={styles.headerBlock}>
          <AppHeader title="SLT" subtitle="Addis Ababa transport, unified" />

          <SearchBar
            value=""
            placeholder="Where are you going?"
            onChangeText={() => undefined}
            onPress={() => router.push("/search")}
          />
        </View>

        <View
          style={[
            styles.mapShell,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface,
            },
          ]}
        >
          <TransportMap
            center={point}
            vehicles={vehicles}
            zoomLevel={13.5}
            onVehiclePress={(vehicle) => {
              router.push({
                pathname: "/transport/[id]",
                params: {
                  id: vehicle.id,
                },
              });
            }}
          />
        </View>

        <View style={styles.sectionHeader}>
          <AppText variant="caption" weight={700}>
            Nearby options
          </AppText>

          <AppText variant="caption">Live-ready</AppText>
        </View>

        {location.data?.status === "denied" ? (
          <EmptyState
            title="Location permission needed"
            message="Enable location to discover nearby buses, minibuses, taxis, and walking routes."
            icon={MapPinned}
            actionLabel="Try again"
            onAction={() => location.refetch()}
          />
        ) : nearby.isLoading || location.isLoading ? (
          <LoadingSpinner />
        ) : nearby.isError ? (
          <EmptyState
            title="Network issue"
            message="Derash could not load nearby transport. Cached routes will appear when available."
            icon={AlertCircle}
            actionLabel="Retry"
            onAction={() => nearby.refetch()}
          />
        ) : (
          <FlashList
            data={nearby.data ?? []}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <EmptyState
                title="No nearby transport found"
                message="Try a wider walking range or search for a destination."
                icon={MapPinned}
              />
            }
          />
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing[4],
  },

  animationButton: {
    alignSelf: "flex-start",
    marginTop: spacing[2],
    marginHorizontal: spacing[4],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderWidth: 1,
    borderRadius: radius.md,
  },

  animationButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },

  headerBlock: {
    padding: spacing[4],
    gap: spacing[4],
  },

  mapShell: {
    height: 220,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    marginHorizontal: spacing[4],
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing[4],
  },

  list: {
    padding: spacing[4],
  },
});
