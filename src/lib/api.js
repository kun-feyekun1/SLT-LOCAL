import { create } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Expo replaces EXPO_PUBLIC_* values at bundle time. This fallback keeps a new
// checkout usable with the shared backend while allowing every developer to
// select a local backend in their own uncommitted .env file.
const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://darash-backend-production.up.railway.app";

const api = create({ baseURL: BASE_URL });

// Automatically attach the token to every request (the axios interceptor
// pattern — writes the Authorization header so the backend's HTTPBearer reads it)
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Token helpers
export const saveToken = (token) => AsyncStorage.setItem("token", token);
export const getToken = () => AsyncStorage.getItem("token");
export const clearToken = () => AsyncStorage.removeItem("token");
export const saveRole = (role) => AsyncStorage.setItem("role", role);
export const getRole = () => AsyncStorage.getItem("role");

export default api;
