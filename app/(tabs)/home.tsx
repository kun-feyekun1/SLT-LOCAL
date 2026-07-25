

import "@/styles/global.css";

import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "@/components/AppText/AppText";
import {
  componentRadius,
  getComponentShadow,
  layout,
  semanticSpacing,
  spacing,
  typography,
} from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

type MenuItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  destructive?: boolean;
};

const menuItems: MenuItem[] = [
  {
    id: "personal-information",
    label: "Personal Information",
    icon: "person-outline",
  },
  {
    id: "payment-methods",
    label: "Payment Methods",
    icon: "card-outline",
  },
  {
    id: "ride-history",
    label: "Ride History",
    icon: "time-outline",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "notifications-outline",
  },
  {
    id: "privacy-security",
    label: "Privacy & Security",
    icon: "shield-checkmark-outline",
  },
  {
    id: "help-center",
    label: "Help Center",
    icon: "help-circle-outline",
  },
];

export default function ProfileScreen() {
  const { theme, mode } = useTheme();

  const isDark =
    mode === "dark";

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor:
            theme.colors.background.canvas,
        },
      ]}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ================================================================
            HEADER
        ================================================================= */}

        <View
          style={[
            styles.header,
            {
              backgroundColor:
                theme.colors.background.brand,
            },
          ]}
        >
          <View>
            <AppText
              style={[
                typography.h1,
                {
                  color:
                    theme.colors.text.onBrand,
                },
              ]}
            >
              My Profile
            </AppText>

            <AppText
              style={[
                typography.bodyMedium,
                styles.headerSubtitle,
                {
                  color:
                    theme.colors.text.onBrand,
                  opacity: 0.82,
                },
              ]}
            >
              Manage your account and preferences
            </AppText>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open profile settings"
            style={({ pressed }) => [
              styles.headerAction,
              {
                backgroundColor:
                  theme.colors.overlay.default,
              },
              pressed && styles.avatar,
            ]}
          >
            <Ionicons
              name="settings-outline"
              size={layout.iconLarge}
              color={theme.colors.icon.onBrand}
            />
          </Pressable>
        </View>

        {/* ================================================================
            PROFILE CARD
        ================================================================= */}

        <View
          style={[
            styles.profileCard,
            {
              backgroundColor:
                theme.card.background,

              borderColor:
                theme.card.border,
            },

            getComponentShadow(
              "cardElevated",
              isDark,
            ),
          ]}
        >
          <View style={styles.profileIdentity}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{
                  uri: "https://i.pravatar.cc/300",
                }}
                style={styles.avatar}
              />

              <View
                style={[
                  styles.onlineIndicator,
                  {
                    backgroundColor:
                      theme.colors.status.success
                        .backgroundStrong,

                    borderColor:
                      theme.card.background,
                  },
                ]}
              />
            </View>

            <View style={styles.nameRow}>
              <AppText
                numberOfLines={1}
                style={[
                  typography.h2,
                  styles.name,
                  {
                    color:
                      theme.text.primary,
                  },
                ]}
              >
                Mohammed Hassen
              </AppText>

              <View
                style={[
                  styles.verifiedBadge,
                  {
                    backgroundColor:
                      theme.badge.success.background,

                    borderColor:
                      theme.badge.success.border,
                  },
                ]}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color={
                    theme.colors.status.success.icon
                  }
                />

                <AppText
                  style={[
                    typography.badge,
                    {
                      color:
                        theme.badge.success.text,
                    },
                  ]}
                >
                  VERIFIED
                </AppText>
              </View>
            </View>

            <AppText
              style={[
                typography.bodyMedium,
                {
                  color:
                    theme.text.secondary,
                },
              ]}
            >
              Passenger Account
            </AppText>
          </View>

          <View
            style={[
              styles.divider,
              {
                backgroundColor:
                  theme.divider,
              },
            ]}
          />

          <View style={styles.contactSection}>
            <ProfileDetail
              label="Phone"
              value="+251 91 234 5678"
            />

            <ProfileDetail
              label="Email"
              value="user@email.com"
            />

            <ProfileDetail
              label="Member Since"
              value="Jan 2026"
            />
          </View>

          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.editProfileButton,
              {
                backgroundColor:
                  theme.colors.interactive.secondary
                    .default,

                borderColor:
                  theme.colors.interactive.secondary
                    .border,
              },
              pressed && {
                backgroundColor:
                  theme.colors.interactive.secondary
                    .pressed,
              },
            ]}
          >
            <Ionicons
              name="create-outline"
              size={layout.iconMedium}
              color={
                theme.colors.interactive.secondary
                  .foreground
              }
            />

            <AppText
              style={[
                typography.buttonMedium,
                {
                  color:
                    theme.colors.interactive.secondary
                      .foreground,
                },
              ]}
            >
              Edit Profile
            </AppText>
          </Pressable>
        </View>

        {/* ================================================================
            STATISTICS
        ================================================================= */}

        <View style={styles.section}>
          <AppText
            style={[
              typography.h4,
              {
                color:
                  theme.text.primary,
              },
            ]}
          >
            Account Overview
          </AppText>

          <View style={styles.statsRow}>
            <StatCard
              icon="star"
              value="4.9"
              label="Rating"
              color={theme.colors.status.warning.icon}
            />

            <StatCard
              icon="car-outline"
              value="154"
              label="Trips"
              color={theme.colors.status.success.icon}
            />

            <StatCard
              icon="wallet-outline"
              value="ETB 1,250"
              label="Wallet"
              color={theme.colors.icon.accent}
              compact
            />
          </View>
        </View>

        {/* ================================================================
            MENU
        ================================================================= */}

        <View style={styles.section}>
          <AppText
            style={[
              typography.h4,
              {
                color:
                  theme.text.primary,
              },
            ]}
          >
            Account
          </AppText>

          <View
            style={[
              styles.menuCard,
              {
                backgroundColor:
                  theme.card.background,

                borderColor:
                  theme.card.border,
              },

              getComponentShadow(
                "card",
                isDark,
              ),
            ]}
          >
            {menuItems.map(
              (item, index) => (
                <MenuRow
                  key={item.id}
                  item={item}
                  showDivider={
                    index !==
                    menuItems.length - 1
                  }
                />
              ),
            )}
          </View>
        </View>

        {/* ================================================================
            LOGOUT
        ================================================================= */}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Log out"
          style={({ pressed }) => [
            styles.chevronContainer,
            {
              backgroundColor:
                theme.colors.interactive.destructive
                  .default,
            },
            pressed && {
              backgroundColor:
                theme.colors.interactive.destructive
                  .pressed,
            },
          ]}
        >
          <Ionicons
            name="log-out-outline"
            size={layout.iconMedium}
            color={
              theme.colors.interactive.destructive
                .foreground
            }
          />

          <AppText
            style={[
              typography.buttonLarge,
              {
                color:
                  theme.colors.interactive.destructive
                    .foreground,
              },
            ]}
          >
            Log Out
          </AppText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );

  // ==========================================================================
  // PROFILE DETAIL
  // ==========================================================================

  function ProfileDetail({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) {
    return (
      <View style={styles.detailRow}>
        <AppText
          style={[
            typography.bodyMedium,
            {
              color:
                theme.text.secondary,
            },
          ]}
        >
          {label}
        </AppText>

        <AppText
          numberOfLines={1}
          style={[
            typography.labelLarge,
            styles.detailValue,
            {
              color:
                theme.text.primary,
            },
          ]}
        >
          {value}
        </AppText>
      </View>
    );
  }

  // ==========================================================================
  // STAT CARD
  // ==========================================================================

  function StatCard({
    icon,
    value,
    label,
    color,
    compact = false,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    value: string;
    label: string;
    color: string;
    compact?: boolean;
  }) {
    return (
      <View
        style={[
          styles.statCard,
          {
            backgroundColor:
              theme.card.background,

            borderColor:
              theme.card.border,
          },

          getComponentShadow(
            "card",
            isDark,
          ),
        ]}
      >
        <View
          style={[
            styles.statIcon,
            {
              backgroundColor:
                theme.colors.background.surfaceSubtle,
            },
          ]}
        >
          <Ionicons
            name={icon}
            size={layout.iconMedium}
            color={color}
          />
        </View>

        <AppText
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[
            compact
              ? typography.h4
              : typography.h2,

            {
              color:
                theme.text.primary,
            },
          ]}
        >
          {value}
        </AppText>

        <AppText
          style={[
            typography.bodySmall,
            {
              color:
                theme.text.secondary,
            },
          ]}
        >
          {label}
        </AppText>
      </View>
    );
  }

  // ==========================================================================
  // MENU ROW
  // ==========================================================================





