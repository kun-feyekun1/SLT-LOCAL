import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Card, Divider } from "@/design-system/components";
import { radius, spacing } from "@/design-system/tokens";
import { ProfileScreenHeader } from "@/features/profile/components/ProfileScreenHeader";
import { ProfileSubNavigation } from "@/features/profile/components/ProfileSubNavigation";
import { useTheme } from "@/features/theme/hooks/useTheme";

export function ProfileScreen() {
  const { theme } = useTheme();

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
            gap: spacing[20],
          }}
        >
          <ProfileScreenHeader
            title="My account"
            description="Personal details and travel information."
            icon="person-outline"
          />

          <ProfileSubNavigation />

          <ProfileIdentityCard />

          <ProfileStatistics />

          <Card variant="elevated">
            <View style={{ gap: spacing[4] }}>
              <AppText variant="h3">Personal information</AppText>

              <AppText variant="bodySmall" color="secondary">
                Information associated with your SmartLink account.
              </AppText>
            </View>

            <Divider spacingVertical={16} />

            <ProfileInformationRow
              icon="person-outline"
              label="Full name"
              value="Abebe Kebede"
            />

            <Divider spacingVertical={2} />

            <ProfileInformationRow
              icon="mail-outline"
              label="Email"
              value="abebe@example.com"
            />

            <Divider spacingVertical={2} />

            <ProfileInformationRow
              icon="call-outline"
              label="Phone number"
              value="+251 91 234 5678"
            />

            <Divider spacingVertical={2} />

            <ProfileInformationRow
              icon="location-outline"
              label="Home city"
              value="Addis Ababa"
            />
          </Card>

          <Card variant="elevated">
            <View style={{ gap: spacing[4] }}>
              <AppText variant="h3">Travel preferences</AppText>

              <AppText variant="bodySmall" color="secondary">
                Used to personalize route recommendations.
              </AppText>
            </View>

            <Divider spacingVertical={16} />

            <ProfileInformationRow
              icon="bus-outline"
              label="Preferred transport"
              value="Public bus"
            />

            <Divider spacingVertical={2} />

            <ProfileInformationRow
              icon="card-outline"
              label="Default payment"
              value="Telebirr"
            />

            <Divider spacingVertical={2} />

            <ProfileInformationRow
              icon="language-outline"
              label="Language"
              value="English"
            />
          </Card>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.navigate("/profile/profile-settings")}
            style={({ pressed }) => ({
              minHeight: 52,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing[8],
              paddingHorizontal: spacing[16],
              borderRadius: radius.md,
              backgroundColor: pressed
                ? theme.button.primary.pressed
                : theme.button.primary.background,
            })}
          >
            <Ionicons
              name="settings-outline"
              size={20}
              color={theme.button.primary.text}
            />

            <AppText
              variant="buttonLarge"
              style={{
                color: theme.button.primary.text,
              }}
            >
              Open profile settings
            </AppText>
          </Pressable>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

function ProfileIdentityCard() {
  const { theme } = useTheme();

  return (
    <Card variant="elevated">
      <View
        style={{
          alignItems: "center",
          gap: spacing[12],
          paddingVertical: spacing[8],
        }}
      >
        <View>
          <View
            style={{
              width: 92,
              height: 92,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: radius.full,
              backgroundColor: theme.primaryLight,
              borderWidth: 3,
              borderColor: theme.primary,
            }}
          >
            <AppText
              variant="h1"
              style={{
                color: theme.primary,
              }}
            >
              AK
            </AppText>
          </View>

          <View
            style={{
              position: "absolute",
              right: 2,
              bottom: 2,
              width: 22,
              height: 22,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: radius.full,
              borderWidth: 3,
              borderColor: theme.card.background,
              backgroundColor: theme.success,
            }}
          >
            <Ionicons name="checkmark" size={12} color={theme.white} />
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            gap: spacing[4],
          }}
        >
          <AppText variant="h2">Abebe Kebede</AppText>

          <AppText variant="bodyMedium" color="secondary">
            SmartLink passenger
          </AppText>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing[6],
            paddingHorizontal: spacing[12],
            paddingVertical: spacing[6],
            borderRadius: radius.full,
            backgroundColor: theme.successLight,
          }}
        >
          <Ionicons name="shield-checkmark" size={16} color={theme.success} />

          <AppText
            variant="labelMedium"
            style={{
              color: theme.success,
            }}
          >
            Verified account
          </AppText>
        </View>
      </View>
    </Card>
  );
}

function ProfileStatistics() {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: spacing[12],
      }}
    >
      <ProfileStat icon="navigate-outline" value="42" label="Trips" />

      <ProfileStat icon="leaf-outline" value="18 kg" label="CO₂ saved" />

      <ProfileStat icon="star-outline" value="4.9" label="Rating" />
    </View>
  );
}

interface ProfileStatProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  value: string;
  label: string;
}

function ProfileStat({ icon, value, label }: ProfileStatProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        minHeight: 112,
        alignItems: "center",
        justifyContent: "center",
        gap: spacing[6],
        padding: spacing[8],
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: theme.border.default,
        backgroundColor: theme.card.background,
      }}
    >
      <Ionicons name={icon} size={22} color={theme.primary} />

      <AppText variant="h3">{value}</AppText>

      <AppText
        variant="labelSmall"
        color="secondary"
        style={{ textAlign: "center" }}
      >
        {label}
      </AppText>
    </View>
  );
}

interface ProfileInformationRowProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
}

function ProfileInformationRow({
  icon,
  label,
  value,
}: ProfileInformationRowProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        minHeight: 68,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[12],
        paddingVertical: spacing[8],
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: radius.full,
          backgroundColor: theme.surface.surface,
        }}
      >
        <Ionicons name={icon} size={30} color={theme.icon.active} />
      </View>

      <View style={{ flex: 1 }}>
        <AppText variant="labelSmall" color="secondary">
          {label}
        </AppText>

        <AppText variant="bodyMedium">{value}</AppText>
      </View>
    </View>
  );
}
