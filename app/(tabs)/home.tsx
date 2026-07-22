// // import { LinearGradient } from "expo-linear-gradient";
// // import { useRouter } from "expo-router";
// // import { Award, Car, MapPin, Shield } from "lucide-react-native";
// // import {
// //   Dimensions,
// //   ScrollView,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from "react-native";
// // import Animated, { FadeInDown } from "react-native-reanimated";

// // const { width } = Dimensions.get("window");

// // export default function WelcomeScreen() {
// //   const router = useRouter();

// //   return (
// //     <ScrollView className="flex-1 bg-black">
// //       {/* Hero Section */}
// //       <View className="relative h-[100vh] justify-center items-center">
// //         <LinearGradient
// //           colors={["#000000", "#1a1a2e", "#16213e"]}
// //           className="absolute inset-0"
// //         />

// //         {/* Background Image / Illustration */}
// //         <LinearGradient
// //           colors={["#0f172a", "#1e2937", "#334155"]}
// //           className="absolute inset-0"
// //         />

// //         <View className="items-center z-10 px-6">
// //           <Animated.Text
// //             entering={FadeInDown.delay(200)}
// //             className="text-6xl font-bold text-white text-center mb-4"
// //           >
// //             Derash
// //           </Animated.Text>

// //           <Text className="text-3xl text-primary font-semibold text-center mb-6">
// //             Move Smarter • Travel Safer
// //           </Text>

// //           <Text className="text-lg text-gray-300 text-center max-w-[280px] mb-12">
// //             Ethiopia's most advanced transport network — rides, routes, delivery
// //             & more.
// //           </Text>

// //           <TouchableOpacity
// //             onPress={() => router.push("/(auth)/login")}
// //             className="bg-primary w-full py-4 rounded-2xl mb-4 active:opacity-90"
// //           >
// //             <Text className="text-black font-semibold text-center text-lg">
// //               Get Started
// //             </Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             onPress={() => router.push("/(auth)/signup")}
// //             className="border border-white/50 w-full py-4 rounded-2xl"
// //           >
// //             <Text className="text-white font-medium text-center text-lg">
// //               Create Account
// //             </Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>

// //       {/* Features Section */}
// //       <View className="px-6 pb-12">
// //         <Text className="text-3xl font-bold text-white mb-8 text-center">
// //           Why Choose Derash?
// //         </Text>

// //         <View className="space-y-8">
// //           {features.map((feature, index) => (
// //             <Animated.View
// //               key={index}
// //               entering={FadeInDown.delay(index * 100)}
// //               className="bg-zinc-900/70 p-6 rounded-3xl"
// //             >
// //               <View className="flex-row items-center gap-4">
// //                 <View className="bg-primary/10 p-4 rounded-2xl">
// //                   {feature.icon}
// //                 </View>
// //                 <View>
// //                   <Text className="text-xl font-semibold text-white">
// //                     {feature.title}
// //                   </Text>
// //                   <Text className="text-gray-400 mt-1">{feature.desc}</Text>
// //                 </View>
// //               </View>
// //             </Animated.View>
// //           ))}
// //         </View>
// //       </View>

// //       {/* Stats */}
// //       <View className="bg-zinc-950 py-12 px-6">
// //         <View className="flex-row justify-around">
// //           {stats.map((stat, i) => (
// //             <View key={i} className="items-center">
// //               <Text className="text-4xl font-bold text-primary">
// //                 {stat.value}
// //               </Text>
// //               <Text className="text-gray-400 mt-1">{stat.label}</Text>
// //             </View>
// //           ))}
// //         </View>
// //       </View>

