import { router } from "expo-router";
import { LogOut, UserRound } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { AppHeader, AppText, PrimaryButton } from "@/components";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useLogout } from "@/features/auth/hooks/useAuthActions";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAppSelector } from "@/store/hooks";
import { radii, shadows, spacing } from "@/theme";

export default function ProfileScreen() {
  const user = useAppSelector((state) => state.auth.user);
  const logout = useLogout();
  const theme = useAppTheme();

  return (
    <ScreenWrapper>
      <AppHeader
        title="Profile"
        subtitle="Account, language, safety, and trip preferences."
      />

      {/* Clickable Profile Card */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/profile/details")}
        style={[
          styles.card,
          shadows.card,
          {
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        {/* Avatar */}
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: theme.colors.surfaceMuted,
            },
          ]}
        >
          <UserRound size={32} color={theme.colors.primary} />
        </View>

        {/* User Information */}
        <View style={styles.text}>
          <AppText variant="subtitle" weight="700">
            {user?.fullName ?? "Derash rider"}
          </AppText>
          <AppText muted>
            {user?.phoneNumber ?? "Secure account active"}
          </AppText>
        </View>
      </TouchableOpacity>

      {/* Logout */}
      <PrimaryButton
        label="Log out"
        icon={LogOut}
        variant="secondary"
        loading={logout.isPending}
        onPress={() => logout.mutate()}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 1,
  },
});
