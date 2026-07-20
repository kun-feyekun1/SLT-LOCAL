// src/providers/NotificationProvider.tsx
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/toastSlice"; // If you want to show in-app toasts
import * as Notifications from "expo-notifications";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  requestPermissions: () => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

// Configure how notifications behave when the app is in the FOREGROUND
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const dispatch = useAppDispatch();

  // Helper function to request device push permissions
  const requestPermissions = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      dispatch(
        showToast({
          message: "Push notification permission denied",
          type: "warning",
        })
      );
      return false;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    setExpoPushToken(tokenData.data);
    return true;
  };

  useEffect(() => {
    // 1. Listen for incoming notifications while the app is OPEN
    const notificationListener = Notifications.addNotificationReceivedListener(
      (incoming) => {
        setNotification(incoming);
      }
    );

    // 2. Listen for when a user TAPS on a notification
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        // Navigate to a specific screen based on data (e.g., routing)
        if (data?.route) {
          // e.g., router.push(data.route)
        }
      });

    // Cleanup event listeners on unmount
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        expoPushToken,
        notification,
        requestPermissions,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
