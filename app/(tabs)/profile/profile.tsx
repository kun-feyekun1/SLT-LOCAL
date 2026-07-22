// // import "@/styles/global.css";import {
// //   SafeAreaView,
// //   View,
// //  Text,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// // } from "react-native";

// // export default function App() {
// //   return (
// //     <SafeAreaView className="flex-1 bg-slate-100">
// //       <ScrollView showsVerticalScrollIndicator={false}>
// //         {/* Header */}
// //         <View className="bg-blue-600 pt-14 pb-24 px-6 rounded-b-[40px]">
// //           <Text className="text-3xl font-bold text-white">
// //             My Profile
// //           </Text>

// //           <Text className="text-blue-100 mt-1">
// //             Manage your account
// //           </Text>
// //         </View>

// //         {/* Profile Card */}
// //         <View className="-mt-16 mx-5 rounded-3xl bg-white p-6 shadow-lg">
// //           <View className="items-center">
// //             <Image
// //               source={{
// //                 uri: "https://i.pravatar.cc/300",
// //               }}
// //               className="h-28 w-28 rounded-full"
// //             />

// //             <View className="flex-row items-center mt-4">
// //               <Text className="text-2xl font-bold text-slate-900">
// //                 Mohammed Hassen
// //               </Text>

// //               <View className="ml-2 rounded-full bg-green-500 px-2 py-1">
// //                 <Text className="text-xs font-bold text-white">
// //                   VERIFIED
// //                 </Text>
// //               </View>
// //             </View>

// //             <Text className="mt-2 text-slate-500">
// //               Passenger Account
// //             </Text>
// //           </View>

// //           {/* Contact */}
// //           <View className="mt-8 space-y-3">
// //             <View className="flex-row justify-between">
// //               <Text className="text-slate-500">
// //                 Phone
// //               </Text>

// //               <Text className="font-semibold text-slate-800">
// //                 +251 91 234 5678
// //               </Text>
// //             </View>

// //             <View className="flex-row justify-between">
// //               <Text className="text-slate-500">
// //                 Email
// //               </Text>

// //               <Text className="font-semibold text-slate-800">
// //                 user@email.com
// //               </Text>
// //             </View>

// //             <View className="flex-row justify-between">
// //               <Text className="text-slate-500">
// //                 Member Since
// //               </Text>

// //               <Text className="font-semibold text-slate-800">
// //                 Jan 2026
// //               </Text>
// //             </View>
// //           </View>
// //         </View>

// //         {/* Statistics */}
// //         <View className="mx-5 mt-6 flex-row justify-between">
// //           <View className="flex-1 rounded-2xl bg-white p-5 shadow mr-2">
// //             <Text className="text-3xl font-bold text-blue-600">
// //               4.9
// //             </Text>

// //             <Text className="mt-2 text-slate-500">
// //               Rating
// //             </Text>
// //           </View>

// //           <View className="flex-1 rounded-2xl bg-white p-5 shadow mx-1">
// //             <Text className="text-3xl font-bold text-green-600">
// //               154
// //             </Text>

// //             <Text className="mt-2 text-slate-500">
// //               Trips
// //             </Text>
// //           </View>

// //           <View className="flex-1 rounded-2xl bg-white p-5 shadow ml-2">
// //             <Text className="text-3xl font-bold text-orange-500">
// //               ETB 1,250
// //             </Text>

// //             <Text className="mt-2 text-slate-500">
// //               Wallet
// //             </Text>
// //           </View>
// //         </View>

// //         {/* Menu */}
// //         <View className="mx-5 mt-8 rounded-3xl bg-white shadow">

// //           {[
// //             "Personal Information",
// //             "Payment Methods",
// //             "Ride History",
// //             "Notifications",
// //             "Privacy & Security",
// //             "Help Center",
// //           ].map((item) => (
// //             <TouchableOpacity
// //               key={item}
// //               className="border-b border-slate-100 px-6 py-5"
// //             >
// //               <View className="flex-row items-center justify-between">
// //                 <Text className="text-base font-medium text-slate-800">
// //                   {item}
// //                 </Text>

