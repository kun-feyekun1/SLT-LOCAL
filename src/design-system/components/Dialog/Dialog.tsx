/**
 * Dialog/Modal Component - SmartLink Transit
 * 12px radius, elevation 4
 */

import React from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";
import { useTheme } from "../../../features/theme/hooks/useTheme";
import { cn } from "../../../lib/cn";
import { getComponentShadow } from "../../tokens/shadows";
import { Button } from "../Button";
import { Typography } from "../Typography";

export interface DialogAction extends TouchableOpacityProps {
  label: string;
  variant?: "primary" | "secondary" | "text";
  onPress?: () => void;
}

export interface DialogProps extends ViewProps {
  /** Visibility state */
  visible: boolean;
  /** Called when dialog is closed */
  onClose: () => void;
  /** Dialog title */
  title?: string;
  /** Dialog description */
  description?: string;
  /** Dialog actions */
  actions?: DialogAction[];
  /** Dismiss on backdrop press */
  dismissOnBackdrop?: boolean;
  /** Additional className */
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  visible,
  onClose,
  title,
  description,
  actions = [],
  dismissOnBackdrop = true,
  className,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-scrim px-6">
        {dismissOnBackdrop && (
          <TouchableOpacity
            className="absolute inset-0"
            activeOpacity={1}
            onPress={onClose}
          />
        )}

        <View
          className={cn(
            "bg-white dark:bg-dark-700 rounded-12 p-6 max-w-sm w-full",
            className,
          )}
          style={{
            ...getComponentShadow("dialog"),
          }}
          {...props}
        >
          {title && (
            <Typography variant="h3" className="text-center mb-2">
              {title}
            </Typography>
          )}

          {description && (
            <Typography
              variant="bodyMedium"
              className="text-center text-neutral-600 dark:text-dark-300 mb-6"
            >
              {description}
            </Typography>
          )}

          {children}

          {actions.length > 0 && (
            <View className="flex-row justify-end gap-2 mt-4">
              {actions.map((action, index) => {
                const { label, onPress, variant, ...buttonProps } = action;

                return (
                  <Button
                    key={index}
                    variant={variant || "text"}
                    label={label}
                    onPress={() => {
                      onPress?.();
                      onClose();
                    }}
                    className="flex-1"
                    {...buttonProps}
                  />
                );
              })}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default Dialog;
