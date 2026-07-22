// src/features/profile/components/ProfileScreenHeader.tsx

import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import {
  radius,
  spacing,
} from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

interface ProfileScreenHeaderProps {
  title: string;
  description: string;
  icon: React.ComponentProps<
    typeof Ionicons
  >["name"];
}

export function ProfileScreenHeader({
  title,
  description,
  icon,
}: ProfileScreenHeaderProps) {
  const { theme } = useTheme();

  return (
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
          borderRadius: radius.md,
          backgroundColor:
            theme.primaryLight,
        }}
      >
        <Ionicons
          name={icon}
          size={24}
          color={theme.primary}
        />
      </View>

      <View style={{ flex: 1 }}>
        <AppText variant="h2">
          {title}
        </AppText>

        <AppText
          variant="bodySmall"
          color="secondary"
        >
          {description}
        </AppText>
      </View>
    </View>
  );
}