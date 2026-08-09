import { useState } from "react";
import { ScrollView, View } from "react-native";

import ScreenWrapper from "@/components/ScreenWrapper";
import { spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { logger } from "@/services/logging";

import { SettingsHeader } from "../components/SettingsHeader";
import { SettingsSection } from "../components/SettingsSection";
import { SettingsSwitchRow } from "../components/SettingsSwitchRow";

interface NotificationPreferences {
  tripUpdates: boolean;
  vehicleApproaching: boolean;
  serviceDisruptions: boolean;
  paymentUpdates: boolean;
  promotions: boolean;
  safetyAlerts: boolean;
}

const initialPreferences: NotificationPreferences = {
  tripUpdates: true,
  vehicleApproaching: true,
  serviceDisruptions: true,
  paymentUpdates: true,
  promotions: false,
  safetyAlerts: true,
};

export function NotificationSettingsScreen() {
  const { theme } = useTheme();

  const [preferences, setPreferences] =
    useState<NotificationPreferences>(
      initialPreferences,
    );

  function updatePreference(
    key: keyof NotificationPreferences,
    value: boolean,
  ): void {
    setPreferences(current => ({
      ...current,
      [key]: value,
    }));

    logger.info(
      "Notification preference changed",
      {
        category: "settings",
        preference: key,
        enabled: value,
      },
    );

    /*
     * Persist through a domain service:
     *
     * notificationPreferencesService.update({
     *   [key]: value,
     * });
     */
  }

  return (
    <ScreenWrapper>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background.primary,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: spacing[16],
            paddingTop: spacing[16],
            paddingBottom: spacing[64],
            gap: spacing[24],
          }}
        >
          <SettingsHeader
            title="Notifications"
            description="Choose which alerts and transportation updates you receive."
          />

          <SettingsSection title="Trips and vehicles">
            <SettingsSwitchRow
              title="Trip updates"
              description="Changes to scheduled and active trips"
              icon="bus-outline"
              value={preferences.tripUpdates}
              onValueChange={value =>
                updatePreference(
                  "tripUpdates",
                  value,
                )
              }
            />

            <SettingsSwitchRow
              title="Vehicle approaching"
              description="Alerts when your selected vehicle is close"
              icon="navigate-circle-outline"
              value={
                preferences.vehicleApproaching
              }
              onValueChange={value =>
                updatePreference(
                  "vehicleApproaching",
                  value,
                )
              }
            />

            <SettingsSwitchRow
              title="Service disruptions"
              description="Delays, route changes, closures, and cancellations"
              icon="warning-outline"
              value={
                preferences.serviceDisruptions
              }
              onValueChange={value =>
                updatePreference(
                  "serviceDisruptions",
                  value,
                )
              }
            />
          </SettingsSection>

          <SettingsSection title="Account">
            <SettingsSwitchRow
              title="Payment updates"
              description="Receipts, wallet activity, and payment status"
              icon="wallet-outline"
              value={preferences.paymentUpdates}
              onValueChange={value =>
                updatePreference(
                  "paymentUpdates",
                  value,
                )
              }
            />

            <SettingsSwitchRow
              title="Offers and announcements"
              description="Promotions, campaigns, and new feature announcements"
              icon="megaphone-outline"
              value={preferences.promotions}
              onValueChange={value =>
                updatePreference(
                  "promotions",
                  value,
                )
              }
            />
          </SettingsSection>

          <SettingsSection
            title="Safety"
            description="Critical safety alerts may still be delivered when required."
          >
            <SettingsSwitchRow
              title="Safety alerts"
              description="Emergency, incident, and security notifications"
              icon="shield-outline"
              value={preferences.safetyAlerts}
              onValueChange={value =>
                updatePreference(
                  "safetyAlerts",
                  value,
                )
              }
            />
          </SettingsSection>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}