// //                 <Text className="text-xl text-slate-400">
// //                   ›
// //                 </Text>
// //               </View>
// //             </TouchableOpacity>
// //           ))}

// //         </View>

// //         {/* Logout */}
// //         <TouchableOpacity className="mx-5 mt-8 mb-10 rounded-2xl bg-red-500 py-4">
// //           <Text className="text-center text-lg font-bold text-white">
// //             Log Out
// //           </Text>
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // import {
// //   Image,
// //   ImageStyle,
// //   SafeAreaView,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TextStyle,
// //   TouchableOpacity,
// //   View,
// //   ViewStyle,
// // } from "react-native";

// // // Import your design system tokens completely
// // // Import your custom design system tokens completely
// // import {
// //   colors,
// //   componentRadius,
// //   getShadow,
// //   layout,
// //   radius,
// //   spacing,
// //   spacingGuidelines,
// //   typography,
// // } from "../../src/design-system";

// // export default function App() {
// //   const isDarkMode = false;

// //   return (
// //     <SafeAreaView style={styles.screenWrapper}>
// //       <ScrollView showsVerticalScrollIndicator={false}>
// //         {/* Header - Brand Green Banner */}
// //         <View style={styles.headerBanner}>
// //           <Text style={typography.h1 as TextStyle}>My Profile</Text>

// //           <Text
// //             style={[typography.bodyMedium as TextStyle, styles.headerSubtitle]}
// //           >
// //             Manage your account
// //           </Text>
// //         </View>

// //         {/* Profile Card */}
// //         <View
// //           style={[styles.profileCard, getShadow("2", isDarkMode) as ViewStyle]}
// //         >
// //           <View style={styles.centeredColumn}>
// //             <Image
// //               source={{ uri: "https://i.pravatar.cc/300" }}
// //               style={styles.avatar}
// //             />

// //             <View style={styles.profileNameRow}>
// //               <Text style={typography.h2 as TextStyle}>Mohammed Hassen</Text>

// //               {/* Verified Badge */}
// //               <View style={styles.verifiedBadge}>
// //                 <Text
// //                   style={[
// //                     typography.labelSmall as TextStyle,
// //                     styles.verifiedText,
// //                   ]}
// //                 >
// //                   VERIFIED
// //                 </Text>
// //               </View>
// //             </View>

// //             <Text
// //               style={[
// //                 typography.bodyMedium as TextStyle,
// //                 styles.passengerLabel,
// //               ]}
// //             >
// //               Passenger Account
// //             </Text>
// //           </View>

// //           {/* Contact Details List */}
// //           <View style={styles.contactSection}>
// //             <View style={styles.infoRow}>
// //               <Text
// //                 style={[typography.bodyMedium as TextStyle, styles.infoLabel]}
// //               >
// //                 Phone
// //               </Text>
// //               <Text
// //                 style={[typography.bodyMedium as TextStyle, styles.infoValue]}
// //               >
// //                 +251 91 234 5678
// //               </Text>
// //             </View>

// //             <View style={styles.infoRow}>
// //               <Text
// //                 style={[typography.bodyMedium as TextStyle, styles.infoLabel]}
// //               >
// //                 Email
// //               </Text>
// //               <Text
// //                 style={[typography.bodyMedium as TextStyle, styles.infoValue]}
// //               >
// //                 user@email.com
// //               </Text>
// //             </View>

// //             <View style={[styles.infoRow, { marginBottom: 0 }]}>
// //               <Text
// //                 style={[typography.bodyMedium as TextStyle, styles.infoLabel]}
// //               >
// //                 Member Since
// //               </Text>
// //               <Text
// //                 style={[typography.bodyMedium as TextStyle, styles.infoValue]}
// //               >
// //                 Jan 2026
// //               </Text>
// //             </View>
// //           </View>
// //         </View>

// //         {/* Statistics Metric Row */}
// //         <View style={styles.statsRow}>
// //           {/* Rating */}
// //           <View
// //             style={[styles.statBox, getShadow("1", isDarkMode) as ViewStyle]}
// //           >
// //             <Text
// //               style={[
// //                 typography.priceLarge as TextStyle,
// //                 { color: colors.semantic.info },
// //               ]}
// //             >
// //               4.9
// //             </Text>
// //             <Text style={[typography.bodySmall as TextStyle, styles.statLabel]}>
// //               Rating
// //             </Text>
// //           </View>

