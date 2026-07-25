// src/app/(tabs)/profile-details/profile-setting.tsx

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Switch, View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import { Card, Divider } from "@/design-system/components";
import { radius, spacing } from "@/design-system/tokens";
import { ProfileScreenHeader } from "@/features/profile/components/ProfileScreenHeader";
import { ProfileSubNavigation } from "@/features/profile/components/ProfileSubNavigation";
import { useTheme } from "@/features/theme/hooks/useTheme";

export default function ProfileSettingScreen() {
  const { theme } = useTheme();

  const [tripNotificationsEnabled, setTripNotificationsEnabled] =
    useState(true);

  const [promotionalNotificationsEnabled, setPromotionalNotificationsEnabled] =
    useState(false);

  const [locationServicesEnabled, setLocationServicesEnabled] = useState(true);

  const [biometricLoginEnabled, setBiometricLoginEnabled] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background.primary,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingHorizontal: spacing[16],
          paddingTop: spacing[16],
          paddingBottom: spacing[64],
          gap: spacing[20],
        }}
      >
        <ProfileScreenHeader
          title="Profile settings"
          description="Control your preferences, privacy and security."
          icon="settings-outline"
        />

        <ProfileSubNavigation />

        <SettingsSection
          title="Notifications"
          description="Choose which alerts you receive."
          icon="notifications-outline"
        >
          <SettingsSwitchRow
            icon="navigate-outline"
            title="Trip updates"
            description="Arrival, delay and cancellation alerts."
            value={tripNotificationsEnabled}
            onValueChange={setTripNotificationsEnabled}
          />

          <Divider spacingVertical={2} />

          <SettingsSwitchRow
            icon="megaphone-outline"
            title="Promotions"
            description="Discounts, offers and service announcements."
            value={promotionalNotificationsEnabled}
            onValueChange={setPromotionalNotificationsEnabled}
          />
        </SettingsSection>

        <SettingsSection
          title="Privacy"
          description="Manage application permissions."
          icon="shield-checkmark-outline"
        >
          <SettingsSwitchRow
            icon="location-outline"
            title="Location services"
            description="Allow nearby vehicle and route discovery."
            value={locationServicesEnabled}
            onValueChange={setLocationServicesEnabled}
          />

          <Divider spacingVertical={2} />

          <SettingsNavigationRow
            icon="document-text-outline"
            title="Privacy policy"
            description="Review how SmartLink uses your data."
            onPress={() => {
              Alert.alert(
                "Privacy policy",
                "Open your privacy-policy screen here.",
              );
            }}
          />

          <Divider spacingVertical={2} />

          <SettingsNavigationRow
            icon="download-outline"
            title="Download my data"
            description="Request a copy of your account data."
            onPress={() => {
              Alert.alert("Data request", "Your request has been received.");
            }}
          />
        </SettingsSection>

        <SettingsSection
          title="Security"
          description="Protect access to your account."
          icon="lock-closed-outline"
        >
          <SettingsSwitchRow
            icon="finger-print-outline"
            title="Biometric login"
            description="Use fingerprint or face authentication."
            value={biometricLoginEnabled}
            onValueChange={setBiometricLoginEnabled}
          />

          <Divider spacingVertical={2} />

          <SettingsNavigationRow
            icon="key-outline"
            title="Change password"
            description="Update your account password."
            onPress={() => {
              Alert.alert(
                "Change password",
                "Navigate to your change-password screen.",
              );
            }}
          />

          <Divider spacingVertical={2} />

          <SettingsNavigationRow
            icon="phone-portrait-outline"
            title="Active devices"
            description="Review devices signed into your account."
            value="2 devices"
            onPress={() => {
              Alert.alert(
                "Active devices",
                "Two devices are currently signed in.",
              );
            }}
          />
        </SettingsSection>

        <SettingsSection
          title="Application"
          description="Language and display preferences."
          icon="phone-portrait-outline"
        >
          <SettingsNavigationRow
            icon="language-outline"
            title="Language"
            description="Choose your application language."
            value="English"
            onPress={() => {
              Alert.alert("Language", "Open the language selector here.");
            }}
          />

          <Divider spacingVertical={2} />

          <SettingsNavigationRow
            icon="color-palette-outline"
            title="Appearance"
            description="Change the application theme."
            value="System"
            onPress={() => {
              Alert.alert(
                "Appearance",
                "Place your ThemeSelector on an appearance screen.",
              );
            }}
          />
        </SettingsSection>

        <Card variant="elevated">
          <SettingsNavigationRow
            icon="log-out-outline"
            title="Sign out"
            description="Sign out from this device."
            destructive
            onPress={() => {
              Alert.alert("Sign out", "Are you sure you want to sign out?", [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Sign out",
                  style: "destructive",
                  onPress: () => {
                    console.log("User signed out");
                  },
                },
              ]);
            }}
          />
        </Card>

        <Pressable
          accessibilityRole="button"
          onPress={() => {
            Alert.alert(
              "Delete account",
              "This operation should require identity confirmation.",
            );
          }}
          style={({ pressed }) => ({
            minHeight: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: theme.error,
            backgroundColor: pressed ? theme.errorLight : "transparent",
          })}
        >
          <AppText variant="buttonMedium" style={{ color: theme.error }}>
            Delete account
          </AppText>
        </Pressable>
      </ScrollView>
    </View>
  );
}

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  children: React.ReactNode;
}

