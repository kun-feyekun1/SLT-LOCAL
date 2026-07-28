import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useOperatorRoutes } from "@/features/operators/queries/operator.queries";

export function OperatorRoutesScreen() {
  const query = useOperatorRoutes();

  if (query.isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (query.isError) {
    return (
      <View style={styles.center}>
        <Text>{query.error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={query.data}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>Code: {item.code ?? "—"}</Text>
          <Text>
            Fare: {item.fare == null ? "—" : item.fare}
          </Text>
          <Text>
            {item.is_active ? "Active" : "Inactive"}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    gap: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
  },
});
