import { View, Text, Pressable } from "react-native";

interface Props {
  error?: Error;
  onRetry: () => void;
}

export function GlobalErrorScreen({
  error,
  onRetry,
}: Props) {
  return (
    <View
      className="flex-1 items-center justify-center bg-white px-6"
    >
      <Text className="text-3xl font-bold mb-4">
        Something went wrong
      </Text>

      <Text className="text-center text-gray-600 mb-6">
        We couldn't load the application.
      </Text>

      {__DEV__ && (
        <Text className="text-red-500 mb-6">
          {error?.message}
        </Text>
      )}

      <Pressable
        onPress={onRetry}
        className="bg-green-600 rounded-xl px-6 py-3"
      >
        <Text className="text-white font-semibold">
          Try Again
        </Text>
      </Pressable>
    </View>
  );
}