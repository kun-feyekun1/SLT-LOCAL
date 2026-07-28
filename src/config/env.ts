const rawApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

if (!rawApiUrl) {
  throw new Error(
    "Missing EXPO_PUBLIC_API_URL. Add it to your .env file.",
  );
}

export const env = Object.freeze({
  apiUrl: rawApiUrl.replace(/\/+$/, ""),
});
