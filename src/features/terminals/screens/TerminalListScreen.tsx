import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useTerminals } from "@/features/terminals/queries/terminal.queries";

export function TerminalListScreen() {
  const query = useTerminals({ limit: 100 });

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
        <Pressable onPress={() => void query.refetch()}>
          <Text>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={query.data}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={styles.item}
          onPress={() =>
            router.push(`/passenger/terminal/${item.id}`)
          }
        >
          <Text style={styles.name}>{item.name}</Text>
          <Text>
            {item.category} ·{" "}
            {item.is_verified ? "Verified" : "Unverified"}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  item: {
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
