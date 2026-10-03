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

export const api = {
  get: <T>(
    url: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) => client.get<T>(url, { params, signal }).then((r) => r.data),
};

export default client;
