// export { AccountCreatedScreen as default } from "@/features/auth/screens";
// app/(auth)/account-created.tsx

import { View } from "react-native";
import { AppText } from "@/components/AppText/AppText";

export default function AccountCreatedScreen() {
  return (
    <View>
      <AppText>Account created successfully</AppText>
    </View>
  );
}