import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { Route as RouteIcon } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppHeader, EmptyState, LoadingSpinner, PrimaryButton } from '@/components';
import { RouteCard } from '@/features/routes/components/RouteCard';
import { useRouteRecommendations } from '@/features/routes/hooks/useRouteRecommendations';
import type { RouteRecommendation } from '@/features/routes/types/route.types';
import { spacing } from '@/design-system/tokens/spacing';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function RoutesScreen() {
  const routes = useRouteRecommendations();

  const renderItem = ({ item }: { item: RouteRecommendation }) => <RouteCard route={item} />;

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppHeader title="Recommended routes" subtitle="Balanced by speed, walking time, fare, and reliability." />
        </View>
        {routes.isLoading ? (
          <LoadingSpinner />
        ) : routes.isError ? (
          <EmptyState title="Could not load routes" message="Route planning is offline. Retry when your connection improves." icon={RouteIcon} actionLabel="Retry" onAction={() => routes.refetch()} />
        ) : (
          <FlashList
            data={routes.data ?? []}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            drawDistance={1000}
            ListEmptyComponent={
              <EmptyState
                title="Choose a destination"
                message="Search for where you want to go and Derash will recommend route combinations."
                icon={RouteIcon}
                actionLabel="Search destination"
                onAction={() => router.push('/search')}
              />
            }
          />
        )}
        <View style={styles.footer}>
          <PrimaryButton label="Search another destination" variant="secondary" onPress={() => router.push('/search')} />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: spacing[4] },
  list: { padding: spacing[4] },
  footer: { padding: spacing[4] }
});


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
