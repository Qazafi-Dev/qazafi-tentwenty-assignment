import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const IMAGE_BASE = process.env.EXPO_PUBLIC_IMAGE_BASE;
const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_BEARER_TOKEN}`,
    Accept: "application/json",
  },
});

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (axios.isCancel(err)) return Promise.reject(err);
    return Promise.reject(
      new ApiError(
        err.response?.data?.status_message ?? err.message ?? "Network error",
        err.response?.status,
      ),
    );
  },
);

const cacheKey = (url: string, params?: Record<string, unknown>) =>
  `cache:${url}:${params ? JSON.stringify(Object.entries(params).sort()) : ""}`;

export const api = {
  get: async <T>(
    url: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ): Promise<T> => {
    const key = cacheKey(url, params);
    try {
      const { data } = await client.get<T>(url, { params, signal });
      AsyncStorage.setItem(key, JSON.stringify(data)).catch(() => {}); // save
      return data;
    } catch (e) {
      if (axios.isCancel(e)) throw e;
      // no status = network problem (offline/timeout), so use the saved copy
      if ((e as ApiError).status === undefined) {
        const cached = await AsyncStorage.getItem(key).catch(() => null);
        if (cached) return JSON.parse(cached) as T;
      }
      throw e; // real errors (404, 401...) still surface
    }
  },
};

export default client;
