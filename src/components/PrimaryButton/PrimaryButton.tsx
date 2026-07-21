// import type { LucideIcon } from "lucide-react-native";
// import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

// import { useAppTheme } from "@/hooks/useAppTheme";
// import { radii, spacing, typography } from "@/theme";

// import { AppText } from "../AppText/AppText";

// interface Props {
//   label: string;
//   onPress: () => void;
//   loading?: boolean;
//   disabled?: boolean;
//   variant?: "primary" | "secondary" | "ghost";
//   icon?: LucideIcon;
// };

// export const PrimaryButton = ({
//   label,
//   onPress,
//   loading,
//   disabled,
//   variant = "primary",
//   icon: Icon,
// }: Props) => {
//   const theme = useAppTheme();
//   const isPrimary = variant === "primary";
//   const backgroundColor = isPrimary
//     ? theme.colors.primary
//     : variant === "secondary"
//       ? theme.colors.surfaceMuted
//       : "transparent";
//   const foreground = isPrimary ? "#FFFFFF" : theme.colors.text;

//   return (
//     <Pressable
//       accessibilityRole="button"
//       accessibilityState={{ disabled: Boolean(disabled || loading) }}
//       disabled={disabled || loading}
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.button,
//         { backgroundColor, opacity: disabled ? 0.5 : pressed ? 0.82 : 1 },
//       ]}
//     >
//       {loading ? (
//         <ActivityIndicator color={foreground} />
//       ) : (
//         <View style={styles.row}>
//           {Icon ? <Icon color={foreground} size={20} /> : null}
//           <AppText
//             style={{ color: foreground, fontSize: typography.size.md }}
//             weight="700"
//           >
//             {label}
//           </AppText>
//         </View>
//       )}
//     </Pressable>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     minHeight: 54,
//     borderRadius: radii.lg,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: spacing.md,
//   },
//   row: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
// });


import { Pressable, StyleSheet } from "react-native";

import { useTheme } from "@/features/theme/hooks/useTheme";
import { AppText } from "@/components/AppText/AppText";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
}

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
}: PrimaryButtonProps) {
  const { theme } = useTheme();

  const backgroundColor =
    variant === "primary"
      ? theme.button.primary
      : variant === "secondary"
        ? theme.button.secondary
        : "transparent";

  const textColor =
    variant === "primary"
      ? theme.button.primary.text
      : theme.text.primary;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
    
      ]}
    >
      <AppText style={{ color: textColor }}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingHorizontal: 20,
  },
});