function MenuRow({
  item,
  showDivider,
}: {
  item: MenuItem;
  showDivider: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.label}
      style={({ pressed }) => [
        styles.menuRow,
        pressed && {
          backgroundColor:
            theme.colors.interactive.tertiary.hover,
        },
        showDivider && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: theme.divider,
        },
      ]}
    >
      <View style={styles.menuLeft}>
        <View
          style={[
            styles.chevronContainer,
            {
              backgroundColor:
                theme.colors.background.brandSubtle,
            },
          ]}
        >
          <Ionicons
            name={item.icon}
            size={layout.iconMedium}
            color={theme.icon.active}
          />
        </View>

        <AppText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            typography.bodyLarge,
            styles.menuLabel,
            {
              color: theme.text.primary,
            },
          ]}
        >
          {item.label}
        </AppText>
      </View>

      <View style={styles.chevronContainer}>
        <Ionicons
          name="chevron-forward"
          size={layout.iconMedium}
          color={theme.icon.inactive}
        />
      </View>
    </Pressable>
  );
}

}






const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom:
      semanticSpacing.section.extraLarge,
  },

  header: {
    minHeight: 210,

    paddingHorizontal:
      semanticSpacing.screen.horizontalLarge,

    paddingTop:
      semanticSpacing.section.default,

    paddingBottom:
      spacing[32],

    flexDirection: "row",

    alignItems: "flex-start",

    justifyContent: "space-between",

    borderBottomLeftRadius:
      componentRadius.bottomSheet,

    borderBottomRightRadius:
      componentRadius.bottomSheet,
  },

  headerSubtitle: {
    marginTop:
      semanticSpacing.inline.small,
  },

  headerAction: {
    width:
      layout.touchTargetComfortable,

    height:
      layout.touchTargetComfortable,

    alignItems: "center",

    justifyContent: "center",

    borderRadius:
      componentRadius.iconButton,
  },

  profileCard: {
    marginHorizontal:
      semanticSpacing.screen.horizontal,

    marginTop: -64,

    padding:
      semanticSpacing.card.large,

    borderRadius:
      componentRadius.cardElevated,

    borderWidth:
      StyleSheet.hairlineWidth,
  },

  profileIdentity: {
    alignItems: "center",
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 112,

    height: 112,

    borderRadius:
      componentRadius.avatar,
  },

  onlineIndicator: {
    position: "absolute",

    right: 4,

    bottom: 6,

    width: 18,

    height: 18,

    borderRadius:
      componentRadius.activeTab,

    borderWidth: 3,
  },

  nameRow: {
    marginTop:
      semanticSpacing.stack.default,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    flexWrap: "wrap",

    gap:
      semanticSpacing.inline.small,
  },

  name: {
    flexShrink: 1,
  },

  verifiedBadge: {
    flexDirection: "row",

    alignItems: "center",

    gap:
      semanticSpacing.inline.tiny,

    paddingHorizontal:
      semanticSpacing.badge.horizontal,

    paddingVertical:
      semanticSpacing.badge.vertical,

    borderRadius:
      componentRadius.badge,

    borderWidth: 1,
  },

  divider: {
    height:
      StyleSheet.hairlineWidth,

    marginVertical:
      semanticSpacing.section.default,
  },

  contactSection: {
    gap:
      semanticSpacing.stack.medium,
  },

  detailRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    gap:
      semanticSpacing.inline.large,
  },

  detailValue: {
    flexShrink: 1,

    textAlign: "right",
  },

  editProfileButton: {
    marginTop:
      semanticSpacing.section.default,

    minHeight:
      layout.touchTargetComfortable,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap:
      semanticSpacing.button.iconGap,

    paddingHorizontal:
      semanticSpacing.button.horizontalMedium,

    paddingVertical:
      semanticSpacing.button.verticalMedium,

    borderRadius:
      componentRadius.button,

    borderWidth: 1,
  },

  section: {
    marginTop:
      semanticSpacing.section.default,

    marginHorizontal:
      semanticSpacing.screen.horizontal,

    gap:
      semanticSpacing.stack.medium,
  },

  statsRow: {
    flexDirection: "row",

    gap:
      semanticSpacing.inline.medium,
  },

  statCard: {
    flex: 1,

    minHeight: 130,

    padding:
      semanticSpacing.card.default,

    borderRadius:
      componentRadius.card,

    borderWidth:
      StyleSheet.hairlineWidth,

    gap:
      semanticSpacing.inline.small,
  },

  statIcon: {
    width: 36,

    height: 36,

    borderRadius:
      componentRadius.iconButton,

    alignItems: "center",

    justifyContent: "center",

    marginBottom:
      semanticSpacing.inline.small,
  },

  menuCard: {
    overflow: "hidden",

    borderRadius:
      componentRadius.cardElevated,

    borderWidth:
      StyleSheet.hairlineWidth,
  },

  



