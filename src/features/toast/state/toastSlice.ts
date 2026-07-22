// src/features/toast/state/toastSlice.ts

import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

import type { ShowToastPayload, Toast, ToastState } from "../types/toast.types";

const DEFAULT_TOAST_DURATION = 4_000;
const MAXIMUM_QUEUE_LENGTH = 5;

const initialState: ToastState = {
  queue: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,

  reducers: {
    /**
     * Adds a new toast to the end of the queue.
     *
     * prepare() lets Redux Toolkit create the final typed payload,
     * including the generated toast ID.
     */
    showToast: {
      reducer(state, action: PayloadAction<Toast>) {
        /*
         * Prevent the queue from growing without limit when many
         * messages are dispatched rapidly.
         */
        if (state.queue.length >= MAXIMUM_QUEUE_LENGTH) {
          state.queue.pop();
        }

        state.queue.push(action.payload);
      },

      prepare(payload: ShowToastPayload) {
        const message = payload.message.trim();

        return {
          payload: {
            id: nanoid(),
            message,
            title: payload.title?.trim() || undefined,
            variant: payload.variant ?? "info",
            duration:
              payload.duration === undefined
                ? DEFAULT_TOAST_DURATION
                : payload.duration,
            placement: payload.placement ?? "top",
            dismissible: payload.dismissible ?? true,
          } satisfies Toast,
        };
      },
    },

    /**
     * Removes a specific toast.
     *
     * Usually this is the currently visible toast, but accepting an ID
     * also makes this reducer safe for queued items.
     */
    dismissToast(state, action: PayloadAction<string>) {
      state.queue = state.queue.filter((toast) => toast.id !== action.payload);
    },

    /**
     * Removes the currently visible toast.
     */
    dismissCurrentToast(state) {
      state.queue.shift();
    },

    /**
     * Clears every visible and queued toast.
     */
    clearAllToasts(state) {
      state.queue = [];
    },
  },
});

export const { showToast, dismissToast, dismissCurrentToast, clearAllToasts } =
  toastSlice.actions;

export const toastReducer = toastSlice.reducer;

export default toastSlice.reducer;