// //           {/* Trips */}
// //           <View
// //             style={[styles.statBox, getShadow("1", isDarkMode) as ViewStyle]}
// //           >
// //             <Text
// //               style={[
// //                 typography.priceLarge as TextStyle,
// //                 { color: colors.brand.green },
// //               ]}
// //             >
// //               154
// //             </Text>
// //             <Text style={[typography.bodySmall as TextStyle, styles.statLabel]}>
// //               Trips
// //             </Text>
// //           </View>

// //           {/* Wallet Balance */}
// //           <View
// //             style={[styles.statBox, getShadow("1", isDarkMode) as ViewStyle]}
// //           >
// //             <Text
// //               style={[typography.priceMedium as TextStyle, styles.walletText]}
// //             >
// //               ETB 1,250
// //             </Text>
// //             <Text style={[typography.bodySmall as TextStyle, styles.statLabel]}>
// //               Wallet
// //             </Text>
// //           </View>
// //         </View>

// //         {/* Navigation Actions Menu */}
// //         <View
// //           style={[
// //             styles.menuContainer,
// //             getShadow("2", isDarkMode) as ViewStyle,
// //           ]}
// //         >
// //           {[
// //             "Personal Information",
// //             "Payment Methods",
// //             "Ride History",
// //             "Notifications",
// //             "Privacy & Security",
// //             "Help Center",
// //           ].map((item, index, arr) => (
// //             <TouchableOpacity
// //               key={item}
// //               style={[
// //                 styles.menuItem,
// //                 index === arr.length - 1 && { borderBottomWidth: 0 },
// //               ]}
// //             >
// //               <View style={styles.menuItemContent}>
// //                 <Text
// //                   style={[
// //                     typography.bodyLarge as TextStyle,
// //                     styles.menuItemText,
// //                   ]}
// //                 >
// //                   {item}
// //                 </Text>
// //                 <Text style={[typography.h3 as TextStyle, styles.menuChevron]}>
// //                   ›
// //                 </Text>
// //               </View>
// //             </TouchableOpacity>
// //           ))}
// //         </View>