menuRow: {
  minHeight: 64,
  paddingHorizontal: semanticSpacing.card.default,
  paddingVertical: semanticSpacing.list.itemVertical,

  flexDirection: "row",
  alignItems: "center",
},

menuLeft: {
  flex: 1,
  minWidth: 0,

  flexDirection: "row",
  alignItems: "center",

  gap: semanticSpacing.inline.large,
},

menuLabel: {
  flex: 1,
  flexShrink: 1,
},

chevronContainer: {
  flexShrink: 0,

  marginLeft: semanticSpacing.inline.medium,

  alignItems: "center",
  justifyContent: "center",
},

});





// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { Award, Car, MapPin, Shield } from "lucide-react-native";
// import {
//   Dimensions,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Animated, { FadeInDown } from "react-native-reanimated";

// const { width } = Dimensions.get("window");

// export default function WelcomeScreen() {
//   const router = useRouter();

//   return (
//     <ScrollView className="flex-1 bg-black">
//       {/* Hero Section */}
//       <View className="relative h-[100vh] justify-center items-center">
//         <LinearGradient
//           colors={["#000000", "#1a1a2e", "#16213e"]}
//           className="absolute inset-0"
//         />

//         {/* Background Image / Illustration */}
//         <LinearGradient
//           colors={["#0f172a", "#1e2937", "#334155"]}
//           className="absolute inset-0"
//         />

