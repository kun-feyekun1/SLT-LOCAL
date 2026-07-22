// import { Tabs } from "expo-router";
// import { Home, MapPinned, Route, User, Wallet } from "lucide-react-native";

// import { useTheme } from "@/features/theme/hooks/useTheme";

// export default function TabsLayout() {
//   const theme = useTheme();

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: theme.colors.primary,
//         tabBarInactiveTintColor: theme.colors.textMuted,
//         tabBarStyle: {
//           backgroundColor: theme.colors.surface,
//           borderTopColor: theme.colors.border,
//           height: 64,
//         },
//         tabBarLabelStyle: { fontSize: 12 },
//       }}
//     >
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => <Home color={color} size={22} />,
//         }}
//       />
//       <Tabs.Screen
//         name="search"
//         options={{
//           title: "Search",
//           tabBarIcon: ({ color }) => <MapPinned color={color} size={22} />,
//         }}
//       />
//       <Tabs.Screen
//         name="routes"
//         options={{
//           title: "Routes",
//           tabBarIcon: ({ color }) => <Route color={color} size={22} />,
//         }}
//       />
//       <Tabs.Screen
//         name="wallet"
//         options={{
//           title: "Wallet",
//           tabBarIcon: ({ color }) => <Wallet color={color} size={22} />,
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color }) => <User color={color} size={22} />,
//         }}
//       />
//     </Tabs>
//   );
// }


// src/app/(tabs)/_layout.tsx

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { useTheme } from "@/features/theme/hooks/useTheme";

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor:
          theme.navigation.bottomNav.active,

        tabBarInactiveTintColor:
          theme.navigation.bottomNav.inactive,

        tabBarStyle: {
          backgroundColor:
            theme.navigation.bottomNav
              .background,
          borderTopColor:
            theme.navigation.bottomNav.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="trips"
        options={{
          title: "Trips",
          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="navigate-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile-details"
        options={{
          title: "Profile",

          /*
           * Because the folder has no index.tsx,
           * point this tab to its initial screen.
           */
          href: "/profile/profile",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}