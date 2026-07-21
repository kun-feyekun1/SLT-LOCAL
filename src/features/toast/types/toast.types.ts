// src/features/toast/types/toast.types.ts

export type ToastVariant =
  | "success"
  | "error"
  | "warning"
  | "info";

export type ToastPlacement = "top" | "bottom";

export interface Toast {
  /**
   * Unique identifier generated when the toast is dispatched.
   */
  id: string;

  /**
   * Main toast message.
   */
  message: string;

  /**
   * Optional short heading.
   */
  title?: string;

  /**
   * Visual and semantic toast type.
   */
  variant: ToastVariant;

  /**
   * Duration before automatic dismissal, in milliseconds.
   *
   * Set to null to require manual dismissal.
   */
  duration: number | null;

  /**
   * Position of the toast on the screen.
   */
  placement: ToastPlacement;

  /**
   * Controls whether the close button is displayed.
   */
  dismissible: boolean;
}

export interface ShowToastPayload {
  message: string;
  title?: string;
  variant?: ToastVariant;
  duration?: number | null;
  placement?: ToastPlacement;
  dismissible?: boolean;
}

export interface ToastState {
  /**
   * The first item is the currently displayed toast.
   * Remaining items wait in the queue.
   */
  queue: Toast[];
}

export interface ToastMessageProps {
  toast: Toast;
  onDismiss: () => void;
}