// //         {/* Logout Button CTA */}
// //         <TouchableOpacity
// //           style={[styles.logoutButton, getShadow("2", isDarkMode) as ViewStyle]}
// //         >
// //           <Text
// //             style={[typography.buttonLarge as TextStyle, styles.logoutText]}
// //           >
// //             Log Out
// //           </Text>
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // // Strictly typing each style object clears the complex 'cursor' property differences
// // const styles = StyleSheet.create({
// //   screenWrapper: {
// //     flex: 1,
// //     backgroundColor: colors.backgroundLight.primary,
// //   } as ViewStyle,
// //   headerBanner: {
// //     backgroundColor: colors.brand.green,
// //     paddingTop: spacing[56],
// //     paddingBottom: spacing[64],
// //     paddingHorizontal: layout.screenPadding,
// //     borderBottomLeftRadius: radius.xl,
// //     borderBottomRightRadius: radius.xl,
// //   } as ViewStyle,
// //   headerSubtitle: {
// //     color: colors.brand.greenLight,
// //     marginTop: spacing[4],
// //   } as TextStyle,
// //   profileCard: {
// //     backgroundColor: colors.surface.card,
// //     borderRadius: componentRadius.card,
// //     marginTop: -spacing[64],
// //     marginHorizontal: layout.screenPadding,
// //     ...spacingGuidelines.cardPadding,
// //   } as ViewStyle,
// //   centeredColumn: {
// //     alignItems: "center",
// //   } as ViewStyle,
// //   avatar: {
// //     width: 112,
// //     height: 112,
// //     borderRadius: radius.full,
// //   } as ImageStyle,
// //   profileNameRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginTop: spacing[16],
// //   } as ViewStyle,
// //   verifiedBadge: {
// //     backgroundColor: colors.semantic.success,
// //     borderRadius: radius.full,
// //     paddingHorizontal: spacing[8],
// //     paddingVertical: spacing[4],
// //     marginLeft: spacing[8],
// //   } as ViewStyle,
// //   verifiedText: {
// //     color: colors.white,
// //     fontWeight: "700",
// //   } as TextStyle,
// //   passengerLabel: {
// //     color: colors.neutral[500],
// //     marginTop: spacing[8],
// //   } as TextStyle,
// //   contactSection: {
// //     marginTop: spacing[32],
// //   } as ViewStyle,
// //   infoRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginBottom: spacing[12],
// //   } as ViewStyle,
// //   infoLabel: {
// //     color: colors.neutral[500],
// //   } as TextStyle,
// //   infoValue: {
// //     fontWeight: "600",
// //     color: colors.neutral[800],
// //   } as TextStyle,
// //   statsRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginHorizontal: layout.screenPadding,
// //     marginTop: spacing[24],
// //   } as ViewStyle,
// //   statBox: {
// //     flex: 1,
// //     backgroundColor: colors.surface.card,
// //     borderRadius: radius.sm,
// //     padding: spacing[16],
// //     marginHorizontal: spacing[4],
// //   } as ViewStyle,
// //   statLabel: {
// //     color: colors.neutral[500],
// //     marginTop: spacing[8],
// //   } as TextStyle,
// //   walletText: {
// //     fontSize: 18,
// //     lineHeight: 40,
// //     color: colors.brand.gold,
// //   } as TextStyle,
// //   menuContainer: {
// //     backgroundColor: colors.surface.card,
// //     borderRadius: radius.md,
// //     marginHorizontal: layout.screenPadding,
// //     marginTop: spacing[32],
// //     overflow: "hidden",
// //   } as ViewStyle,
// //   menuItem: {
// //     borderBottomWidth: 1,
// //     borderBottomColor: colors.backgroundLight.secondary,
// //     ...spacingGuidelines.listItem,
// //   } as ViewStyle,
// //   menuItemContent: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //   } as ViewStyle,
// //   menuItemText: {
// //     fontWeight: "500",
// //     color: colors.neutral[800],
// //   } as TextStyle,
// //   menuChevron: {
// //     color: colors.neutral[400],
// //   } as TextStyle,
// //   logoutButton: {
// //     backgroundColor: colors.semantic.error,
// //     borderRadius: componentRadius.button,
// //     marginHorizontal: layout.screenPadding,
// //     marginTop: spacing[32],
// //     marginBottom: spacing[40],
// //     ...spacingGuidelines.buttonPadding,
// //   } as ViewStyle,
// //   logoutText: {
// //     color: colors.white,
// //     textAlign: "center",
// //   } as TextStyle,
// // });



// import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
// import { colors, radius, spacing, typography, componentRadius, componentElevation, elevation, layout } from "@/design-system/tokens";

// export default function App() {
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundLight.secondary }}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header */}
//         <View style={{
//           backgroundColor: colors.brand.green,
//           paddingTop: spacing[56],
//           paddingBottom: spacing[64],
//           paddingHorizontal: spacing[24],
//           borderBottomLeftRadius: radius.xl,
//           borderBottomRightRadius: radius.xl,
//         }}>
//           <Text style={{
//             ...typography.h1,
//             color: colors.white,
//           }}>
//             My Profile
//           </Text>

//           <Text style={{
//             ...typography.bodyMedium,
//             color: colors.neutral[200],
//             marginTop: spacing[4],
//           }}>
//             Manage your account
//           </Text>
//         </View>

//         {/* Profile Card */}
//         <View style={{
//           marginTop: -spacing[64],
//           marginHorizontal: spacing[20],
//           borderRadius: componentRadius.card,
//           backgroundColor: colors.surface.surfaceElevated,
//           padding: spacing[24],
//           ...componentElevation.card,
//         }}>
//           <View style={{ alignItems: "center" }}>
//             <Image
//               source={{
//                 uri: "https://i.pravatar.cc/300",
//               }}
//               style={{
//                 height: 112,
//                 width: 112,
//                 borderRadius: radius.full,
//               }}
//             />

