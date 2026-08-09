import { Modal, Pressable, StyleSheet, type ModalProps } from "react-native";

import { useTheme } from "@/features/theme/hooks/useTheme";
import { radius, spacing } from "@/design-system/tokens";

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
  backdrop: { flex: 1, justifyContent: "flex-end", padding: spacing[4] },
  sheet: { borderRadius: radius.lg, padding: spacing[4], gap: spacing[4] },
});
