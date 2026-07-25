import { Modal, Pressable, StyleSheet, type ModalProps } from "react-native";

import { useTheme } from "@/features/theme/hooks/useTheme";
import { radii, spacing } from "@/theme";

type Props = ModalProps & {
  onClose: () => void;
};

export const AppModal = ({ children, onClose, ...props }: Props) => {
  const theme = useTheme();

  return (
    <Modal transparent animationType="fade" {...props}>
      <Pressable
        style={[styles.backdrop, { backgroundColor: theme.colors.overlay }]}
        onPress={onClose}
      >
        <Pressable
          style={[styles.sheet, { backgroundColor: theme.colors.surface }]}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: "flex-end", padding: spacing.md },
  sheet: { borderRadius: radii.lg, padding: spacing.md, gap: spacing.md },
});