//             <View style={{
//               flexDirection: "row",
//               alignItems: "center",
//               marginTop: spacing[16],
//             }}>
//               <Text style={{
//                 ...typography.h2,
//                 color: colors.neutral[900],
//               }}>
//                 Mohammed Hassen
//               </Text>

//               <View style={{
//                 marginLeft: spacing[8],
//                 borderRadius: componentRadius.badge,
//                 backgroundColor: colors.semantic.success,
//                 paddingHorizontal: spacing[8],
//                 paddingVertical: spacing[4],
//               }}>
//                 <Text style={{
//                   ...typography.labelSmall,
//                   color: colors.white,
//                   fontWeight: "700",
//                 }}>
//                   VERIFIED
//                 </Text>
//               </View>
//             </View>

//             <Text style={{
//               ...typography.bodyMedium,
//               color: colors.neutral[500],
//               marginTop: spacing[8],
//             }}>
//               Passenger Account
//             </Text>
//           </View>

//           {/* Contact */}
//           <View style={{
//             marginTop: spacing[32],
//             gap: spacing[12],
//           }}>
//             <View style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}>
//               <Text style={{
//                 ...typography.bodyMedium,
//                 color: colors.neutral[500],
//               }}>
//                 Phone
//               </Text>

//               <Text style={{
//                 ...typography.bodyMedium,
//                 fontWeight: "600",
//                 color: colors.neutral[800],
//               }}>
//                 +251 91 234 5678
//               </Text>
//             </View>

//             <View style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}>
//               <Text style={{
//                 ...typography.bodyMedium,
//                 color: colors.neutral[500],
//               }}>
//                 Email
//               </Text>

//               <Text style={{
//                 ...typography.bodyMedium,
//                 fontWeight: "600",
//                 color: colors.neutral[800],
//               }}>
//                 user@email.com
//               </Text>
//             </View>

//             <View style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}>
//               <Text style={{
//                 ...typography.bodyMedium,
//                 color: colors.neutral[500],
//               }}>
//                 Member Since
//               </Text>

//               <Text style={{
//                 ...typography.bodyMedium,
//                 fontWeight: "600",
//                 color: colors.neutral[800],
//               }}>
//                 Jan 2026
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Statistics */}
//         <View style={{
//           marginHorizontal: spacing[20],
//           marginTop: spacing[24],
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}>
//           <View style={{
//             flex: 1,
//             borderRadius: componentRadius.card,
//             backgroundColor: colors.surface.surfaceElevated,
//             padding: spacing[20],
//             marginRight: spacing[8],
//             ...componentElevation.card,
//           }}>
//             <Text style={{
//               ...typography.displayMedium,
//               color: colors.brand.green,
//             }}>
//               4.9
//             </Text>

//             <Text style={{
//               ...typography.bodyMedium,
//               color: colors.neutral[500],
//               marginTop: spacing[8],
//             }}>
//               Rating
//             </Text>
//           </View>

//           <View style={{
//             flex: 1,
//             borderRadius: componentRadius.card,
//             backgroundColor: colors.surface.surfaceElevated,
//             padding: spacing[20],
//             marginHorizontal: spacing[4],
//             ...componentElevation.card,
//           }}>
//             <Text style={{
//               ...typography.displayMedium,
//               color: colors.semantic.success,
//             }}>
//               154
//             </Text>

//             <Text style={{
//               ...typography.bodyMedium,
//               color: colors.neutral[500],
//               marginTop: spacing[8],
//             }}>
//               Trips
//             </Text>
//           </View>

//           <View style={{
//             flex: 1,
//             borderRadius: componentRadius.card,
//             backgroundColor: colors.surface.surfaceElevated,
//             padding: spacing[20],
//             marginLeft: spacing[8],
//             ...componentElevation.card,
//           }}>
//             <Text style={{
//               ...typography.displayMedium,
//               color: colors.brand.gold,
//             }}>
//               ETB 1,250
//             </Text>

//             <Text style={{
//               ...typography.bodyMedium,
//               color: colors.neutral[500],
//               marginTop: spacing[8],
//             }}>
//               Wallet
//             </Text>
//           </View>
//         </View>

