// src/features/toast/components/ToastContainer.tsx

import { useCallback, useEffect, useRef } from "react";
import { Animated, Easing, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { selectCurrentToast } from "../state/toastSelectors";
import { dismissToast } from "../state/toastSlice";
import { ToastMessage } from "./ToastMessage";

const ENTER_ANIMATION_DURATION = 250;
const EXIT_ANIMATION_DURATION = 180;
const SCREEN_EDGE_SPACING = 16;

export function ToastContainer() {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const currentToast = useAppSelector(selectCurrentToast);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  const isDismissingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDismissTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const dismissCurrentToast = useCallback(() => {
    if (!currentToast || isDismissingRef.current) {
      return;
    }

    isDismissingRef.current = true;
    clearDismissTimer();

    const exitTranslation = currentToast.placement === "top" ? -20 : 20;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: EXIT_ANIMATION_DURATION,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: exitTranslation,
        duration: EXIT_ANIMATION_DURATION,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      /*
       * Remove only the toast whose animation just finished.
       * This prevents an old timer from removing a newer toast.
       */
      if (finished) {
        dispatch(dismissToast(currentToast.id));
      }

      isDismissingRef.current = false;
    });
  }, [clearDismissTimer, currentToast, dispatch, opacity, translateY]);

  useEffect(() => {
    if (!currentToast) {
      clearDismissTimer();
      return;
    }

    isDismissingRef.current = false;

    const initialTranslation = currentToast.placement === "top" ? -20 : 20;

    opacity.setValue(0);
    translateY.setValue(initialTranslation);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: ENTER_ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 0,
        duration: ENTER_ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    if (currentToast.duration !== null) {
      timerRef.current = setTimeout(() => {
        dismissCurrentToast();
      }, currentToast.duration);
    }

    return () => {
      clearDismissTimer();

      opacity.stopAnimation();
      translateY.stopAnimation();
    };
  }, [
    clearDismissTimer,
    currentToast,
    dismissCurrentToast,
    opacity,
    translateY,
  ]);

  if (!currentToast) {
    return null;
  }

  const isTopPlacement = currentToast.placement === "top";

  const safeAreaPosition = isTopPlacement
    ? {
        top: insets.top + SCREEN_EDGE_SPACING,
      }
    : {
        bottom: insets.bottom + SCREEN_EDGE_SPACING,
      };

  return (
    <View pointerEvents="box-none" style={[styles.overlay, safeAreaPosition]}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <ToastMessage toast={currentToast} onDismiss={dismissCurrentToast} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,

    zIndex: 9999,
    elevation: Platform.OS === "android" ? 9999 : undefined,

    alignItems: "center",

    paddingHorizontal: SCREEN_EDGE_SPACING,
  },

  animatedContainer: {
    width: "100%",
    maxWidth: 560,
  },
});