//         <View className="items-center z-10 px-6">
//           <Animated.Text
//             entering={FadeInDown.delay(200)}
//             className="text-6xl font-bold text-white text-center mb-4"
//           >
//             Derash
//           </Animated.Text>

//           <Text className="text-3xl text-primary font-semibold text-center mb-6">
//             Move Smarter • Travel Safer
//           </Text>

//           <Text className="text-lg text-gray-300 text-center max-w-[280px] mb-12">
//             Ethiopia's most advanced transport network — rides, routes, delivery
//             & more.
//           </Text>

//           <TouchableOpacity
//             onPress={() => router.push("/(auth)/login")}
//             className="bg-primary w-full py-4 rounded-2xl mb-4 active:opacity-90"
//           >
//             <Text className="text-black font-semibold text-center text-lg">
//               Get Started
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => router.push("/(auth)/signup")}
//             className="border border-white/50 w-full py-4 rounded-2xl"
//           >
//             <Text className="text-white font-medium text-center text-lg">
//               Create Account
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Features Section */}
//       <View className="px-6 pb-12">
//         <Text className="text-3xl font-bold text-white mb-8 text-center">
//           Why Choose Derash?
//         </Text>

//         <View className="space-y-8">
//           {features.map((feature, index) => (
//             <Animated.View
//               key={index}
//               entering={FadeInDown.delay(index * 100)}
//               className="bg-zinc-900/70 p-6 rounded-3xl"
//             >
//               <View className="flex-row items-center gap-4">
//                 <View className="bg-primary/10 p-4 rounded-2xl">
//                   {feature.icon}
//                 </View>
//                 <View>
//                   <Text className="text-xl font-semibold text-white">
//                     {feature.title}
//                   </Text>
//                   <Text className="text-gray-400 mt-1">{feature.desc}</Text>
//                 </View>
//               </View>
//             </Animated.View>
//           ))}
//         </View>
//       </View>

