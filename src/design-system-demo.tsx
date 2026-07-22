// src/app/design-system-demo.tsx

import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import { Card, Divider, Input } from "@/design-system/components";

// Local lightweight Button replacement (design-system doesn't export Button)
function Button({
  label,
  fullWidth,
  leftIcon,
  variant = "primary",
  onPress,
}: {
  label: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  variant?: "primary" | "secondary";
  onPress?: () => void;
}) {
  const { theme } = useTheme();

  const backgroundColor =
    variant === "primary"
      ? theme.button.primary.background
      : theme.button.secondary.pressed;
  const textColor =
    variant === "primary"
      ? theme.button.primary.text
      : theme.button.secondary.text;

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing[8],
        backgroundColor,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: fullWidth ? "100%" : undefined,
      }}
    >
      {leftIcon}
      <AppText style={{ color: textColor }}>{label}</AppText>
    </Pressable>
  );
}

import { spacing } from "@/design-system/tokens";
import { ThemeSelector } from "@/features/theme/components/themeSelector";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { TripCard } from "@/features/Trips/components/TripCard";
import { VehicleStatusCard } from "@/features/vehicles/components/VehicleStatusCard";
import React from "react";
import { Pressable } from "react-native";
import { AppScreen } from "./AppScreen";
import ScreenWrapper from "@/components/ScreenWrapper";


export default function DesignSystemDemoScreen() {
  const { theme, mode, toggleTheme } = useTheme();

  return (
    <ScreenWrapper>
    <AppScreen
      scrollable
      background="primary"
      scrollViewProps={{
        contentInsetAdjustmentBehavior: "automatic",
      }}
      contentContainerStyle={{
        gap: spacing[24],
        paddingBottom: spacing[64],
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <AppText variant="h1">SmartLink Transit</AppText>

          <AppText variant="bodyMedium" color="secondary">
            Current theme: {mode}
          </AppText>
        </View>

        <IconButton
          icon={mode === "dark" ? "sunny-outline" : "moon-outline"}
          accessibilityLabel="Change theme"
          onPress={toggleTheme}
        />
      </View>

      <ThemeSelector />

      <Banner
        tone="info"
        title="Live transit information"
        message="Arrival times update automatically based on vehicle locations."
        icon={
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={theme.info}
          />
        }
      />

      <View style={{ gap: spacing[12] }}>
        <AppText variant="h3">Plan your journey</AppText>

        <Input
          label="Starting point"
          placeholder="Enter pickup location"
          leftIcon={
            <Ionicons
              name="location-outline"
              size={20}
              color={theme.icon.inactive}
            />
          }
        />

        <Input
          label="Destination"
          placeholder="Where are you going?"
          leftIcon={
            <Ionicons
              name="flag-outline"
              size={20}
              color={theme.icon.inactive}
            />
          }
        />

        <Button
          label="Find transport"
          fullWidth
          leftIcon={
            <Ionicons
              name="search"
              size={20}
              color={theme.button.primary.text}
            />
          }
          onPress={() => {
            console.log("Searching");
          }}
        />
      </View>

      <View style={{ gap: spacing[12] }}>
        <AppText variant="h3">Upcoming trip</AppText>

        <TripCard
          origin="Bole International Airport"
          destination="Mexico Square"
          departureTime="08:30 AM"
          arrivalTime="09:05 AM"
          routeNumber="24"
          price="45 ETB"
          status="arriving"
          onPress={() => {
            console.log("Open trip");
          }}
        />
      </View>

      <View style={{ gap: spacing[12] }}>
        <AppText variant="h3">Nearby vehicle</AppText>

        <VehicleStatusCard
          plateNumber="ET-03-18452"
          driverName="Abebe Kebede"
          occupancyPercent={72}
          minutesAway={4}
        />
      </View>

      <Card variant="elevated">
        <AppText variant="h3">Payment summary</AppText>

        <Divider spacingVertical={12} />

        <View
          style={{
            gap: spacing[8],
          }}
        >
          <SummaryRow label="Base fare" value="35 ETB" />

          <SummaryRow label="Service charge" value="5 ETB" />

          <SummaryRow label="Discount" value="-5 ETB" valueColor="success" />
        </View>

        <Divider spacingVertical={12} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AppText variant="h4">Total</AppText>

          <AppText variant="priceMedium">35 ETB</AppText>
        </View>

        <View
          style={{
            marginTop: spacing[16],
            gap: spacing[8],
          }}
        >
          <Button
            label="Pay now"
            fullWidth
            onPress={() => {
              console.log("Pay");
            }}
          />

          <Button
            label="Pay later"
            variant="secondary"
            fullWidth
            onPress={() => {
              console.log("Pay later");
            }}
          />
        </View>
      </Card>

      <View style={{ gap: spacing[12] }}>
        <Banner
          tone="success"
          title="Trip confirmed"
          message="Your driver has accepted the trip."
        />

        <Banner
          tone="warning"
          title="Traffic warning"
          message="Travel time has increased by approximately 12 minutes."
        />

        <Banner
          tone="error"
          title="Payment failed"
          message="Please check your balance and try again."
        />
      </View>
    </AppScreen>
    </ScreenWrapper>
  );
}

type BannerTone = "info" | "success" | "warning" | "error";

function Banner({
  tone,
  title,
  message,
  icon,
}: {
  tone: BannerTone;
  title: string;
  message: string;
  icon?: React.ReactNode;
}) {
  return (
    <View style={{ gap: spacing[8] }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: spacing[8] }}
      >
        {icon}
        <AppText variant="h4">{title}</AppText>
      </View>
      <AppText color="secondary">{message}</AppText>
    </View>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
  valueColor?: "primary" | "success" | "error";
}

function SummaryRow({ label, value, valueColor = "primary" }: SummaryRowProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <AppText color="secondary">{label}</AppText>

      <AppText color={valueColor}>{value}</AppText>
    </View>
  );
}

function IconButton({
  icon,
  accessibilityLabel,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  accessibilityLabel: string;
  onPress: () => void;
}) {
  const { theme } = useTheme();

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={{ padding: spacing[8] }}
    >
      <Ionicons name={icon} size={24} color={theme.icon.active} />
    </Pressable>
  );
}