//         {/* Menu */}
//         <View style={{
//           marginHorizontal: spacing[20],
//           marginTop: spacing[32],
//           borderRadius: componentRadius.card,
//           backgroundColor: colors.surface.surfaceElevated,
//           ...componentElevation.card,
//         }}>
//           {[
//             "Personal Information",
//             "Payment Methods",
//             "Ride History",
//             "Notifications",
//             "Privacy & Security",
//             "Help Center",
//           ].map((item, index) => (
//             <TouchableOpacity
//               key={item}
//               style={{
//                 borderBottomWidth: index < 5 ? 1 : 0,
//                 borderBottomColor: colors.neutral[100],
//                 paddingHorizontal: spacing[24],
//                 paddingVertical: spacing[20],
//               }}
//             >
//               <View style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}>
//                 <Text style={{
//                   ...typography.bodyLarge,
//                   color: colors.neutral[800],
//                 }}>
//                   {item}
//                 </Text>

//                 <Text style={{
//                   ...typography.bodyLarge,
//                   color: colors.neutral[400],
//                 }}>
//                   ›
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Logout */}
//         <TouchableOpacity style={{
//           marginHorizontal: spacing[20],
//           marginTop: spacing[32],
//           marginBottom: spacing[40],
//           borderRadius: componentRadius.button,
//           backgroundColor: colors.semantic.error,
//           paddingVertical: spacing[16],
//           ...componentElevation.buttonDefault,
//         }}>
//           <Text style={{
//             ...typography.buttonLarge,
//             color: colors.white,
//             textAlign: "center",
//           }}>
//             Log Out
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }



// src/app/(tabs)/profile-details/profile.tsx

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  View,
} from "react-native";

import { AppText } from "@/components/AppText/AppText";
import {
  Card,
  Divider,
} from "@/design-system/components";
import {
  radius,
  spacing,
} from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { ProfileScreenHeader } from "@/features/profile/components/ProfileScreenHeader";
import { ProfileSubNavigation } from "@/features/profile/components/ProfileSubNavigation";

