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
import { radius, shadows, spacing } from "@/design-system/tokens/";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { useWallet } from "@/features/wallet/hooks/useWallet";
import { formatCurrency } from "@/utils/formatters";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";

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
              shadows.level1,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <AppText>Available balance</AppText>
            <AppText variant="caption" weight={700}>
              {formatCurrency(wallet.data.balance, wallet.data.currency)}
            </AppText>
            <PrimaryButton label="Add money" onPress={() => undefined} />
          </View>
          {wallet.data.paymentMethods.map(
            (method: {
              id: Key | null | undefined;
              label:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              enabled: any;
            }) => (
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
            ),
          )}
        </View>
      ) : null}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing[4] },
  balance: { borderRadius: radius.lg, padding: spacing[8], gap: spacing[4] },
  method: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing[4],
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[4],
  },
  methodText: { flex: 1 },
});
