// import { StyleSheet, Switch, View } from "react-native";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { router } from "expo-router";

// import { AppHeader, AppText, PrimaryButton } from "@/components";
// import ScreenWrapper from "@/components/ScreenWrapper";
// import { appConfig } from "@/config/environment";
// import clearSession from "@/features/auth/state/authSlice";
// import type { AuthUser } from "@/features/auth/types/auth.types";
// import { useTheme } from "@/features/theme/hooks/useTheme";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { radius, spacing } from "@/design-system/tokens";

// const MOCK_USER = {
//   id: "dev-user-123",
//   fullName: "Test User",
//   phoneNumber: "+251911223344",
//   email: "test@derash.com",
//   preferredLanguage: "en",
// };

// export default function SettingsScreen() {
//   const theme = useTheme();
//   const dispatch = useAppDispatch();
//   const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

//   const handleMockLogin = () => {
//     dispatch(setSession(MOCK_USER));
//     router.replace("/home");
//   };

//   const handleLogout = async () => {
//     try {
//       dispatch(clearSession());
//       await AsyncStorage.removeItem("persist:derash-root");
//       router.replace("/login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   const handleResetApp = async () => {
//     try {
//       dispatch(clearSession());
//       await AsyncStorage.removeItem("persist:derash-root");
//       router.replace("/login");
//     } catch (error) {
//       console.error("Error resetting app:", error);
//     }
//   };

//   return (
//     <ScreenWrapper>
//       <AppHeader
//         title="Settings"
//         subtitle="Personalize Derash for your city movement."
//         showActions={false}
//       />
//       <View
//         style={[
//           styles.row,
//           {
//             backgroundColor: theme.colors.surface,
//             borderColor: theme.colors.border,
//           },
//         ]}
//       >
//         <View style={styles.text}>
//           <AppText weight="700">Amharic support</AppText>
//           <AppText muted variant="caption">
//             Language architecture is enabled for English and Amharic.
//           </AppText>
//         </View>
//         <Switch value={appConfig.featureFlags.enableAmharicLocale} disabled />
//       </View>
//       <View
//         style={[
//           styles.row,
//           {
//             backgroundColor: theme.colors.surface,
//             borderColor: theme.colors.border,
//           },
//         ]}
//       >
//         <View style={styles.text}>
//           <AppText weight="700">Realtime tracking</AppText>
//           <AppText muted variant="caption">
//             Prepared for WebSocket vehicle updates.
//           </AppText>
//         </View>
//         <Switch
//           value={appConfig.featureFlags.enableRealtimeTracking}
//           disabled
//         />
//       </View>

//       {/* Development Section */}
//       <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
//         <AppText weight="700" style={{ color: theme.colors.textMuted }}>
//           Development Tools
//         </AppText>

//         {!isAuthenticated ? (
//           <PrimaryButton
//             label="📱 Mock Login (Dev)"
//             onPress={handleMockLogin}
//           />
//         ) : (
//           <PrimaryButton label="🚪 Logout" onPress={handleLogout} />
//         )}

//         <PrimaryButton label="🔄 Reset App" onPress={handleResetApp} />
//       </View>
//     </ScreenWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   row: {
//     borderWidth: 1,
//     borderRadius: radius.lg,
//     padding: spacing.md,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: spacing.md,
//   },
//   text: { flex: 1 },
// });



export {SettingsScreen as default} from "@/features/settings/screens/SettingsScreen";