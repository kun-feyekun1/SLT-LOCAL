// import "@/styles/global.css";import {
//   SafeAreaView,
//   View,
//  Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";

// export default function App() {
//   return (
//     <SafeAreaView className="flex-1 bg-slate-100">
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header */}
//         <View className="bg-blue-600 pt-14 pb-24 px-6 rounded-b-[40px]">
//           <Text className="text-3xl font-bold text-white">
//             My Profile
//           </Text>

//           <Text className="text-blue-100 mt-1">
//             Manage your account
//           </Text>
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
//                 <Text className="text-xs font-bold text-white">
//                   VERIFIED
//                 </Text>
//               </View>
//             </View>

//             <Text className="mt-2 text-slate-500">
//               Passenger Account
//             </Text>
//           </View>

//           {/* Contact */}
//           <View className="mt-8 space-y-3">
//             <View className="flex-row justify-between">
//               <Text className="text-slate-500">
//                 Phone
//               </Text>

//               <Text className="font-semibold text-slate-800">
//                 +251 91 234 5678
//               </Text>
//             </View>

//             <View className="flex-row justify-between">
//               <Text className="text-slate-500">
//                 Email
//               </Text>

//               <Text className="font-semibold text-slate-800">
//                 user@email.com
//               </Text>
//             </View>

//             <View className="flex-row justify-between">
//               <Text className="text-slate-500">
//                 Member Since
//               </Text>

//               <Text className="font-semibold text-slate-800">
//                 Jan 2026
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Statistics */}
//         <View className="mx-5 mt-6 flex-row justify-between">
//           <View className="flex-1 rounded-2xl bg-white p-5 shadow mr-2">
//             <Text className="text-3xl font-bold text-blue-600">
//               4.9
//             </Text>

//             <Text className="mt-2 text-slate-500">
//               Rating
//             </Text>
//           </View>

//           <View className="flex-1 rounded-2xl bg-white p-5 shadow mx-1">
//             <Text className="text-3xl font-bold text-green-600">
//               154
//             </Text>

//             <Text className="mt-2 text-slate-500">
//               Trips
//             </Text>
//           </View>

//           <View className="flex-1 rounded-2xl bg-white p-5 shadow ml-2">
//             <Text className="text-3xl font-bold text-orange-500">
//               ETB 1,250
//             </Text>

//             <Text className="mt-2 text-slate-500">
//               Wallet
//             </Text>
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

//                 <Text className="text-xl text-slate-400">
//                   ›
//                 </Text>
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

// import {
//   Image,
//   ImageStyle,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextStyle,
//   TouchableOpacity,
//   View,
//   ViewStyle,
// } from "react-native";

// // Import your design system tokens completely
// // Import your custom design system tokens completely
// import {
//   colors,
//   componentRadius,
//   getShadow,
//   layout,
//   radius,
//   spacing,
//   spacingGuidelines,
//   typography,
// } from "../../src/design-system";

// export default function App() {
//   const isDarkMode = false;

//   return (
//     <SafeAreaView style={styles.screenWrapper}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header - Brand Green Banner */}
//         <View style={styles.headerBanner}>
//           <Text style={typography.h1 as TextStyle}>My Profile</Text>

//           <Text
//             style={[typography.bodyMedium as TextStyle, styles.headerSubtitle]}
//           >
//             Manage your account
//           </Text>
//         </View>

//         {/* Profile Card */}
//         <View
//           style={[styles.profileCard, getShadow("2", isDarkMode) as ViewStyle]}
//         >
//           <View style={styles.centeredColumn}>
//             <Image
//               source={{ uri: "https://i.pravatar.cc/300" }}
//               style={styles.avatar}
//             />

//             <View style={styles.profileNameRow}>
//               <Text style={typography.h2 as TextStyle}>Mohammed Hassen</Text>

//               {/* Verified Badge */}
//               <View style={styles.verifiedBadge}>
//                 <Text
//                   style={[
//                     typography.labelSmall as TextStyle,
//                     styles.verifiedText,
//                   ]}
//                 >
//                   VERIFIED
//                 </Text>
//               </View>
//             </View>

//             <Text
//               style={[
//                 typography.bodyMedium as TextStyle,
//                 styles.passengerLabel,
//               ]}
//             >
//               Passenger Account
//             </Text>
//           </View>

