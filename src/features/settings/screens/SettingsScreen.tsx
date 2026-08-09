import { router } from "expo-router";
import { Alert, ScrollView, View } from "react-native";

import ScreenWrapper from "@/components/ScreenWrapper";
import { spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { logger } from "@/services/logging";

import { SettingsHeader } from "../components/SettingsHeader";
import { SettingsRow } from "../components/SettingsRow";
import { SettingsSection } from "../components/SettingsSection";

export function SettingsScreen() {
  const { theme, mode } = useTheme();

  function handleClearCache(): void {
    Alert.alert(
      "Clear temporary data?",
      "Downloaded temporary data and cached responses will be removed. Your account and saved preferences will remain.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            logger.info("Application cache clear requested", {
              category: "settings",
            });

            /*
             * Later connect this to:
             *
             * await queryClient.cancelQueries();
             * queryClient.clear();
             *
             * Be careful when clearing persisted server state.
             */
          },
        },
      ],
    );
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
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            paddingHorizontal: spacing[16],
            paddingTop: spacing[16],
            paddingBottom: spacing[64],
            gap: spacing[24],
          }}
        >
          <SettingsHeader
            title="Settings"
            description="Manage your application, privacy, travel, and account preferences."
          />

          <SettingsSection title="Application">
            <SettingsRow
              title="Appearance"
              description="Theme, display mode, and visual preferences"
              icon="color-palette-outline"
              value={
                mode === "system"
                  ? "System"
                  : mode === "dark"
                    ? "Dark"
                    : "Light"
              }
              onPress={() =>
                router.push(
                  "/(tabs)/profile/settings/appearance",
                )
              }
            />

            <SettingsRow
              title="Language"
              description="Choose your preferred application language"
              icon="language-outline"
              value="English"
              onPress={() =>
                router.push(
                  "/(tabs)/profile/settings/language",
                )
              }
            />

            <SettingsRow
              title="Notifications"
              description="Manage trip, service, payment, and safety alerts"
              icon="notifications-outline"
              onPress={() =>
                router.push(
                  "/(tabs)/profile/settings/notifications",
                )
              }
            />
          </SettingsSection>

          <SettingsSection title="Transportation">
            <SettingsRow
              title="Travel preferences"
              description="Walking distance, route priority, and accessibility"
              icon="options-outline"
              onPress={() =>
                router.push(
                  "/(tabs)/profile/settings/travel-preferences",
                )
              }
            />

            <SettingsRow
              title="Location and maps"
              description="Location accuracy, map style, and tracking preferences"
              icon="location-outline"
              onPress={() =>
                router.push(
                  "/(tabs)/profile/settings/location",
                )
              }
            />

            <SettingsRow
              title="Saved places"
              description="Manage home, work, and frequently visited destinations"
              icon="bookmark-outline"
              onPress={() =>
                router.push("/(tabs)/saved")
              }
            />
          </SettingsSection>

          <SettingsSection title="Privacy and security">
            <SettingsRow
              title="Privacy"
              description="Control data use, analytics, and location history"
              icon="shield-checkmark-outline"
              onPress={() =>
                router.push(
                  "/(tabs)/profile/settings/privacy",
                )
              }
            />

            <SettingsRow
              title="Security"
              description="Password, biometrics, and active sessions"
              icon="lock-closed-outline"
              onPress={() =>
                router.push(
                  "/(tabs)/profile/settings/security",
                )
              }
            />

            <SettingsRow
              title="Permissions"
              description="Review location, notification, camera, and media access"
              icon="key-outline"
              onPress={() =>
                router.push(
                  "/(tabs)/profile/settings/permissions",
                )
              }
            />
          </SettingsSection>

          <SettingsSection title="Data and storage">
            <SettingsRow
              title="Offline downloads"
              description="Manage downloaded routes, maps, and schedules"
              icon="cloud-download-outline"
              onPress={() =>
                router.push(
                  "/(tabs)/profile/settings/offline",
                )
              }
            />

            <SettingsRow
              title="Clear temporary data"
              description="Remove cached responses and temporary application files"
              icon="trash-bin-outline"
              showChevron={false}
              onPress={handleClearCache}
            />
          </SettingsSection>

          <SettingsSection title="Support">
            <SettingsRow
              title="Help center"
              description="Find answers and learn how Smart Link Transit works"
              icon="help-circle-outline"
              onPress={() =>
                router.push("/(public)/help")
              }
            />

            <SettingsRow
              title="Report a problem"
              description="Send feedback or report an application issue"
              icon="bug-outline"
              onPress={() =>
                router.push(
                  "/(tabs)/profile/settings/report-problem",
                )
              }
            />

            <SettingsRow
              title="About"
              description="Application information, policies, and version"
              icon="information-circle-outline"
              onPress={() =>
                router.push("/(public)/about")
              }
            />
          </SettingsSection>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}