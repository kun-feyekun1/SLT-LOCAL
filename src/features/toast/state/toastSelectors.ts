// src/features/toast/state/toastSelectors.ts

import type { RootState } from "@/store";

/**
 * Selects only the currently displayed toast.
 *
 * Do not use:
 * useAppSelector((state) => state)
 */
export const selectCurrentToast = (state: RootState) =>
  state.toast.queue[0] ?? null;

export const selectToastQueue = (state: RootState) =>
  state.toast.queue;

export const selectToastQueueLength = (state: RootState) =>
  state.toast.queue.length;

export const selectHasActiveToast = (state: RootState) =>
  state.toast.queue.length > 0;