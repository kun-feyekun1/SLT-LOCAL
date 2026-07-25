// src/features/toast/hooks/useToast.ts

import { useCallback, useMemo } from "react";

import { useAppDispatch } from "@/store/hooks";

import { clearAllToasts, dismissToast, showToast } from "../state/toastSlice";

import type { ShowToastPayload, ToastPlacement } from "../types/toast.types";

interface ToastConvenienceOptions {
  title?: string;
  duration?: number | null;
  placement?: ToastPlacement;
  dismissible?: boolean;
}

export function useToast() {
  const dispatch = useAppDispatch();

  const show = useCallback(
    (payload: ShowToastPayload) => {
      /*
       * Avoid rendering an empty toast.
       */
      if (!payload.message.trim()) {
        return;
      }

      dispatch(showToast(payload));
    },
    [dispatch],
  );

  const success = useCallback(
    (message: string, options: ToastConvenienceOptions = {}) => {
      show({
        ...options,
        message,
        variant: "success",
      });
    },
    [show],
  );

  const error = useCallback(
    (message: string, options: ToastConvenienceOptions = {}) => {
      show({
        ...options,
        message,
        variant: "error",
      });
    },
    [show],
  );

  const warning = useCallback(
    (message: string, options: ToastConvenienceOptions = {}) => {
      show({
        ...options,
        message,
        variant: "warning",
      });
    },
    [show],
  );

  const info = useCallback(
    (message: string, options: ToastConvenienceOptions = {}) => {
      show({
        ...options,
        message,
        variant: "info",
      });
    },
    [show],
  );

  const dismiss = useCallback(
    (toastId: string) => {
      dispatch(dismissToast(toastId));
    },
    [dispatch],
  );

  const dismissAll = useCallback(() => {
    dispatch(clearAllToasts());
  }, [dispatch]);

  /*
   * Memoization provides a stable object when the hook is passed
   * through dependencies or child props.
   */
  return useMemo(
    () => ({
      show,
      success,
      error,
      warning,
      info,
      dismiss,
      dismissAll,
    }),
    [show, success, error, warning, info, dismiss, dismissAll],
  );
}

export type ToastController = ReturnType<typeof useToast>;
