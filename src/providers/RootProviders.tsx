// import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
// import { StatusBar } from "expo-status-bar";
// import type { ReactNode } from "react";
// import { StyleSheet } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

// import {
//   ErrorBoundary,
//   LoadingSpinner,
//   ToastMessage,
// } from "@/components/index";

// import { queryClient, queryPersister } from "@/services/api";
// import { persistor, store } from "@/store";
// import { ThemeProvider } from "@/providers/ThemeProvider";

// export const RootProviders = ({ children }: { children: ReactNode }) => (
//   <GestureHandlerRootView style={styles.root}>
//     <Provider store={store}>
//       <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
//         <PersistQueryClientProvider
//           client={queryClient}
//           persistOptions={{
//             persister: queryPersister,
//             maxAge: 1000 * 60 * 60 * 24,
//           }}
//         >
//           <ThemeProvider>
//             <ErrorBoundary>
//               {children}

//               <ToastMessage />
//               <StatusBar style="auto" />
//             </ErrorBoundary>
//           </ThemeProvider>
//         </PersistQueryClientProvider>
//       </PersistGate>
//     </Provider>
//   </GestureHandlerRootView>
// );

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//   },
// });
// src/providers/RootProviders.tsx
import { StatusBar } from "expo-status-bar";
import type { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ErrorBoundary } from "@/components/index";
// import { ToastMessage } from "@/features/toast/components";
import { BottomSheetProvider } from "@/providers/BottomSheetProvider";
import { LocationProvider } from "@/providers/LocationProvider";
import { NotificationProvider } from "@/providers/NotificationProvider"; // <--- Added!
import { QueryProvider } from "@/providers/QueryProvider";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SessionProvider } from "@/features/auth/providers/SessionProvider";

export const RootProviders = ({ children }: { children: ReactNode }) => (
  <GestureHandlerRootView style={styles.root}>
    <ReduxProvider>
      <SessionProvider>
      <QueryProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <LocationProvider>
              <NotificationProvider>
                {/* <--- Wraps app context */}
                <BottomSheetProvider>
                  {children}
                  {/* <ToastMessage /> */}
                  <StatusBar style="auto" />
                </BottomSheetProvider>
              </NotificationProvider>
            </LocationProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </QueryProvider>
      </SessionProvider>
    </ReduxProvider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
