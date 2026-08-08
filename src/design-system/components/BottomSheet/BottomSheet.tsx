/**
 * Bottom Sheet Component - SmartLink Transit
 * 16px top corners, elevation 5
 */

import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import { useTheme } from "../../../features/theme/hooks/useTheme";
import { cn } from "../../../lib/cn";
import { getComponentShadow } from "../../tokens/shadows";

const { height: screenHeight } = Dimensions.get("window");

export interface BottomSheetProps extends ViewProps {
  /** Visibility state */
  visible: boolean;
  /** Called when sheet is closed */
  onClose: () => void;
  /** Sheet height (percentage of screen) */
  height?: number;
  /** Dismiss on backdrop press */
  dismissOnBackdrop?: boolean;
  /** Show pull indicator */
  showPullIndicator?: boolean;
  /** Additional className */
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  height = 0.6,
  dismissOnBackdrop = true,
  showPullIndicator = true,
  className,
  children,
  ...props
}) => {
  const { theme } = useTheme();
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = React.useState(visible);

  const sheetHeight = screenHeight * height;

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: screenHeight - sheetHeight,
          useNativeDriver: true,
          speed: 12,
          bounciness: 4,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: screenHeight,
          duration: 300,
          useNativeDriver: true,
          easing: (t) => t * t * t, // ease-in
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsVisible(false);
      });
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(screenHeight - sheetHeight + gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: screenHeight - sheetHeight,
            useNativeDriver: true,
            speed: 12,
            bounciness: 4,
          }).start();
        }
      },
    }),
  ).current;

  if (!isVisible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View
        className="flex-1"
        style={{ opacity, backgroundColor: "rgba(0,0,0,0.50)" }}
      >
        {dismissOnBackdrop && (
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={onClose}
          />
        )}

        <Animated.View
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-white dark:bg-dark-700 rounded-t-16",
            className,
          )}
          style={{
            height: sheetHeight,
            transform: [{ translateY }],
            ...getComponentShadow("bottomSheet"),
          }}
          {...panResponder.panHandlers}
          {...props}
        >
          {showPullIndicator && (
            <View className="w-8 h-1 bg-neutral-300 dark:bg-dark-500 rounded-999 self-center mt-2 mb-4" />
          )}
          <View className="flex-1 px-4 pb-4">{children}</View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