// //       {/* Final CTA */}
// //       <View className="px-6 py-16 bg-gradient-to-b from-transparent to-black">
// //         <Text className="text-4xl font-bold text-white text-center mb-6">
// //           Ready to ride with confidence?
// //         </Text>
// //         <TouchableOpacity
// //           onPress={() => router.push("/(auth)/login")}
// //           className="bg-white py-5 rounded-3xl"
// //         >
// //           <Text className="text-black text-center font-bold text-xl">
// //             Join Derash Now
// //           </Text>
// //         </TouchableOpacity>
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // const features = [
// //   {
// //     icon: <Car color="#00ff9f" size={32} />,
// //     title: "Instant Rides",
// //     desc: "Book a ride in seconds with real-time tracking",
// //   },
// //   {
// //     icon: <MapPin color="#00ff9f" size={32} />,
// //     title: "Smart Routes",
// //     desc: "Best routes, traffic updates & estimated time",
// //   },
// //   {
// //     icon: <Shield color="#00ff9f" size={32} />,
// //     title: "Safe & Secure",
// //     desc: "Verified drivers and emergency SOS feature",
// //   },
// //   {
// //     icon: <Award color="#00ff9f" size={32} />,
// //     title: "Best Prices",
// //     desc: "Transparent pricing with no hidden charges",
// //   },
// // ];

// // const stats = [
// //   { value: "50K+", label: "Happy Riders" },
// //   { value: "1,200", label: "Active Drivers" },
// //   { value: "98%", label: "Satisfaction Rate" },
// // ];

// // npx expo install nativewind react-native-reanimated react-native-safe-area-context
// // npx expo install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo

// // npx expo install nativewind react-native-reanimated react-native-safe-area-context
// // npx expo install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo

// import { FlashList } from "@shopify/flash-list";
// import { router } from "expo-router";
// import { AlertCircle, MapPinned } from "lucide-react-native";
// import { useMemo } from "react";
// import { Pressable, StyleSheet, Text, View } from "react-native";

// import {
//   AppHeader,
//   AppText,
//   EmptyState,
//   LoadingSpinner,
//   SearchBar,
// } from "@/components";
// import { TransportMap } from "@/features/map/components/TransportMap";
// import { useCurrentLocation } from "@/features/map/hooks/useCurrentLocation";
// import { TransportCard } from "@/features/transport/components/TransportCard";
// import { useNearbyTransport } from "@/features/transport/hooks/useNearbyTransport";
// import type { TransportOption } from "@/features/transport/types/transport.types";
// import { useTheme } from "@/hooks/useTheme";
// import { radii, spacing } from "@/theme";
// import ScreenWrapper from "@/components/ScreenWrapper";

// export default function HomeScreen() {
//   const theme = useTheme();
//   const location = useCurrentLocation();
//   const point =
//     location.data?.status === "granted" ? location.data.point : null;
//   const nearby = useNearbyTransport(point);
//   const vehicles = useMemo(
//     () =>
//       (nearby.data ?? [])
//         .filter((item) => item.liveLocation)
//         .map((item) => ({
//           id: item.id,
//           mode: item.mode,
//           routeId: item.routeName,
//           heading: 0,
//           updatedAt: new Date().toISOString(),
//           latitude: item.liveLocation!.latitude,
//           longitude: item.liveLocation!.longitude,
//         })),
//     [nearby.data],
//   );

//   const renderItem = ({ item }: { item: TransportOption }) => (
//     <TransportCard item={item} />
//   );

//   return (
//     <ScreenWrapper>
//       <View style={styles.container}>
//         <Pressable
//           onPress={() => {
//             router.push("/animation-lab");
//           }}
//         >
//           <Text>Open Animation Lab</Text>
//         </Pressable>

