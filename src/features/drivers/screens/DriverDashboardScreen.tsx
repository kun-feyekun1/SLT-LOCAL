import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useDriverMe } from "@/features/drivers/queries/driver.queries";
import {
  useEndTrip,
  useStartTrip,
} from "@/features/trips/queries/trip.queries";

export function DriverDashboardScreen() {
  const me = useDriverMe();
  const start = useStartTrip();
  const end = useEndTrip();

  if (me.isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (me.isError) {
    return (
      <View style={styles.center}>
        <Text>{me.error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Welcome, {me.data.name}</Text>
      <Text>
        Vehicle: {me.data.vehicle_type} · {me.data.vehicle_plate}
      </Text>
      <Text>
        Availability: {me.data.is_available ? "Available" : "Unavailable"}
      </Text>

      <Pressable
        style={styles.action}
        onPress={() => start.mutate()}
        disabled={start.isPending}
      >
        <Text style={styles.actionText}>Start trip</Text>
      </Pressable>

      <Pressable
        style={styles.action}
        onPress={() => end.mutate()}
        disabled={end.isPending}
      >
        <Text style={styles.actionText}>End trip</Text>
      </Pressable>

      {start.error ? <Text>{start.error.message}</Text> : null}
      {end.error ? <Text>{end.error.message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  action: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#1A7A3C",
  },
  actionText: {
    color: "white",
    fontWeight: "700",
  },
});