function SettingsSection({
  title,
  description,
  icon,
  children,
}: SettingsSectionProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: spacing[12] }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[8],
        }}
      >
        <Ionicons name={icon} size={20} color={theme.icon.active} />

        <View style={{ flex: 1 }}>
          <AppText variant="h3">{title}</AppText>

          <AppText variant="bodySmall" color="secondary">
            {description}
          </AppText>
        </View>
      </View>

      <Card variant="elevated">{children}</Card>
    </View>
  );
}

interface SettingsSwitchRowProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function SettingsSwitchRow({
  icon,
  title,
  description,
  value,
  onValueChange,
}: SettingsSwitchRowProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        minHeight: 76,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[12],
        paddingVertical: spacing[8],
      }}
    >
      <SettingsIcon icon={icon} />

      <View style={{ flex: 1 }}>
        <AppText variant="labelLarge">{title}</AppText>

        <AppText variant="bodySmall" color="secondary">
          {description}
        </AppText>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: theme.border.default,
          true: theme.primaryLight,
        }}
        thumbColor={value ? theme.primary : theme.icon.inactive}
        ios_backgroundColor={theme.border.default}
      />
    </View>
  );
}

interface SettingsNavigationRowProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  description: string;
  value?: string;
  destructive?: boolean;
  onPress: () => void;
}

function SettingsNavigationRow({
  icon,
  title,
  description,
  value,
  destructive = false,
  onPress,
}: SettingsNavigationRowProps) {
  const { theme } = useTheme();

  const foregroundColor = destructive ? theme.error : theme.text.primary;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 76,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[12],
        paddingVertical: spacing[8],
        backgroundColor: pressed ? theme.overlay.light : "transparent",
      })}
    >
      <SettingsIcon icon={icon} destructive={destructive} />

      <View style={{ flex: 1 }}>
        <AppText
          variant="labelLarge"
          style={{
            color: foregroundColor,
          }}
        >
          {title}
        </AppText>

        <AppText variant="bodySmall" color="secondary">
          {description}
        </AppText>
      </View>

      {value ? (
        <AppText variant="labelMedium" color="secondary">
          {value}
        </AppText>
      ) : null}

      <Ionicons
        name="chevron-forward"
        size={20}
        color={destructive ? theme.error : theme.icon.inactive}
      />
    </Pressable>
  );
}

function SettingsIcon({
  icon,
  destructive = false,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  destructive?: boolean;
}) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.sm,
        backgroundColor: destructive ? theme.errorLight : theme.surface.surface,
      }}
    >
      <Ionicons
        name={icon}
        size={20}
        color={destructive ? theme.error : theme.icon.active}
      />
    </View>
  );
}
