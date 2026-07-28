import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PassengerHomeRoute() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Passenger</Text>

      <Pressable
        style={styles.card}
        onPress={() => router.push("/passenger/terminals")}
      >
        <Text style={styles.cardTitle}>Browse terminals</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
  },
  card: {
    padding: 18,
    borderWidth: 1,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
});
