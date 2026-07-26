import { CreditCard, WalletCards } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import {
  AppHeader,
  AppText,
  EmptyState,
  LoadingSpinner,
  PrimaryButton,
} from "@/components";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { useWallet } from "@/features/wallet/hooks/useWallet";
import { radii, shadows, spacing } from "@/theme";
import { formatCurrency } from "@/utils/formatters";

export default function WalletScreen() {
  const wallet = useWallet();
  const theme = useTheme();

  return (
    <ScreenWrapper>
      <AppHeader
        title="Wallet"
        subtitle="Ready for QR ticketing and Ethiopian payment providers."
      />
      {wallet.isLoading ? (
        <LoadingSpinner />
      ) : wallet.isError ? (
        <EmptyState
          title="Wallet unavailable"
          message="Payment services could not be reached."
          icon={WalletCards}
          actionLabel="Retry"
          onAction={() => wallet.refetch()}
        />
      ) : wallet.data ? (
        <View style={styles.stack}>
          <View
            style={[
              styles.balance,
              shadows.card,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <AppText>Available balance</AppText>
            <AppText variant="caption" weight={700}>
              {formatCurrency(wallet.data.balance, wallet.data.currency)}
            </AppText>
            <PrimaryButton label="Add money" onPress={() => undefined} />
          </View>
          {wallet.data.paymentMethods.map((method) => (
            <View
              key={method.id}
              style={[
                styles.method,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <CreditCard size={22} color={theme.colors.primary} />
              <View style={styles.methodText}>
                <AppText weight={700}>{method.label}</AppText>
                <AppText variant="caption">
                  {method.enabled ? "Enabled" : "Coming soon"}
                </AppText>
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.md },
  balance: { borderRadius: radii.lg, padding: spacing.lg, gap: spacing.md },
  method: {
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  methodText: { flex: 1 },
});
