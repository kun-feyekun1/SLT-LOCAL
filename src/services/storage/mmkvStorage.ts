// Fast key-value storage for app settings/cache

import { createMMKV, MMKV } from "react-native-mmkv";
export const mmkv: MMKV = createMMKV({
  id: "smart-link-storage",
});

export type StorageValue = string | number | boolean | object | null;

export const mmkvStorage = {
  /**
   * Store any serializable value.
   */
  set<T extends StorageValue>(key: string, value: T): void {
    if (value === null) {
      mmkv.remove(key);
      return;
    }

    if (typeof value === "object") {
      mmkv.set(key, JSON.stringify(value));
      return;
    }

    mmkv.set(key, value);
  },

  /**
   * Read a string.
   */
  getString(key: string): string | null {
    return mmkv.getString(key) ?? null;
  },

  /**
   * Read a number.
   */
  getNumber(key: string): number | null {
    return mmkv.getNumber(key) ?? null;
  },

  /**
   * Read a boolean.
   */
  getBoolean(key: string): boolean | null {
    return mmkv.getBoolean(key) ?? null;
  },

  /**
   * Read an object.
   */
  getObject<T>(key: string): T | null {
    const value = mmkv.getString(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },

  /**
   * Check existence.
   */
  contains(key: string): boolean {
    return mmkv.contains(key);
  },

  /**
   * Remove one key.
   */
  remove(key: string): void {
    mmkv.remove(key);
  },

  /**
   * Remove all stored values.
   */
  clear(): void {
    mmkv.clearAll();
  },

  /**
   * Return all keys.
   */
  keys(): string[] {
    return mmkv.getAllKeys();
  },
};
