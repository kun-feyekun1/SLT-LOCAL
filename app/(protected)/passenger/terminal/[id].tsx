import { useLocalSearchParams } from "expo-router";

import { TerminalDetailsScreen } from "@/features/terminals/screens/TerminalDetailsScreen";

export default function TerminalDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const terminalId = Number(id);

  return (
    <TerminalDetailsScreen terminalId={terminalId} />
  );
}
