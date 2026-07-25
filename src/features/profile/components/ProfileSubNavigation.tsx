// src/features/profile/components/ProfileSubNavigation.tsx

import { Ionicons } from "@expo/vector-icons";
import { Href, router, usePathname } from "expo-router";
import { Pressable, View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

type ProfileSubRoute =
  "/profile/profile" | "/profile/profile-settings";

interface ProfileNavigationOption {
  label: string;
  route: ProfileSubRoute;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}

const options: ProfileNavigationOption[] = [
  {
    label: "Profile",
    route: "/profile/profile",
    icon: "person-outline",
  },
  {
    label: "Settings",
    route: "/profile/profile-settings",
    icon: "settings-outline",
  },
];

export function ProfileSubNavigation() {
  const pathname = usePathname();
  const { theme } = useTheme();

  const handleNavigate = (route: ProfileSubRoute) => {
    /*
     * navigate() avoids continuously adding duplicate
     * instances when users switch between these sections.
     */
    router.navigate(route as Href);
  };

  return (
    <View
      accessibilityRole="tablist"
      style={{
        flexDirection: "row",
        padding: spacing[4],
        gap: spacing[64],
        borderRadius: radius.sm,
        backgroundColor: theme.background.secondary,
        borderWidth: 1,
        borderColor: theme.border.default,
      }}
    >
      {options.map((option) => {
        const selected =
          pathname === option.route ||
          pathname.endsWith(option.route.split("/").at(-1) ?? "");

        return (
          <Pressable
            key={option.route}
            accessibilityRole="tab"
            accessibilityLabel={option.label}
            accessibilityState={{
              selected,
            }}
            onPress={() => handleNavigate(option.route)}
            style={({ pressed }) => ({
              flex: 1,
              minHeight: 44,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing[8],
              borderRadius: radius.sm,

              backgroundColor: selected
                ? theme.primary
                : pressed
                  ? theme.overlay.medium
                  : "transparent",
            })}
          >
            <Ionicons
              name={option.icon}
              size={18}
              color={selected ? theme.button.primary.text : theme.icon.inactive}
            />

            <AppText
              variant="labelLarge"
              style={{
                color: selected
                  ? theme.button.primary.text
                  : theme.text.secondary,
              }}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