//           {/* Contact Details List */}
//           <View style={styles.contactSection}>
//             <View style={styles.infoRow}>
//               <Text
//                 style={[typography.bodyMedium as TextStyle, styles.infoLabel]}
//               >
//                 Phone
//               </Text>
//               <Text
//                 style={[typography.bodyMedium as TextStyle, styles.infoValue]}
//               >
//                 +251 91 234 5678
//               </Text>
//             </View>

//             <View style={styles.infoRow}>
//               <Text
//                 style={[typography.bodyMedium as TextStyle, styles.infoLabel]}
//               >
//                 Email
//               </Text>
//               <Text
//                 style={[typography.bodyMedium as TextStyle, styles.infoValue]}
//               >
//                 user@email.com
//               </Text>
//             </View>

//             <View style={[styles.infoRow, { marginBottom: 0 }]}>
//               <Text
//                 style={[typography.bodyMedium as TextStyle, styles.infoLabel]}
//               >
//                 Member Since
//               </Text>
//               <Text
//                 style={[typography.bodyMedium as TextStyle, styles.infoValue]}
//               >
//                 Jan 2026
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Statistics Metric Row */}
//         <View style={styles.statsRow}>
//           {/* Rating */}
//           <View
//             style={[styles.statBox, getShadow("1", isDarkMode) as ViewStyle]}
//           >
//             <Text
//               style={[
//                 typography.priceLarge as TextStyle,
//                 { color: colors.semantic.info },
//               ]}
//             >
//               4.9
//             </Text>
//             <Text style={[typography.bodySmall as TextStyle, styles.statLabel]}>
//               Rating
//             </Text>
//           </View>

//           {/* Trips */}
//           <View
//             style={[styles.statBox, getShadow("1", isDarkMode) as ViewStyle]}
//           >
//             <Text
//               style={[
//                 typography.priceLarge as TextStyle,
//                 { color: colors.brand.green },
//               ]}
//             >
//               154
//             </Text>
//             <Text style={[typography.bodySmall as TextStyle, styles.statLabel]}>
//               Trips
//             </Text>
//           </View>

//           {/* Wallet Balance */}
//           <View
//             style={[styles.statBox, getShadow("1", isDarkMode) as ViewStyle]}
//           >
//             <Text
//               style={[typography.priceMedium as TextStyle, styles.walletText]}
//             >
//               ETB 1,250
//             </Text>
//             <Text style={[typography.bodySmall as TextStyle, styles.statLabel]}>
//               Wallet
//             </Text>
//           </View>
//         </View>

