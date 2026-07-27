/**
 * Search Field Component - SmartLink Transit
 * 48px height, 24px radius, with search icon
 */

import React, { forwardRef, useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../../features/theme/hooks/useTheme";
import { cn } from "../../../lib/cn";

interface SearchFieldProps extends TextInputProps {
  /** Called when search is submitted */
  onSearch?: (query: string) => void;
  /** Called when clear is pressed */
  onClear?: () => void;
  /** Additional className */
  className?: string;
}

export const SearchField = forwardRef<TextInput, SearchFieldProps>(
  (
    {
      onSearch,
      onClear,
      className,
      value,
      onChangeText,
      placeholder = "Search...",
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const [searchValue, setSearchValue] = useState(value || "");

    const handleChangeText = (text: string) => {
      setSearchValue(text);
      onChangeText?.(text);
    };

    const handleClear = () => {
      setSearchValue("");
      onChangeText?.("");
      onClear?.();
    };

    const handleSubmit = () => {
      onSearch?.(searchValue);
    };

    return (
      <View
        className={cn(
          "h-12 rounded-3xl bg-white dark:bg-dark-700 flex-row items-center px-4",
          className,
        )}
      >
        {/* Search Icon */}
        <View className="mr-3">
          <Text className="text-neutral-500 dark:text-dark-400">🔍</Text>
        </View>

        <TextInput
          ref={ref}
          className="flex-1 text-body-medium text-neutral-900 dark:text-white"
          placeholder={placeholder}
          placeholderTextColor={theme.text.placeholder}
          value={searchValue}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          clearButtonMode="never"
          {...props}
        />

        {searchValue.length > 0 && (
          <TouchableOpacity onPress={handleClear} className="ml-2">
            <Text className="text-neutral-500 dark:text-dark-400">✕</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

SearchField.displayName = "SearchField";

export default SearchField;
