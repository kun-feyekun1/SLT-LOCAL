import Mapbox from "@rnmapbox/maps";
const accessToken = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

if (!accessToken) {
  throw new Error("Missing EXPO_PUBLIC_MAPBOX_TOKEN environment variable.");
}

Mapbox.setAccessToken(accessToken);
export { Mapbox };