//         {/* Navigation Actions Menu */}
//         <View
//           style={[
//             styles.menuContainer,
//             getShadow("2", isDarkMode) as ViewStyle,
//           ]}
//         >
//           {[
//             "Personal Information",
//             "Payment Methods",
//             "Ride History",
//             "Notifications",
//             "Privacy & Security",
//             "Help Center",
//           ].map((item, index, arr) => (
//             <TouchableOpacity
//               key={item}
//               style={[
//                 styles.menuItem,
//                 index === arr.length - 1 && { borderBottomWidth: 0 },
//               ]}
//             >
//               <View style={styles.menuItemContent}>
//                 <Text
//                   style={[
//                     typography.bodyLarge as TextStyle,
//                     styles.menuItemText,
//                   ]}
//                 >
//                   {item}
//                 </Text>
//                 <Text style={[typography.h3 as TextStyle, styles.menuChevron]}>
//                   ›
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Logout Button CTA */}
//         <TouchableOpacity
//           style={[styles.logoutButton, getShadow("2", isDarkMode) as ViewStyle]}
//         >
//           <Text
//             style={[typography.buttonLarge as TextStyle, styles.logoutText]}
//           >
//             Log Out
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // Strictly typing each style object clears the complex 'cursor' property differences
// const styles = StyleSheet.create({
//   screenWrapper: {
//     flex: 1,
//     backgroundColor: colors.backgroundLight.primary,
//   } as ViewStyle,
//   headerBanner: {
//     backgroundColor: colors.brand.green,
//     paddingTop: spacing[56],
//     paddingBottom: spacing[64],
//     paddingHorizontal: layout.screenPadding,
//     borderBottomLeftRadius: radius.xl,
//     borderBottomRightRadius: radius.xl,
//   } as ViewStyle,
//   headerSubtitle: {
//     color: colors.brand.greenLight,
//     marginTop: spacing[4],
//   } as TextStyle,
//   profileCard: {
//     backgroundColor: colors.surface.card,
//     borderRadius: componentRadius.card,
//     marginTop: -spacing[64],
//     marginHorizontal: layout.screenPadding,
//     ...spacingGuidelines.cardPadding,
//   } as ViewStyle,
//   centeredColumn: {
//     alignItems: "center",
//   } as ViewStyle,
//   avatar: {
//     width: 112,
//     height: 112,
//     borderRadius: radius.full,
//   } as ImageStyle,
//   profileNameRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: spacing[16],
//   } as ViewStyle,
//   verifiedBadge: {
//     backgroundColor: colors.semantic.success,
//     borderRadius: radius.full,
//     paddingHorizontal: spacing[8],
//     paddingVertical: spacing[4],
//     marginLeft: spacing[8],
//   } as ViewStyle,
//   verifiedText: {
//     color: colors.white,
//     fontWeight: "700",
//   } as TextStyle,
//   passengerLabel: {
//     color: colors.neutral[500],
//     marginTop: spacing[8],
//   } as TextStyle,
//   contactSection: {
//     marginTop: spacing[32],
//   } as ViewStyle,
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: spacing[12],
//   } as ViewStyle,
//   infoLabel: {
//     color: colors.neutral[500],
//   } as TextStyle,
//   infoValue: {
//     fontWeight: "600",
//     color: colors.neutral[800],
//   } as TextStyle,
//   statsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginHorizontal: layout.screenPadding,
//     marginTop: spacing[24],
//   } as ViewStyle,
//   statBox: {
//     flex: 1,
//     backgroundColor: colors.surface.card,
//     borderRadius: radius.sm,
//     padding: spacing[16],
//     marginHorizontal: spacing[4],
//   } as ViewStyle,
//   statLabel: {
//     color: colors.neutral[500],
//     marginTop: spacing[8],
//   } as TextStyle,
//   walletText: {
//     fontSize: 18,
//     lineHeight: 40,
//     color: colors.brand.gold,
//   } as TextStyle,
//   menuContainer: {
//     backgroundColor: colors.surface.card,
//     borderRadius: radius.md,
//     marginHorizontal: layout.screenPadding,
//     marginTop: spacing[32],
//     overflow: "hidden",
//   } as ViewStyle,
//   menuItem: {
//     borderBottomWidth: 1,
//     borderBottomColor: colors.backgroundLight.secondary,
//     ...spacingGuidelines.listItem,
//   } as ViewStyle,
//   menuItemContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   } as ViewStyle,
//   menuItemText: {
//     fontWeight: "500",
//     color: colors.neutral[800],
//   } as TextStyle,
//   menuChevron: {
//     color: colors.neutral[400],
//   } as TextStyle,
//   logoutButton: {
//     backgroundColor: colors.semantic.error,
//     borderRadius: componentRadius.button,
//     marginHorizontal: layout.screenPadding,
//     marginTop: spacing[32],
//     marginBottom: spacing[40],
//     ...spacingGuidelines.buttonPadding,
//   } as ViewStyle,
//   logoutText: {
//     color: colors.white,
//     textAlign: "center",
//   } as TextStyle,
// });



