// app.config.ts

import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Smart Go",
  slug: "my-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "Smart-Link",
  userInterfaceStyle: "automatic",

  ios: {
    icon: "./assets/expo.icon",
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage:"./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    softwareKeyboardLayoutMode: "resize",
    predictiveBackGestureEnabled: false,
    package: "com.darash_x.myapp",
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-notifications",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 180,
        resizeMode: "contain",
        backgroundColor: "#208AEF",

        dark: {
          image: "./assets/images/splash-icon-dark.png",
          backgroundColor: "#208AEF",
        },
      },
    ],
    "expo-secure-store",
    "expo-web-browser",
    [
      "@rnmapbox/maps",
      {
        RNMapboxMapsImpl: "mapbox",
      },
    ],
    "expo-font",
    "expo-image",
  ],

  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },

  extra: {
    router: {},
    eas: {
      projectId: "bb33254f-c753-4e4e-b30e-22f61a1036aa",
    },
  },
};

export default config;
