// // src/providers/ReduxProvider.tsx
// import React, { type ReactNode } from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

// import { LoadingSpinner } from "@/components/index";
// import { persistor, store } from "@/store";

// export const ReduxProvider = ({ children }: { children: ReactNode }) => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// };


import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store'; // Adjust import path if needed

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color="#007AFF" size="large" />
          </View>
        } 
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}