export default function ProfileScreen() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          theme.background.primary,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingHorizontal: spacing[16],
          paddingTop: spacing[16],
          paddingBottom: spacing[64],
          gap: spacing[20],
        }}
      >
        <ProfileScreenHeader
          title="My account"
          description="Personal details and travel information."
          icon="person-outline"
        />

        <ProfileSubNavigation />

        <ProfileIdentityCard />

        <ProfileStatistics />

        <Card variant="elevated">
          <View style={{ gap: spacing[4] }}>
            <AppText variant="h3">
              Personal information
            </AppText>

            <AppText
              variant="bodySmall"
              color="secondary"
            >
              Information associated with
              your SmartLink account.
            </AppText>
          </View>

          <Divider spacingVertical={16} />

          <ProfileInformationRow
            icon="person-outline"
            label="Full name"
            value="Abebe Kebede"
          />

          <Divider spacingVertical={2} />

          <ProfileInformationRow
            icon="mail-outline"
            label="Email"
            value="abebe@example.com"
          />

          <Divider spacingVertical={2} />

          <ProfileInformationRow
            icon="call-outline"
            label="Phone number"
            value="+251 91 234 5678"
          />

          <Divider spacingVertical={2} />

          <ProfileInformationRow
            icon="location-outline"
            label="Home city"
            value="Addis Ababa"
          />
        </Card>

        <Card variant="elevated">
          <View style={{ gap: spacing[4] }}>
            <AppText variant="h3">
              Travel preferences
            </AppText>

            <AppText
              variant="bodySmall"
              color="secondary"
            >
              Used to personalize route
              recommendations.
            </AppText>
          </View>

          <Divider spacingVertical={16} />

          <ProfileInformationRow
            icon="bus-outline"
            label="Preferred transport"
            value="Public bus"
          />

          <Divider spacingVertical={2} />

          <ProfileInformationRow
            icon="card-outline"
            label="Default payment"
            value="Telebirr"
          />

          <Divider spacingVertical={2} />

          <ProfileInformationRow
            icon="language-outline"
            label="Language"
            value="English"
          />
        </Card>

        <Pressable
          accessibilityRole="button"
          onPress={() =>
            router.navigate(
              "/profile/profile-settings",
            )
          }
          style={({ pressed }) => ({
            minHeight: 52,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: spacing[8],
            paddingHorizontal: spacing[16],
            borderRadius: radius.md,
            backgroundColor: pressed
              ? theme.button.primary.pressed
              : theme.button.primary
                  .background,
          })}
        >
          <Ionicons
            name="settings-outline"
            size={20}
            color={
              theme.button.primary.text
            }
          />

          <AppText
            variant="buttonLarge"
            style={{
              color:
                theme.button.primary.text,
            }}
          >
            Open profile settings
          </AppText>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function ProfileIdentityCard() {
  const { theme } = useTheme();

  return (
    <Card variant="elevated">
      <View
        style={{
          alignItems: "center",
          gap: spacing[12],
          paddingVertical: spacing[8],
        }}
      >
        <View>
          <View
            style={{
              width: 92,
              height: 92,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: radius.full,
              backgroundColor:
                theme.primaryLight,
              borderWidth: 3,
              borderColor: theme.primary,
            }}
          >
            <AppText
              variant="h1"
              style={{
                color: theme.primary,
              }}
            >
              AK
            </AppText>
          </View>

          <View
            style={{
              position: "absolute",
              right: 2,
              bottom: 2,
              width: 22,
              height: 22,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: radius.full,
              borderWidth: 3,
              borderColor:
                theme.card.background,
              backgroundColor:
                theme.success,
            }}
          >
            <Ionicons
              name="checkmark"
              size={12}
              color={theme.white}
            />
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            gap: spacing[4],
          }}
        >
          <AppText variant="h2">
            Abebe Kebede
          </AppText>

          <AppText
            variant="bodyMedium"
            color="secondary"
          >
            SmartLink passenger
          </AppText>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing[6],
            paddingHorizontal: spacing[12],
            paddingVertical: spacing[6],
            borderRadius: radius.full,
            backgroundColor:
              theme.successLight,
          }}
        >
          <Ionicons
            name="shield-checkmark"
            size={16}
            color={theme.success}
          />

          <AppText
            variant="labelMedium"
            style={{
              color: theme.success,
            }}
          >
            Verified account
          </AppText>
        </View>
      </View>
    </Card>
  );
}

function ProfileStatistics() {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: spacing[12],
      }}
    >
      <ProfileStat
        icon="navigate-outline"
        value="42"
        label="Trips"
      />

      <ProfileStat
        icon="leaf-outline"
        value="18 kg"
        label="CO₂ saved"
      />

      <ProfileStat
        icon="star-outline"
        value="4.9"
        label="Rating"
      />
    </View>
  );
}

interface ProfileStatProps {
  icon: React.ComponentProps<
    typeof Ionicons
  >["name"];
  value: string;
  label: string;
}

function ProfileStat({
  icon,
  value,
  label,
}: ProfileStatProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        minHeight: 112,
        alignItems: "center",
        justifyContent: "center",
        gap: spacing[6],
        padding: spacing[8],
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: theme.border.default,
        backgroundColor:
          theme.card.background,
      }}
    >
      <Ionicons
        name={icon}
        size={22}
        color={theme.primary}
      />

      <AppText variant="h3">
        {value}
      </AppText>

      <AppText
        variant="labelSmall"
        color="secondary"
        style={{ textAlign: "center" }}
      >
        {label}
      </AppText>
    </View>
  );
}

interface ProfileInformationRowProps {
  icon: React.ComponentProps<
    typeof Ionicons
  >["name"];
  label: string;
  value: string;
}

function ProfileInformationRow({
  icon,
  label,
  value,
}: ProfileInformationRowProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        minHeight: 68,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[12],
        paddingVertical: spacing[8],
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: radius.sm,
          backgroundColor:
            theme.surface.surface,
        }}
      >
        <Ionicons
          name={icon}
          size={20}
          color={theme.icon.active}
        />
      </View>

      <View style={{ flex: 1 }}>
        <AppText
          variant="labelSmall"
          color="secondary"
        >
          {label}
        </AppText>

        <AppText variant="bodyMedium">
          {value}
        </AppText>
      </View>
    </View>
  );
}