import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { colors, radius, spacing, typography, componentRadius, componentElevation, elevation, layout } from "@/design-system/tokens";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundLight.secondary }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{
          backgroundColor: colors.brand.green,
          paddingTop: spacing[56],
          paddingBottom: spacing[64],
          paddingHorizontal: spacing[24],
          borderBottomLeftRadius: radius.xl,
          borderBottomRightRadius: radius.xl,
        }}>
          <Text style={{
            ...typography.h1,
            color: colors.white,
          }}>
            My Profile
          </Text>

          <Text style={{
            ...typography.bodyMedium,
            color: colors.neutral[200],
            marginTop: spacing[4],
          }}>
            Manage your account
          </Text>
        </View>

        {/* Profile Card */}
        <View style={{
          marginTop: -spacing[64],
          marginHorizontal: spacing[20],
          borderRadius: componentRadius.card,
          backgroundColor: colors.surface.surfaceElevated,
          padding: spacing[24],
          ...componentElevation.card,
        }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/300",
              }}
              style={{
                height: 112,
                width: 112,
                borderRadius: radius.full,
              }}
            />

            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: spacing[16],
            }}>
              <Text style={{
                ...typography.h2,
                color: colors.neutral[900],
              }}>
                Mohammed Hassen
              </Text>

              <View style={{
                marginLeft: spacing[8],
                borderRadius: componentRadius.badge,
                backgroundColor: colors.semantic.success,
                paddingHorizontal: spacing[8],
                paddingVertical: spacing[4],
              }}>
                <Text style={{
                  ...typography.labelSmall,
                  color: colors.white,
                  fontWeight: "700",
                }}>
                  VERIFIED
                </Text>
              </View>
            </View>

            <Text style={{
              ...typography.bodyMedium,
              color: colors.neutral[500],
              marginTop: spacing[8],
            }}>
              Passenger Account
            </Text>
          </View>

          {/* Contact */}
          <View style={{
            marginTop: spacing[32],
            gap: spacing[12],
          }}>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
              <Text style={{
                ...typography.bodyMedium,
                color: colors.neutral[500],
              }}>
                Phone
              </Text>

              <Text style={{
                ...typography.bodyMedium,
                fontWeight: "600",
                color: colors.neutral[800],
              }}>
                +251 91 234 5678
              </Text>
            </View>

            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
              <Text style={{
                ...typography.bodyMedium,
                color: colors.neutral[500],
              }}>
                Email
              </Text>

              <Text style={{
                ...typography.bodyMedium,
                fontWeight: "600",
                color: colors.neutral[800],
              }}>
                user@email.com
              </Text>
            </View>

            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
              <Text style={{
                ...typography.bodyMedium,
                color: colors.neutral[500],
              }}>
                Member Since
              </Text>

              <Text style={{
                ...typography.bodyMedium,
                fontWeight: "600",
                color: colors.neutral[800],
              }}>
                Jan 2026
              </Text>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={{
          marginHorizontal: spacing[20],
          marginTop: spacing[24],
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
          <View style={{
            flex: 1,
            borderRadius: componentRadius.card,
            backgroundColor: colors.surface.surfaceElevated,
            padding: spacing[20],
            marginRight: spacing[8],
            ...componentElevation.card,
          }}>
            <Text style={{
              ...typography.displayMedium,
              color: colors.brand.green,
            }}>
              4.9
            </Text>

            <Text style={{
              ...typography.bodyMedium,
              color: colors.neutral[500],
              marginTop: spacing[8],
            }}>
              Rating
            </Text>
          </View>

          <View style={{
            flex: 1,
            borderRadius: componentRadius.card,
            backgroundColor: colors.surface.surfaceElevated,
            padding: spacing[20],
            marginHorizontal: spacing[4],
            ...componentElevation.card,
          }}>
            <Text style={{
              ...typography.displayMedium,
              color: colors.semantic.success,
            }}>
              154
            </Text>

            <Text style={{
              ...typography.bodyMedium,
              color: colors.neutral[500],
              marginTop: spacing[8],
            }}>
              Trips
            </Text>
          </View>

          <View style={{
            flex: 1,
            borderRadius: componentRadius.card,
            backgroundColor: colors.surface.surfaceElevated,
            padding: spacing[20],
            marginLeft: spacing[8],
            ...componentElevation.card,
          }}>
            <Text style={{
              ...typography.displayMedium,
              color: colors.brand.gold,
            }}>
              ETB 1,250
            </Text>

            <Text style={{
              ...typography.bodyMedium,
              color: colors.neutral[500],
              marginTop: spacing[8],
            }}>
              Wallet
            </Text>
          </View>
        </View>

        {/* Menu */}
        <View style={{
          marginHorizontal: spacing[20],
          marginTop: spacing[32],
          borderRadius: componentRadius.card,
          backgroundColor: colors.surface.surfaceElevated,
          ...componentElevation.card,
        }}>
          {[
            "Personal Information",
            "Payment Methods",
            "Ride History",
            "Notifications",
            "Privacy & Security",
            "Help Center",
          ].map((item, index) => (
            <TouchableOpacity
              key={item}
              style={{
                borderBottomWidth: index < 5 ? 1 : 0,
                borderBottomColor: colors.neutral[100],
                paddingHorizontal: spacing[24],
                paddingVertical: spacing[20],
              }}
            >
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <Text style={{
                  ...typography.bodyLarge,
                  color: colors.neutral[800],
                }}>
                  {item}
                </Text>

                <Text style={{
                  ...typography.bodyLarge,
                  color: colors.neutral[400],
                }}>
                  ›
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={{
          marginHorizontal: spacing[20],
          marginTop: spacing[32],
          marginBottom: spacing[40],
          borderRadius: componentRadius.button,
          backgroundColor: colors.semantic.error,
          paddingVertical: spacing[16],
          ...componentElevation.buttonDefault,
        }}>
          <Text style={{
            ...typography.buttonLarge,
            color: colors.white,
            textAlign: "center",
          }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}