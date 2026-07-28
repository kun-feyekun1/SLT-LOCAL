import NetInfo from "@react-native-community/netinfo";
import {
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import {
  AppState,
  Platform,
  type AppStateStatus,
} from "react-native";

let configured = false;
let appStateSubscription: { remove(): void } | null = null;
let netInfoUnsubscribe: (() => void) | null = null;

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export function startReactNativeQueryLifecycle(): () => void {
  if (configured) {
    return () => undefined;
  }

  configured = true;

  netInfoUnsubscribe = NetInfo.addEventListener((state) => {
    onlineManager.setOnline(
      state.isConnected === true &&
        state.isInternetReachable !== false,
    );
  });

  appStateSubscription = AppState.addEventListener(
    "change",
    onAppStateChange,
  );

  return () => {
    netInfoUnsubscribe?.();
    appStateSubscription?.remove();
    netInfoUnsubscribe = null;
    appStateSubscription = null;
    configured = false;
  };
}