//       {/* Stats */}
//       <View className="bg-zinc-950 py-12 px-6">
//         <View className="flex-row justify-around">
//           {stats.map((stat, i) => (
//             <View key={i} className="items-center">
//               <Text className="text-4xl font-bold text-primary">
//                 {stat.value}
//               </Text>
//               <Text className="text-gray-400 mt-1">{stat.label}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* Final CTA */}
//       <View className="px-6 py-16 bg-gradient-to-b from-transparent to-black">
//         <Text className="text-4xl font-bold text-white text-center mb-6">
//           Ready to ride with confidence?
//         </Text>
//         <TouchableOpacity
//           onPress={() => router.push("/(auth)/login")}
//           className="bg-white py-5 rounded-3xl"
//         >
//           <Text className="text-black text-center font-bold text-xl">
//             Join Derash Now
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const features = [
//   {
//     icon: <Car color="#00ff9f" size={32} />,
//     title: "Instant Rides",
//     desc: "Book a ride in seconds with real-time tracking",
//   },
//   {
//     icon: <MapPin color="#00ff9f" size={32} />,
//     title: "Smart Routes",
//     desc: "Best routes, traffic updates & estimated time",
//   },
//   {
//     icon: <Shield color="#00ff9f" size={32} />,
//     title: "Safe & Secure",
//     desc: "Verified drivers and emergency SOS feature",
//   },
//   {
//     icon: <Award color="#00ff9f" size={32} />,
//     title: "Best Prices",
//     desc: "Transparent pricing with no hidden charges",
//   },
// ];

// const stats = [
//   { value: "50K+", label: "Happy Riders" },
//   { value: "1,200", label: "Active Drivers" },
//   { value: "98%", label: "Satisfaction Rate" },
// ];





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
// import { useTheme } from "@/features/theme/hooks/useTheme";
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








// import "@/styles/global.css";
// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function App() {
//   return (
//     <SafeAreaView className="flex-1 bg-slate-100">
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header */}
//         <View className="bg-blue-600 pt-14 pb-24 px-6 rounded-b-[40px]">
//           <Text className="text-3xl font-bold text-white">My Profile</Text>

//           <Text className="text-blue-100 mt-1">Manage your account</Text>
//         </View>

//         {/* Profile Card */}
//         <View className="-mt-16 mx-5 rounded-3xl bg-white p-6 shadow-lg">
//           <View className="items-center">
//             <Image
//               source={{
//                 uri: "https://i.pravatar.cc/300",
//               }}
//               className="h-28 w-28 rounded-full"
//             />

//             <View className="flex-row items-center mt-4">
//               <Text className="text-2xl font-bold text-slate-900">
//                 Mohammed Hassen
//               </Text>

//               <View className="ml-2 rounded-full bg-green-500 px-2 py-1">
//                 <Text className="text-xs font-bold text-white">VERIFIED</Text>
//               </View>
//             </View>

//             <Text className="mt-2 text-slate-500">Passenger Account</Text>
//           </View>

//           {/* Contact */}
//           <View className="mt-8 space-y-3">
//             <View className="flex-row justify-between">
//               <Text className="text-slate-500">Phone</Text>

//               <Text className="font-semibold text-slate-800">
//                 +251 91 234 5678
//               </Text>
//             </View>

//             <View className="flex-row justify-between">
//               <Text className="text-slate-500">Email</Text>

//               <Text className="font-semibold text-slate-800">
//                 user@email.com
//               </Text>
//             </View>

//             <View className="flex-row justify-between">
//               <Text className="text-slate-500">Member Since</Text>

//               <Text className="font-semibold text-slate-800">Jan 2026</Text>
//             </View>
//           </View>
//         </View>

//         {/* Statistics */}
//         <View className="mx-5 mt-6 flex-row justify-between">
//           <View className="flex-1 rounded-2xl bg-white p-5 shadow mr-2">
//             <Text className="text-3xl font-bold text-blue-600">4.9</Text>

//             <Text className="mt-2 text-slate-500">Rating</Text>
//           </View>

//           <View className="flex-1 rounded-2xl bg-white p-5 shadow mx-1">
//             <Text className="text-3xl font-bold text-green-600">154</Text>

//             <Text className="mt-2 text-slate-500">Trips</Text>
//           </View>

//           <View className="flex-1 rounded-2xl bg-white p-5 shadow ml-2">
//             <Text className="text-3xl font-bold text-orange-500">
//               ETB 1,250
//             </Text>

//             <Text className="mt-2 text-slate-500">Wallet</Text>
//           </View>
//         </View>

//         {/* Menu */}
//         <View className="mx-5 mt-8 rounded-3xl bg-white shadow">
//           {[
//             "Personal Information",
//             "Payment Methods",
//             "Ride History",
//             "Notifications",
//             "Privacy & Security",
//             "Help Center",
//           ].map((item) => (
//             <TouchableOpacity
//               key={item}
//               className="border-b border-slate-100 px-6 py-5"
//             >
//               <View className="flex-row items-center justify-between">
//                 <Text className="text-base font-medium text-slate-800">
//                   {item}
//                 </Text>

//                 <Text className="text-xl text-slate-400">›</Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Logout */}
//         <TouchableOpacity className="mx-5 mt-8 mb-10 rounded-2xl bg-red-500 py-4">
//           <Text className="text-center text-lg font-bold text-white">
//             Log Out
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