//         <View style={styles.headerBlock}>
//           <AppHeader title="Derash" subtitle="Addis Ababa transport, unified" />
//           <SearchBar
//             value=""
//             placeholder="Where are you going?"
//             onChangeText={() => undefined}
//             onPress={() => router.push("/search")}
//           />
//         </View>
//         <View style={[styles.mapShell, { borderColor: theme.colors.border }]}>
//           <TransportMap center={point} vehicles={vehicles} />
//         </View>
//         <View style={styles.sectionHeader}>
//           <AppText variant="subtitle" weight="700">
//             Nearby options
//           </AppText>
//           <AppText muted variant="caption">
//             Live-ready
//           </AppText>
//         </View>
//         {location.data?.status === "denied" ? (
//           <EmptyState
//             title="Location permission needed"
//             message="Enable location to discover nearby buses, minibuses, taxis, and walking routes."
//             icon={MapPinned}
//             actionLabel="Try again"
//             onAction={() => location.refetch()}
//           />
//         ) : nearby.isLoading || location.isLoading ? (
//           <LoadingSpinner />
//         ) : nearby.isError ? (
//           <EmptyState
//             title="Network issue"
//             message="Derash could not load nearby transport. Cached routes will appear when available."
//             icon={AlertCircle}
//             actionLabel="Retry"
//             onAction={() => nearby.refetch()}
//           />
//         ) : (
//           <FlashList
//             data={nearby.data ?? []}
//             keyExtractor={(item) => item.id}
//             renderItem={renderItem}
//             contentContainerStyle={styles.list}
//             ListEmptyComponent={
//               <EmptyState
//                 title="No nearby transport found"
//                 message="Try a wider walking range or search for a destination."
//                 icon={MapPinned}
//               />
//             }
//           />
//         )}
//       </View>
//     </ScreenWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, gap: spacing.md },
//   headerBlock: { padding: spacing.md, gap: spacing.md },
//   mapShell: {
//     height: 220,
//     borderRadius: radii.lg,
//     overflow: "hidden",
//     borderWidth: 1,
//     marginHorizontal: spacing.md,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: spacing.md,
//   },
//   list: { padding: spacing.md },
// });

import "@/styles/global.css";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 pt-14 pb-24 px-6 rounded-b-[40px]">
          <Text className="text-3xl font-bold text-white">My Profile</Text>

          <Text className="text-blue-100 mt-1">Manage your account</Text>
        </View>

        {/* Profile Card */}
        <View className="-mt-16 mx-5 rounded-3xl bg-white p-6 shadow-lg">
          <View className="items-center">
            <Image
              source={{
                uri: "https://i.pravatar.cc/300",
              }}
              className="h-28 w-28 rounded-full"
            />

            <View className="flex-row items-center mt-4">
              <Text className="text-2xl font-bold text-slate-900">
                Mohammed Hassen
              </Text>

              <View className="ml-2 rounded-full bg-green-500 px-2 py-1">
                <Text className="text-xs font-bold text-white">VERIFIED</Text>
              </View>
            </View>

            <Text className="mt-2 text-slate-500">Passenger Account</Text>
          </View>

          {/* Contact */}
          <View className="mt-8 space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-slate-500">Phone</Text>

              <Text className="font-semibold text-slate-800">
                +251 91 234 5678
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-slate-500">Email</Text>

              <Text className="font-semibold text-slate-800">
                user@email.com
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-slate-500">Member Since</Text>

              <Text className="font-semibold text-slate-800">Jan 2026</Text>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View className="mx-5 mt-6 flex-row justify-between">
          <View className="flex-1 rounded-2xl bg-white p-5 shadow mr-2">
            <Text className="text-3xl font-bold text-blue-600">4.9</Text>

            <Text className="mt-2 text-slate-500">Rating</Text>
          </View>

          <View className="flex-1 rounded-2xl bg-white p-5 shadow mx-1">
            <Text className="text-3xl font-bold text-green-600">154</Text>

            <Text className="mt-2 text-slate-500">Trips</Text>
          </View>

          <View className="flex-1 rounded-2xl bg-white p-5 shadow ml-2">
            <Text className="text-3xl font-bold text-orange-500">
              ETB 1,250
            </Text>

            <Text className="mt-2 text-slate-500">Wallet</Text>
          </View>
        </View>

        {/* Menu */}
        <View className="mx-5 mt-8 rounded-3xl bg-white shadow">
          {[
            "Personal Information",
            "Payment Methods",
            "Ride History",
            "Notifications",
            "Privacy & Security",
            "Help Center",
          ].map((item) => (
            <TouchableOpacity
              key={item}
              className="border-b border-slate-100 px-6 py-5"
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-medium text-slate-800">
                  {item}
                </Text>

                <Text className="text-xl text-slate-400">›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity className="mx-5 mt-8 mb-10 rounded-2xl bg-red-500 py-4">
          <Text className="text-center text-lg font-bold text-white">
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
