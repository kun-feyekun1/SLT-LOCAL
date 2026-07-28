import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useTerminal } from "@/features/terminals/queries/terminal.queries";

export function TerminalDetailsScreen({
  terminalId,
}: {
  terminalId: number;
}) {
  const query = useTerminal(terminalId);

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

  const terminal = query.data;

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{terminal.name}</Text>
      {terminal.name_am ? (
        <Text>{terminal.name_am}</Text>
      ) : null}
      <Text>Category: {terminal.category}</Text>
      <Text>
        Coordinates: {terminal.latitude},{" "}
        {terminal.longitude}
      </Text>
      <Text>
        Status:{" "}
        {terminal.is_active ? "Active" : "Inactive"}
      </Text>
      {terminal.address ? (
        <Text>Address: {terminal.address}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    gap: 10,
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
});
