import { Search } from "lucide-react-native";
import { Pressable, StyleSheet, TextInput } from "react-native";

import { useTheme } from "@/features/theme/hooks/useTheme";
import { radii, spacing, typography } from "@/theme";

type Props = {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  onPress?: () => void;
};

export const SearchBar = ({
  value,
  placeholder,
  onChangeText,
  onPress,
}: Props) => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.shell,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Search size={20} color={theme.colors.textMuted} />
      <TextInput
        editable={!onPress}
        pointerEvents={onPress ? "none" : "auto"}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, { color: theme.colors.text }]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  shell: {
    minHeight: 54,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  input: { flex: 1, fontSize: typography.size.md },
});
