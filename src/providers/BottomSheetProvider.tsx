import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React from "react";

export function BottomSheetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BottomSheetModalProvider>{children}</BottomSheetModalProvider>;
}
